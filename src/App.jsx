import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {
  Plus,
  X,
  Download,
  Moon,
  Image as ImageIcon,
  Copy,
  FileText,
  ChevronDown,
  Sparkles,
  Calendar,
  ArrowRight,
  CheckCircle,
  LogOut,
  Upload,
} from 'lucide-react';
import GooeyNav from './component/GooeyNav';
import GlassSurface from './component/GlassSurface';
import GlassSurfaceReactBits from './component/GlassSurfaceReactBits';
import GlassSurfaceDemo from './component/GlassSurfaceDemo';
import { db, storage, isConfigured, signInWithGoogle, signOutUser } from './firebase.js';
import {
  doc,
  setDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from './hooks/useAuth.js';

// Set to true to enable the development demo page.
// In professional builds, you can toggle this via VITE_SHOW_DEMO=true in .env
const SHOW_DEMO = import.meta.env.VITE_SHOW_DEMO === 'true' || false;

const FALLBACK_IMAGE =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDgwMCA0NTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzBmMTcyYSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMyMTMzNDciLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDUwIiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGNpcmNsZSBjeD0iNjAwIiBjeT0iMTAwIiByPSIxNTAiIGZpbGw9IiMyMTM5NjEiIG9wYWNpdHk9IjAuNSIvPgogIDxjaXJjbGUgY3g9IjIwMCIgY3k9IjM1MCIgcj0iMTgwIiBmaWxsPSIjMWIxODJlIiBvcGFjaXR5PSIwLjciLz4KPC9zdmc+';

const ONBOARDING_STORAGE_KEY = 'morpheus-onboarding-v1';

/* --- UTILITIES --- */
const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/* --- UI COMPONENTS --- */

// Dynamic Background
const Background = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none dream-bg"></div>
);

// HintBubble — context-sensitive dismissable tooltip
const HintBubble = ({ storageKey, children, className = '' }) => {
  const [visible, setVisible] = useState(() => !localStorage.getItem(storageKey));

  if (!visible) return null;

  return (
    <div
      className={`rounded-xl border border-cyan-400/30 bg-cyan-400/5 p-3 sm:p-4 flex items-start justify-between gap-3 ${className}`}
    >
      <p className="text-sm text-slate-300 leading-relaxed flex-1">{children}</p>
      <button
        onClick={() => {
          localStorage.setItem(storageKey, '1');
          setVisible(false);
        }}
        className="text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0 p-1 min-h-[32px] min-w-[32px] flex items-center justify-center"
        aria-label="Dismiss hint"
      >
        <X size={14} />
      </button>
    </div>
  );
};

