import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { AssistanceRequest, ServiceProvider } from './types';

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

const REQUESTS_COLL = 'assistance_requests_zero_start';
const PROVIDERS_COLL = 'service_providers_zero_start';

// Local storage backup keys
const LOCAL_STORAGE_REQ_KEY = 'community_connect_zero_v5_req';
const LOCAL_STORAGE_PROV_KEY = 'community_connect_zero_v5_prov';

function getStoredLocalData<T>(key: string, defaultData: T[]): T[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = localStorage.getItem(key);
      if (raw) {
        return JSON.parse(raw);
      }
    }
  } catch (err) {
    console.warn('Local storage read error:', err);
  }
  return defaultData;
}

function saveStoredLocalData<T>(key: string, data: T[]) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  } catch (err) {
    console.warn('Local storage save error:', err);
  }
}

/**
 * Sanitizes object to remove undefined values before sending to Firestore,
 * preventing 'Unsupported field value: undefined' errors.
 */
function cleanForFirestore<T extends Record<string, any>>(obj: T): Record<string, any> {
  const result: Record<string, any> = {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (val !== undefined) {
      result[key] = val;
    }
  }
  return result;
}

/**
 * Initializes Firestore check - clean 0 start (no auto-mock records)
 */
export async function seedInitialDataIfEmpty() {
  console.log('Community Connect initialized with clean zero-based ledger.');
}

/**
 * Subscribes to assistance requests with real-time updates & local fallback
 */
