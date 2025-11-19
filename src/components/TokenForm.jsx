import React, { useState } from 'react'

const initial = {
  name: '',
  symbol: '',
  decimals: 18,
  total_supply: '',
  chain: 'ethereum',
  description: '',
  image_url: '',
  website: '',
  twitter: '',
  telegram: '',
  owner_wallet: '',
  features: []
}

const FEATURES = ['mintable', 'burnable', 'pausable', 'blacklist', 'ownable']
const CHAINS = ['ethereum', 'polygon', 'bsc', 'arbitrum', 'optimism', 'solana']

function TokenForm({ onCreated }) {
  const [form, setForm] = useState(initial)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggleFeature = (feat) => {
    setForm((f) => ({
      ...f,
      features: f.features.includes(feat)
        ? f.features.filter((x) => x !== feat)
        : [...f.features, feat]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/api/tokens`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          total_supply: Number(form.total_supply)
        })
      })
      if (!res.ok) throw new Error(`Failed: ${res.status}`)
      const data = await res.json()
      onCreated?.(data)
      setForm(initial)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Name</label>
          <input value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} className="w-full bg-slate-900/40 border border-blue-500/20 rounded px-3 py-2 text-white" placeholder="Aether" required />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Symbol</label>
          <input value={form.symbol} onChange={(e)=>setForm({...form, symbol:e.target.value.toUpperCase()})} className="w-full bg-slate-900/40 border border-blue-500/20 rounded px-3 py-2 text-white" placeholder="AE" required />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Decimals</label>
          <input type="number" min="0" max="18" value={form.decimals} onChange={(e)=>setForm({...form, decimals:Number(e.target.value)})} className="w-full bg-slate-900/40 border border-blue-500/20 rounded px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Total Supply</label>
          <input type="number" step="any" value={form.total_supply} onChange={(e)=>setForm({...form, total_supply:e.target.value})} className="w-full bg-slate-900/40 border border-blue-500/20 rounded px-3 py-2 text-white" placeholder="1000000" required />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Chain</label>
          <select value={form.chain} onChange={(e)=>setForm({...form, chain:e.target.value})} className="w-full bg-slate-900/40 border border-blue-500/20 rounded px-3 py-2 text-white">
            {CHAINS.map((c)=> <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Owner Wallet</label>
          <input value={form.owner_wallet} onChange={(e)=>setForm({...form, owner_wallet:e.target.value})} className="w-full bg-slate-900/40 border border-blue-500/20 rounded px-3 py-2 text-white" placeholder="0x..." />
        </div>
      </div>

      <div>
        <label className="block text-sm text-blue-200 mb-1">Description</label>
        <textarea value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} className="w-full bg-slate-900/40 border border-blue-500/20 rounded px-3 py-2 text-white" rows={3} placeholder="What is this token for?" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Image URL</label>
          <input value={form.image_url} onChange={(e)=>setForm({...form, image_url:e.target.value})} className="w-full bg-slate-900/40 border border-blue-500/20 rounded px-3 py-2 text-white" placeholder="https://..." />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Website</label>
          <input value={form.website} onChange={(e)=>setForm({...form, website:e.target.value})} className="w-full bg-slate-900/40 border border-blue-500/20 rounded px-3 py-2 text-white" placeholder="https://..." />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Twitter</label>
          <input value={form.twitter} onChange={(e)=>setForm({...form, twitter:e.target.value})} className="w-full bg-slate-900/40 border border-blue-500/20 rounded px-3 py-2 text-white" placeholder="https://twitter.com/..." />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Telegram</label>
          <input value={form.telegram} onChange={(e)=>setForm({...form, telegram:e.target.value})} className="w-full bg-slate-900/40 border border-blue-500/20 rounded px-3 py-2 text-white" placeholder="https://t.me/..." />
        </div>
      </div>

      <div>
        <label className="block text-sm text-blue-200 mb-2">Features</label>
        <div className="flex flex-wrap gap-2">
          {FEATURES.map((f)=> (
            <button key={f} type="button" onClick={()=>toggleFeature(f)} className={`px-3 py-1 rounded-full border transition ${form.features.includes(f) ? 'bg-blue-500/20 border-blue-400 text-blue-100' : 'bg-slate-900/40 border-blue-500/20 text-blue-300'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="text-red-300 text-sm">{error}</div>}

      <button disabled={loading} className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white font-semibold py-3 rounded-md transition">
        {loading ? 'Creating...' : 'Create Token Blueprint'}
      </button>
    </form>
  )
}

export default TokenForm
