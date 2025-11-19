import React from 'react'
import Hero from './components/Hero'
import TokenForm from './components/TokenForm'
import TokenGallery from './components/TokenGallery'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.15),transparent_40%)]" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 space-y-16">
          <Hero />

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-slate-800/40 border border-blue-500/20 rounded-2xl p-6 backdrop-blur">
              <h2 className="text-xl font-semibold mb-4">Create a Token Blueprint</h2>
              <TokenForm onCreated={() => { /* HMR will refresh gallery on navigation; keep simple */ }} />
            </div>

            <div className="bg-slate-800/40 border border-blue-500/20 rounded-2xl p-6 backdrop-blur">
              <h2 className="text-xl font-semibold mb-4">Recent Blueprints</h2>
              <TokenGallery />
            </div>
          </section>

          <footer className="text-center text-blue-300/70 text-sm pt-8">
            Built for creators. No deployment to chain occurs here; this is your omniscient planning room.
          </footer>
        </div>
      </div>
    </div>
  )
}

export default App
