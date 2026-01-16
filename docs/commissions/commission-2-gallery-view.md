# Commission 2: Gallery View Component

```javascript
import React, { useState, useEffect } from 'react';

export default function GalleryView() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [filterKeyword, setFilterKeyword] = useState('');
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const indexResponse = await fetch('./index.json');
      if (!indexResponse.ok) {
        throw new Error('Could not load index.json');
      }
      
      const indexData = await indexResponse.json();
      const entryIds = indexData.entries || [];

      const loadedEntries = [];
      for (const id of entryIds) {
        try {
          const entryResponse = await fetch(`./entries/${id}.json`);
          if (entryResponse.ok) {
            const entryData = await entryResponse.json();
            loadedEntries.push(entryData);
          } else {
            console.warn(`Could not load entry: ${id}`);
          }
        } catch (err) {
          console.warn(`Error loading entry ${id}:`, err);
        }
      }

      loadedEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEntries(loadedEntries);
    } catch (err) {
      console.error('Error loading entries:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const filterEntries = () => {
    let filtered = entries;

    if (filterKeyword) {
      filtered = filtered.filter(entry => 
        entry.keywords && entry.keywords.some(k => 
          k.toLowerCase() === filterKeyword.toLowerCase()
        )
      );
    }

    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(entry => {
        const summaryMatch = entry.summary && entry.summary.toLowerCase().includes(searchLower);
        const sceneMatch = entry.scenes && entry.scenes.some(scene => 
          scene.text.toLowerCase().includes(searchLower)
        );
        return summaryMatch || sceneMatch;
      });
    }

    return filtered;
  };

  const clearFilters = () => {
    setFilterKeyword('');
    setSearchText('');
  };

  const handleKeywordClick = (keyword) => {
    setFilterKeyword(keyword);
  };

  const openDetail = (entry) => {
    setSelectedEntry(entry);
  };

  const closeDetail = () => {
    setSelectedEntry(null);
  };

  const getAllKeywords = () => {
    const keywordSet = new Set();
    entries.forEach(entry => {
      if (entry.keywords) {
        entry.keywords.forEach(k => keywordSet.add(k));
      }
    });
    return Array.from(keywordSet).sort();
  };

  const filteredEntries = filterEntries();
  const allKeywords = getAllKeywords();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dreams...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded p-6 text-center">
          <p className="text-red-700">Error loading dream archive: {error}</p>
          <button 
            onClick={loadEntries}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No dreams archived yet. Add your first dream!</p>
        </div>
      </div>
    );
  }

  if (selectedEntry) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
        <div className="min-h-screen px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
              <h2 className="text-2xl font-bold text-gray-800">
                {formatDate(selectedEntry.date)}
              </h2>
              <button
                onClick={closeDetail}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              {selectedEntry.keywords && selectedEntry.keywords.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {selectedEntry.keywords.map((keyword, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}

              {selectedEntry.summary && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Summary</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedEntry.summary}</p>
                </div>
              )}

              <div className="space-y-8">
                <h3 className="text-lg font-semibold text-gray-700">Scenes</h3>
                {selectedEntry.scenes && selectedEntry.scenes.map((scene, i) => (
                  <div key={i} className="space-y-3">
                    <img
                      src={`./${scene.image}`}
                      alt={`Scene ${i + 1}`}
                      className="w-full rounded-lg shadow-md"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        console.error(`Failed to load image: ${scene.image}`);
                      }}
                    />
                    <p className="text-gray-700 leading-relaxed">{scene.text}</p>
                  </div>
                ))}
              </div>

              {selectedEntry.fragments && selectedEntry.fragments.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Fragments</h3>
                  <ul className="space-y-2">
                    {selectedEntry.fragments.map((fragment, i) => (
                      <li key={i} className="text-gray-600 italic">• {fragment}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dream Archive</h1>

      <div className="mb-6 space-y-4">
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search dreams..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 min-w-64 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {(filterKeyword || searchText) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Clear Filters
            </button>
          )}
        </div>

        {filterKeyword && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Filtering by:</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
              {filterKeyword}
            </span>
          </div>
        )}

        <p className="text-sm text-gray-600">
          Showing {filteredEntries.length} of {entries.length} dreams
        </p>
      </div>

      {filteredEntries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No dreams match your filters.</p>
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntries.map((entry, index) => (
            <div
              key={index}
              onClick={() => openDetail(entry)}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer"
            >
              {entry.scenes && entry.scenes.length > 0 && entry.scenes[0].image && (
                <div className="aspect-video bg-gray-100">
                  <img
                    src={`./${entry.scenes[0].image}`}
                    alt="Dream thumbnail"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {formatDate(entry.date)}
                </h3>
                
                {entry.keywords && entry.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {entry.keywords.slice(0, 3).map((keyword, i) => (
                      <span
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleKeywordClick(keyword);
                        }}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full hover:bg-blue-100 cursor-pointer"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
                
                {entry.summary && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {entry.summary}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```