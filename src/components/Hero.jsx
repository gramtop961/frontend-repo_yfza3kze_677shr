import React from 'react'

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-48 -left-40 w-[40rem] h-[40rem] bg-blue-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-64 -right-40 w-[50rem] h-[50rem] bg-indigo-500/30 rounded-full blur-3xl" />
      </div>
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-blue-100 text-xs">
          <span>GOD PERSPECTIVE</span>
          <span className="w-1 h-1 rounded-full bg-blue-300" />
          <span>Multi-chain Token Creation</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white">
          Token Forge — God Mode
        </h1>
        <p className="text-blue-200/90 text-lg md:text-xl max-w-2xl mx-auto">
          Design and manifest tokens across chains. Define the blueprint, we handle the rest.
        </p>
      </div>
    </section>
  )
}

export default Hero
