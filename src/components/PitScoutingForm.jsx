import { useState } from 'react'
import Toast from './Toast'

const SHEET_URL = import.meta.env.VITE_SHEET_URL
const YELLOW = '#fee801'
const TEAL = '#61dde1'

/* ── shared primitives (same style as ScoutingForm) ── */

function Card({ children }) {
  return (
    <div style={{
      backgroundColor: '#111', border: '1.5px solid #2a2a2a',
      borderRadius: 16, padding: '20px 20px 8px', marginBottom: 16,
    }}>
      {children}
    </div>
  )
}

function SectionHeading({ icon, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
      {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
      <span style={{ color: YELLOW, fontWeight: 800, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, backgroundColor: '#2a2a2a' }} />
    </div>
  )
}

function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
        <span style={{ color: YELLOW, fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {label}
        </span>
        {hint && <span style={{ color: '#555', fontSize: 11 }}>{hint}</span>}
      </div>
      {children}
    </div>
  )
}

const inputStyle = {
  width: '100%', backgroundColor: '#1a1a1a', border: '1.5px solid #2e2e2e',
  borderRadius: 10, padding: '10px 14px', color: '#fff', fontSize: 14,
  outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'border-color 0.15s',
}

function Input({ type = 'text', placeholder, value, onChange }) {
  return (
    <input type={type} placeholder={placeholder} value={value} onChange={onChange}
      style={inputStyle}
      onFocus={e => (e.target.style.borderColor = YELLOW)}
      onBlur={e => (e.target.style.borderColor = '#2e2e2e')}
    />
  )
}

function Select({ value, onChange, children }) {
  return (
    <select value={value} onChange={onChange}
      style={{ ...inputStyle, cursor: 'pointer' }}
      onFocus={e => (e.target.style.borderColor = YELLOW)}
      onBlur={e => (e.target.style.borderColor = '#2e2e2e')}
    >
      {children}
    </select>
  )
}

/* ── form ── */

const defaultForm = {
  teamNumber: '',
  height: '',
  shooter: '',
  indexer: '',
  hopperCapacity: '',
  cycles: '',
  driveTrain: '',
  weight: '',
  dimensions: '',
  overBump: '',
  underTrench: '',
}

export default function PitScoutingForm() {
  const [form, setForm] = useState(defaultForm)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState(null)

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!SHEET_URL) { showToast('No VITE_SHEET_URL set in .env', 'error'); return }
    setSubmitting(true)
    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'pit', ...form }),
      })
      showToast('Pit scout submitted!')
      setForm(defaultForm)
    } catch {
      showToast('Submission failed. Check connection.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} />}
      <form onSubmit={handleSubmit}>

        {/* Robot Info */}
        <Card>
          <SectionHeading icon="🤖">Robot Info</SectionHeading>

          <Field label="Team Number">
            <Input type="number" placeholder="e.g. 5338" value={form.teamNumber} onChange={set('teamNumber')} />
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Height" hint="inches">
              <Input type="number" placeholder="e.g. 48" value={form.height} onChange={set('height')} />
            </Field>
            <Field label="Weight" hint="lbs">
              <Input type="number" placeholder="e.g. 120" value={form.weight} onChange={set('weight')} />
            </Field>
          </div>

          <Field label="Dimensions" hint="L × W">
            <Input placeholder="e.g. 28 x 26" value={form.dimensions} onChange={set('dimensions')} />
          </Field>

          <Field label="Drive Train Type">
            <Select value={form.driveTrain} onChange={set('driveTrain')}>
              <option value="">Select...</option>
              <option value="Swerve">Swerve Drive</option>
              <option value="Tank">Tank Drive</option>
              <option value="Mecanum">Mecanum Drive</option>
              <option value="West Coast">West Coast Drive</option>
              <option value="H-Drive">H-Drive</option>
              <option value="Other">Other</option>
            </Select>
          </Field>
        </Card>

        {/* Mechanism Info */}
        <Card>
          <SectionHeading icon="⚙️">Mechanisms</SectionHeading>

          <Field label="Shooter">
            <Select value={form.shooter} onChange={set('shooter')}>
              <option value="">Select...</option>
              <option value="Fixed Hood">Fixed Hood</option>
              <option value="Adjustable Hood">Adjustable Hood</option>
              <option value="Turret">Turret</option>
              <option value="None">None</option>
              <option value="Other">Other</option>
            </Select>
          </Field>

          <Field label="Indexer">
            <Select value={form.indexer} onChange={set('indexer')}>
              <option value="">Select...</option>
              <option value="Roller">Roller</option>
              <option value="Belt">Belt</option>
              <option value="Magazine">Magazine</option>
              <option value="None">None</option>
              <option value="Other">Other</option>
            </Select>
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Hopper Capacity" hint="# of balls">
              <Input type="number" placeholder="e.g. 5" value={form.hopperCapacity} onChange={set('hopperCapacity')} />
            </Field>
            <Field label="How many cycles?">
              <Input type="number" placeholder="e.g. 3" value={form.cycles} onChange={set('cycles')} />
            </Field>
          </div>
        </Card>

        {/* Field Clearances */}
        <Card>
          <SectionHeading icon="📐">Field Clearances</SectionHeading>

          <Field label="Can they go over the bump?">
            <Select value={form.overBump} onChange={set('overBump')}>
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Unknown">Unknown</option>
            </Select>
          </Field>

          <Field label="Can they go under the trench?">
            <Select value={form.underTrench} onChange={set('underTrench')}>
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Unknown">Unknown</option>
            </Select>
          </Field>
        </Card>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%', padding: 16, borderRadius: 14,
            backgroundColor: submitting ? '#3a8a8c' : TEAL,
            color: '#000', fontWeight: 900, fontSize: 16,
            letterSpacing: '0.05em', cursor: submitting ? 'not-allowed' : 'pointer',
            border: 'none', transition: 'all 0.15s', marginTop: 4,
          }}
        >
          {submitting ? 'Submitting...' : 'Submit Pit Scout'}
        </button>
      </form>
    </>
  )
}
