import { useState } from 'react'
import Login from './components/Login'
import ScoutingForm from './components/ScoutingForm'
import PitScoutingForm from './components/PitScoutingForm'

const TEAL = '#61dde1'

const NAV = [
  { id: 'match', label: 'Match Scouting', icon: '🏟️' },
  { id: 'pit',   label: 'Pit Scouting',   icon: '🔧' },
]

export default function App() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem('rls_auth') === 'true'
  )
  const [tab, setTab] = useState('match')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleLogin = () => {
    sessionStorage.setItem('rls_auth', 'true')
    setAuthenticated(true)
  }

  const selectTab = (id) => {
    setTab(id)
    setDrawerOpen(false)
  }

  if (!authenticated) return <Login onLogin={handleLogin} />

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000' }}>

      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 30,
        backgroundColor: '#000',
        borderBottom: '1px solid #1e1e1e',
        padding: '13px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 12,
      }}>
        {/* Hamburger — pinned left */}
        <button
          onClick={() => setDrawerOpen(true)}
          style={{
            position: 'absolute', left: 16,
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 6, borderRadius: 8, color: '#aaa',
            display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = TEAL)}
          onMouseLeave={e => (e.currentTarget.style.color = '#aaa')}
          aria-label="Open menu"
        >
          <span style={{ display: 'block', width: 22, height: 2, backgroundColor: 'currentColor', borderRadius: 2 }} />
          <span style={{ display: 'block', width: 22, height: 2, backgroundColor: 'currentColor', borderRadius: 2 }} />
          <span style={{ display: 'block', width: 22, height: 2, backgroundColor: 'currentColor', borderRadius: 2 }} />
        </button>

        <img src="/logo.png" alt="RoboLoCo" style={{ width: 34, height: 34, borderRadius: 8, objectFit: 'contain' }} />
        <h1 style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.5px', margin: 0, color: TEAL }}>
          RoboLoCo Scouting
        </h1>
      </header>

      {/* Drawer backdrop */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 40,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* Slide-in drawer */}
      <div style={{
        position: 'fixed', top: 0, left: 0, zIndex: 50,
        width: 240, height: '100vh',
        backgroundColor: '#0d0d0d',
        borderRight: '1px solid #1e1e1e',
        display: 'flex', flexDirection: 'column',
        padding: '20px 12px',
        transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)',
        boxSizing: 'border-box',
      }}>
        {/* Drawer header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, padding: '0 4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/logo.png" alt="" style={{ width: 28, height: 28, borderRadius: 6, objectFit: 'contain' }} />
            <span style={{ color: TEAL, fontWeight: 800, fontSize: 15 }}>RoboLoCo</span>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 20, lineHeight: 1, padding: 4 }}
          >
            ✕
          </button>
        </div>

        <div style={{ color: '#444', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0 8px 10px' }}>
          Scouting Mode
        </div>

        {NAV.map(({ id, label, icon }) => {
          const active = tab === id
          return (
            <button
              key={id}
              onClick={() => selectTab(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px',
                borderRadius: 10,
                border: 'none', cursor: 'pointer', textAlign: 'left',
                fontSize: 14, fontWeight: active ? 700 : 500,
                backgroundColor: active ? 'rgba(97,221,225,0.12)' : 'transparent',
                color: active ? TEAL : '#777',
                transition: 'all 0.15s', width: '100%', boxSizing: 'border-box',
                borderLeft: `3px solid ${active ? TEAL : 'transparent'}`,
                marginBottom: 4,
              }}
            >
              <span style={{ fontSize: 18 }}>{icon}</span>
              {label}
            </button>
          )
        })}
      </div>

      {/* Centered content */}
      <main style={{
        maxWidth: 580,
        margin: '0 auto',
        padding: '28px 16px 60px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {tab === 'match' ? <ScoutingForm /> : <PitScoutingForm />}
      </main>
    </div>
  )
}
