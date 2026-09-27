export type CategoryType = 'all' | 'food' | 'books' | 'clothes';

export type AppPage = 'home' | 'map' | 'request' | 'provider' | 'directory' | 'gallery' | 'faq' | 'admin';

export interface AssistanceRequest {
  id: string;
  name: string;
  phone: string;
  category: 'food' | 'books' | 'clothes';
  description: string;
  address: string;
  lat: number;
  lng: number;
  status: 'pending' | 'in_progress' | 'completed';
  urgency: 'high' | 'medium' | 'normal';
  createdAt: number; // timestamp ms
  completedAt?: number;
  assignedProviderId?: string;
  assignedProviderName?: string;
  birthProofUrl?: string; // base64 compressed data URL of birth proof document
  birthProofName?: string;
  dateOfBirth?: string; // YYYY-MM-DD
}

export interface ServiceProvider {
  id: string;
  name: string;
  phone: string;
  organizationType: 'ngo' | 'individual_donor' | 'community_kitchen';
  category: 'food' | 'books' | 'clothes' | 'all';
  description: string;
  address: string;
  lat: number;
  lng: number;
  idProofUrl?: string; // base64 compressed data URL of Govt ID / Registration
  idProofName?: string;
  birthProofUrl?: string; // base64 compressed data URL of Representative's Birth Proof
  birthProofName?: string;
  representativeName?: string;
  representativeDob?: string;
  status: 'pending' | 'approved' | 'rejected';
  isLiveTracking?: boolean;
  currentLat?: number;
  currentLng?: number;
  lastLocationUpdate?: number;
  createdAt: number;
  verifiedAt?: number;
  missionsCompleted?: number;
}

export interface LiveStats {
  totalRequests: number;
  verifiedProviders: number;
  fulfilledMissions: number;
}
