import React from 'react';
import GlassSurface from './GlassSurface';
import GlassSurfaceReactBits from './GlassSurfaceReactBits';

const DemoSection = ({ title, subtitle, bgImage, children }) => (
  <div className="space-y-4 max-w-4xl mx-auto mb-16">
    <div className="flex flex-col ml-2">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">{title}</h3>
      {subtitle && <p className="text-xs text-slate-400 capitalize">{subtitle}</p>}
    </div>
    <section className="relative w-full rounded-3xl overflow-hidden h-[400px] flex items-center justify-center shadow-2xl border border-white/10 group">
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt="Demo Background"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10" />
        </>
      )}
      <div className="relative z-10 flex flex-col items-center gap-8 w-full">{children}</div>
    </section>
  </div>
);

const GlassSurfaceDemo = () => (
  <div className="p-12 min-h-screen bg-neutral-950 text-white">
    <header className="max-w-4xl mx-auto mb-16 text-center">
      <h1 className="text-5xl font-display font-bold text-white mb-4">GlassSurface</h1>
      <p className="text-slate-400 text-lg">
        Pixel-perfect glass effects with refraction, chromatic aberration, and polish.
      </p>
    </header>

    {/* Scenario 1: High Contrast / City - Best for ReactBits Verbatim */}
    <DemoSection
      title="High Contrast Scene"
      subtitle="ReactBits verbatim implementation over city lights"
      bgImage="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2094&auto=format&fit=crop"
    >
      <GlassSurfaceReactBits
        width={320}
        height={200}
        borderRadius={24}
        backgroundOpacity={0}
        blur={11}
        className="shadow-2xl hover:scale-105 transition-transform duration-300"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">
            Night City
          </h2>
          <p className="text-white/60 text-sm mt-2">Refraction & Dispersion</p>
        </div>
      </GlassSurfaceReactBits>
    </DemoSection>

    {/* Scenario 2: Polished Glass over Abstract Texture */}
    <DemoSection
      title="Polished Surface"
      subtitle="Enhanced GlassSurface with grain, sheen, and fringe"
      bgImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop"
    >
      <GlassSurface
        width={500}
        height={140}
        borderRadius={30}
        backgroundOpacity={0.05}
        blur={15}
        polish
        className="gd-force-reset shadow-2xl hover:scale-105 transition-transform duration-300"
      >
        <div className="flex items-center gap-12 px-12 w-full justify-between">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-white/60 font-bold mb-1">
              Project
            </span>
            <span className="text-4xl font-bold text-white drop-shadow-sm">Aurora Blue</span>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center rounded-full bg-cyan-400/20 px-4 py-1.5 text-xs font-semibold text-cyan-300 ring-1 ring-inset ring-cyan-400/30 backdrop-blur-sm">
              In Production
            </span>
          </div>
        </div>
      </GlassSurface>
    </DemoSection>

    {/* Scenario 3: Comparison Stack */}
    <div className="max-w-4xl mx-auto mt-24">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-8 ml-2">
        Side-by-Side Comparison
      </h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
          <p className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-widest">
            Standard Glass
          </p>
          <div className="relative h-48 rounded-2xl overflow-hidden flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop')] bg-cover">
            <GlassSurface width={140} height={80} backgroundOpacity={0.1} polish={false}>
              <span className="text-white font-bold">Standard</span>
            </GlassSurface>
          </div>
        </div>
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
          <p className="text-xs font-bold text-cyan-500 mb-6 uppercase tracking-widest">
            Polished Glass
          </p>
          <div className="relative h-48 rounded-2xl overflow-hidden flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop')] bg-cover">
            <GlassSurface width={140} height={80} backgroundOpacity={0.05} polish={true}>
              <span className="text-white font-bold">Polished</span>
            </GlassSurface>
          </div>
        </div>
      </div>
    </div>

    <footer className="max-w-4xl mx-auto mt-24 pb-12 text-center text-slate-600 text-sm">
      <p>Background imagery via Unsplash.</p>
      <p className="mt-2">Note: Displacement effects require a Chromium-based browser.</p>
    </footer>
  </div>
);

export default GlassSurfaceDemo;
