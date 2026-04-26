export default function Toast({ message, type = 'success' }) {
  const isSuccess = type === 'success'
  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      style={{ animation: 'slideUp 0.25s ease-out' }}
    >
      <div
        className="flex items-center gap-3 px-5 py-3 rounded-2xl font-semibold text-sm shadow-2xl"
        style={{
          backgroundColor: '#111',
          border: `1.5px solid ${isSuccess ? '#61dde1' : '#ef4444'}`,
          color: isSuccess ? '#61dde1' : '#ef4444',
          whiteSpace: 'nowrap',
        }}
      >
        <span
          className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
          style={{ backgroundColor: isSuccess ? '#61dde1' : '#ef4444', color: '#000' }}
        >
          {isSuccess ? '✓' : '✕'}
        </span>
        {message}
      </div>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  )
}
