import React from 'react';
import GlassSurface from './GlassSurface';
import GlassSurfaceReactBits from './GlassSurfaceReactBits';

const BgStripe = ({ children }) => (
  <div
    className="relative rounded-2xl overflow-hidden p-8 flex items-center justify-center"
    style={{ minHeight: 160 }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-700/20 via-cyan-600/12 to-transparent" />
    {children}
  </div>
);

const GlassSurfaceDemo = () => (
  <div className="p-12 max-w-4xl mx-auto">
    <h1 className="text-4xl font-display text-white mb-8">GlassSurface — demo</h1>

    <div style={{ display: 'grid', gap: 32 }}>
      <div style={{ minHeight: 220, position: 'relative', borderRadius: 16, overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(600px circle at 12% 12%, rgba(84,104,255,0.22), transparent 35%)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, padding: 24 }}>
          <GlassSurfaceReactBits
            width={520}
            height={180}
            borderRadius={18}
            backgroundOpacity={0}
            blur={11}
          >
            <div style={{ color: 'white' }}>
              <h4 className="text-lg font-display">ReactBits — original</h4>
              <p className="text-slate-300 text-sm">
                Verbatim example for pixel comparison (use Chromium).
              </p>
            </div>
          </GlassSurfaceReactBits>
        </div>
      </div>

      <div style={{ minHeight: 200, position: 'relative', borderRadius: 16, overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(400px circle at 15% 10%, rgba(168,85,247,0.08), transparent 40%)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, padding: 24 }}>
          <GlassSurface
            width={620}
            height={180}
            borderRadius={20}
            backgroundOpacity={0.08}
            blur={12}
            polish
            className="gd-force-reset"
          >
            <div style={{ color: 'white' }}>
              <h4 className="text-lg font-display">Polished glass</h4>
              <p className="text-slate-300 text-sm">Sheen, grain and chromatic fringe enabled.</p>
            </div>
          </GlassSurface>
        </div>
      </div>
    </div>
  </div>
);

export default GlassSurfaceDemo;