// OnboardingTimeline — progress indicator for first entry
const OnboardingTimeline = ({ hasParsed, hasImages, isPublished, onDismiss }) => {
  const [collapsed, setCollapsed] = useState(false);

  // Auto-collapse when all steps complete
  useEffect(() => {
    if (isPublished && !collapsed) {
      setCollapsed(true);
    }
  }, [isPublished, collapsed]);

  const steps = [
    { label: 'Parse JSON', done: hasParsed },
    { label: 'Attach Images', done: hasImages },
    { label: 'Publish Entry', done: isPublished },
  ];

  if (collapsed) return null;

  return (
    <div className="mb-8 rounded-2xl border border-purple-400/20 bg-purple-400/5 p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.2em] text-purple-300 font-mono">
          First Entry Progress
        </p>
        <button
          onClick={onDismiss}
          className="text-slate-500 hover:text-slate-300 transition-colors p-1 min-h-[32px] min-w-[32px] flex items-center justify-center"
          aria-label="Dismiss timeline"
        >
          <X size={14} />
        </button>
      </div>

      <div className="space-y-2">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div
              className={`w-2 h-2 rounded-full transition-all ${
                step.done ? 'bg-cyan-400 scale-125' : 'bg-slate-700 scale-100'
              }`}
            ></div>
            <span
              className={`text-xs font-mono tracking-widest uppercase ${
                step.done ? 'text-cyan-300' : 'text-slate-500'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Image Component with Fallback
const SmartImage = ({ src, alt, className, width, height, loading = 'lazy', fetchPriority }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    width={width}
    height={height}
    loading={loading}
    decoding="async"
    fetchpriority={fetchPriority}
    onError={(e) => {
      e.currentTarget.src = FALLBACK_IMAGE;
    }}
  />
);

// Toast Notification Component
const Toast = ({ isVisible, message }) => (
  <div
    className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-300 ease-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
    }`}
  >
    <div className="bg-[#131b2e]/95 backdrop-blur-xl border border-cyan-400/30 rounded-xl px-6 py-4 flex items-center gap-3 shadow-2xl shadow-cyan-500/10">
      <CheckCircle size={18} className="text-cyan-400 flex-shrink-0" />
      <span className="text-sm font-medium text-cyan-200/90">{message}</span>
    </div>
  </div>
);

// Header
const Header = ({ currentView, setCurrentView, user }) => {
  const navItems = [
    {
      label: 'ARCHIVE',
      href: '#',
      icon: <Moon size={14} />,
      onClick: (e) => {
        e.preventDefault();
        setCurrentView('gallery');
      },
    },
    {
      label: 'NEW ENTRY',
      href: '#',
      icon: <Plus size={14} />,
      onClick: (e) => {
        e.preventDefault();
        setCurrentView('add');
      },
    },
    SHOW_DEMO && {
      label: 'DEMO',
      href: '#',
      icon: <Sparkles size={14} />,
      onClick: (e) => {
        e.preventDefault();
        setCurrentView('demo');
      },
    },
  ].filter(Boolean);

  const viewIndex = { gallery: 0, add: 1, demo: 2 };
  const activeIndex = viewIndex[currentView] ?? 0;

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0f1c]/80 backdrop-blur-xl transition-all duration-300 pt-safe pl-safe pr-safe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <div
          className="flex items-center gap-2 sm:gap-4 cursor-pointer group"
          onClick={() => setCurrentView('gallery')}
        >
          <div className="relative">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 blur-sm opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white/20"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-lg font-display tracking-widest sm:tracking-[0.2em] text-white leading-none">
              MORPHEUS
            </span>
            <span className="text-[8px] sm:text-[10px] text-slate-500 uppercase tracking-widest leading-none mt-1 hidden sm:block">
              Dream Archive
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isConfigured && user && (
            <button
              onClick={signOutUser}
              title="Sign out"
              className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors text-[10px] uppercase tracking-widest font-mono px-2 py-1"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          )}
          <div className="bg-white/5 rounded-full border border-white/5 transition-all">
            <GooeyNav items={navItems} initialActiveIndex={activeIndex} />
          </div>
        </div>
      </div>
    </header>
  );
};

/* --- DREAM RECORD COMPONENTS --- */

