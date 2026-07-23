import { useState } from "react";
import {
  Bell, ChevronRight, Leaf, MapPin, Cloud, AlertTriangle,
  CheckCircle, Camera, Mic, BarChart2, ClipboardList, User,
  Home, History, Shield, LogOut, ArrowLeft, Calendar,
  Droplets, Thermometer, Wind, Eye, TrendingUp, TrendingDown,
  Star, Phone, FileText, Settings, ChevronDown, X, Search,
  Activity, Map, Users, Package, Beaker, Zap, Clock, Award
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen =
  | "splash" | "language" | "role"
  // Farmer
  | "f-dashboard" | "f-location" | "f-crop" | "f-season"
  | "f-growth" | "f-problem" | "f-voice" | "f-photo"
  | "f-ai-analysis" | "f-pesticide" | "f-dosage" | "f-risk"
  | "f-weather" | "f-alert" | "f-harvest" | "f-history"
  | "f-advisory" | "f-notifications" | "f-profile"
  // Inspector
  | "i-login" | "i-dashboard" | "i-heatmap" | "i-high-risk"
  | "i-priority" | "i-district-detail" | "i-lab-report"
  | "i-analytics" | "i-high-alert" | "i-offenders"
  | "i-planner" | "i-reports" | "i-profile";

// ─── Shared helpers ───────────────────────────────────────────────────────────
const GovBadge = () => (
  <div className="flex items-center gap-2 justify-center py-1">
    <div className="w-7 h-7 rounded-full bg-[#FF9933] flex items-center justify-center shadow">
      <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>
    </div>
    <span className="text-xs text-[#1b5e20] font-semibold tracking-wide">भारत सरकार • कृषि मंत्रालय</span>
    <div className="w-7 h-7 rounded-full bg-[#138808] flex items-center justify-center shadow">
      <Leaf className="w-4 h-4 text-white" />
    </div>
  </div>
);

const AppHeader = ({
  title, onBack, onNotif, onHome, blue
}: {
  title: string; onBack?: () => void; onNotif?: () => void; onHome?: () => void; blue?: boolean
}) => (
  <div className={`${blue ? "bg-[#1565c0]" : "bg-[#2e7d32]"} text-white px-4 py-3 flex items-center gap-3 shadow-md`}>
    {onBack && (
      <button onClick={onBack} className="p-1 rounded-full hover:bg-white/20 transition">
        <ArrowLeft className="w-6 h-6" />
      </button>
    )}
    <div className="flex-1">
      <p className="text-xs text-green-200">सुरक्षित फसल AI</p>
      <h1 className="text-lg font-bold leading-tight">{title}</h1>
    </div>
    {onHome && (
      <button onClick={onHome} className="p-2 rounded-full hover:bg-white/20 transition" title="होम">
        <Home className="w-5 h-5" />
      </button>
    )}
    {onNotif && (
      <button onClick={onNotif} className="relative p-2 rounded-full hover:bg-white/20 transition">
        <Bell className="w-6 h-6" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full" />
      </button>
    )}
  </div>
);

const BigBtn = ({
  label, icon, onClick, color = "bg-[#2e7d32]", textColor = "text-white", sub
}: { label: string; icon?: React.ReactNode; onClick: () => void; color?: string; textColor?: string; sub?: string }) => (
  <button
    onClick={onClick}
    className={`w-full ${color} ${textColor} rounded-2xl px-5 py-4 flex items-center gap-4 shadow-md active:scale-95 transition-transform text-left`}
  >
    {icon && <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">{icon}</div>}
    <div className="flex-1">
      <div className="text-lg font-bold">{label}</div>
      {sub && <div className="text-sm opacity-80 mt-0.5">{sub}</div>}
    </div>
    <ChevronRight className="w-5 h-5 opacity-70 flex-shrink-0" />
  </button>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-[#e8f5e9] p-4 ${className}`}>{children}</div>
);

const StatusPill = ({ label, color }: { label: string; color: string }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-bold ${color}`}>{label}</span>
);

const FarmerNav = ({ active, go }: { active: string; go: (s: Screen) => void }) => {
  const tabs = [
    { id: "f-dashboard", icon: <Home className="w-5 h-5" />, label: "होम" },
    { id: "f-history", icon: <History className="w-5 h-5" />, label: "इतिहास" },
    { id: "f-advisory", icon: <FileText className="w-5 h-5" />, label: "सलाह" },
    { id: "f-notifications", icon: <Bell className="w-5 h-5" />, label: "सूचना" },
    { id: "f-profile", icon: <User className="w-5 h-5" />, label: "प्रोफाइल" },
  ] as const;
  return (
    <div className="bg-white border-t border-[#e8f5e9] flex">
      {tabs.map(t => (
        <button key={t.id} onClick={() => go(t.id as Screen)}
          className={`flex-1 py-2 flex flex-col items-center gap-0.5 transition ${active === t.id ? "text-[#2e7d32]" : "text-gray-400"}`}>
          {t.icon}
          <span className="text-[10px] font-semibold">{t.label}</span>
        </button>
      ))}
    </div>
  );
};

const InspectorNav = ({ active, go }: { active: string; go: (s: Screen) => void }) => {
  const tabs = [
    { id: "i-dashboard", icon: <Home className="w-5 h-5" />, label: "होम" },
    { id: "i-heatmap", icon: <Map className="w-5 h-5" />, label: "हीटमैप" },
    { id: "i-analytics", icon: <BarChart2 className="w-5 h-5" />, label: "विश्लेषण" },
    { id: "i-planner", icon: <Calendar className="w-5 h-5" />, label: "प्लानर" },
    { id: "i-profile", icon: <User className="w-5 h-5" />, label: "प्रोफाइल" },
  ] as const;
  return (
    <div className="bg-white border-t border-[#e8f5e9] flex">
      {tabs.map(t => (
        <button key={t.id} onClick={() => go(t.id as Screen)}
          className={`flex-1 py-2 flex flex-col items-center gap-0.5 transition ${active === t.id ? "text-[#1565c0]" : "text-gray-400"}`}>
          {t.icon}
          <span className="text-[10px] font-semibold">{t.label}</span>
        </button>
      ))}
    </div>
  );
};

// ─── SCREENS ──────────────────────────────────────────────────────────────────

function SplashScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-between bg-gradient-to-b from-[#1b5e20] to-[#2e7d32] px-6 py-12">
      <div />
      <div className="flex flex-col items-center gap-6">
        <div className="w-28 h-28 rounded-full bg-white shadow-2xl flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-[#e8f5e9] flex items-center justify-center">
            <Leaf className="w-12 h-12 text-[#2e7d32]" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">सुरक्षित फसल</h1>
          <p className="text-2xl font-bold text-[#a5d6a7] mt-1">AI</p>
          <p className="text-sm text-green-200 mt-3 font-medium">बिल्ड फॉर भारत 2030</p>
        </div>
        <div className="bg-white/10 rounded-2xl px-6 py-3 text-center">
          <p className="text-white text-sm font-medium">किसान की रक्षा • फसल की सुरक्षा</p>
          <p className="text-green-200 text-xs mt-1">Powered by AI • भारत सरकार द्वारा</p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-4">
        <button onClick={() => go("language")}
          className="w-full bg-white text-[#2e7d32] rounded-2xl py-4 text-xl font-extrabold shadow-lg active:scale-95 transition">
          शुरू करें →
        </button>
        <GovBadge />
      </div>
    </div>
  );
}

function LanguageScreen({ go }: { go: (s: Screen) => void }) {
  const langs = [
    { code: "hi", name: "हिंदी", sub: "Hindi", flag: "🇮🇳" },
    { code: "en", name: "English", sub: "अंग्रेज़ी", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", sub: "Marathi", flag: "🇮🇳" },
    { code: "gu", name: "ગુજરાતી", sub: "Gujarati", flag: "🇮🇳" },
    { code: "pa", name: "ਪੰਜਾਬੀ", sub: "Punjabi", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు", sub: "Telugu", flag: "🇮🇳" },
    { code: "kn", name: "ಕನ್ನಡ", sub: "Kannada", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", sub: "Tamil", flag: "🇮🇳" },
  ];
  const [sel, setSel] = useState("hi");
  return (
    <div className="h-full flex flex-col bg-[#f1f8f1]">
      <div className="bg-[#2e7d32] px-6 pt-8 pb-6">
        <GovBadge />
        <h1 className="text-2xl font-extrabold text-white mt-4 text-center">भाषा चुनें</h1>
        <p className="text-green-200 text-sm text-center mt-1">Select Your Language</p>
      </div>
      <div className="flex-1 overflow-auto px-4 py-4 grid grid-cols-2 gap-3 content-start">
        {langs.map(l => (
          <button key={l.code} onClick={() => setSel(l.code)}
            className={`rounded-2xl p-4 flex flex-col items-center gap-2 border-2 transition shadow-sm ${sel === l.code ? "border-[#2e7d32] bg-[#e8f5e9]" : "border-transparent bg-white"}`}>
            <span className="text-3xl">{l.flag}</span>
            <span className="text-lg font-bold text-[#1a2e1a]">{l.name}</span>
            <span className="text-xs text-gray-500">{l.sub}</span>
            {sel === l.code && <CheckCircle className="w-5 h-5 text-[#2e7d32]" />}
          </button>
        ))}
      </div>
      <div className="px-4 pb-6">
        <button onClick={() => go("role")}
          className="w-full bg-[#2e7d32] text-white rounded-2xl py-4 text-xl font-extrabold shadow active:scale-95 transition">
          आगे बढ़ें →
        </button>
      </div>
    </div>
  );
}

function RoleScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="h-full flex flex-col bg-[#f1f8f1]">
      <div className="bg-[#2e7d32] px-6 pt-8 pb-8 text-center">
        <GovBadge />
        <h1 className="text-2xl font-extrabold text-white mt-4">आप कौन हैं?</h1>
        <p className="text-green-200 text-sm mt-1">अपनी भूमिका चुनें</p>
      </div>
      <div className="flex-1 px-4 py-8 flex flex-col gap-5">
        <button onClick={() => go("f-dashboard")}
          className="bg-white rounded-3xl p-6 shadow-md border-2 border-[#e8f5e9] active:scale-95 transition flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[#e8f5e9] flex items-center justify-center">
            <span className="text-5xl">👨‍🌾</span>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-[#1b5e20]">किसान</h2>
            <p className="text-gray-500 text-sm mt-1">फसल सुरक्षा सलाह पाएं</p>
          </div>
          <div className="bg-[#2e7d32] text-white px-8 py-3 rounded-xl font-bold text-lg w-full text-center">
            किसान लॉगिन →
          </div>
        </button>
        <button onClick={() => go("i-login")}
          className="bg-white rounded-3xl p-6 shadow-md border-2 border-[#e3f2fd] active:scale-95 transition flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[#e3f2fd] flex items-center justify-center">
            <span className="text-5xl">🧑‍💼</span>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-[#1565c0]">निरीक्षक</h2>
            <p className="text-gray-500 text-sm mt-1">जिला निरीक्षण प्रबंधन</p>
          </div>
          <div className="bg-[#1565c0] text-white px-8 py-3 rounded-xl font-bold text-lg w-full text-center">
            निरीक्षक लॉगिन →
          </div>
        </button>
      </div>
      <div className="px-4 pb-4"><GovBadge /></div>
    </div>
  );
}

// ══════════════════════════════════════════
//  FARMER FLOW
// ══════════════════════════════════════════

function FarmerDashboard({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="h-full flex flex-col bg-[#f1f8f1]">
      <div className="bg-[#2e7d32] px-4 pt-4 pb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-green-200 text-sm">नमस्ते 🙏</p>
            <h1 className="text-xl font-extrabold text-white">रामलाल पटेल</h1>
            <p className="text-green-300 text-xs">ग्राम: रामपुर, जि. बुलंदशहर</p>
          </div>
          <button onClick={() => go("f-notifications")} className="relative p-2">
            <Bell className="w-7 h-7 text-white" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-400 rounded-full border border-white text-[8px] text-white flex items-center justify-center">3</span>
          </button>
        </div>
        <div className="bg-white/15 rounded-2xl p-3 flex gap-3">
          <div className="flex-1 text-center"><p className="text-3xl font-extrabold text-white">32°C</p><p className="text-green-200 text-xs">तापमान</p></div>
          <div className="w-px bg-white/30" />
          <div className="flex-1 text-center"><p className="text-3xl font-extrabold text-white">72%</p><p className="text-green-200 text-xs">नमी</p></div>
          <div className="w-px bg-white/30" />
          <div className="flex-1 text-center"><p className="text-3xl font-extrabold text-white">☁️</p><p className="text-green-200 text-xs">बादल</p></div>
        </div>
      </div>
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-3">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-3 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
          <div>
            <p className="font-bold text-red-700 text-sm">उच्च चेतावनी</p>
            <p className="text-red-600 text-xs">आपके क्षेत्र में टिड्डी का प्रकोप संभव</p>
          </div>
          <button onClick={() => go("f-alert")} className="ml-auto text-red-500 text-xs font-bold">देखें →</button>
        </div>
        <h2 className="text-[#1b5e20] font-extrabold text-base">क्या करना चाहते हैं?</h2>
        <BigBtn label="फसल समस्या बताएं" icon={<Leaf className="w-7 h-7 text-white" />}
          onClick={() => go("f-location")} sub="AI से तुरंत सलाह पाएं" />
        <BigBtn label="मौसम सलाह देखें" icon={<Cloud className="w-7 h-7 text-white" />}
          onClick={() => go("f-weather")} color="bg-[#0288d1]" sub="आज और कल का पूर्वानुमान" />
        <BigBtn label="फसल कैलेंडर" icon={<Calendar className="w-7 h-7 text-white" />}
          onClick={() => go("f-harvest")} color="bg-[#e65100]" sub="कटाई की याद दिलाएं" />
        <div className="grid grid-cols-2 gap-3">
          <Card className="text-center">
            <p className="text-3xl font-extrabold text-[#2e7d32]">4</p>
            <p className="text-xs text-gray-500 mt-1">सक्रिय फसलें</p>
          </Card>
          <Card className="text-center">
            <p className="text-3xl font-extrabold text-[#e65100]">2</p>
            <p className="text-xs text-gray-500 mt-1">लंबित सलाह</p>
          </Card>
        </div>
        <Card>
          <p className="text-sm font-bold text-[#1b5e20] mb-2">सरकारी योजना</p>
          <div className="bg-[#e8f5e9] rounded-xl p-3">
            <p className="text-sm font-bold text-[#2e7d32]">PM-KISAN अगली किस्त</p>
            <p className="text-xs text-gray-600 mt-1">₹2000 • 15 अगस्त 2025 को</p>
          </div>
        </Card>
      </div>
      <FarmerNav active="f-dashboard" go={go} />
    </div>
  );
}

function LocationScreen({ go }: { go: (s: Screen) => void }) {
  const [step, setStep] = useState(0);
  const [vals, setVals] = useState({ state: "", district: "", tehsil: "", village: "" });
  const states = ["उत्तर प्रदेश", "मध्य प्रदेश", "राजस्थान", "पंजाब", "हरियाणा", "बिहार", "महाराष्ट्र", "गुजरात"];
  const districts = ["बुलंदशहर", "आगरा", "मथुरा", "अलीगढ़", "बरेली", "मेरठ"];
  const tehsils = ["स्याना", "खुर्जा", "शिकारपुर", "अनूपशहर", "गुलावठी"];
  const villages = ["रामपुर", "शेखपुर", "नगला भट", "मोहनपुर", "सिरसा", "जटपुर"];
  const steps = [
    { key: "state", label: "राज्य चुनें", options: states },
    { key: "district", label: "जिला चुनें", options: districts },
    { key: "tehsil", label: "तहसील चुनें", options: tehsils },
    { key: "village", label: "गाँव चुनें", options: villages },
  ];
  const cur = steps[step];
  const select = (val: string) => {
    setVals(v => ({ ...v, [cur.key]: val }));
    if (step < 3) setStep(s => s + 1);
    else go("f-crop");
  };
  return (
    <div className="h-full flex flex-col bg-[#f1f8f1]">
      <AppHeader title={cur.label} onBack={step === 0 ? () => go("f-dashboard") : () => setStep(s => s - 1)} onHome={() => go("f-dashboard")} />
      <div className="px-4 py-3">
        <div className="flex gap-2">
          {steps.map((s, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i <= step ? "bg-[#2e7d32]" : "bg-gray-200"}`} />
          ))}
        </div>
        <div className="flex gap-2 mt-2 flex-wrap">
          {vals.state && <StatusPill label={vals.state} color="bg-[#e8f5e9] text-[#2e7d32]" />}
          {vals.district && <StatusPill label={vals.district} color="bg-[#e8f5e9] text-[#2e7d32]" />}
          {vals.tehsil && <StatusPill label={vals.tehsil} color="bg-[#e8f5e9] text-[#2e7d32]" />}
        </div>
      </div>
      <div className="flex-1 overflow-auto px-4 flex flex-col gap-3 pb-4">
        <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-[#e8f5e9] shadow-sm">
          <Search className="w-5 h-5 text-gray-400" />
          <input placeholder={`खोजें...`} className="flex-1 outline-none text-base bg-transparent text-[#1a2e1a]" />
        </div>
        {cur.options.map(opt => (
          <button key={opt} onClick={() => select(opt)}
            className="w-full bg-white rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm border border-[#e8f5e9] active:bg-[#e8f5e9] transition">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#2e7d32]" />
              <span className="text-lg font-bold text-[#1a2e1a]">{opt}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
}

function CropScreen({ go }: { go: (s: Screen) => void }) {
  const crops = [
    { name: "गेहूं", emoji: "🌾", season: "रबी" },
    { name: "धान", emoji: "🌿", season: "खरीफ" },
    { name: "सरसों", emoji: "🌻", season: "रबी" },
    { name: "गन्ना", emoji: "🎋", season: "खरीफ" },
    { name: "मक्का", emoji: "🌽", season: "खरीफ" },
    { name: "आलू", emoji: "🥔", season: "रबी" },
    { name: "प्याज", emoji: "🧅", season: "रबी" },
    { name: "टमाटर", emoji: "🍅", season: "जायद" },
    { name: "मूंगफली", emoji: "🥜", season: "खरीफ" },
    { name: "कपास", emoji: "☁️", season: "खरीफ" },
  ];
  const [sel, setSel] = useState("");
  return (
    <div className="h-full flex flex-col bg-[#f1f8f1]">
      <AppHeader title="फसल चुनें" onBack={() => go("f-location")} onHome={() => go("f-dashboard")} />
      <div className="flex-1 overflow-auto px-4 py-4">
        <p className="text-sm text-gray-500 mb-3">आप किस फसल में समस्या है?</p>
        <div className="grid grid-cols-2 gap-3">
          {crops.map(c => (
            <button key={c.name} onClick={() => { setSel(c.name); setTimeout(() => go("f-season"), 200); }}
              className={`bg-white rounded-2xl p-4 flex flex-col items-center gap-2 border-2 shadow-sm active:scale-95 transition ${sel === c.name ? "border-[#2e7d32]" : "border-transparent"}`}>
              <span className="text-4xl">{c.emoji}</span>
              <span className="font-extrabold text-[#1a2e1a] text-base">{c.name}</span>
              <StatusPill label={c.season} color="bg-[#e8f5e9] text-[#2e7d32]" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SeasonScreen({ go }: { go: (s: Screen) => void }) {
  const seasons = [
    { name: "खरीफ", sub: "जून – नवम्बर", emoji: "☔", desc: "धान, मक्का, कपास, मूंगफली" },
    { name: "रबी", sub: "नवम्बर – अप्रैल", emoji: "❄️", desc: "गेहूं, सरसों, आलू, चना" },
    { name: "जायद", sub: "अप्रैल – जून", emoji: "☀️", desc: "तरबूज, खरबूज, ककड़ी" },
  ];
  return (
    <div className="h-full flex flex-col bg-[#f1f8f1]">
      <AppHeader title="मौसम चुनें" onBack={() => go("f-crop")} onHome={() => go("f-dashboard")} />
      <div className="flex-1 px-4 py-6 flex flex-col gap-4">
        <p className="text-sm text-gray-500">फसल का मौसम बताएं</p>
        {seasons.map(s => (
          <button key={s.name} onClick={() => go("f-growth")}
            className="bg-white rounded-3xl p-5 shadow-sm border border-[#e8f5e9] text-left active:scale-95 transition flex gap-4 items-center">
            <span className="text-5xl">{s.emoji}</span>
            <div className="flex-1">
              <h2 className="text-2xl font-extrabold text-[#1b5e20]">{s.name}</h2>
              <p className="text-sm text-[#2e7d32] font-semibold">{s.sub}</p>
              <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
}

function GrowthScreen({ go }: { go: (s: Screen) => void }) {
  const stages = [
    { name: "बीज अंकुरण", emoji: "🌱", days: "0–15 दिन" },
    { name: "पौध अवस्था", emoji: "🌿", days: "15–30 दिन" },
    { name: "कल्ले फूटना", emoji: "🌾", days: "30–60 दिन" },
    { name: "फूल आना", emoji: "🌸", days: "60–80 दिन" },
    { name: "दाना भरना", emoji: "🌻", days: "80–100 दिन" },
    { name: "पकाव अवस्था", emoji: "🟡", days: "100–120 दिन" },
  ];
  return (
    <div className="h-full flex flex-col bg-[#f1f8f1]">
      <AppHeader title="फसल की अवस्था" onBack={() => go("f-season")} onHome={() => go("f-dashboard")} />
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-3">
        <p className="text-sm text-gray-500">अभी फसल किस अवस्था में है?</p>
        {stages.map(s => (
          <button key={s.name} onClick={() => go("f-problem")}
            className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm border border-[#e8f5e9] active:scale-95 transition">
            <span className="text-4xl">{s.emoji}</span>
            <div className="flex-1 text-left">
              <p className="text-lg font-bold text-[#1a2e1a]">{s.name}</p>
              <p className="text-xs text-gray-500">{s.days}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
}

function ProblemScreen({ go }: { go: (s: Screen) => void }) {
  const problems = [
    { name: "पत्ती पीली पड़ना", emoji: "🍂", type: "रोग" },
    { name: "कीट / इल्ली", emoji: "🐛", type: "कीट" },
    { name: "जड़ सड़न", emoji: "🦠", type: "रोग" },
    { name: "फंगस / फफूंद", emoji: "🍄", type: "कवक" },
    { name: "पानी की कमी", emoji: "💧", type: "पोषण" },
    { name: "फल / दाना खराब", emoji: "🔴", type: "रोग" },
    { name: "टहनी टूटना", emoji: "🌿", type: "अन्य" },
    { name: "कुछ और", emoji: "❓", type: "अन्य" },
  ];
  const [sel, setSel] = useState<string[]>([]);
  const toggle = (n: string) => setSel(s => s.includes(n) ? s.filter(x => x !== n) : [...s, n]);
  return (
    <div className="h-full flex flex-col bg-[#f1f8f1]">
      <AppHeader title="समस्या बताएं" onBack={() => go("f-growth")} onHome={() => go("f-dashboard")} />
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-3">
        <p className="text-sm text-gray-500">एक या अधिक समस्या चुनें</p>
        <div className="grid grid-cols-2 gap-3">
          {problems.map(p => (
            <button key={p.name} onClick={() => toggle(p.name)}
              className={`rounded-2xl p-4 flex flex-col items-center gap-2 border-2 transition shadow-sm ${sel.includes(p.name) ? "border-[#2e7d32] bg-[#e8f5e9]" : "bg-white border-transparent"}`}>
              <span className="text-4xl">{p.emoji}</span>
              <span className="font-bold text-[#1a2e1a] text-sm text-center">{p.name}</span>
              <StatusPill label={p.type} color="bg-gray-100 text-gray-600" />
              {sel.includes(p.name) && <CheckCircle className="w-5 h-5 text-[#2e7d32]" />}
            </button>
          ))}
        </div>
      </div>
      <div className="px-4 pb-4 flex gap-3">
        <button onClick={() => go("f-voice")}
          className="flex-1 border-2 border-[#2e7d32] text-[#2e7d32] rounded-2xl py-4 font-bold flex items-center justify-center gap-2">
          <Mic className="w-5 h-5" /> आवाज़ से
        </button>
        <button onClick={() => go("f-voice")} disabled={sel.length === 0}
          className={`flex-1 rounded-2xl py-4 font-bold text-white transition ${sel.length > 0 ? "bg-[#2e7d32]" : "bg-gray-300"}`}>
          आगे बढ़ें →
        </button>
      </div>
    </div>
  );
}

function VoiceScreen({ go }: { go: (s: Screen) => void }) {
  const [recording, setRecording] = useState(false);
  const [done, setDone] = useState(false);
  const start = () => { setRecording(true); setTimeout(() => { setRecording(false); setDone(true); }, 3000); };
  return (
    <div className="h-full flex flex-col bg-[#f1f8f1]">
      <AppHeader title="आवाज़ से बताएं" onBack={() => go("f-problem")} onHome={() => go("f-dashboard")} />
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
        <div className="text-center">
          <p className="text-lg font-bold text-[#1b5e20]">माइक्रोफोन दबाकर बोलें</p>
          <p className="text-sm text-gray-500 mt-1">हिंदी में अपनी फसल की समस्या बताएं</p>
        </div>
        <button onClick={start} disabled={done}
          className={`w-36 h-36 rounded-full flex items-center justify-center shadow-2xl transition-all ${recording ? "bg-red-500 scale-110" : done ? "bg-[#2e7d32]" : "bg-[#2e7d32]"}`}>
          {done ? <CheckCircle className="w-16 h-16 text-white" /> : <Mic className={`w-16 h-16 text-white ${recording ? "animate-pulse" : ""}`} />}
        </button>
        {recording && (
          <div className="flex gap-1 items-end h-10">
            {[4, 7, 5, 9, 6, 8, 4, 7, 5, 9, 6].map((h, i) => (
              <div key={i} style={{ height: `${h * 4}px` }} className="w-2 bg-[#2e7d32] rounded-full animate-pulse" />
            ))}
          </div>
        )}
        {done && (
          <Card className="w-full">
            <p className="text-xs text-gray-500 mb-1">आपने कहा:</p>
            <p className="text-[#1b5e20] font-bold">"मेरी गेहूं की फसल की पत्तियां पीली पड़ रही हैं और कुछ पत्तियों पर धब्बे भी हैं।"</p>
          </Card>
        )}
        {!recording && !done && (
          <p className="text-gray-400 text-sm">उदाहरण: "मेरी धान की फसल में कीड़े लग गए हैं"</p>
        )}
      </div>
      <div className="px-4 pb-6 flex gap-3">
        <button onClick={() => go("f-photo")}
          className="flex-1 border-2 border-[#2e7d32] text-[#2e7d32] rounded-2xl py-4 font-bold flex items-center justify-center gap-2">
          <Camera className="w-5 h-5" /> फोटो लें
        </button>
        <button onClick={() => go("f-ai-analysis")}
          className="flex-1 bg-[#2e7d32] text-white rounded-2xl py-4 font-bold">
          AI विश्लेषण →
        </button>
      </div>
    </div>
  );
}

function PhotoScreen({ go }: { go: (s: Screen) => void }) {
  const [uploaded, setUploaded] = useState(false);
  return (
    <div className="h-full flex flex-col bg-[#f1f8f1]">
      <AppHeader title="फोटो अपलोड करें" onBack={() => go("f-voice")} onHome={() => go("f-dashboard")} />
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        <p className="text-center text-gray-600 text-base">प्रभावित पत्ती या फसल की साफ फोटो लें</p>
        {!uploaded ? (
          <button onClick={() => setUploaded(true)}
            className="w-full h-56 border-2 border-dashed border-[#2e7d32] rounded-3xl flex flex-col items-center justify-center gap-4 bg-white active:bg-[#e8f5e9] transition">
            <Camera className="w-16 h-16 text-[#2e7d32]" />
            <p className="text-[#2e7d32] font-bold text-lg">कैमरा खोलें</p>
            <p className="text-gray-400 text-sm">या गैलरी से चुनें</p>
          </button>
        ) : (
          <div className="w-full h-56 rounded-3xl bg-[#e8f5e9] flex flex-col items-center justify-center gap-3 relative overflow-hidden border-2 border-[#2e7d32]">
            <span className="text-8xl">🌿</span>
            <p className="text-[#2e7d32] font-bold">फोटो अपलोड हुई ✓</p>
            <button onClick={() => setUploaded(false)} className="absolute top-3 right-3 bg-white rounded-full p-1">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        )}
        <Card className="w-full">
          <p className="text-xs font-bold text-[#1b5e20] mb-2">📸 अच्छी फोटो के लिए:</p>
          <ul className="text-xs text-gray-600 flex flex-col gap-1">
            <li>• प्रभावित हिस्से के पास जाकर फोटो लें</li>
            <li>• अच्छी रोशनी में लें</li>
            <li>• धुंधली न हो</li>
          </ul>
        </Card>
      </div>
      <div className="px-4 pb-6">
        <button onClick={() => go("f-ai-analysis")}
          className="w-full bg-[#2e7d32] text-white rounded-2xl py-4 font-extrabold text-xl shadow active:scale-95 transition">
          AI विश्लेषण करें →
        </button>
      </div>
    </div>
  );
}

function AIAnalysisScreen({ go }: { go: (s: Screen) => void }) {
  const [step, setStep] = useState(0);
  const steps = ["डेटा प्रोसेस हो रहा है...", "रोग पहचाना जा रहा है...", "सरकारी डेटाबेस से मिलान...", "सिफारिश तैयार हो रही है..."];
  const [done, setDone] = useState(false);
  if (!done) setTimeout(() => {
    if (step < steps.length - 1) setStep(s => s + 1);
    else setDone(true);
  }, 900);
  return (
    <div className="h-full flex flex-col bg-[#f1f8f1]">
      <AppHeader title="AI विश्लेषण" onBack={() => go("f-photo")} onHome={() => go("f-dashboard")} />
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
        {!done ? (
          <>
            <div className="w-32 h-32 rounded-full bg-[#e8f5e9] border-4 border-[#2e7d32] flex items-center justify-center relative">
              <Zap className="w-16 h-16 text-[#2e7d32] animate-pulse" />
              <div className="absolute inset-0 rounded-full border-4 border-[#2e7d32]/30 animate-ping" />
            </div>
            <div className="text-center">
              <p className="text-xl font-extrabold text-[#1b5e20]">AI विश्लेषण जारी है</p>
              <p className="text-[#2e7d32] font-semibold mt-2 animate-pulse">{steps[step]}</p>
            </div>
            <div className="w-full flex flex-col gap-2">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center ${i <= step ? "bg-[#2e7d32]" : "bg-gray-200"}`}>
                    {i < step && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  <p className={`text-sm ${i <= step ? "text-[#1b5e20] font-semibold" : "text-gray-400"}`}>{s}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col gap-4">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#e8f5e9] mx-auto flex items-center justify-center mb-3">
                <CheckCircle className="w-12 h-12 text-[#2e7d32]" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#1b5e20]">विश्लेषण पूर्ण!</h2>
            </div>
            <Card>
              <p className="text-xs text-gray-500 mb-1">पहचाना गया रोग</p>
              <p className="text-xl font-extrabold text-[#c62828]">गेहूं की पीली जंग (Yellow Rust)</p>
              <p className="text-sm text-gray-600 mt-1">Puccinia striiformis</p>
              <div className="mt-3 flex gap-2">
                <StatusPill label="97% सटीकता" color="bg-[#e8f5e9] text-[#2e7d32]" />
                <StatusPill label="उच्च जोखिम" color="bg-red-100 text-red-700" />
              </div>
            </Card>
            <button onClick={() => go("f-pesticide")}
              className="w-full bg-[#2e7d32] text-white rounded-2xl py-4 font-extrabold text-xl shadow active:scale-95 transition">
              सरकारी सिफारिश देखें →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PesticideScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="h-full flex flex-col bg-[#f1f8f1]">
      <AppHeader title="सरकारी कीटनाशक सिफारिश" onBack={() => go("f-ai-analysis")} onHome={() => go("f-dashboard")} />
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-4">
        <div className="bg-[#e8f5e9] border border-[#2e7d32] rounded-2xl p-3 flex items-center gap-3">
          <Shield className="w-6 h-6 text-[#2e7d32]" />
          <p className="text-sm font-bold text-[#1b5e20]">भारत सरकार द्वारा अनुमोदित कीटनाशक</p>
        </div>
        {[
          { name: "Propiconazole 25% EC", brand: "Tilt 250", company: "Syngenta India", reg: "CIR-2847", rating: 5 },
          { name: "Tebuconazole 25.9% EC", brand: "Folicur", company: "Bayer CropScience", reg: "CIR-1923", rating: 4 },
          { name: "Triadimefon 25% WP", brand: "Bayleton", company: "Bayer India", reg: "CIR-1105", rating: 4 },
        ].map((p, i) => (
          <Card key={i}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-extrabold text-[#1a2e1a] text-base">{p.name}</p>
                <p className="text-[#2e7d32] font-semibold text-sm">{p.brand} • {p.company}</p>
              </div>
              <StatusPill label={`#${i + 1}`} color="bg-[#2e7d32] text-white" />
            </div>
            <div className="flex gap-1 mb-2">
              {Array.from({ length: p.rating }).map((_, j) => <Star key={j} className="w-4 h-4 text-[#ff8f00] fill-[#ff8f00]" />)}
            </div>
            <div className="bg-[#f1f8f1] rounded-xl p-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#2e7d32]" />
              <p className="text-xs text-[#1b5e20] font-semibold">पंजीकरण संख्या: {p.reg}</p>
            </div>
            <button onClick={() => go("f-dosage")}
              className="mt-3 w-full bg-[#2e7d32] text-white rounded-xl py-3 font-bold text-sm">
              मात्रा देखें →
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DosageScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="h-full flex flex-col bg-[#f1f8f1]">
      <AppHeader title="मात्रा और पानी" onBack={() => go("f-pesticide")} onHome={() => go("f-dashboard")} />
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-4">
        <Card>
          <p className="text-base font-extrabold text-[#1b5e20] mb-3">Propiconazole 25% EC (Tilt 250)</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Package className="w-6 h-6 text-[#2e7d32]" />, label: "मात्रा प्रति एकड़", value: "200 ml" },
              { icon: <Droplets className="w-6 h-6 text-[#0288d1]" />, label: "पानी की मात्रा", value: "200 लीटर" },
              { icon: <Clock className="w-6 h-6 text-[#e65100]" />, label: "छिड़काव अंतर", value: "15 दिन" },
              { icon: <Calendar className="w-6 h-6 text-[#6a1b9a]" />, label: "अधिकतम छिड़काव", value: "2 बार" },
            ].map((d, i) => (
              <div key={i} className="bg-[#f1f8f1] rounded-xl p-3 flex flex-col gap-1">
                {d.icon}
                <p className="text-xs text-gray-500">{d.label}</p>
                <p className="text-xl font-extrabold text-[#1a2e1a]">{d.value}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <p className="font-bold text-[#1b5e20] mb-3">⚠️ सावधानियां</p>
          <div className="flex flex-col gap-2">
            {["छिड़काव सुबह या शाम करें", "मास्क और दस्ताने पहनें", "बच्चों को दूर रखें", "खाने से 2 घंटे पहले न करें"].map((w, i) => (
              <div key={i} className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#ff8f00] flex-shrink-0" />
                <p className="text-sm text-gray-700">{w}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <p className="font-bold text-[#1b5e20] mb-2">🌡️ अनुकूल परिस्थिति</p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2"><Thermometer className="w-4 h-4 text-red-500" /><p className="text-sm">15–30°C</p></div>
            <div className="flex items-center gap-2"><Wind className="w-4 h-4 text-blue-500" /><p className="text-sm">हवा कम हो</p></div>
            <div className="flex items-center gap-2"><Cloud className="w-4 h-4 text-gray-500" /><p className="text-sm">बारिश न हो</p></div>
          </div>
        </Card>
        <button onClick={() => go("f-risk")}
          className="w-full bg-[#2e7d32] text-white rounded-2xl py-4 font-extrabold text-xl shadow active:scale-95 transition">
          जोखिम स्कोर देखें →
        </button>
      </div>
    </div>
  );
}

function RiskScreen({ go }: { go: (s: Screen) => void }) {
  const score = 68;
  const color = score > 70 ? "text-red-600" : score > 40 ? "text-[#ff8f00]" : "text-[#2e7d32]";
  const bgColor = score > 70 ? "bg-red-100" : score > 40 ? "bg-orange-50" : "bg-[#e8f5e9]";
  return (
    <div className="h-full flex flex-col bg-[#f1f8f1]">
      <AppHeader title="अवशेष जोखिम स्कोर" onBack={() => go("f-dosage")} onHome={() => go("f-dashboard")} />
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-4">
        <Card className={`${bgColor} flex flex-col items-center py-6`}>
          <p className="text-sm text-gray-600 mb-2">आपका जोखिम स्कोर</p>
          <p className={`text-7xl font-extrabold ${color}`}>{score}</p>
          <p className={`text-xl font-bold ${color} mt-1`}>/100</p>
          <StatusPill label="मध्यम जोखिम" color="bg-orange-200 text-orange-800" />
          <p className="text-xs text-gray-500 mt-3 text-center">अनुशंसित मात्रा में उपयोग करने पर यह जोखिम सुरक्षित स्तर पर है</p>
        </Card>
        {[
          { label: "मानव स्वास्थ्य जोखिम", val: 45, color: "bg-[#2e7d32]" },
          { label: "पर्यावरण जोखिम", val: 72, color: "bg-[#ff8f00]" },
          { label: "मिट्टी प्रदूषण जोखिम", val: 38, color: "bg-[#2e7d32]" },
          { label: "फसल अवशेष जोखिम", val: 68, color: "bg-[#ff8f00]" },
        ].map((r, i) => (
          <Card key={i}>
            <div className="flex justify-between mb-2">
              <p className="text-sm font-semibold text-[#1a2e1a]">{r.label}</p>
              <p className="text-sm font-extrabold text-[#1a2e1a]">{r.val}%</p>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div style={{ width: `${r.val}%` }} className={`h-full ${r.color} rounded-full transition-all`} />
            </div>
          </Card>
        ))}
        <Card>
          <p className="font-bold text-[#1b5e20] mb-2">📋 कटाई से पहले प्रतीक्षा</p>
          <p className="text-3xl font-extrabold text-[#1a2e1a]">21 दिन</p>
          <p className="text-xs text-gray-500">PHI (Pre-Harvest Interval) — इससे पहले कटाई न करें</p>
        </Card>
        <button onClick={() => go("f-weather")}
          className="w-full bg-[#2e7d32] text-white rounded-2xl py-4 font-extrabold text-xl shadow active:scale-95 transition">
          मौसम सलाह देखें →
        </button>
      </div>
    </div>
  );
}

function WeatherScreen({ go }: { go: (s: Screen) => void }) {
  const days = [
    { day: "आज", icon: "☁️", hi: 34, lo: 22, rain: 20 },
    { day: "कल", icon: "🌧️", hi: 29, lo: 20, rain: 80 },
    { day: "परसों", icon: "⛅", hi: 31, lo: 21, rain: 40 },
    { day: "3 दिन बाद", icon: "☀️", hi: 36, lo: 23, rain: 5 },
    { day: "4 दिन बाद", icon: "☀️", hi: 37, lo: 24, rain: 10 },
  ];
  return (
    <div className="h-full flex flex-col bg-[#f1f8f1]">
      <AppHeader title="मौसम सलाह" onBack={() => go("f-dashboard")} onHome={() => go("f-dashboard")} />
      <div className="bg-[#0288d1] px-4 py-5 text-white">
        <p className="text-sm text-blue-200">रामपुर, बुलंदशहर</p>
        <div className="flex items-end gap-4 mt-1">
          <p className="text-6xl font-extrabold">34°</p>
          <div><p className="text-lg">आंशिक बादल</p><p className="text-blue-200 text-sm">नमी 68% • हवा 12 km/h</p></div>
        </div>
      </div>
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {days.map((d, i) => (
            <div key={i} className="bg-white rounded-2xl p-3 flex flex-col items-center gap-1 min-w-[80px] shadow-sm border border-[#e8f5e9]">
              <p className="text-xs text-gray-500 font-semibold">{d.day}</p>
              <span className="text-3xl">{d.icon}</span>
              <p className="text-sm font-bold text-[#1a2e1a]">{d.hi}°/{d.lo}°</p>
              <p className="text-xs text-blue-500">{d.rain}% 🌧️</p>
            </div>
          ))}
        </div>
        <Card>
          <p className="font-bold text-[#1b5e20] mb-3">🌾 फसल सलाह</p>
          <div className="flex flex-col gap-2">
            {[
              { icon: "✅", text: "आज छिड़काव के लिए उपयुक्त मौसम है" },
              { icon: "⚠️", text: "कल बारिश की संभावना — छिड़काव न करें" },
              { icon: "💧", text: "सिंचाई कल शाम करें" },
              { icon: "🌡️", text: "तापमान सामान्य, फसल ठीक रहेगी" },
            ].map((tip, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-lg">{tip.icon}</span>
                <p className="text-sm text-gray-700">{tip.text}</p>
              </div>
            ))}
          </div>
        </Card>
        <button onClick={() => go("f-alert")}
          className="w-full bg-red-600 text-white rounded-2xl py-4 font-extrabold text-lg shadow active:scale-95 transition flex items-center justify-center gap-2">
          <AlertTriangle className="w-5 h-5" /> उच्च चेतावनी देखें
        </button>
      </div>
    </div>
  );
}

function AlertScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="h-full flex flex-col bg-red-50">
      <div className="bg-red-700 px-4 py-3 flex items-center gap-3">
        <button onClick={() => go("f-dashboard")}><ArrowLeft className="w-6 h-6 text-white" /></button>
        <h1 className="text-lg font-extrabold text-white flex-1">⚠️ उच्च चेतावनी</h1>
        <Bell className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-4">
        {[
          { title: "टिड्डी दल का खतरा", area: "बुलंदशहर, हापुड़, गाजियाबाद", severity: "अत्यधिक", date: "आज रात", color: "border-red-400 bg-red-50" },
          { title: "अत्यधिक वर्षा चेतावनी", area: "पश्चिमी उत्तर प्रदेश", severity: "उच्च", date: "कल सुबह", color: "border-orange-400 bg-orange-50" },
          { title: "पाला पड़ने की संभावना", area: "मेरठ, मुजफ्फरनगर", severity: "मध्यम", date: "2 दिन बाद", color: "border-yellow-400 bg-yellow-50" },
        ].map((a, i) => (
          <div key={i} className={`rounded-2xl p-4 border-2 ${a.color}`}>
            <div className="flex items-start justify-between mb-2">
              <p className="font-extrabold text-[#1a2e1a] text-base">{a.title}</p>
              <StatusPill label={a.severity} color={i === 0 ? "bg-red-600 text-white" : i === 1 ? "bg-orange-500 text-white" : "bg-yellow-500 text-white"} />
            </div>
            <p className="text-sm text-gray-600 flex items-center gap-1"><MapPin className="w-3 h-3" />{a.area}</p>
            <p className="text-xs text-gray-500 mt-1">⏰ {a.date}</p>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 bg-white border border-gray-300 rounded-xl py-2 text-sm font-bold text-gray-700">विवरण</button>
              <button className="flex-1 bg-[#2e7d32] text-white rounded-xl py-2 text-sm font-bold">सुरक्षा टिप्स</button>
            </div>
          </div>
        ))}
        <Card>
          <p className="font-bold text-[#1b5e20] mb-2">🆘 आपातकालीन हेल्पलाइन</p>
          <button className="w-full bg-[#2e7d32] text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2">
            <Phone className="w-5 h-5" /> 1800-180-1551 (निःशुल्क)
          </button>
        </Card>
      </div>
    </div>
  );
}

function HarvestScreen({ go }: { go: (s: Screen) => void }) {
  const crops = [
    { name: "गेहूं", planted: "15 नवम्बर 2024", harvest: "15 अप्रैल 2025", days: 12, progress: 88 },
    { name: "सरसों", planted: "1 अक्टूबर 2024", harvest: "28 फरवरी 2025", days: -5, progress: 100 },
    { name: "आलू", planted: "20 अक्टूबर 2024", harvest: "20 जनवरी 2025", days: 45, progress: 65 },
  ];
  return (
    <div className="h-full flex flex-col bg-[#f1f8f1]">
      <AppHeader title="कटाई कैलेंडर" onBack={() => go("f-dashboard")} onHome={() => go("f-dashboard")} />
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-4">
        {crops.map((c, i) => (
          <Card key={i}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-lg font-extrabold text-[#1a2e1a]">{c.name}</p>
              <StatusPill
                label={c.days < 0 ? "कटाई हो चुकी" : c.days < 15 ? `${c.days} दिन बाकी` : `${c.days} दिन बाकी`}
                color={c.days < 0 ? "bg-gray-100 text-gray-600" : c.days < 15 ? "bg-red-100 text-red-700" : "bg-[#e8f5e9] text-[#2e7d32]"}
              />
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full mb-3 overflow-hidden">
              <div style={{ width: `${c.progress}%` }} className="h-full bg-[#2e7d32] rounded-full" />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>बुआई: {c.planted}</span>
              <span>कटाई: {c.harvest}</span>
            </div>
            {c.days > 0 && c.days < 15 && (
              <div className="mt-3 bg-red-50 rounded-xl p-2 flex items-center gap-2">
                <Bell className="w-4 h-4 text-red-500" />
                <p className="text-xs text-red-700 font-semibold">कटाई जल्द करें — अधिक देरी से नुकसान</p>
              </div>
            )}
          </Card>
        ))}
        <button className="w-full border-2 border-dashed border-[#2e7d32] rounded-2xl py-4 text-[#2e7d32] font-bold text-base flex items-center justify-center gap-2">
          + नई फसल जोड़ें
        </button>
      </div>
    </div>
  );
}

function SprayHistoryScreen({ go }: { go: (s: Screen) => void }) {
  const records = [
    { date: "10 जन 2025", crop: "गेहूं", chemical: "Propiconazole 25% EC", dose: "200ml/एकड़", result: "प्रभावी" },
    { date: "28 दिस 2024", crop: "सरसों", chemical: "Cypermethrin 10%", dose: "150ml/एकड़", result: "आंशिक" },
    { date: "5 दिस 2024", crop: "आलू", chemical: "Mancozeb 75% WP", dose: "2g/लीटर", result: "प्रभावी" },
    { date: "20 नव 2024", crop: "गेहूं", chemical: "Chlorpyrifos 20% EC", dose: "2ml/लीटर", result: "प्रभावी" },
  ];
  return (
    <div className="h-full flex flex-col bg-[#f1f8f1]">
      <AppHeader title="छिड़काव इतिहास" onBack={() => go("f-dashboard")} />
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-3">
        {records.map((r, i) => (
          <Card key={i}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-extrabold text-[#1a2e1a]">{r.crop}</p>
                <p className="text-xs text-gray-500">{r.date}</p>
              </div>
              <StatusPill
                label={r.result}
                color={r.result === "प्रभावी" ? "bg-[#e8f5e9] text-[#2e7d32]" : "bg-orange-100 text-orange-700"}
              />
            </div>
            <p className="text-sm text-[#2e7d32] font-semibold">{r.chemical}</p>
            <p className="text-xs text-gray-500 mt-1">मात्रा: {r.dose}</p>
          </Card>
        ))}
      </div>
      <FarmerNav active="f-history" go={go} />
    </div>
  );
}

function AdvisoryScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="h-full flex flex-col bg-[#f1f8f1]">
      <AppHeader title="सरकारी सलाह" />
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-3">
        {[
          { title: "रबी फसल बीमा योजना 2025", dept: "कृषि विभाग, UP", date: "5 जन 2025", tag: "बीमा", color: "bg-blue-50 border-blue-200" },
          { title: "पीएम-किसान 19वीं किस्त अपडेट", dept: "केंद्र सरकार", date: "1 जन 2025", tag: "सब्सिडी", color: "bg-[#e8f5e9] border-[#2e7d32]/30" },
          { title: "जैविक खेती प्रोत्साहन योजना", dept: "कृषि मंत्रालय", date: "28 दिस 2024", tag: "योजना", color: "bg-yellow-50 border-yellow-200" },
          { title: "कीटनाशक प्रतिबंध सूची 2025", dept: "केंद्रीय कीटनाशक बोर्ड", date: "20 दिस 2024", tag: "नियम", color: "bg-red-50 border-red-200" },
        ].map((a, i) => (
          <div key={i} className={`rounded-2xl p-4 border ${a.color}`}>
            <div className="flex items-start justify-between mb-1">
              <p className="font-extrabold text-[#1a2e1a] text-sm flex-1 pr-2">{a.title}</p>
              <StatusPill label={a.tag} color="bg-[#2e7d32] text-white" />
            </div>
            <p className="text-xs text-gray-500">{a.dept} • {a.date}</p>
            <button className="mt-2 text-[#2e7d32] text-sm font-bold">पूरा पढ़ें →</button>
          </div>
        ))}
      </div>
      <FarmerNav active="f-advisory" go={go} />
    </div>
  );
}

function NotificationsScreen({ go }: { go: (s: Screen) => void }) {
  const notifs = [
    { icon: "🚨", title: "उच्च चेतावनी", body: "टिड्डी दल आपके जिले के पास है", time: "10 मिनट पहले", unread: true },
    { icon: "💧", title: "सिंचाई अनुस्मारक", body: "गेहूं में आज सिंचाई करना जरूरी", time: "2 घंटे पहले", unread: true },
    { icon: "✅", title: "AI विश्लेषण पूर्ण", body: "आपकी गेहूं की रिपोर्ट तैयार है", time: "कल", unread: false },
    { icon: "🏦", title: "PM-KISAN", body: "₹2000 की किस्त आपके खाते में आई", time: "3 दिन पहले", unread: false },
    { icon: "🌡️", title: "मौसम सतर्कता", body: "अगले 2 दिन तापमान 38°C से ऊपर रहेगा", time: "4 दिन पहले", unread: false },
  ];
  return (
    <div className="h-full flex flex-col bg-[#f1f8f1]">
      <AppHeader title="सूचनाएं" />
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-2">
        {notifs.map((n, i) => (
          <div key={i} className={`rounded-2xl p-4 flex gap-3 ${n.unread ? "bg-[#e8f5e9] border border-[#2e7d32]/30" : "bg-white"} shadow-sm`}>
            <span className="text-3xl">{n.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-extrabold text-[#1a2e1a] text-sm">{n.title}</p>
                {n.unread && <div className="w-2 h-2 rounded-full bg-[#2e7d32]" />}
              </div>
              <p className="text-sm text-gray-600 mt-0.5">{n.body}</p>
              <p className="text-xs text-gray-400 mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
      <FarmerNav active="f-notifications" go={go} />
    </div>
  );
}

function FarmerProfile({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="h-full flex flex-col bg-[#f1f8f1]">
      <div className="bg-[#2e7d32] px-4 pt-6 pb-8 flex flex-col items-center gap-3">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
          <span className="text-5xl">👨‍🌾</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">रामलाल पटेल</h1>
        <p className="text-green-200 text-sm">किसान ID: KSN-UP-2847391</p>
        <StatusPill label="सत्यापित किसान ✓" color="bg-white text-[#2e7d32]" />
      </div>
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-3">
        {[
          { label: "मोबाइल नंबर", value: "+91 98765 43210" },
          { label: "आधार नंबर", value: "XXXX-XXXX-7834" },
          { label: "भूमि क्षेत्रफल", value: "4.5 एकड़" },
          { label: "बैंक खाता", value: "SBI - XXXXXX3421" },
          { label: "ग्राम", value: "रामपुर, बुलंदशहर, UP" },
        ].map((f, i) => (
          <Card key={i} className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{f.label}</p>
            <p className="font-bold text-[#1a2e1a]">{f.value}</p>
          </Card>
        ))}
        <Card>
          <p className="font-bold text-[#1b5e20] mb-2">सक्रिय फसलें</p>
          <div className="flex gap-2 flex-wrap">
            {["🌾 गेहूं", "🥔 आलू", "🌿 धान", "🌻 सरसों"].map(c => (
              <StatusPill key={c} label={c} color="bg-[#e8f5e9] text-[#2e7d32]" />
            ))}
          </div>
        </Card>
        <button onClick={() => go("role")}
          className="w-full bg-red-50 border border-red-200 text-red-600 rounded-2xl py-4 font-bold flex items-center justify-center gap-2">
          <LogOut className="w-5 h-5" /> लॉगआउट
        </button>
      </div>
      <FarmerNav active="f-profile" go={go} />
    </div>
  );
}

// ══════════════════════════════════════════
//  INSPECTOR FLOW
// ══════════════════════════════════════════

function InspectorLogin({ go }: { go: (s: Screen) => void }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  return (
    <div className="h-full flex flex-col bg-[#e3f2fd]">
      <div className="bg-[#1565c0] px-6 pt-8 pb-10 flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
          <Shield className="w-12 h-12 text-[#1565c0]" />
        </div>
        <h1 className="text-2xl font-extrabold text-white">निरीक्षक लॉगिन</h1>
        <p className="text-blue-200 text-sm text-center">कृषि विभाग — सरकारी पोर्टल</p>
      </div>
      <div className="flex-1 px-6 py-6 flex flex-col gap-4">
        <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-[#e3f2fd]">
          <p className="text-xs text-gray-500 mb-1">सरकारी ID</p>
          <input value={id} onChange={e => setId(e.target.value)} placeholder="INS-UP-XXXXX"
            className="w-full text-lg font-bold text-[#1a2e1a] outline-none bg-transparent" />
        </div>
        <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-[#e3f2fd]">
          <p className="text-xs text-gray-500 mb-1">पासवर्ड</p>
          <input value={pw} onChange={e => setPw(e.target.value)} type="password" placeholder="••••••••"
            className="w-full text-lg font-bold text-[#1a2e1a] outline-none bg-transparent" />
        </div>
        <button onClick={() => go("i-dashboard")}
          className="w-full bg-[#1565c0] text-white rounded-2xl py-4 font-extrabold text-xl shadow active:scale-95 transition mt-2">
          लॉगिन करें →
        </button>
        <p className="text-center text-sm text-gray-500">पासवर्ड भूल गए? <span className="text-[#1565c0] font-bold">IT सेल से संपर्क करें</span></p>
        <button onClick={() => go("role")} className="text-center text-sm text-gray-400 font-semibold">← वापस जाएं</button>
      </div>
      <div className="px-4 pb-4"><GovBadge /></div>
    </div>
  );
}

function InspectorDashboard({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="h-full flex flex-col bg-[#e8f0fe]">
      <div className="bg-[#1565c0] px-4 pt-4 pb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-blue-200 text-sm">नमस्ते, निरीक्षक</p>
            <h1 className="text-xl font-extrabold text-white">अमित कुमार शर्मा</h1>
            <p className="text-blue-300 text-xs">जिला: बुलंदशहर • ID: INS-UP-00472</p>
          </div>
          <button onClick={() => go("f-notifications")} className="relative p-2">
            <Bell className="w-7 h-7 text-white" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-400 rounded-full border border-white" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "उच्च जोखिम क्षेत्र", val: "7", color: "text-red-300" },
            { label: "आज के निरीक्षण", val: "3", color: "text-yellow-300" },
            { label: "लंबित रिपोर्ट", val: "12", color: "text-white" },
          ].map((s, i) => (
            <div key={i} className="bg-white/15 rounded-xl p-2 text-center">
              <p className={`text-2xl font-extrabold ${s.color}`}>{s.val}</p>
              <p className="text-blue-200 text-[10px] leading-tight mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-3">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-3 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-bold text-red-700 text-sm">3 उच्च जोखिम क्षेत्र</p>
            <p className="text-red-500 text-xs">तत्काल निरीक्षण आवश्यक</p>
          </div>
          <button onClick={() => go("i-high-alert")} className="text-red-500 text-xs font-bold">देखें →</button>
        </div>
        <h2 className="font-extrabold text-[#1565c0] text-base">त्वरित कार्रवाई</h2>
        <BigBtn label="जिला हीटमैप" icon={<Map className="w-7 h-7 text-white" />}
          onClick={() => go("i-heatmap")} color="bg-[#1565c0]" sub="जोखिम क्षेत्र देखें" />
        <BigBtn label="AI प्राथमिकता सूची" icon={<Zap className="w-7 h-7 text-white" />}
          onClick={() => go("i-priority")} color="bg-[#6a1b9a]" sub="स्वचालित निरीक्षण क्रम" />
        <BigBtn label="उल्लंघन विश्लेषण" icon={<BarChart2 className="w-7 h-7 text-white" />}
          onClick={() => go("i-analytics")} color="bg-[#e65100]" sub="ट्रेंड और पैटर्न" />
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => go("i-lab-report")}
            className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm border border-[#e3f2fd] active:scale-95 transition">
            <Beaker className="w-8 h-8 text-[#1565c0]" />
            <p className="font-bold text-[#1a2e1a] text-sm text-center">लैब रिपोर्ट</p>
          </button>
          <button onClick={() => go("i-reports")}
            className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm border border-[#e3f2fd] active:scale-95 transition">
            <FileText className="w-8 h-8 text-[#1565c0]" />
            <p className="font-bold text-[#1a2e1a] text-sm text-center">रिपोर्ट्स</p>
          </button>
        </div>
      </div>
      <InspectorNav active="i-dashboard" go={go} />
    </div>
  );
}

function HeatmapScreen({ go }: { go: (s: Screen) => void }) {
  const cells = [
    ["low", "med", "high", "high", "med"],
    ["low", "low", "med", "high", "high"],
    ["none", "low", "med", "med", "high"],
    ["none", "none", "low", "med", "med"],
    ["none", "none", "none", "low", "low"],
  ];
  const colorMap: Record<string, string> = {
    none: "bg-gray-100", low: "bg-green-200", med: "bg-yellow-300", high: "bg-red-400"
  };
  const labelMap: Record<string, string> = { none: "शून्य", low: "कम", med: "मध्यम", high: "उच्च" };
  return (
    <div className="h-full flex flex-col bg-[#e8f0fe]">
      <AppHeader title="जिला हीटमैप" onBack={() => go("i-dashboard")} onHome={() => go("i-dashboard")} blue />
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-4">
        <p className="text-sm text-gray-500">बुलंदशहर जिला — कीटनाशक अवशेष जोखिम</p>
        <Card>
          <div className="flex gap-1 mb-2">
            {["कम", "मध्यम", "उच्च"].map((l, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className={`w-4 h-4 rounded ${["bg-green-200", "bg-yellow-300", "bg-red-400"][i]}`} />
                <span className="text-xs text-gray-600">{l}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            {cells.map((row, i) => (
              <div key={i} className="flex gap-1">
                {row.map((c, j) => (
                  <div key={j} className={`flex-1 h-12 rounded-lg ${colorMap[c]} flex items-center justify-center`}>
                    <span className="text-[9px] font-bold text-gray-700">{labelMap[c]}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>
        <button onClick={() => go("i-high-risk")}
          className="w-full bg-[#1565c0] text-white rounded-2xl py-4 font-extrabold text-lg shadow active:scale-95 transition">
          उच्च जोखिम जिले देखें →
        </button>
        <button onClick={() => go("i-district-detail")}
          className="w-full border-2 border-[#1565c0] text-[#1565c0] rounded-2xl py-4 font-bold text-lg active:scale-95 transition">
          जिला विवरण
        </button>
      </div>
      <InspectorNav active="i-heatmap" go={go} />
    </div>
  );
}

function HighRiskScreen({ go }: { go: (s: Screen) => void }) {
  const districts = [
    { name: "मेरठ", score: 87, crops: "गन्ना, मेंथा", violations: 14, trend: "up" },
    { name: "बुलंदशहर", score: 74, crops: "गेहूं, आलू", violations: 9, trend: "up" },
    { name: "हापुड़", score: 71, crops: "धान, सब्जी", violations: 7, trend: "down" },
    { name: "गाजियाबाद", score: 68, crops: "सब्जी, फूल", violations: 11, trend: "up" },
    { name: "आगरा", score: 62, crops: "आलू, टमाटर", violations: 5, trend: "down" },
  ];
  return (
    <div className="h-full flex flex-col bg-[#e8f0fe]">
      <AppHeader title="उच्च जोखिम जिले" onBack={() => go("i-heatmap")} onHome={() => go("i-dashboard")} blue />
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-3">
        {districts.map((d, i) => (
          <button key={i} onClick={() => go("i-district-detail")}
            className="bg-white rounded-2xl p-4 shadow-sm border border-[#e3f2fd] text-left active:scale-95 transition w-full">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-white text-sm ${d.score > 80 ? "bg-red-500" : d.score > 65 ? "bg-orange-500" : "bg-yellow-500"}`}>{i + 1}</span>
                <p className="text-lg font-extrabold text-[#1a2e1a]">{d.name}</p>
              </div>
              <div className="flex items-center gap-1">
                {d.trend === "up" ? <TrendingUp className="w-4 h-4 text-red-500" /> : <TrendingDown className="w-4 h-4 text-[#2e7d32]" />}
                <p className={`text-xl font-extrabold ${d.score > 80 ? "text-red-600" : d.score > 65 ? "text-orange-500" : "text-yellow-600"}`}>{d.score}</p>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full mb-2">
              <div style={{ width: `${d.score}%` }} className={`h-full rounded-full ${d.score > 80 ? "bg-red-500" : d.score > 65 ? "bg-orange-500" : "bg-yellow-500"}`} />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>फसलें: {d.crops}</span>
              <span>उल्लंघन: {d.violations}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function PriorityScreen({ go }: { go: (s: Screen) => void }) {
  const list = [
    { rank: 1, village: "सिरसा", block: "स्याना", reason: "बार-बार उल्लंघन + उच्च छिड़काव", urgency: "तत्काल" },
    { rank: 2, village: "नगला भट", block: "खुर्जा", reason: "निषिद्ध कीटनाशक उपयोग", urgency: "तत्काल" },
    { rank: 3, village: "मोहनपुर", block: "गुलावठी", reason: "PHI उल्लंघन संभावना", urgency: "उच्च" },
    { rank: 4, village: "जटपुर", block: "अनूपशहर", reason: "अत्यधिक मात्रा में उपयोग", urgency: "उच्च" },
    { rank: 5, village: "रामपुर", block: "शिकारपुर", reason: "नए किसान + कम जागरूकता", urgency: "मध्यम" },
  ];
  return (
    <div className="h-full flex flex-col bg-[#e8f0fe]">
      <AppHeader title="AI निरीक्षण प्राथमिकता" onBack={() => go("i-dashboard")} onHome={() => go("i-dashboard")} blue />
      <div className="px-4 pt-3 pb-2">
        <div className="bg-[#6a1b9a]/10 border border-[#6a1b9a]/30 rounded-xl p-3 flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#6a1b9a]" />
          <p className="text-xs text-[#6a1b9a] font-semibold">AI मॉडल द्वारा स्वचालित प्राथमिकता निर्धारण</p>
        </div>
      </div>
      <div className="flex-1 overflow-auto px-4 pb-4 flex flex-col gap-3">
        {list.map((item, i) => (
          <Card key={i}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-white flex-shrink-0 ${item.urgency === "तत्काल" ? "bg-red-500" : item.urgency === "उच्च" ? "bg-orange-500" : "bg-yellow-500"}`}>
                #{item.rank}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-extrabold text-[#1a2e1a]">{item.village}</p>
                  <StatusPill label={item.urgency}
                    color={item.urgency === "तत्काल" ? "bg-red-100 text-red-700" : item.urgency === "उच्च" ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"} />
                </div>
                <p className="text-xs text-gray-500">{item.block} ब्लॉक</p>
                <p className="text-xs text-gray-700 mt-1">कारण: {item.reason}</p>
                <button onClick={() => go("i-planner")}
                  className="mt-2 bg-[#1565c0] text-white rounded-lg px-4 py-1.5 text-xs font-bold">
                  निरीक्षण जोड़ें +
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DistrictDetailScreen({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="h-full flex flex-col bg-[#e8f0fe]">
      <AppHeader title="जिला विवरण — मेरठ" onBack={() => go("i-heatmap")} onHome={() => go("i-dashboard")} blue />
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "कुल किसान", val: "1,24,382", icon: <Users className="w-5 h-5 text-[#1565c0]" /> },
            { label: "जोखिम स्कोर", val: "87/100", icon: <AlertTriangle className="w-5 h-5 text-red-500" /> },
            { label: "उल्लंघन (इस माह)", val: "14", icon: <X className="w-5 h-5 text-red-500" /> },
            { label: "निरीक्षण हुए", val: "28", icon: <CheckCircle className="w-5 h-5 text-[#2e7d32]" /> },
          ].map((s, i) => (
            <Card key={i} className="flex flex-col gap-1">
              {s.icon}
              <p className="text-2xl font-extrabold text-[#1a2e1a]">{s.val}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </Card>
          ))}
        </div>
        <Card>
          <p className="font-bold text-[#1b5e20] mb-3">शीर्ष उल्लंघन</p>
          {["Monocrotophos (प्रतिबंधित)", "PHI से पहले कटाई", "अत्यधिक मात्रा — Endosulfan", "अनुमोदन के बिना आयातित कीटनाशक"].map((v, i) => (
            <div key={i} className="flex items-center gap-2 py-2 border-b border-gray-100 last:border-0">
              <div className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center flex-shrink-0">{i + 1}</div>
              <p className="text-sm text-gray-700">{v}</p>
            </div>
          ))}
        </Card>
        <button onClick={() => go("i-offenders")}
          className="w-full bg-[#1565c0] text-white rounded-2xl py-4 font-extrabold shadow active:scale-95 transition">
          बार-बार उल्लंघनकर्ता देखें →
        </button>
      </div>
    </div>
  );
}

function LabReportScreen({ go }: { go: (s: Screen) => void }) {
  const reports = [
    { id: "LAB-2025-0847", village: "सिरसा", crop: "गेहूं", date: "8 जन 2025", result: "विफल", residue: "Chlorpyrifos 2.4x MRL" },
    { id: "LAB-2025-0823", village: "मोहनपुर", crop: "आलू", date: "5 जन 2025", result: "पास", residue: "सभी मानकों के अनुसार" },
    { id: "LAB-2025-0801", village: "नगला भट", crop: "धान", date: "2 जन 2025", result: "विफल", residue: "Monocrotophos पाया गया" },
    { id: "LAB-2024-0789", village: "जटपुर", crop: "टमाटर", date: "28 दिस 2024", result: "पास", residue: "सुरक्षित स्तर" },
  ];
  return (
    <div className="h-full flex flex-col bg-[#e8f0fe]">
      <AppHeader title="लैब रिपोर्ट इतिहास" onBack={() => go("i-dashboard")} onHome={() => go("i-dashboard")} blue />
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-3">
        {reports.map((r, i) => (
          <Card key={i}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-extrabold text-[#1a2e1a]">{r.village} — {r.crop}</p>
                <p className="text-xs text-gray-500">{r.id} • {r.date}</p>
              </div>
              <StatusPill label={r.result} color={r.result === "विफल" ? "bg-red-100 text-red-700" : "bg-[#e8f5e9] text-[#2e7d32]"} />
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
              <Beaker className="w-4 h-4 text-[#1565c0]" />
              <p className="text-xs text-gray-700">{r.residue}</p>
            </div>
            {r.result === "विफल" && (
              <button className="mt-2 w-full bg-red-500 text-white rounded-xl py-2 text-xs font-bold">FIR दर्ज करें</button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function AnalyticsScreen({ go }: { go: (s: Screen) => void }) {
  const months = ["जुल", "अग", "सित", "अक्त", "नव", "दिस", "जन"];
  const vals = [12, 18, 9, 24, 16, 11, 14];
  const maxVal = Math.max(...vals);
  return (
    <div className="h-full flex flex-col bg-[#e8f0fe]">
      <AppHeader title="उल्लंघन ट्रेंड विश्लेषण" onBack={() => go("i-dashboard")} onHome={() => go("i-dashboard")} blue />
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-4">
        <Card>
          <p className="font-bold text-[#1b5e20] mb-3">मासिक उल्लंघन (2024-25)</p>
          <div className="flex items-end gap-2 h-32">
            {vals.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <p className="text-xs font-bold text-[#1565c0]">{v}</p>
                <div style={{ height: `${(v / maxVal) * 96}px` }}
                  className={`w-full rounded-t-lg ${i === vals.length - 1 ? "bg-[#1565c0]" : "bg-[#90caf9]"}`} />
                <p className="text-[9px] text-gray-500">{months[i]}</p>
              </div>
            ))}
          </div>
        </Card>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "सबसे आम उल्लंघन", val: "PHI का पालन न करना", color: "text-red-600" },
            { label: "सबसे जोखिम भरी फसल", val: "सब्जियां (38%)", color: "text-orange-600" },
            { label: "सुधार दर (6 माह)", val: "+22%", color: "text-[#2e7d32]" },
            { label: "FIR दर्ज", val: "7 (इस वर्ष)", color: "text-[#1565c0]" },
          ].map((s, i) => (
            <Card key={i}>
              <p className="text-xs text-gray-500 mb-1">{s.label}</p>
              <p className={`text-base font-extrabold ${s.color}`}>{s.val}</p>
            </Card>
          ))}
        </div>
        <Card>
          <p className="font-bold text-[#1b5e20] mb-3">प्रतिबंधित कीटनाशक उपयोग</p>
          {[
            { name: "Monocrotophos", pct: 38, color: "bg-red-500" },
            { name: "Endosulfan", pct: 24, color: "bg-orange-500" },
            { name: "Phorate", pct: 18, color: "bg-yellow-500" },
            { name: "Methyl Parathion", pct: 12, color: "bg-[#1565c0]" },
          ].map((p, i) => (
            <div key={i} className="flex items-center gap-3 mb-2">
              <p className="text-xs text-gray-700 w-32 flex-shrink-0">{p.name}</p>
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div style={{ width: `${p.pct}%` }} className={`h-full ${p.color} rounded-full`} />
              </div>
              <p className="text-xs font-bold text-gray-700 w-8">{p.pct}%</p>
            </div>
          ))}
        </Card>
      </div>
      <InspectorNav active="i-analytics" go={go} />
    </div>
  );
}

function HighAlertInspector({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="h-full flex flex-col bg-red-50">
      <div className="bg-red-700 px-4 py-3 flex items-center gap-3">
        <button onClick={() => go("i-dashboard")}><ArrowLeft className="w-6 h-6 text-white" /></button>
        <h1 className="text-lg font-extrabold text-white flex-1">🚨 उच्च चेतावनी विंडो</h1>
      </div>
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-4">
        <div className="bg-red-100 border-2 border-red-400 rounded-2xl p-4">
          <p className="font-extrabold text-red-800 text-lg">⛔ प्रतिबंधित कीटनाशक उपयोग</p>
          <p className="text-red-700 text-sm mt-1">सिरसा गाँव में Monocrotophos का उपयोग पाया गया</p>
          <div className="mt-3 flex gap-2">
            <StatusPill label="तत्काल कार्रवाई" color="bg-red-600 text-white" />
            <StatusPill label="10 जन 2025" color="bg-red-100 text-red-700" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button className="bg-red-600 text-white rounded-xl py-3 font-bold text-sm">FIR दर्ज करें</button>
            <button className="bg-white border border-red-400 text-red-600 rounded-xl py-3 font-bold text-sm">निरीक्षण भेजें</button>
          </div>
        </div>
        {[
          { title: "PHI उल्लंघन — नगला भट", sub: "गेहूं 14 दिन पहले काटा गया", severity: "उच्च" },
          { title: "अत्यधिक छिड़काव — जटपुर", sub: "अनुशंसित मात्रा से 4x अधिक", severity: "उच्च" },
          { title: "बिना लाइसेंस विक्रेता — मेरठ", sub: "Phorate बिक्री पाई गई", severity: "मध्यम" },
        ].map((a, i) => (
          <Card key={i} className="border border-orange-200">
            <div className="flex justify-between mb-1">
              <p className="font-bold text-[#1a2e1a] text-sm">{a.title}</p>
              <StatusPill label={a.severity} color={a.severity === "उच्च" ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"} />
            </div>
            <p className="text-xs text-gray-600">{a.sub}</p>
            <button onClick={() => go("i-planner")} className="mt-2 text-[#1565c0] text-xs font-bold">निरीक्षण शेड्यूल →</button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function OffendersScreen({ go }: { go: (s: Screen) => void }) {
  const offenders = [
    { village: "सिरसा", count: 6, lastViol: "10 जन 2025", type: "प्रतिबंधित कीटनाशक", status: "FIR दर्ज" },
    { village: "नगला भट", count: 4, lastViol: "2 जन 2025", type: "PHI उल्लंघन", status: "नोटिस जारी" },
    { village: "मोहनपुर", count: 3, lastViol: "28 दिस 2024", type: "अत्यधिक उपयोग", status: "चेतावनी" },
    { village: "जटपुर", count: 3, lastViol: "15 दिस 2024", type: "PHI उल्लंघन", status: "निगरानी में" },
  ];
  return (
    <div className="h-full flex flex-col bg-[#e8f0fe]">
      <AppHeader title="बार-बार उल्लंघनकर्ता क्षेत्र" onBack={() => go("i-district-detail")} onHome={() => go("i-dashboard")} blue />
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-3">
        {offenders.map((o, i) => (
          <Card key={i}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-extrabold text-[#1a2e1a] text-base">{o.village}</p>
                <p className="text-xs text-gray-500">अंतिम उल्लंघन: {o.lastViol}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="text-2xl font-extrabold text-red-600">{o.count}x</p>
                <p className="text-[10px] text-gray-500">उल्लंघन</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-2">प्रकार: {o.type}</p>
            <div className="flex items-center justify-between">
              <StatusPill label={o.status} color={o.status === "FIR दर्ज" ? "bg-red-100 text-red-700" : o.status === "नोटिस जारी" ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"} />
              <button className="text-[#1565c0] text-xs font-bold">इतिहास →</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PlannerScreen({ go }: { go: (s: Screen) => void }) {
  const planned = [
    { date: "13 जन", village: "सिरसा", officer: "अमित शर्मा", status: "निर्धारित", priority: "तत्काल" },
    { date: "14 जन", village: "नगला भट", officer: "सुनील वर्मा", status: "निर्धारित", priority: "उच्च" },
    { date: "15 जन", village: "मोहनपुर", officer: "अमित शर्मा", status: "निर्धारित", priority: "उच्च" },
    { date: "17 जन", village: "जटपुर", officer: "रमेश यादव", status: "निर्धारित", priority: "मध्यम" },
  ];
  return (
    <div className="h-full flex flex-col bg-[#e8f0fe]">
      <AppHeader title="निरीक्षण प्लानर" onBack={() => go("i-dashboard")} onHome={() => go("i-dashboard")} blue />
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-3">
        <button className="w-full border-2 border-dashed border-[#1565c0] rounded-2xl py-4 text-[#1565c0] font-bold flex items-center justify-center gap-2">
          + नया निरीक्षण जोड़ें
        </button>
        {planned.map((p, i) => (
          <Card key={i}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-extrabold text-[#1a2e1a]">{p.village}</p>
                <p className="text-xs text-gray-500">{p.date} • {p.officer}</p>
              </div>
              <StatusPill label={p.priority}
                color={p.priority === "तत्काल" ? "bg-red-100 text-red-700" : p.priority === "उच्च" ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"} />
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-[#1565c0] text-white rounded-xl py-2 text-xs font-bold">पुष्टि करें</button>
              <button className="flex-1 border border-gray-300 text-gray-600 rounded-xl py-2 text-xs font-bold">संपादित करें</button>
            </div>
          </Card>
        ))}
      </div>
      <InspectorNav active="i-planner" go={go} />
    </div>
  );
}

function ReportsScreen({ go }: { go: (s: Screen) => void }) {
  const [period, setPeriod] = useState("साप्ताहिक");
  return (
    <div className="h-full flex flex-col bg-[#e8f0fe]">
      <AppHeader title="रिपोर्ट्स" onBack={() => go("i-dashboard")} onHome={() => go("i-dashboard")} blue />
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-4">
        <div className="flex gap-2">
          {["साप्ताहिक", "मासिक", "वार्षिक"].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition ${period === p ? "bg-[#1565c0] text-white" : "bg-white text-gray-600 border border-[#e3f2fd]"}`}>
              {p}
            </button>
          ))}
        </div>
        <Card>
          <p className="font-bold text-[#1b5e20] mb-3">{period} सारांश</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "कुल निरीक्षण", val: period === "साप्ताहिक" ? "7" : period === "मासिक" ? "28" : "312" },
              { label: "उल्लंघन पाए", val: period === "साप्ताहिक" ? "3" : period === "मासिक" ? "14" : "147" },
              { label: "FIR दर्ज", val: period === "साप्ताहिक" ? "1" : period === "मासिक" ? "4" : "37" },
              { label: "अनुपालन दर", val: period === "साप्ताहिक" ? "71%" : period === "मासिक" ? "75%" : "69%" },
            ].map((s, i) => (
              <div key={i} className="bg-[#f1f8f1] rounded-xl p-3">
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="text-2xl font-extrabold text-[#1a2e1a] mt-1">{s.val}</p>
              </div>
            ))}
          </div>
        </Card>
        {["PDF रिपोर्ट डाउनलोड करें", "Excel में निर्यात करें", "विभाग को भेजें"].map((btn, i) => (
          <button key={i}
            className="w-full bg-white border border-[#e3f2fd] rounded-2xl py-4 font-bold text-[#1565c0] flex items-center justify-center gap-3 shadow-sm active:scale-95 transition">
            <FileText className="w-5 h-5" /> {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

function InspectorProfile({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="h-full flex flex-col bg-[#e8f0fe]">
      <div className="bg-[#1565c0] px-4 pt-6 pb-8 flex flex-col items-center gap-3">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
          <span className="text-5xl">🧑‍💼</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">अमित कुमार शर्मा</h1>
        <p className="text-blue-200 text-sm">ID: INS-UP-00472</p>
        <StatusPill label="वरिष्ठ कृषि निरीक्षक" color="bg-white text-[#1565c0]" />
      </div>
      <div className="flex-1 overflow-auto px-4 py-4 flex flex-col gap-3">
        {[
          { label: "विभाग", value: "कृषि विभाग, उत्तर प्रदेश" },
          { label: "कार्यक्षेत्र", value: "बुलंदशहर, हापुड़" },
          { label: "पद", value: "ब्लॉक स्तरीय निरीक्षक" },
          { label: "कार्यकाल", value: "2019 से" },
          { label: "संपर्क", value: "+91 94567 89012" },
        ].map((f, i) => (
          <Card key={i} className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{f.label}</p>
            <p className="font-bold text-[#1a2e1a] text-right text-sm max-w-[55%]">{f.value}</p>
          </Card>
        ))}
        <Card>
          <p className="font-bold text-[#1565c0] mb-2">उपलब्धियां</p>
          <div className="flex gap-2 flex-wrap">
            {["⭐ सर्वश्रेष्ठ निरीक्षक 2024", "🏆 100+ निरीक्षण", "🛡️ 7 FIR दर्ज"].map(a => (
              <StatusPill key={a} label={a} color="bg-blue-50 text-[#1565c0]" />
            ))}
          </div>
        </Card>
        <button onClick={() => go("role")}
          className="w-full bg-red-50 border border-red-200 text-red-600 rounded-2xl py-4 font-bold flex items-center justify-center gap-2">
          <LogOut className="w-5 h-5" /> लॉगआउट
        </button>
      </div>
      <InspectorNav active="i-profile" go={go} />
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const go = (s: Screen) => setScreen(s);

  const screenMap: Record<Screen, React.ReactNode> = {
    splash: <SplashScreen go={go} />,
    language: <LanguageScreen go={go} />,
    role: <RoleScreen go={go} />,
    // Farmer
    "f-dashboard": <FarmerDashboard go={go} />,
    "f-location": <LocationScreen go={go} />,
    "f-crop": <CropScreen go={go} />,
    "f-season": <SeasonScreen go={go} />,
    "f-growth": <GrowthScreen go={go} />,
    "f-problem": <ProblemScreen go={go} />,
    "f-voice": <VoiceScreen go={go} />,
    "f-photo": <PhotoScreen go={go} />,
    "f-ai-analysis": <AIAnalysisScreen go={go} />,
    "f-pesticide": <PesticideScreen go={go} />,
    "f-dosage": <DosageScreen go={go} />,
    "f-risk": <RiskScreen go={go} />,
    "f-weather": <WeatherScreen go={go} />,
    "f-alert": <AlertScreen go={go} />,
    "f-harvest": <HarvestScreen go={go} />,
    "f-history": <SprayHistoryScreen go={go} />,
    "f-advisory": <AdvisoryScreen go={go} />,
    "f-notifications": <NotificationsScreen go={go} />,
    "f-profile": <FarmerProfile go={go} />,
    // Inspector
    "i-login": <InspectorLogin go={go} />,
    "i-dashboard": <InspectorDashboard go={go} />,
    "i-heatmap": <HeatmapScreen go={go} />,
    "i-high-risk": <HighRiskScreen go={go} />,
    "i-priority": <PriorityScreen go={go} />,
    "i-district-detail": <DistrictDetailScreen go={go} />,
    "i-lab-report": <LabReportScreen go={go} />,
    "i-analytics": <AnalyticsScreen go={go} />,
    "i-high-alert": <HighAlertInspector go={go} />,
    "i-offenders": <OffendersScreen go={go} />,
    "i-planner": <PlannerScreen go={go} />,
    "i-reports": <ReportsScreen go={go} />,
    "i-profile": <InspectorProfile go={go} />,
  };

  return (
    <div className="size-full flex items-center justify-center bg-gray-200"
      style={{ fontFamily: "'Noto Sans Devanagari', 'Roboto', sans-serif" }}>
      <div className="w-[390px] h-[844px] rounded-[44px] overflow-hidden shadow-2xl border-4 border-gray-800 relative flex flex-col bg-[#f1f8f1]">
        {/* Status bar */}
        <div className="h-10 bg-[#1b5e20] flex items-center justify-between px-6 flex-shrink-0">
          <span className="text-white text-xs font-bold">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {[3, 4, 5, 5, 4].map((h, i) => <div key={i} style={{ height: `${h * 2}px` }} className="w-0.5 bg-white rounded-full" />)}
            </div>
            <svg viewBox="0 0 24 12" className="w-5 h-3 fill-white ml-1"><rect x="0" y="3" width="20" height="9" rx="2" /><rect x="21" y="4" width="2" height="7" rx="1" /><rect x="1" y="4" width="15" height="7" rx="1" fill="#1b5e20" /></svg>
          </div>
        </div>
        {/* Screen */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {screenMap[screen]}
        </div>
      </div>
    </div>
  );
}
