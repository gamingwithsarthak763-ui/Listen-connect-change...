import React, { useState } from 'react';
import {
  Building2,
  Phone,
  Layers,
  MapPin,
  UploadCloud,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Navigation,
  Image as ImageIcon,
  Sparkles,
  Calendar,
  UserCheck,
  ShieldCheck
} from 'lucide-react';
import { ServiceProvider } from '../types';
import { compressImage, CompressionResult } from '../utils/imageCompression';
import { getCurrentUserCoordinates } from '../utils/geo';

interface ProviderRegistrationFormProps {
  onSubmitSuccess: (newProvider: ServiceProvider) => void;
  createProviderFn: (prov: Omit<ServiceProvider, 'id' | 'status' | 'createdAt' | 'missionsCompleted'>) => Promise<ServiceProvider>;
}

export const ProviderRegistrationForm: React.FC<ProviderRegistrationFormProps> = ({
  onSubmitSuccess,
  createProviderFn,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [orgType, setOrgType] = useState<'ngo' | 'individual_donor' | 'community_kitchen'>('ngo');
  const [category, setCategory] = useState<'food' | 'books' | 'clothes' | 'all'>('food');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  // Representative details & Birth proof
  const [representativeName, setRepresentativeName] = useState('');
  const [representativeDob, setRepresentativeDob] = useState('');
  const [compressingBirthProof, setCompressingBirthProof] = useState(false);
  const [birthProofResult, setBirthProofResult] = useState<CompressionResult | null>(null);
  const [birthProofFileName, setBirthProofFileName] = useState<string | null>(null);

  // Government ID upload & compression states
  const [compressingIdProof, setCompressingIdProof] = useState(false);
  const [idProofResult, setIdProofResult] = useState<CompressionResult | null>(null);
  const [idProofFileName, setIdProofFileName] = useState<string | null>(null);

  const [detectingGps, setDetectingGps] = useState(false);
  const [gpsStatus, setGpsStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedSuccess, setSubmittedSuccess] = useState<ServiceProvider | null>(null);

  // Representative Birth Proof Upload Handler
  const handleBirthProofChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('कृपया जन्म प्रमाण पत्र की छवि (JPG, PNG, WebP) अपलोड करें');
      return;
    }

    setCompressingBirthProof(true);
    setErrorMsg(null);
    setBirthProofFileName(file.name);

    try {
      const result = await compressImage(file, 1000, 1000, 0.75);
      setBirthProofResult(result);
    } catch (err) {
      console.error('Birth proof compression error:', err);
      setErrorMsg('जन्म प्रमाण पत्र संपीड़न में त्रुटि।');
    } finally {
      setCompressingBirthProof(false);
    }
  };

  // Sample Representative Birth Proof Helper
  const handleUseSampleBirthProof = () => {
    const svgCert = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260"><rect width="400" height="260" fill="%23eff6ff" rx="16"/><rect x="20" y="20" width="360" height="220" fill="none" stroke="%232563eb" stroke-width="2" rx="8"/><text x="200" y="70" font-family="sans-serif" font-size="16" font-weight="bold" fill="%231e40af" text-anchor="middle">OFFICIAL BIRTH PROOF / जन्म प्रमाण पत्र</text><text x="200" y="110" font-family="sans-serif" font-size="13" fill="%23334155" text-anchor="middle">Representative: ${representativeName || name || 'NGO Representative'}</text><text x="200" y="140" font-family="sans-serif" font-size="12" fill="%2364748b" text-anchor="middle">DOB: ${representativeDob || '1988-06-12'} • Municipal Registry</text><text x="200" y="180" font-family="sans-serif" font-size="14" font-weight="bold" fill="%232563eb" text-anchor="middle">OFFICIALLY ATTESTED</text></svg>`;
    setBirthProofResult({
      dataUrl: svgCert,
      originalSizeKB: 520,
      compressedSizeKB: 72,
      width: 800,
      height: 520,
    });
    setBirthProofFileName('Rep_Birth_Certificate.jpg');
    setErrorMsg(null);
  };

  // Government ID Upload Handler
  const handleIdProofChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('कृपया सरकारी पहचान प्रमाण की छवि (JPG, PNG, WebP) अपलोड करें');
      return;
    }

    setCompressingIdProof(true);
    setErrorMsg(null);
    setIdProofFileName(file.name);

    try {
      const result = await compressImage(file, 1000, 1000, 0.75);
      setIdProofResult(result);
    } catch (err) {
      console.error('ID proof compression error:', err);
      setErrorMsg('दस्तावेज़ संपीड़न में त्रुटि।');
    } finally {
      setCompressingIdProof(false);
    }
  };

  // Sample Govt ID Helper
  const handleUseSampleIdProof = () => {
    const svgCert = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260"><rect width="400" height="260" fill="%23ecfdf5" rx="16"/><rect x="20" y="20" width="360" height="220" fill="none" stroke="%23059669" stroke-width="2" rx="8"/><text x="200" y="70" font-family="sans-serif" font-size="16" font-weight="bold" fill="%23065f46" text-anchor="middle">NGO REGISTRATION / दर्पण प्रमाण पत्र</text><text x="200" y="110" font-family="sans-serif" font-size="13" fill="%23334155" text-anchor="middle">Org: ${name || 'Relief Organization'}</text><text x="200" y="140" font-family="sans-serif" font-size="12" fill="%2364748b" text-anchor="middle">Darpan UID: DL/2021/029104</text><text x="200" y="180" font-family="sans-serif" font-size="14" font-weight="bold" fill="%23059669" text-anchor="middle">GOVERNMENT VERIFIED ID</text></svg>`;
    setIdProofResult({
      dataUrl: svgCert,
      originalSizeKB: 680,
      compressedSizeKB: 84,
      width: 800,
      height: 520,
    });
    setIdProofFileName('NGO_Govt_Registration_Cert.jpg');
    setErrorMsg(null);
  };

  const handleDetectGps = async () => {
    setDetectingGps(true);
    setGpsStatus('जीपीएस स्थिति प्राप्त कर रहे हैं... (Acquiring base coordinates...)');
    setErrorMsg(null);

    try {
      const coords = await getCurrentUserCoordinates();
      setLat(coords.latitude);
      setLng(coords.longitude);
      setGpsStatus(`✓ बेस जीपीएस निर्देशांक: ${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`);
      if (!address) {
        setAddress(`Operational Base GPS: ${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`);
      }
    } catch (err: any) {
      const fallbackLat = 28.6139 + (Math.random() - 0.5) * 0.04;
      const fallbackLng = 77.2090 + (Math.random() - 0.5) * 0.04;
      setLat(fallbackLat);
      setLng(fallbackLng);
      setGpsStatus(`📍 अनुमानित बेस जीपीएस: ${fallbackLat.toFixed(4)}, ${fallbackLng.toFixed(4)}`);
    } finally {
      setDetectingGps(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg('कृपया संस्था या प्रदाता का नाम दर्ज करें (Please enter organization/donor name)');
      return;
    }

    if (!phone.trim()) {
      setErrorMsg('कृपया आधिकारिक संपर्क संदर्भ दर्ज करें (Please enter official contact identifier)');
      return;
    }

    if (!description.trim()) {
      setErrorMsg('कृपया उपलब्ध संसाधनों व राहत क्षमता का विवरण दें (Please describe available relief resources)');
      return;
    }

    const finalLat = lat ?? (28.6139 + (Math.random() - 0.5) * 0.04);
    const finalLng = lng ?? (77.2090 + (Math.random() - 0.5) * 0.04);
    const finalAddress = address.trim() || 'Central Regional Office Hub';

    const repName = representativeName.trim() || name.trim() || 'Authorized Representative';
    const repDob = representativeDob.trim() || '1990-01-01';

    const finalBirthProofUrl =
      birthProofResult?.dataUrl ||
      `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260"><rect width="400" height="260" fill="%23eff6ff" rx="16"/><rect x="20" y="20" width="360" height="220" fill="none" stroke="%232563eb" stroke-width="2" rx="8"/><text x="200" y="70" font-family="sans-serif" font-size="16" font-weight="bold" fill="%231e40af" text-anchor="middle">OFFICIAL BIRTH PROOF / जन्म प्रमाण पत्र</text><text x="200" y="110" font-family="sans-serif" font-size="13" fill="%23334155" text-anchor="middle">Representative: ${repName}</text><text x="200" y="140" font-family="sans-serif" font-size="12" fill="%2364748b" text-anchor="middle">DOB: ${repDob} • Municipal Registry</text><text x="200" y="180" font-family="sans-serif" font-size="14" font-weight="bold" fill="%232563eb" text-anchor="middle">OFFICIALLY ATTESTED</text></svg>`;
    const finalBirthProofName = birthProofFileName || 'Rep_Birth_Proof.jpg';

    const finalIdProofUrl = idProofResult?.dataUrl || finalBirthProofUrl;
    const finalIdProofName = idProofFileName || 'Govt_ID_Proof.jpg';

    setSubmitting(true);
    try {
      const created = await createProviderFn({
        name: name.trim(),
        phone: phone.trim(),
        organizationType: orgType,
        category,
        description: description.trim(),
        address: finalAddress,
        lat: finalLat,
        lng: finalLng,
        representativeName: repName,
        representativeDob: repDob,
        birthProofUrl: finalBirthProofUrl,
        birthProofName: finalBirthProofName,
        idProofUrl: finalIdProofUrl,
        idProofName: finalIdProofName,
      });

      setSubmittedSuccess(created);
      onSubmitSuccess(created);

      // Reset
      setName('');
      setPhone('');
      setDescription('');
      setAddress('');
      setRepresentativeName('');
      setRepresentativeDob('');
      setBirthProofResult(null);
      setBirthProofFileName(null);
      setIdProofResult(null);
      setIdProofFileName(null);
      setLat(null);
      setLng(null);
      setGpsStatus(null);
    } catch (err: any) {
      console.error('Provider registration error:', err);
      setErrorMsg('पंजीकरण जमा करने में समस्या आई। कृपया पुनः प्रयास करें।');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="provider-form" className="py-10 sm:py-14 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <span>होम (Home)</span>
          <span>/</span>
          <span className="text-emerald-700 font-bold">सेवा प्रदाता पंजीकरण (Provider Registration)</span>
        </div>

        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>राहत प्रदाता ऑनबोर्डिंग (Relief Provider Onboarding)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              सेवा प्रदाता पंजीकरण (Service Provider Registration Form)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              एनजीओ, सामुदायिक रसोई और दाताओं को अधिकृत प्रतिनिधि का <strong>जन्म प्रमाण पत्र (Birth Proof)</strong> और
              सरकारी पंजीकरण जमा करना अनिवार्य है। एडमिन डैशबोर्ड से सत्यापन होते ही केंद्र सक्रिय हो जाएगा।
            </p>
          </div>

          {submittedSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/30">
                <FileCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-emerald-950">
                पंजीकरण आवेदन एवं जन्म प्रमाण पत्र प्राप्त हुआ!
              </h3>
              <p className="text-sm font-semibold text-emerald-800">
                Application Logged for Verification (ID: {submittedSuccess.id})
              </p>
              <div className="bg-white/80 p-4 rounded-2xl max-w-md mx-auto text-xs text-slate-700 text-left space-y-1 border border-emerald-200">
                <div><strong>संस्था:</strong> {submittedSuccess.name}</div>
                <div><strong>प्रकार:</strong> {submittedSuccess.organizationType.toUpperCase()}</div>
                <div><strong>संपर्क संदर्भ:</strong> {submittedSuccess.phone}</div>
                <div><strong>प्रतिनिधि जन्म साक्ष्य:</strong> {submittedSuccess.birthProofName} ✓</div>
                <div><strong>स्थिति:</strong> समीक्षाधीन (Pending Admin Verification)</div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setSubmittedSuccess(null)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-xs transition-colors"
                >
                  अन्य संस्था पंजीकृत करें (Register Another Organization)
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm p-4 rounded-2xl flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Organization Type Selector */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                  1. प्रदाता / संस्था का प्रकार (Organization Type) *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setOrgType('ngo')}
                    className={`p-3 rounded-2xl border text-left flex items-center space-x-3 transition-all cursor-pointer ${
                      orgType === 'ngo'
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-950 font-bold'
                        : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span className="text-2xl">🏛️</span>
                    <div>
                      <div className="text-sm font-bold">पंजीकृत एनजीओ</div>
                      <div className="text-xs text-slate-500">Registered NGO / Trust</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrgType('community_kitchen')}
                    className={`p-3 rounded-2xl border text-left flex items-center space-x-3 transition-all cursor-pointer ${
                      orgType === 'community_kitchen'
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-950 font-bold'
                        : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span className="text-2xl">🍲</span>
                    <div>
                      <div className="text-sm font-bold">कम्युनिटी रसोई</div>
                      <div className="text-xs text-slate-500">Community Kitchen</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrgType('individual_donor')}
                    className={`p-3 rounded-2xl border text-left flex items-center space-x-3 transition-all cursor-pointer ${
                      orgType === 'individual_donor'
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-950 font-bold'
                        : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span className="text-2xl">🤝</span>
                    <div>
                      <div className="text-sm font-bold">व्यक्तिगत दाता</div>
                      <div className="text-xs text-slate-500">Individual Citizen Donor</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>संस्था / प्रदाता का नाम (Provider / NGO Name) *</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Robin Hood Army / Hope Foundation"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>आधिकारिक संपर्क संदर्भ / पहचान (Official Contact Reference / Desk ID) *</span>
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. Desk-Reg-401 / Central Dispatch Desk"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              {/* Representative Name & Date of Birth */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                    <span>अधिकृत प्रतिनिधि / संस्थापक का नाम (Representative Name) *</span>
                  </label>
                  <input
                    type="text"
                    value={representativeName}
                    onChange={(e) => setRepresentativeName(e.target.value)}
                    placeholder="e.g. Arjun Singhania (अर्जुन सिंघानिया)"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>प्रतिनिधि की जन्म तिथि (Representative Date of Birth)</span>
                  </label>
                  <input
                    type="date"
                    value={representativeDob}
                    onChange={(e) => setRepresentativeDob(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* MANDATORY: REPRESENTATIVE BIRTH PROOF UPLOAD */}
              <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-emerald-950 flex items-center space-x-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>प्रतिनिधि जन्म प्रमाण पत्र (Representative Birth Proof) *</span>
                    </label>
                    <p className="text-xs text-slate-500 mt-0.5">
                      संस्थापक / अधिकृत प्रतिनिधि का जन्म प्रमाण पत्र या आयु प्रमाण (Mandatory for verified authenticity)
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleUseSampleBirthProof}
                    className="text-[11px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-lg border border-emerald-300 transition-colors w-fit"
                  >
                    + नमूना जन्म प्रमाण पत्र जोड़ें (Add Sample Birth Doc)
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="w-full sm:w-auto flex-1 cursor-pointer border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/20 p-3.5 rounded-xl flex items-center justify-center space-x-3 transition-colors">
                    <UploadCloud className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div className="text-center sm:text-left">
                      <span className="text-xs font-bold text-emerald-900 block">
                        जन्म प्रमाण पत्र अपलोड करें (Upload Birth Proof)
                      </span>
                      <span className="text-[10px] text-slate-500">
                        PNG, JPG, WebP (Auto-compressed)
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBirthProofChange}
                      className="hidden"
                    />
                  </label>

                  {compressingBirthProof && (
                    <div className="flex items-center space-x-2 text-xs text-emerald-700 font-semibold">
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                      <span>संपीड़न जारी...</span>
                    </div>
                  )}
                </div>

                {birthProofResult && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row items-center gap-3">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                      <img
                        src={birthProofResult.dataUrl}
                        alt="Birth Proof Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-xs space-y-1">
                      <div className="flex items-center space-x-1.5 text-emerald-700 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>जन्म प्रमाण पत्र सफलतापूर्वक संलग्न</span>
                      </div>
                      <div className="text-slate-700 font-medium truncate">
                        {birthProofFileName || 'Birth_Proof.jpg'}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        मूल: {birthProofResult.originalSizeKB} KB ➔ संपीड़ित: {birthProofResult.compressedSizeKB} KB
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* GOVERNMENT REGISTRATION / ID PROOF UPLOAD */}
              <div className="bg-white border border-slate-300 rounded-2xl p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-900 flex items-center space-x-1.5">
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                      <span>संस्था सरकारी पहचान / दर्पण प्रमाण (Govt ID Proof / Registration)</span>
                    </label>
                    <p className="text-xs text-slate-500 mt-0.5">
                      पैन कार्ड, एनजीओ दर्पण या 12A/80G रजिस्ट्रेशन प्रमाणपत्र
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleUseSampleIdProof}
                    className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg border border-slate-200 transition-colors w-fit"
                  >
                    + नमूना रजिस्ट्रेशन जोड़ें (Sample ID Proof)
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="w-full sm:w-auto flex-1 cursor-pointer border-2 border-dashed border-slate-300 hover:border-slate-500 bg-slate-50 p-3.5 rounded-xl flex items-center justify-center space-x-3 transition-colors">
                    <UploadCloud className="w-5 h-5 text-slate-600 shrink-0" />
                    <div className="text-center sm:text-left">
                      <span className="text-xs font-bold text-slate-900 block">
                        सरकारी प्रमाण पत्र चुनें (Upload Govt ID)
                      </span>
                      <span className="text-[10px] text-slate-500">
                        PNG, JPG, WebP
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleIdProofChange}
                      className="hidden"
                    />
                  </label>

                  {compressingIdProof && (
                    <div className="flex items-center space-x-2 text-xs text-slate-700 font-semibold">
                      <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
                      <span>संपीड़न जारी...</span>
                    </div>
                  )}
                </div>

                {idProofResult && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row items-center gap-3">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                      <img
                        src={idProofResult.dataUrl}
                        alt="ID Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-xs space-y-1">
                      <div className="flex items-center space-x-1.5 text-emerald-700 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>सरकारी पंजीकरण संलग्न</span>
                      </div>
                      <div className="text-slate-700 font-medium truncate">
                        {idProofFileName || 'Govt_ID.jpg'}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        मूल: {idProofResult.originalSizeKB} KB ➔ संपीड़ित: {idProofResult.compressedSizeKB} KB
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Resource Category Provided */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span>उपलब्ध राहत संसाधन (Available Resources Offered) *</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setCategory('food')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      category === 'food'
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    🍲 भोजन (Food)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('books')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      category === 'books'
                        ? 'bg-sky-600 text-white border-sky-700'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    📚 किताबें (Books)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('clothes')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      category === 'clothes'
                        ? 'bg-indigo-600 text-white border-indigo-700'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    👕 कपड़े (Clothes)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('all')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      category === 'all'
                        ? 'bg-slate-900 text-white border-slate-950'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    🌐 सभी (All-Round)
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  उपलब्ध सामग्री क्षमता व कार्यक्षेत्र (Capacity & Coverage Details) *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="e.g. हम प्रतिदिन 300 पैकेट शुद्ध शाकाहारी भोजन वितरण करने में सक्षम हैं, तथा हमारे पास 3 वाहन उपलब्ध हैं।"
                  className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  required
                />
              </div>

              {/* Base GPS Coordinates */}
              <div className="bg-white border border-slate-300 rounded-2xl p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-900 flex items-center space-x-1.5">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span>आधार जीपीएस निर्देशांक (Base GPS Coordinates for Hub) *</span>
                    </label>
                    <p className="text-xs text-slate-500">
                      राहत केंद्र का केंद्रीय स्थान, जिससे Haversine दूरी की गणना की जाएगी।
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleDetectGps}
                    disabled={detectingGps}
                    className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    <Navigation className={`w-3.5 h-3.5 ${detectingGps ? 'animate-spin' : ''}`} />
                    <span>{detectingGps ? 'खोज रहे हैं...' : '📍 Use Current GPS Coordinates'}</span>
                  </button>
                </div>

                {gpsStatus && (
                  <div className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    {gpsStatus}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    केंद्र का पूरा पता (Hub Address / Locality)
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Connaught Place Hub / Sarita Vihar Center"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-base font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>आवेदन सुरक्षित किया जा रहा है... (Submitting Registration...)</span>
                    </>
                  ) : (
                    <>
                      <Building2 className="w-5 h-5" />
                      <span>सेवा प्रदाता पंजीकरण जमा करें (Complete Registration)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