export function subscribeToRequests(
  callback: (requests: AssistanceRequest[]) => void
): () => void {
  // Deliver initial local state immediately
  const localList = getStoredLocalData<AssistanceRequest>(LOCAL_STORAGE_REQ_KEY, []);
  callback(localList);

  try {
    const q = query(collection(db, REQUESTS_COLL), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: AssistanceRequest[] = [];
        snapshot.forEach((d) => {
          const data = d.data() as AssistanceRequest;
          items.push({ ...data, id: d.id });
        });

        // Merge any unsynced local pending items if any
        const currentLocals = getStoredLocalData<AssistanceRequest>(LOCAL_STORAGE_REQ_KEY, []);
        const unsyncedLocals = currentLocals.filter(
          (loc) => loc.id.startsWith('req-') && !items.some((it) => it.createdAt === loc.createdAt)
        );
        const merged = [...items, ...unsyncedLocals];

        saveStoredLocalData(LOCAL_STORAGE_REQ_KEY, merged);
        callback(merged);
      },
      (error) => {
        console.warn('Firestore requests subscription error, utilizing local cache:', error);
        callback(getStoredLocalData<AssistanceRequest>(LOCAL_STORAGE_REQ_KEY, []));
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn('Firestore subscription failed, running in resilient local mode:', err);
    return () => {};
  }
}

/**
 * Subscribes to service providers with real-time updates & local fallback
 */
export function subscribeToProviders(
  callback: (providers: ServiceProvider[]) => void
): () => void {
  const localList = getStoredLocalData<ServiceProvider>(LOCAL_STORAGE_PROV_KEY, []);
  callback(localList);

  try {
    const q = query(collection(db, PROVIDERS_COLL), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: ServiceProvider[] = [];
        snapshot.forEach((d) => {
          const data = d.data() as ServiceProvider;
          items.push({ ...data, id: d.id });
        });

        // Merge any unsynced local pending items if any
        const currentLocals = getStoredLocalData<ServiceProvider>(LOCAL_STORAGE_PROV_KEY, []);
        const unsyncedLocals = currentLocals.filter(
          (loc) => loc.id.startsWith('prov-') && !items.some((it) => it.createdAt === loc.createdAt)
        );
        const merged = [...items, ...unsyncedLocals];

        saveStoredLocalData(LOCAL_STORAGE_PROV_KEY, merged);
        callback(merged);
      },
      (error) => {
        console.warn('Firestore providers subscription error, utilizing local cache:', error);
        callback(getStoredLocalData<ServiceProvider>(LOCAL_STORAGE_PROV_KEY, []));
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn('Firestore subscription failed, running in resilient local mode:', err);
    return () => {};
  }
}

/**
 * Submits a new assistance request
 */
export async function createAssistanceRequest(
  newReq: Omit<AssistanceRequest, 'id' | 'status' | 'createdAt'>
): Promise<AssistanceRequest> {
  const tempId = 'req-' + Date.now();
  const record: AssistanceRequest = {
    ...newReq,
    id: tempId,
    status: 'pending',
    createdAt: Date.now(),
  };

  const localList = getStoredLocalData<AssistanceRequest>(LOCAL_STORAGE_REQ_KEY, []);
  saveStoredLocalData(LOCAL_STORAGE_REQ_KEY, [record, ...localList.filter((r) => r.id !== tempId)]);

  try {
    const cleaned = cleanForFirestore(record);
    const docRef = await addDoc(collection(db, REQUESTS_COLL), cleaned);
    record.id = docRef.id;
    await updateDoc(docRef, { id: docRef.id });

    // Update locally with the permanent Firestore ID
    const currentLocals = getStoredLocalData<AssistanceRequest>(LOCAL_STORAGE_REQ_KEY, []);
    const updated = currentLocals.map((r) => (r.id === tempId ? record : r));
    saveStoredLocalData(LOCAL_STORAGE_REQ_KEY, updated);
  } catch (err) {
    console.error('Firestore save error for assistance request:', err);
  }

  return record;
}

/**
 * Submits a new service provider registration
 */
export async function createServiceProvider(
  newProv: Omit<ServiceProvider, 'id' | 'status' | 'createdAt' | 'missionsCompleted'>
): Promise<ServiceProvider> {
  const tempId = 'prov-' + Date.now();
  const record: ServiceProvider = {
    ...newProv,
    id: tempId,
    status: 'pending',
    createdAt: Date.now(),
    missionsCompleted: 0,
    isLiveTracking: false,
  };

  const localList = getStoredLocalData<ServiceProvider>(LOCAL_STORAGE_PROV_KEY, []);
  saveStoredLocalData(LOCAL_STORAGE_PROV_KEY, [record, ...localList.filter((p) => p.id !== tempId)]);

  try {
    const cleaned = cleanForFirestore(record);
    const docRef = await addDoc(collection(db, PROVIDERS_COLL), cleaned);
    record.id = docRef.id;
    await updateDoc(docRef, { id: docRef.id });

    // Update locally with the permanent Firestore ID
    const currentLocals = getStoredLocalData<ServiceProvider>(LOCAL_STORAGE_PROV_KEY, []);
    const updated = currentLocals.map((p) => (p.id === tempId ? record : p));
    saveStoredLocalData(LOCAL_STORAGE_PROV_KEY, updated);
  } catch (err) {
    console.error('Firestore save error for service provider registration:', err);
  }

  return record;
}

/**
 * Deletes an assistance request from database and local store (Admin action)
 */
export async function deleteAssistanceRequest(requestId: string): Promise<void> {
  const localReqs = getStoredLocalData<AssistanceRequest>(LOCAL_STORAGE_REQ_KEY, []);
  const filtered = localReqs.filter((r) => r.id !== requestId);
  saveStoredLocalData(LOCAL_STORAGE_REQ_KEY, filtered);

  try {
    await deleteDoc(doc(db, REQUESTS_COLL, requestId));
  } catch (err) {
    console.warn('Firestore delete request error:', err);
  }
}

/**
 * Deletes a registered NGO/service provider from database and local store (Admin action)
 */
export async function deleteServiceProvider(providerId: string): Promise<void> {
  const localProvs = getStoredLocalData<ServiceProvider>(LOCAL_STORAGE_PROV_KEY, []);
  const filtered = localProvs.filter((p) => p.id !== providerId);
  saveStoredLocalData(LOCAL_STORAGE_PROV_KEY, filtered);

  try {
    await deleteDoc(doc(db, PROVIDERS_COLL, providerId));
  } catch (err) {
    console.warn('Firestore delete provider error:', err);
  }
}

/**
 * Updates provider approval status (Admin action)
 */
export async function updateProviderStatus(
  providerId: string,
  newStatus: 'approved' | 'rejected'
): Promise<void> {
  const localList = getStoredLocalData<ServiceProvider>(LOCAL_STORAGE_PROV_KEY, []);
  const updated = localList.map((p) =>
    p.id === providerId
      ? { ...p, status: newStatus, verifiedAt: newStatus === 'approved' ? Date.now() : undefined }
      : p
  );
  saveStoredLocalData(LOCAL_STORAGE_PROV_KEY, updated);

  try {
    const docRef = doc(db, PROVIDERS_COLL, providerId);
    await updateDoc(docRef, {
      status: newStatus,
      verifiedAt: newStatus === 'approved' ? Date.now() : null,
    });
  } catch (err) {
    console.warn('Firestore update provider status error:', err);
  }
}

/**
 * Marks an assistance request as completed (Admin / Dispatcher action)
 */
export async function markRequestCompleted(
  requestId: string,
  assignedProviderId?: string
): Promise<void> {
  const localReqs = getStoredLocalData<AssistanceRequest>(LOCAL_STORAGE_REQ_KEY, []);
  const updatedReqs = localReqs.map((r) =>
    r.id === requestId ? { ...r, status: 'completed' as const, completedAt: Date.now() } : r
  );
  saveStoredLocalData(LOCAL_STORAGE_REQ_KEY, updatedReqs);

  if (assignedProviderId) {
    const localProvs = getStoredLocalData<ServiceProvider>(LOCAL_STORAGE_PROV_KEY, []);
    const updatedProvs = localProvs.map((p) =>
      p.id === assignedProviderId ? { ...p, missionsCompleted: (p.missionsCompleted || 0) + 1 } : p
    );
    saveStoredLocalData(LOCAL_STORAGE_PROV_KEY, updatedProvs);
  }

  try {
    const reqDocRef = doc(db, REQUESTS_COLL, requestId);
    await updateDoc(reqDocRef, {
      status: 'completed',
      completedAt: Date.now(),
      ...(assignedProviderId ? { assignedProviderId } : {}),
    });

    if (assignedProviderId) {
      const provDocRef = doc(db, PROVIDERS_COLL, assignedProviderId);
      const found = localReqs.find((r) => r.id === requestId);
      if (found) {
        await updateDoc(provDocRef, {
          missionsCompleted: ((found as any).missionsCompleted || 0) + 1,
        });
      }
    }
  } catch (err) {
    console.warn('Firestore mark completed error:', err);
  }
}

/**
 * Updates Live GPS broadcast coordinates for a provider
 */
export async function updateProviderLiveLocation(
  providerId: string,
  lat: number,
  lng: number,
  isLiveTracking: boolean
): Promise<void> {
  const localProvs = getStoredLocalData<ServiceProvider>(LOCAL_STORAGE_PROV_KEY, []);
  const updatedProvs = localProvs.map((p) =>
    p.id === providerId
      ? {
          ...p,
          isLiveTracking,
          currentLat: lat,
          currentLng: lng,
          lastLocationUpdate: Date.now(),
        }
      : p
  );
  saveStoredLocalData(LOCAL_STORAGE_PROV_KEY, updatedProvs);

  try {
    const docRef = doc(db, PROVIDERS_COLL, providerId);
    await updateDoc(docRef, {
      isLiveTracking,
      currentLat: lat,
      currentLng: lng,
      lastLocationUpdate: Date.now(),
    });
  } catch (err) {
    console.warn('Firestore live GPS update error:', err);
  }
}
