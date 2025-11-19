import React, { useEffect, useState } from 'react'

function TokenCard({ token }) {
  return (
    <div className="p-4 rounded-xl bg-slate-900/40 border border-blue-500/10 hover:border-blue-400/30 transition group">
      <div className="flex items-center gap-3 mb-3">
        {token.image_url ? (
          <img src={token.image_url} alt={token.symbol} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/40 to-indigo-500/40 flex items-center justify-center text-white/80 font-bold">
            {token.symbol?.slice(0,3) || 'TKN'}
          </div>
        )}
        <div>
          <div className="text-white font-semibold leading-tight">{token.name}</div>
          <div className="text-xs text-blue-300/70">{token.symbol} • {token.chain}</div>
        </div>
      </div>
      {token.description && (
        <p className="text-sm text-blue-200/80 line-clamp-3">{token.description}</p>
      )}
      <div className="mt-3 flex items-center justify-between text-xs text-blue-300/70">
        <span>{token.total_supply?.toLocaleString?.() || token.total_supply} supply</span>
        <span className={`px-2 py-0.5 rounded-full border ${token.deploy_status==='deployed' ? 'border-emerald-400/40 text-emerald-300' : 'border-blue-400/30 text-blue-200'}`}>{token.deploy_status}</span>
      </div>
    </div>
  )
}

function TokenGallery() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/tokens`)
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="text-blue-200">Loading blueprints...</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((t) => <TokenCard key={t.id} token={t} />)}
      {items.length === 0 && (
        <div className="text-blue-300/80">No blueprints yet. Create the first one!</div>
      )}
    </div>
  )
}

export default TokenGallery
