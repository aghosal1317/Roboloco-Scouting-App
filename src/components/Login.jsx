import { useState } from 'react'

const CORRECT_PASSWORD = '5338scouting'
const YELLOW = '#fee801'
const TEAL = '#61dde1'

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) onLogin()
    else setError(true)
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    }}>
      <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>

        {/* Logo */}
        <img
          src="/logo.png"
          alt="RoboLoCo"
          style={{ width: 90, height: 90, borderRadius: 20, objectFit: 'contain' }}
        />

        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 38, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-1px', color: TEAL }}>
            RoboLoCo Scouting
          </div>
          <div style={{ color: '#444', fontSize: 13, marginTop: 6 }}>FRC Team 5338</div>
        </div>

        {/* Card */}
        <div style={{
          width: '100%',
          backgroundColor: '#111',
          border: '1.5px solid #2a2a2a',
          borderRadius: 18,
          padding: 24,
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{
                display: 'block',
                color: YELLOW,
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(false) }}
                placeholder="Enter password..."
                autoComplete="current-password"
                style={{
                  width: '100%',
                  backgroundColor: '#1a1a1a',
                  border: `1.5px solid ${error ? '#ef4444' : '#2e2e2e'}`,
                  borderRadius: 10,
                  padding: '11px 14px',
                  color: '#fff',
                  fontSize: 15,
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
                onFocus={e => { if (!error) e.target.style.borderColor = YELLOW }}
                onBlur={e => { if (!error) e.target.style.borderColor = '#2e2e2e' }}
              />
              {error && (
                <div style={{ color: '#ef4444', fontSize: 12, marginTop: 5 }}>
                  Incorrect password. Try again.
                </div>
              )}
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: 12,
                backgroundColor: TEAL,
                color: '#000',
                fontWeight: 900,
                fontSize: 15,
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.04em',
              }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