const RawTranscriptViewer = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!text) return null;

  return (
    <div className="mt-12 sm:mt-16 border-t border-white/10 pt-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 sm:gap-4 text-slate-500 hover:text-cyan-300 transition-colors w-full group py-4"
      >
        <div
          className={`p-1.5 sm:p-2 rounded-full border border-current transition-all ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <ChevronDown size={14} className="sm:w-4 sm:h-4" />
        </div>
        <span className="font-mono uppercase tracking-wide sm:tracking-widest text-[10px] sm:text-xs flex-1 text-left">
          {isOpen ? 'Hide Raw Transcription' : 'View Raw Transcription'}
        </span>
        <div className="hidden sm:block h-px bg-white/10 flex-1 group-hover:bg-cyan-900/50 transition-colors"></div>
      </button>

      {isOpen && (
        <div className="mt-6 bg-black/40 rounded-sm border-l-2 border-purple-500/50 p-5 sm:p-8 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <FileText size={80} className="sm:w-[100px] sm:h-[100px]" />
          </div>
          <p className="font-serif text-base sm:text-lg text-slate-300 leading-relaxed sm:leading-loose whitespace-pre-wrap relative z-10">
            {text}
          </p>
        </div>
      )}
    </div>
  );
};

const FragmentCard = ({ text, index }) => (
  <div className="relative group perspective-1000">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl"></div>
    <GlassSurfaceReactBits
      width="100%"
      height="auto"
      borderRadius={16}
      backgroundOpacity={0}
      blur={11}
      className="relative h-full transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-full w-full flex flex-col p-6">
        <div className="flex justify-between items-start mb-4">
          <Sparkles size={16} className="text-cyan-400 opacity-70" />
          <span className="text-[10px] font-mono text-slate-600">FRAG_0{index + 1}</span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed font-light italic font-serif">
          "{text}"
        </p>
      </div>
    </GlassSurfaceReactBits>
  </div>
);

// Resolve image URL: Firebase entries have full HTTPS URLs; static entries have relative paths.
const resolveImageUrl = (imagePath, baseUrl) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  return `${baseUrl}${imagePath}`;
};

/* --- GALLERY VIEW --- */
const GalleryView = ({
  user,
  setCurrentView,
  onboardingState,
  onCompleteOnboarding,
  onSkipOnboarding,
}) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const baseUrl = import.meta.env.BASE_URL || '/';

  useEffect(() => {
    loadEntries();
  }, [user]); // re-fetch when auth state changes

  useEffect(() => {
    if (!loading && entries.length > 0 && !onboardingState.completed) {
      onCompleteOnboarding();
    }
  }, [entries.length, loading, onboardingState.completed, onCompleteOnboarding]);

  const loadEntries = async () => {
    setLoading(true);
    const allEntries = [];

    // Firebase branch: fetch from Firestore when signed in
    if (isConfigured && user) {
      try {
        const q = query(collection(db, 'entries'), orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        snapshot.docs.forEach((d) => allEntries.push(d.data()));
      } catch (err) {
        console.warn('Firestore unavailable, falling back to static only:', err);
      }
    }

    // Static branch: fetch from public/ files, skip dates already loaded from Firestore
    try {
      const indexResponse = await fetch(`${baseUrl}index.json?v=${Date.now()}`);
      if (indexResponse.ok) {
        const indexData = await indexResponse.json();
        for (const id of indexData.entries) {
          if (allEntries.some((e) => e.date === id)) continue;
          try {
            const res = await fetch(`${baseUrl}entries/${id}.json?v=${Date.now()}`);
            if (res.ok) {
              const data = await res.json();
              allEntries.push(data);
            }
          } catch (e) {
            console.warn(e);
          }
        }
      }
    } catch (err) {
      console.error(err);
    }

    allEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
    setEntries(allEntries);
    setLoading(false);
  };

  return (
    <div className="relative z-10 pt-24 md:pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12 md:mb-20 animate-fade-in-up">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-thin tracking-tighter mb-4 sm:mb-8 text-white">
          Subconscious<span className="text-purple-500">.</span>
        </h1>
        <div className="flex gap-3 sm:gap-4 items-center">
          <div className="h-px bg-white/20 w-12 sm:w-32"></div>
          <p className="text-slate-400 font-mono text-[10px] sm:text-sm tracking-wide sm:tracking-widest uppercase">
            Dream Index Initialized
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      ) : entries.length === 0 ? (
        <div className="max-w-3xl relative">
          {/* Atmospheric background glows */}
          <div className="absolute -inset-12 opacity-30 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl"></div>
          </div>

          <GlassSurfaceReactBits
            width="100%"
            height="auto"
            borderRadius={24}
            backgroundOpacity={0.06}
            blur={12}
            className="relative p-6 sm:p-10 border border-white/10"
          >
            <div className="space-y-8">
              {/* Cinematic header */}
              <div className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80 font-mono">
                  Getting Started
                </p>
                <h2 className="text-3xl sm:text-5xl font-display text-white leading-tight">
                  Preserve the
                  <span className="text-cyan-300"> ephemeral</span>
                </h2>
                <p className="text-slate-300/90 max-w-[60ch] leading-relaxed text-base">
                  Your dreams are glimpses into the subconscious. Archive them with scenes,
                  fragments, and introspective detail. Each entry becomes searchable and
                  revisitable.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-start gap-4">
                  <span className="text-cyan-400 font-mono text-sm font-bold leading-none pt-1">
                    01
                  </span>
                  <div className="flex-1">
                    <p className="text-slate-200 text-sm font-semibold mb-1">
                      Generate Structured Data
                    </p>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Use an AI assistant and our system prompt to transform your raw transcription
                      into JSON. Copy the prompt from the form.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-cyan-400 font-mono text-sm font-bold leading-none pt-1">
                    02
                  </span>
                  <div className="flex-1">
                    <p className="text-slate-200 text-sm font-semibold mb-1">Parse and Visualize</p>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Paste the JSON, parse it, and attach scene images. Each scene can have one
                      visualization (optional).
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-cyan-400 font-mono text-sm font-bold leading-none pt-1">
                    03
                  </span>
                  <div className="flex-1">
                    <p className="text-slate-200 text-sm font-semibold mb-1">Publish and Index</p>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Publish to the archive, or export a local bundle. Your dream becomes
                      searchable by date, keywords, and scenes.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => setCurrentView('add')}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 min-h-[44px] text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all"
                >
                  Start First Entry <ArrowRight size={14} />
                </button>
                {!onboardingState.dismissed && (
                  <button
                    onClick={onSkipOnboarding}
                    className="inline-flex items-center justify-center rounded-full px-5 py-3 min-h-[44px] text-xs uppercase tracking-widest text-slate-400 hover:text-slate-200 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    Skip onboarding
                  </button>
                )}
              </div>
            </div>
          </GlassSurfaceReactBits>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entries.map((entry, i) => (
            <div
              key={i}
              onClick={() => setSelectedEntry(entry)}
              className="group relative aspect-[4/5] sm:aspect-[3/4] md:aspect-auto md:h-[500px] rounded-3xl overflow-hidden cursor-pointer bg-slate-900 border border-white/5 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/20"
            >
              <div className="absolute inset-0 z-0">
                {entry.scenes?.[0]?.image ? (
                  <SmartImage
                    src={resolveImageUrl(entry.scenes[0].image, baseUrl)}
                    className="w-full h-full object-cover opacity-100 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    alt="Dream visualization"
                    width={800}
                    height={1000}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : undefined}
                  />
                ) : (
                  <div className="w-full h-full bg-[#131b2e]/60 flex items-center justify-center text-slate-700">
                    <Moon size={48} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c]/70 via-[#0a0f1c]/25 to-transparent"></div>
              </div>

              <div className="absolute inset-0 z-10 p-6 sm:p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-purple-500/20 text-purple-200 border border-purple-500/30 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase">
                      {entry.date}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display text-white mb-4 leading-tight group-hover:text-cyan-200 transition-colors">
                    {truncateText(entry.summary, 60)}
                  </h3>

                  <div className="card-meta space-y-4 delay-100">
                    <div className="flex flex-wrap gap-2">
                      {entry.keywords?.slice(0, 3).map((k, j) => (
                        <span
                          key={j}
                          className="text-[11px] sm:text-[10px] text-slate-300 font-mono"
                        >
                          #{k}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-widest uppercase">
                      Read Entry <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedEntry && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-start justify-center pt-[max(env(safe-area-inset-top),4rem)] sm:pt-24 pb-0 sm:pb-8">
          <div
            className="absolute inset-0 bg-[#05080f]/70 backdrop-blur-xl animate-fade-in"
            onClick={() => setSelectedEntry(null)}
          ></div>

          <div className="relative w-full h-[calc(100dvh-max(env(safe-area-inset-top),4rem))] sm:h-[calc(100vh-7rem)] md:w-[95vw] md:max-w-6xl rounded-t-[2rem] md:rounded-[2rem] bg-[#0a0f1c]/80 border border-white/5 shadow-2xl overflow-hidden flex flex-col animate-slide-up">
            <div className="flex-none p-4 sm:p-6 md:px-12 md:py-8 border-b border-white/5 flex items-center justify-between bg-[#0a0f1c]/50 backdrop-blur-md z-50">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1">
                  Entry Date
                </span>
                <span className="font-mono text-cyan-400 text-base sm:text-lg">
                  {selectedEntry.date}
                </span>
              </div>

              <button
                onClick={() => setSelectedEntry(null)}
                aria-label="Close entry"
                className="group p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
              >
                <X size={22} className="text-slate-400 group-hover:text-white transition-colors" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pb-safe">
              <div className="p-6 md:p-12 lg:p-20 max-w-5xl mx-auto">
                <div className="mb-12 sm:mb-24 text-center md:text-left">
                  <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
                    {selectedEntry.keywords?.map((k, j) => (
                      <span
                        key={j}
                        className="text-[9px] sm:text-[10px] font-mono text-slate-400 border border-white/10 px-2 py-1 rounded hover:border-purple-500/50 transition-colors"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-light text-white leading-snug mb-8">
                    {selectedEntry.summary}
                  </h2>
                </div>

                <div className="relative pl-0 md:pl-8 border-l-0 md:border-l border-white/5 space-y-16 sm:space-y-24">
                  {selectedEntry.scenes?.map((scene, idx) => {
                    const sceneNumber = String(idx + 1).padStart(2, '0');
                    const hasImage = Boolean(scene.image);

                    return (
                      <div key={idx} className="relative group">
                        <div className="hidden md:block absolute -left-[37px] top-0 w-4 h-4 rounded-full bg-[#0a0f1c] border-2 border-purple-500/50 group-hover:border-cyan-400 group-hover:scale-125 transition-all duration-300">
                          <div className="absolute inset-0 bg-purple-500 blur-sm opacity-50"></div>
                        </div>

                        <div
                          className={`grid grid-cols-1 ${hasImage ? 'md:grid-cols-2' : ''} gap-8 md:gap-12 items-start`}
                        >
                          <div className="space-y-4 sm:space-y-6">
                            <div className="flex items-center gap-3 text-purple-400/80">
                              <span className="text-xs font-mono tracking-widest uppercase">
                                Scene {sceneNumber}
                              </span>
                              <div className="h-px bg-purple-500/20 flex-1"></div>
                            </div>
                            <p className="font-serif text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                              {scene.text}
                            </p>
                          </div>

                          {hasImage && (
                            <div className="relative mt-4 md:mt-0">
                              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                              <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                                <SmartImage
                                  src={resolveImageUrl(scene.image, baseUrl)}
                                  alt={`Scene ${sceneNumber}`}
                                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c]/80 to-transparent opacity-60"></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedEntry.fragments?.length > 0 && (
                  <div className="mt-32 relative">
                    {/* Background texture for glassmorphism */}
                    <div className="absolute inset-0 -inset-x-12 -inset-y-12 opacity-30 pointer-events-none">
                      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-end gap-4 mb-12 border-b border-white/5 pb-4">
                        <h3 className="font-display text-3xl text-white">Memory Fragments</h3>
                        <span className="text-slate-500 font-mono text-xs pb-1">
                          Unsorted data shards
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {selectedEntry.fragments.map((frag, i) => (
                          <FragmentCard key={i} text={frag} index={i} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <RawTranscriptViewer text={selectedEntry.originalTranscription} />

                <div className="h-24"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* --- ADD ENTRY FORM (UI Update) --- */
const AddEntryForm = ({ user, onboardingState, onCompleteOnboarding }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [jsonText, setJsonText] = useState('');
  const [isParsed, setIsParsed] = useState(false);
  const [formData, setFormData] = useState({
    originalTranscription: '',
    summary: '',
    keywords: '',
    scenes: [],
    fragments: '',
  });
  const [scenes, setScenes] = useState([]);
  const [error, setError] = useState('');
  const [showToastNotification, setShowToastNotification] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const showToast = (message) => {
    setShowToastNotification(message);
    setTimeout(() => setShowToastNotification(false), 3000);
  };

  const parseJson = () => {
    try {
      // IMPORTANT: preserve the full AI output when parsing.
      // Do NOT perform any truncation or shortening here —
      // truncation belongs solely to the UI layer when rendering.
      const parsed = JSON.parse(jsonText);

      // DEV-time sanity check to catch accidental truncation upstream
      if (import.meta.env.DEV) {
        if (typeof parsed.summary === 'string' && parsed.summary.endsWith('...')) {
          console.warn(
            'parseJson: parsed.summary appears truncated — ensure the AI returns full text'
          );
        }
      }
      setFormData({
        originalTranscription: parsed.originalTranscription || '',
        summary: parsed.summary || '',
        keywords: Array.isArray(parsed.keywords)
          ? parsed.keywords.join(', ')
          : parsed.keywords || '',
        scenes: parsed.scenes || [],
        fragments: Array.isArray(parsed.fragments) ? parsed.fragments.join('\n') : parsed.fragments,
      });

      const newScenes = (parsed.scenes || []).map((text) => ({
        text: typeof text === 'string' ? text : text.text,
        image: null,
        preview: null,
      }));
      setScenes(newScenes);

      if (parsed.date) setDate(parsed.date);
      setIsParsed(true);
      setError('');
    } catch (e) {
      setError('Invalid JSON format. Please check your input.');
    }
  };

  const copyPrompt = async () => {
    const prompt = `You are a dream analysis assistant. Take the following raw dream transcription and structure it into a JSON format for archiving. Extract key elements and organize them systematically.

Raw dream transcription:
[PASTE YOUR RAW DREAM TRANSCRIPTION HERE]

Please output ONLY valid JSON in this exact format (no extra text, explanation, or commentary):
{
  "date": "YYYY-MM-DD",
  "originalTranscription": "The complete original transcription text",
  "summary": "A concise summary of the entire dream",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "scenes": [
    "Scene 1 description",
    "Scene 2 description"
  ],
  "fragments": [
    "Optional fragment text"
  ]
}

Important constraints (aim to follow):
- Field length targets (characters, try to stay within these limits):
  - summary: ~300 characters (concise, 1-2 sentences)
  - each scene description: ~500 characters (single-paragraph, focused)
  - each fragment: ~200 characters
  - keywords: 5-10 items, each < 40 characters

- Arrays and counts:
  - keywords: prefer 5-10 relevant single-word or short-phrase terms
  - scenes: provide 2-5 scene strings only
  - fragments: include up to 10 items only if applicable

- Behavior when content would otherwise be verbose:
  - Avoid producing multi-paragraph strings or long, flowing narratives for any single field. Prefer concise single-sentence or short-paragraph entries.
  - Prioritize the most relevant details when shortening content so the JSON remains useful for archiving and display — do not attempt programmatic truncation (the app will handle any UI truncation).

- Data fidelity & style:
  - Preserve key details and the original voice as much as possible while being concise and following the targets above.
  - Keep each field as a single string (no embedded newlines or multiple paragraphs).
  - If source information is missing for a required field, set it to an empty string ("") or an empty array as appropriate.

Return only well-formed JSON that strictly follows the schema and constraints above.`;

    try {
      await navigator.clipboard.writeText(prompt);
      showToast('System prompt copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy prompt:', err);
      const textArea = document.createElement('textarea');
      textArea.value = prompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast('System prompt copied to clipboard!');
    }
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const updated = [...scenes];
        updated[index] = { ...updated[index], image: file, preview: event.target.result };
        setScenes(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxHeight = 500;
          let width = img.width;
          let height = img.height;

          if (height > maxHeight) {
            width = (maxHeight / height) * width;
            height = maxHeight;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 1.0);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const generateZip = async () => {
    const zip = new JSZip();

    const finalData = {
      date,
      ...formData,
      keywords: formData.keywords.split(',').map((k) => k.trim()),
      fragments: formData.fragments.split('\n').filter((f) => f.trim()),
      scenes: scenes.map((s, i) => ({
        text: s.text,
        image: s.image ? `images/${date}-${String(i + 1).padStart(2, '0')}.jpg` : null,
      })),
    };

    zip.file(`entries/${date}.json`, JSON.stringify(finalData, null, 2));

    for (let i = 0; i < scenes.length; i++) {
      if (scenes[i].image) {
        const resizedBlob = await resizeImage(scenes[i].image);
        const filename = `images/${date}-${String(i + 1).padStart(2, '0')}.jpg`;
        zip.file(filename, resizedBlob);
      }
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `dream-${date}.zip`);
    onCompleteOnboarding();
  };

  const uploadToFirebase = async () => {
    if (!user) return;
    setIsUploading(true);
    try {
      const scenesWithUrls = await Promise.all(
        scenes.map(async (scene, i) => {
          if (!scene.image) return { text: scene.text, image: null };
          const resizedBlob = await resizeImage(scene.image);
          const paddedIndex = String(i + 1).padStart(2, '0');
          const storageRef = ref(storage, `images/${date}-${paddedIndex}.jpg`);
          await uploadBytes(storageRef, resizedBlob, { contentType: 'image/jpeg' });
          const downloadURL = await getDownloadURL(storageRef);
          return { text: scene.text, image: downloadURL };
        })
      );

      const entryDoc = {
        date,
        originalTranscription: formData.originalTranscription,
        summary: formData.summary,
        keywords: formData.keywords.split(',').map((k) => k.trim()),
        fragments: formData.fragments.split('\n').filter((f) => f.trim()),
        scenes: scenesWithUrls,
        userId: user.uid,
        createdAt: serverTimestamp(),
      };

      await setDoc(doc(db, 'entries', date), entryDoc);
      showToast('Entry published to archive.');
      onCompleteOnboarding();
    } catch (err) {
      console.error('Upload failed:', err);
      showToast('Upload failed — use Export Bundle as a backup.');
    } finally {
      setIsUploading(false);
    }
  };

  const [hasImagesAttached, setHasImagesAttached] = useState(false);
  const [hideTimeline, setHideTimeline] = useState(false);

  // Track if any image is attached
  useEffect(() => {
    const anyImages = scenes.some((s) => s.preview);
    setHasImagesAttached(anyImages);
  }, [scenes]);

  return (
    <div className="relative z-10 pt-24 sm:pt-32 pb-20 px-4 sm:px-6 max-w-4xl mx-auto min-h-screen pl-safe pr-safe">
      <div className="flex items-center gap-4 mb-8 sm:mb-12">
        <div className="h-10 sm:h-12 w-1 bg-purple-500 rounded-full"></div>
        <h2 className="text-3xl sm:text-4xl font-display text-white">Record Entry</h2>
      </div>

      {!hideTimeline && !onboardingState.completed && (
        <OnboardingTimeline
          hasParsed={isParsed}
          hasImages={hasImagesAttached}
          isPublished={false}
          onDismiss={() => setHideTimeline(true)}
        />
      )}

      {!isParsed ? (
        <div className="space-y-6 animate-fade-in">
          <HintBubble storageKey="morpheus-hint-json-v1" className="mb-4">
            Use the <strong>Copy System Prompt</strong> button to get a structured prompt for your
            AI assistant. Paste the AI's JSON output here.
          </HintBubble>

          <div className="bg-[#131b2e] border border-white/5 rounded-2xl p-4 sm:p-8 shadow-xl relative overflow-hidden">
            {/* Subtle background for glassmorphism */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10">
              <h3 className="text-purple-300 font-mono text-sm tracking-widest mb-6 flex items-center gap-2 uppercase">
                <Download size={14} /> Step 1: Structure Dream Data
              </h3>

              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder="Paste JSON from AI assistant here..."
                className="w-full bg-black/30 border border-white/10 rounded-xl p-4 sm:p-6 text-sm font-mono text-slate-300 min-h-[12rem] sm:min-h-[16rem] focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-y custom-scrollbar"
              />
              {error && (
                <p className="text-red-400 text-xs mt-3 flex items-center gap-2">
                  <X size={12} /> {error}
                </p>
              )}

              <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4">
                <button
                  onClick={copyPrompt}
                  className="text-slate-400 hover:text-white px-4 py-3 min-h-[44px] text-xs font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-2 rounded-full border border-white/10 hover:border-white/20"
                >
                  <Copy size={14} /> Copy System Prompt
                </button>
                <GlassSurfaceReactBits
                  width="auto"
                  height="auto"
                  borderRadius={9999}
                  backgroundOpacity={0}
                  blur={11}
                  className="rounded-full shadow-xl"
                >
                  <button
                    onClick={parseJson}
                    className="text-white px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all bg-transparent hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                  >
                    PARSE JSON
                  </button>
                </GlassSurfaceReactBits>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          <div className="bg-[#131b2e] border border-white/5 rounded-2xl p-4 sm:p-8">
            <div className="flex justify-between items-center mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-white/5">
              <h3 className="text-xl text-white font-display">Review & Assets</h3>
              <button
                onClick={() => setIsParsed(false)}
                className="text-xs text-slate-500 hover:text-red-400 uppercase tracking-widest transition-colors px-3 py-2 min-h-[44px]"
              >
                Reset Form
              </button>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-slate-500 text-[10px] uppercase tracking-widest mb-3">
                    Dream Date
                  </label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-4 top-3.5 text-slate-500" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:border-purple-500 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-500 text-[10px] uppercase tracking-widest mb-3">
                  Dream Summary
                </label>
                <div className="text-slate-300 bg-black/30 border border-white/5 p-6 rounded-xl text-sm leading-relaxed font-serif italic whitespace-pre-wrap">
                  {/* show the full parsed summary in the review — do not truncate here */}
                  {formData.summary}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="block text-slate-500 text-[10px] uppercase tracking-widest">
                    Scene Visualizations
                  </label>
                  <HintBubble storageKey="morpheus-hint-images-v1">
                    Images are optional. Each scene can have one visualization attached. This could
                    be a screenshot, AI-generated image, or personal photo.
                  </HintBubble>
                </div>
                {scenes.map((scene, idx) => (
                  <div
                    key={idx}
                    className="bg-black/20 rounded-xl p-4 sm:p-6 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6">
                      <div className="flex-1">
                        <span className="text-xs font-mono text-purple-400 mb-2 block">
                          SCENE 0{idx + 1}
                        </span>
                        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                          {/* show full scene text in review (no truncation) */}
                          {scene.text}
                        </p>
                      </div>
                      <div className="flex-shrink-0 self-stretch sm:self-auto">
                        <label className="cursor-pointer group relative flex items-center justify-center h-32 w-full sm:h-24 sm:w-24 rounded-lg overflow-hidden bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all min-h-[44px]">
                          {scene.preview ? (
                            <img src={scene.preview} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex flex-col items-center justify-center text-slate-600 group-hover:text-purple-400 transition-colors">
                              <ImageIcon size={20} className="mb-1" />
                              <span className="text-[9px] uppercase">Upload</span>
                            </div>
                          )}
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(idx, e)}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/10 space-y-3">
                {isConfigured && user ? (
                  <button
                    onClick={uploadToFirebase}
                    disabled={isUploading}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold tracking-widest uppercase text-sm shadow-lg shadow-purple-900/20 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Upload size={14} />
                        Publish to Archive
                      </>
                    )}
                  </button>
                ) : null}
                <button
                  onClick={generateZip}
                  className={`w-full py-4 rounded-xl font-bold tracking-widest uppercase text-sm transition-all transform hover:scale-[1.01] ${
                    isConfigured && user
                      ? 'bg-transparent border border-white/10 text-slate-400 hover:text-white hover:border-white/30'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/20'
                  }`}
                >
                  Export Bundle
                </button>
                <p className="text-center text-slate-500 text-xs pt-1">
                  {isConfigured && user
                    ? 'Publish to Archive uploads directly to Firebase. Export Bundle downloads a local zip backup.'
                    : 'Extracts to project root. Add date to index.json manually.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toast isVisible={showToastNotification} message={showToastNotification} />
    </div>
  );
};

/* --- AUTH VIEW --- */
const AuthView = ({ onSuccess }) => {
  const [authError, setAuthError] = useState('');

  const handleGoogleSignIn = async () => {
    setAuthError('');
    try {
      await signInWithGoogle();
      onSuccess();
    } catch (err) {
      console.error(err);
      setAuthError('Sign-in failed. Please try again.');
    }
  };

  return (
    <div className="relative z-10 pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500/20 to-cyan-400/20 border border-white/10 flex items-center justify-center">
          <Moon size={28} className="text-purple-400" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-display text-white tracking-tight">
          Sign in to continue
        </h2>
        <p className="text-slate-300/90 max-w-[50ch] text-sm leading-relaxed">
          Publish your dreams directly to the archive. Google authentication keeps your archive
          private and accessible across devices.
        </p>
      </div>
      <GlassSurfaceReactBits
        width="auto"
        height="auto"
        borderRadius={9999}
        backgroundOpacity={0}
        blur={11}
        className="rounded-full shadow-xl"
      >
        <button
          onClick={handleGoogleSignIn}
          className="text-white px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-all bg-transparent hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]"
        >
          Sign In with Google
        </button>
      </GlassSurfaceReactBits>
      {authError && <p className="text-red-400 text-xs font-mono">{authError}</p>}
    </div>
  );
};

/* --- MAIN APP --- */
function App() {
  const [currentView, setCurrentView] = useState('gallery');
  const [onboardingState, setOnboardingState] = useState({ completed: false, dismissed: false });
  const { user } = useAuth();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ONBOARDING_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setOnboardingState({
          completed: Boolean(parsed.completed),
          dismissed: Boolean(parsed.dismissed),
        });
      }
    } catch (error) {
      console.warn('Unable to restore onboarding state', error);
    }
  }, []);

  const persistOnboarding = (nextState) => {
    setOnboardingState(nextState);
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(nextState));
  };

  const completeOnboarding = () => {
    if (onboardingState.completed) return;
    persistOnboarding({ completed: true, dismissed: true });
  };

  const skipOnboarding = () => {
    if (onboardingState.dismissed) return;
    persistOnboarding({ ...onboardingState, dismissed: true });
  };

  // If the user tries to add an entry without being signed in (and Firebase is configured),
  // show the auth screen instead.
  const effectiveView = currentView === 'add' && isConfigured && !user ? 'auth' : currentView;

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200 font-sans selection:bg-purple-500/30 selection:text-purple-200">
      <Background />
      <Header currentView={currentView} setCurrentView={setCurrentView} user={user} />

      <main>
        {effectiveView === 'gallery' && (
          <GalleryView
            user={user}
            setCurrentView={setCurrentView}
            onboardingState={onboardingState}
            onCompleteOnboarding={completeOnboarding}
            onSkipOnboarding={skipOnboarding}
          />
        )}
        {effectiveView === 'add' && (
          <AddEntryForm
            user={user}
            onboardingState={onboardingState}
            onCompleteOnboarding={completeOnboarding}
          />
        )}
        {effectiveView === 'auth' && <AuthView onSuccess={() => setCurrentView('add')} />}
        {SHOW_DEMO && effectiveView === 'demo' && <GlassSurfaceDemo />}
      </main>
    </div>
  );
}

export default App;
