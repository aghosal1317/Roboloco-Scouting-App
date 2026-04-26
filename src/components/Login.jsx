import { useState } from 'react'

const CORRECT_PASSWORD = '5338scouting'

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      onLogin()
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    }
  }

  return (
    <div
      className="min-h-screen bg-black flex items-center justify-center px-4"
    >
      <div
        className="w-full max-w-sm p-8 rounded-lg border"
        style={{ borderColor: '#fee801', backgroundColor: '#0a0a0a' }}
      >
        <h1 className="text-3xl font-bold text-center mb-8 tracking-wide">
          <span style={{ color: '#fee801' }}>RoboLoCo</span>{' '}
          <span style={{ color: '#61dde1' }}>Scouting</span>
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-semibold"
              style={{ color: '#fee801' }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              placeholder="Enter password..."
              autoComplete="current-password"
              className="px-4 py-3 rounded text-white outline-none text-base"
              style={{
                backgroundColor: '#111',
                border: `2px solid ${error ? '#ef4444' : '#fee801'}`,
                color: '#fff',
              }}
            />
            {error && (
              <p className="text-red-400 text-sm mt-1">Incorrect password. Try again.</p>
            )}
          </div>

          <button
            type="submit"
            className="py-3 rounded font-bold text-black text-base transition-opacity hover:opacity-90 active:opacity-75 mt-2"
            style={{ backgroundColor: '#61dde1' }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
