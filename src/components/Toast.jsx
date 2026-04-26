export default function Toast({ message, type = 'success' }) {
  const isSuccess = type === 'success'
  return (
    <>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(16px) scale(0.95); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)     scale(1);    }
        }
      `}</style>
      <div style={{
        position: 'fixed',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        pointerEvents: 'none',
        animation: 'toastIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 20px',
          borderRadius: 16,
          backgroundColor: '#141414',
          border: `1.5px solid ${isSuccess ? '#61dde1' : '#ef4444'}`,
          boxShadow: `0 8px 32px ${isSuccess ? 'rgba(97,221,225,0.15)' : 'rgba(239,68,68,0.15)'}, 0 2px 8px rgba(0,0,0,0.6)`,
          whiteSpace: 'nowrap',
        }}>
          {/* Icon bubble */}
          <div style={{
            width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
            backgroundColor: isSuccess ? 'rgba(97,221,225,0.15)' : 'rgba(239,68,68,0.15)',
            border: `1.5px solid ${isSuccess ? '#61dde1' : '#ef4444'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 900,
            color: isSuccess ? '#61dde1' : '#ef4444',
          }}>
            {isSuccess ? '✓' : '✕'}
          </div>

          {/* Text */}
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>
              {isSuccess ? 'Submitted!' : 'Error'}
            </div>
            <div style={{ color: '#666', fontSize: 12, marginTop: 2 }}>
              {message}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
