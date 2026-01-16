# Commission 1: Add Entry Form Component

```javascript
import React, { useState, useRef } from 'react';

export default function AddEntryForm() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [originalTranscription, setOriginalTranscription] = useState('');
  const [summary, setSummary] = useState('');
  const [keywords, setKeywords] = useState('');
  const [scenes, setScenes] = useState([{ text: '', image: null, imagePreview: null }]);
  const [fragments, setFragments] = useState('');
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRefs = useRef([]);

  const addScene = () => {
    setScenes([...scenes, { text: '', image: null, imagePreview: null }]);
  };

  const removeScene = (index) => {
    if (scenes.length > 1) {
      const newScenes = scenes.filter((_, i) => i !== index);
      setScenes(newScenes);
      fileInputRefs.current = fileInputRefs.current.filter((_, i) => i !== index);
    }
  };

  const updateSceneText = (index, text) => {
    const newScenes = [...scenes];
    newScenes[index].text = text;
    setScenes(newScenes);
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newScenes = [...scenes];
        newScenes[index].image = file;
        newScenes[index].imagePreview = event.target.result;
        setScenes(newScenes);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = [];

    if (!date) {
      newErrors.push('Date is required');
    }

    if (scenes.length === 0) {
      newErrors.push('At least one scene is required');
    }

    let hasValidScene = false;
    scenes.forEach((scene, index) => {
      if (scene.text && scene.image) {
        hasValidScene = true;
      } else if (scene.text || scene.image) {
        newErrors.push(`Scene ${index + 1}: Both text and image are required`);
      }
    });

    if (!hasValidScene) {
      newErrors.push('At least one scene must have both text and image');
    }

    if (!summary) {
      newErrors.push('Warning: Summary is empty (recommended to add one)');
    }

    setErrors(newErrors);
    return newErrors.length === 0 || (newErrors.length === 1 && newErrors[0].includes('Warning'));
  };

  const generateFiles = async () => {
    setErrors([]);
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    try {
      const JSZip = window.JSZip;
      const zip = new JSZip();

      const keywordsArray = keywords
        .split(',')
        .map(k => k.trim())
        .filter(k => k.length > 0);

      const fragmentsArray = fragments
        .split('\n')
        .map(f => f.trim())
        .filter(f => f.length > 0);

      const validScenes = scenes.filter(scene => scene.text && scene.image);

      const jsonData = {
        date: date,
        originalTranscription: originalTranscription,
        summary: summary,
        keywords: keywordsArray,
        scenes: validScenes.map((scene, index) => {
          const extension = scene.image.name.split('.').pop();
          const sceneNumber = String(index + 1).padStart(2, '0');
          return {
            text: scene.text,
            image: `images/${date}-${sceneNumber}.${extension}`
          };
        }),
        fragments: fragmentsArray
      };

      zip.file(`entries/${date}.json`, JSON.stringify(jsonData, null, 2));

      for (let i = 0; i < validScenes.length; i++) {
        const scene = validScenes[i];
        const extension = scene.image.name.split('.').pop();
        const sceneNumber = String(i + 1).padStart(2, '0');
        const fileName = `images/${date}-${sceneNumber}.${extension}`;
        
        const imageData = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = reject;
          reader.readAsArrayBuffer(scene.image);
        });

        zip.file(fileName, imageData);
      }

      const content = await zip.generateAsync({ type: 'blob' });
      
      const saveAs = window.saveAs;
      saveAs(content, `dream-${date}.zip`);

      setSuccessMessage(`Add this to index.json at the top of the "entries" array:\n"${date}",`);

      setTimeout(() => {
        clearForm();
      }, 5000);

    } catch (error) {
      setErrors([`Error generating files: ${error.message}`]);
    }
  };

  const clearForm = () => {
    setDate(new Date().toISOString().split('T')[0]);
    setOriginalTranscription('');
    setSummary('');
    setKeywords('');
    setScenes([{ text: '', image: null, imagePreview: null }]);
    setFragments('');
    setErrors([]);
    fileInputRefs.current = [];
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add Dream Entry</h1>

      {errors.length > 0 && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
          {errors.map((error, index) => (
            <p key={index} className={`text-sm ${error.includes('Warning') ? 'text-yellow-700' : 'text-red-700'}`}>
              {error}
            </p>
          ))}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded">
          <p className="text-sm text-green-700 font-semibold">Success! Files generated.</p>
          <p className="text-sm text-green-700 mt-2 whitespace-pre-wrap font-mono">{successMessage}</p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date *
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Original Transcription
          </label>
          <textarea
            value={originalTranscription}
            onChange={(e) => setOriginalTranscription(e.target.value)}
            rows={8}
            placeholder="Paste the raw voice transcription here..."
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Summary
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
            placeholder="2-3 sentence summary of the dream..."
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Keywords
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="water, childhood, anxiety, father"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Comma-separated keywords</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Scenes * (minimum 1)
            </label>
            <button
              onClick={addScene}
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            >
              + Add Scene
            </button>
          </div>

          {scenes.map((scene, index) => (
            <div key={index} className="mb-6 p-4 border border-gray-200 rounded bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700">Scene {index + 1}</h3>
                {scenes.length > 1 && (
                  <button
                    onClick={() => removeScene(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <textarea
                value={scene.text}
                onChange={(e) => updateSceneText(index, e.target.value)}
                rows={3}
                placeholder="Describe this scene..."
                className="w-full px-3 py-2 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e)}
                  ref={(el) => (fileInputRefs.current[index] = el)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {scene.imagePreview && (
                  <img
                    src={scene.imagePreview}
                    alt={`Scene ${index + 1} preview`}
                    className="mt-3 max-w-xs rounded border border-gray-300"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fragments (optional)
          </label>
          <textarea
            value={fragments}
            onChange={(e) => setFragments(e.target.value)}
            rows={4}
            placeholder="Disconnected dream fragments, one per line..."
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">One fragment per line</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={generateFiles}
            className="px-6 py-3 bg-green-600 text-white font-medium rounded hover:bg-green-700"
          >
            Generate Entry Files
          </button>
          <button
            onClick={clearForm}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded hover:bg-gray-300"
          >
            Clear Form
          </button>
        </div>
      </div>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
    </div>
  );
}
```