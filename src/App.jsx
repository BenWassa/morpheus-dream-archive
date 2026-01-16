import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Plus, X, Download, Moon, Image as ImageIcon } from 'lucide-react';

/* --- UI COMPONENTS --- */

// Ambient background effect
const Background = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>
  </div>
);

// Glassmorphic Header
const Header = ({ currentView, setCurrentView }) => (
  <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => setCurrentView('gallery')}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform"></div>
        <span className="text-xl font-display tracking-widest text-white">MORPHEUS</span>
      </div>

      <nav className="flex gap-4">
        <button
          onClick={() => setCurrentView('gallery')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            currentView === 'gallery'
              ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Archive
        </button>
        <button
          onClick={() => setCurrentView('add')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
            currentView === 'add'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
              : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
          }`}
        >
          <Plus size={16} /> Record Dream
        </button>
      </nav>
    </div>
  </header>
);

/* --- GALLERY VIEW --- */
const GalleryView = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const baseUrl = import.meta.env.BASE_URL || '/';

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      // In Vite, public files are at root URL
      const indexResponse = await fetch(`${baseUrl}index.json`);
      if (!indexResponse.ok) throw new Error('Could not load index');

      const indexData = await indexResponse.json();
      const loadedEntries = [];

      for (const id of indexData.entries) {
        try {
          const res = await fetch(`${baseUrl}entries/${id}.json`);
          if (res.ok) {
            const data = await res.json();
            loadedEntries.push(data);
          }
        } catch (e) {
          console.warn(e);
        }
      }

      loadedEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEntries(loadedEntries);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-light mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500">
            The subconscious
            <br /> archive.
          </span>
        </h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entries.map((entry, i) => (
            <div
              key={i}
              onClick={() => setSelectedEntry(entry)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer bg-slate-900/50 border border-white/5 hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-900/20"
            >
              {/* Image Aspect Ratio Container */}
              <div className="aspect-[4/5] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                {entry.scenes?.[0]?.image ? (
                  <img
                    src={`${baseUrl}${entry.scenes[0].image}`}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    alt="Dream visualization"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600">
                    <Moon size={48} />
                  </div>
                )}

                <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                  <div className="flex flex-wrap gap-2 mb-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {entry.keywords?.slice(0, 3).map((k, j) => (
                      <span
                        key={j}
                        className="text-[10px] backdrop-blur-md bg-white/10 px-2 py-1 rounded-full border border-white/20 text-cyan-100"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-cyan-400 font-mono mb-2">{entry.date}</div>
                  <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed font-light border-l border-purple-500/50 pl-3">
                    {entry.summary}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dream Detail Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedEntry(null)}
          ></div>
          <div className="relative bg-[#0f172a] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-fade-in">
            <button
              onClick={() => setSelectedEntry(null)}
              className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-50"
            >
              <X size={20} className="text-white" />
            </button>

            <div className="p-8 md:p-12">
              <span className="font-mono text-cyan-400 mb-2 block">{selectedEntry.date}</span>
              <h2 className="text-3xl md:text-4xl font-display text-white mb-8 border-b border-white/10 pb-6">
                Dream Record
              </h2>

              <div className="grid gap-12">
                {selectedEntry.scenes?.map((scene, idx) => (
                  <div key={idx} className="space-y-6">
                    {scene.image && (
                      <div className="rounded-xl overflow-hidden shadow-2xl border border-white/5">
                        <img src={`${baseUrl}${scene.image}`} alt="" className="w-full object-cover" />
                      </div>
                    )}
                    <div className="flex gap-4">
                      <span className="font-mono text-purple-400 text-sm pt-1">0{idx + 1}</span>
                      <p className="text-lg text-slate-300 leading-relaxed font-light">
                        {scene.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {selectedEntry.fragments?.length > 0 && (
                <div className="mt-12 pt-8 border-t border-white/10">
                  <h3 className="font-display text-xl text-white mb-6">Fragments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedEntry.fragments.map((frag, i) => (
                      <div key={i} className="bg-white/5 p-4 rounded-lg text-slate-400 text-sm">
                        {frag}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* --- ADD ENTRY FORM --- */
const AddEntryForm = () => {
  // Original form state logic
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
  const [scenes, setScenes] = useState([]); // Separate for image handling
  const [error, setError] = useState('');

  const parseJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setFormData({
        originalTranscription: parsed.originalTranscription || '',
        summary: parsed.summary || '',
        keywords: Array.isArray(parsed.keywords) ? parsed.keywords.join(', ') : parsed.keywords || '',
        scenes: parsed.scenes || [],
        fragments: Array.isArray(parsed.fragments) ? parsed.fragments.join('\n') : parsed.fragments,
      });

      // Initialize scene images structure
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

  const generateZip = async () => {
    const zip = new JSZip();

    // Construct final JSON
    const finalData = {
      date,
      ...formData,
      keywords: formData.keywords.split(',').map((k) => k.trim()),
      fragments: formData.fragments.split('\n').filter((f) => f.trim()),
      scenes: scenes.map((s, i) => ({
        text: s.text,
        image: s.image
          ? `images/${date}-${String(i + 1).padStart(2, '0')}.${s.image.name.split('.').pop()}`
          : null,
      })),
    };

    zip.file(`entries/${date}.json`, JSON.stringify(finalData, null, 2));

    // Add images
    for (let i = 0; i < scenes.length; i++) {
      if (scenes[i].image) {
        const ext = scenes[i].image.name.split('.').pop();
        const filename = `images/${date}-${String(i + 1).padStart(2, '0')}.${ext}`;
        zip.file(filename, scenes[i].image);
      }
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `dream-${date}.zip`);
  };

  return (
    <div className="relative z-10 pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
      <h2 className="text-4xl font-display text-white mb-8">Record New Entry</h2>

      {!isParsed ? (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6">
            <h3 className="text-purple-300 font-medium mb-4 flex items-center gap-2">
              <Download size={18} /> Step 1: Structure Dream
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Paste your raw voice transcription into ChatGPT with the system prompt. Paste the
              resulting JSON below.
            </p>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder="Paste JSON here..."
              className="w-full bg-[#0f172a] border border-white/10 rounded-lg p-4 text-sm font-mono text-slate-300 h-64 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            <div className="mt-4">
              <button
                onClick={parseJson}
                className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Parse JSON
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl text-white font-display">Review & Assets</h3>
              <button
                onClick={() => setIsParsed(false)}
                className="text-sm text-slate-400 hover:text-white"
              >
                Reset
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-slate-500 text-xs uppercase tracking-wider mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-[#0f172a] border border-white/10 rounded px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-500 text-xs uppercase tracking-wider mb-2">
                  Summary
                </label>
                <div className="text-slate-300 bg-white/5 p-4 rounded-lg text-sm leading-relaxed">
                  {formData.summary}
                </div>
              </div>

              <div className="space-y-6">
                <label className="block text-slate-500 text-xs uppercase tracking-wider">
                  Visuals
                </label>
                {scenes.map((scene, idx) => (
                  <div key={idx} className="bg-black/20 rounded-lg p-4 border border-white/5">
                    <p className="text-slate-300 text-sm mb-4">{scene.text}</p>
                    <div className="flex items-center gap-4">
                      <label className="cursor-pointer flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm text-white transition-colors">
                        <ImageIcon size={16} /> Upload Scene {idx + 1}
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(idx, e)}
                        />
                      </label>
                      {scene.preview && (
                        <div className="h-16 w-16 rounded overflow-hidden border border-white/20">
                          <img src={scene.preview} className="h-full w-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/10">
                <button
                  onClick={generateZip}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-4 rounded-xl font-bold tracking-wide shadow-lg shadow-purple-900/30 transition-all transform hover:scale-[1.01]"
                >
                  Download Entry Bundle
                </button>
                <p className="text-center text-slate-500 text-xs mt-4">
                  Extract the zip to your project root. Add the entry ID to index.json manually.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* --- MAIN APP --- */
function App() {
  const [currentView, setCurrentView] = useState('gallery');

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      <Background />
      <Header currentView={currentView} setCurrentView={setCurrentView} />

      <main>{currentView === 'gallery' ? <GalleryView /> : <AddEntryForm />}</main>
    </div>
  );
}

export default App;
