export default function Toast({ message, type = 'success' }) {
  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg font-semibold text-sm shadow-lg z-50 pointer-events-none"
      style={{
        backgroundColor: '#111',
        color: type === 'success' ? '#61dde1' : '#ef4444',
        border: `1.5px solid ${type === 'success' ? '#61dde1' : '#ef4444'}`,
        minWidth: '220px',
        textAlign: 'center',
      }}
    >
      {type === 'success' ? '✓ ' : '✕ '}
      {message}
    </div>
  )
}
