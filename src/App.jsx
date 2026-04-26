import { useState } from 'react'
import Login from './components/Login'
import ScoutingForm from './components/ScoutingForm'

export default function App() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem('rls_auth') === 'true'
  )

  const handleLogin = () => {
    sessionStorage.setItem('rls_auth', 'true')
    setAuthenticated(true)
  }

  if (!authenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="py-6 text-center border-b border-[#fee801]">
        <h1 className="text-3xl font-bold tracking-wide">
          <span style={{ color: '#fee801' }}>RoboLoCo</span>{' '}
          <span style={{ color: '#61dde1' }}>Scouting</span>
        </h1>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-6">
        <ScoutingForm />
      </main>
    </div>
  )
}
