import { useState } from 'react'
import Toast from './Toast'

const SHEET_URL = import.meta.env.VITE_SHEET_URL
const YELLOW = '#fee801'
const TEAL = '#61dde1'

/* ── primitives ── */

function Card({ children }) {
  return (
    <div style={{
      backgroundColor: '#111',
      border: '1.5px solid #2a2a2a',
      borderRadius: 16,
      padding: '20px 20px 8px',
      marginBottom: 16,
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

function Label({ children, hint }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
      <span style={{ color: YELLOW, fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {children}
      </span>
      {hint && <span style={{ color: '#555', fontSize: 11 }}>{hint}</span>}
    </div>
  )
}

function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <Label hint={hint}>{label}</Label>
      {children}
    </div>
  )
}

const inputStyle = {
  width: '100%',
  backgroundColor: '#1a1a1a',
  border: '1.5px solid #2e2e2e',
  borderRadius: 10,
  padding: '10px 14px',
  color: '#fff',
  fontSize: 14,
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
}

function Input({ type = 'text', placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={inputStyle}
      onFocus={e => (e.target.style.borderColor = YELLOW)}
      onBlur={e => (e.target.style.borderColor = '#2e2e2e')}
    />
  )
}

function Textarea({ placeholder, value, onChange, rows = 3 }) {
  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ ...inputStyle, resize: 'vertical' }}
      onFocus={e => (e.target.style.borderColor = YELLOW)}
      onBlur={e => (e.target.style.borderColor = '#2e2e2e')}
    />
  )
}

function Select({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={onChange}
      style={{ ...inputStyle, cursor: 'pointer' }}
      onFocus={e => (e.target.style.borderColor = YELLOW)}
      onBlur={e => (e.target.style.borderColor = '#2e2e2e')}
    >
      {children}
    </select>
  )
}

function Toggle({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {options.map(opt => {
        const on = value === opt
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            style={{
              padding: '8px 24px',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              border: `1.5px solid ${on ? TEAL : '#333'}`,
              backgroundColor: on ? TEAL : '#1a1a1a',
              color: on ? '#000' : '#aaa',
              transition: 'all 0.15s',
            }}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

function Slider({ value, onChange }) {
  const pct = ((value - 1) / 9) * 100
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          flex: 1,
          background: `linear-gradient(to right, ${TEAL} ${pct}%, #2a2a2a ${pct}%)`,
        }}
      />
      <div style={{
        width: 42,
        height: 42,
        borderRadius: 10,
        border: `1.5px solid ${TEAL}`,
        backgroundColor: '#1a1a1a',
        color: TEAL,
        fontWeight: 900,
        fontSize: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {value}
      </div>
    </div>
  )
}

function ClimbButtons({ value, onChange }) {
  const levels = [
    { val: 0, label: '0', sub: 'None' },
    { val: 1, label: '1', sub: 'Low' },
    { val: 2, label: '2', sub: 'Mid' },
    { val: 3, label: '3', sub: 'High' },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
      {levels.map(({ val, label, sub }) => {
        const on = value === val
        return (
          <button
            key={val}
            type="button"
            onClick={() => onChange(val)}
            style={{
              padding: '12px 0 8px',
              borderRadius: 12,
              cursor: 'pointer',
              border: `1.5px solid ${on ? TEAL : '#2e2e2e'}`,
              backgroundColor: on ? TEAL : '#1a1a1a',
              color: on ? '#000' : '#666',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              transition: 'all 0.15s',
            }}
          >
            <span style={{ fontWeight: 900, fontSize: 20 }}>{label}</span>
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{sub}</span>
          </button>
        )
      })}
    </div>
  )
}

/* ── form state ── */

const defaultForm = {
  scouterName: '',
  matchNumber: '',
  teamNumber: '',
  alliance: 'Red',
  autoPath: '',
  transitionPeriod: '',
  teleOpActive: '',
  teleOpInactive: '',
  shootingRating: 5,
  shootingNotes: '',
  intakingRating: 5,
  intakingNotes: '',
  endgameNotes: '',
  climbLevel: null,
  defended: null,
  defendedNotes: '',
  playedDefense: null,
  defenseNotes: '',
  immobilized: null,
  immobilizedNotes: '',
  penalties: '',
  otherNotes: '',
}

export default function ScoutingForm() {
  const [form, setForm] = useState(defaultForm)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState(null)

  const set = key => e => setForm(f => ({ ...f, [key]: e?.target ? e.target.value : e }))
  const setVal = key => val => setForm(f => ({ ...f, [key]: val }))

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
        body: JSON.stringify({
          ...form,
          climbLevel: form.climbLevel ?? 0,
          defended: form.defended ?? 'No',
          playedDefense: form.playedDefense ?? 'No',
          immobilized: form.immobilized ?? 'No',
        }),
      })
      showToast('Match data saved to sheet.')
      const name = form.scouterName
      setForm({ ...defaultForm, scouterName: name })
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

        {/* Match Info */}
        <Card>
          <SectionHeading icon="📋">Match Info</SectionHeading>
          <Field label="Scouter Name">
            <Input placeholder="Your name..." value={form.scouterName} onChange={set('scouterName')} />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Match #">
              <Input type="number" placeholder="e.g. 12" value={form.matchNumber} onChange={set('matchNumber')} />
            </Field>
            <Field label="Team #">
              <Input type="number" placeholder="e.g. 5338" value={form.teamNumber} onChange={set('teamNumber')} />
            </Field>
          </div>
          <Field label="Alliance">
            <Select value={form.alliance} onChange={set('alliance')}>
              <option value="Red">🔴  Red Alliance</option>
              <option value="Blue">🔵  Blue Alliance</option>
            </Select>
          </Field>
        </Card>

        {/* Auto */}
        <Card>
          <SectionHeading icon="🤖">Auto</SectionHeading>
          <Field label="Auto Path">
            <Textarea placeholder="Describe their auto path..." value={form.autoPath} onChange={set('autoPath')} />
          </Field>
          <Field label="Transition Period">
            <Textarea placeholder="What did they do during transition?" value={form.transitionPeriod} onChange={set('transitionPeriod')} />
          </Field>
        </Card>

        {/* Tele-Op */}
        <Card>
          <SectionHeading icon="🕹️">Tele-Op</SectionHeading>
          <Field label="Active Notes" hint="when engaged">
            <Textarea placeholder="What did they do when actively engaged?" value={form.teleOpActive} onChange={set('teleOpActive')} />
          </Field>
          <Field label="Inactive Notes" hint="when not engaged">
            <Textarea placeholder="What did they do when not engaged?" value={form.teleOpInactive} onChange={set('teleOpInactive')} />
          </Field>
          <Field label="Shooting" hint="rate 1–10">
            <Slider value={form.shootingRating} onChange={setVal('shootingRating')} />
            <div style={{ marginTop: 8 }}>
              <Textarea placeholder="Shooting notes..." value={form.shootingNotes} onChange={set('shootingNotes')} rows={2} />
            </div>
          </Field>
          <Field label="Intaking" hint="rate 1–10">
            <Slider value={form.intakingRating} onChange={setVal('intakingRating')} />
            <div style={{ marginTop: 8 }}>
              <Textarea placeholder="Intaking notes..." value={form.intakingNotes} onChange={set('intakingNotes')} rows={2} />
            </div>
          </Field>
        </Card>

        {/* Endgame */}
        <Card>
          <SectionHeading icon="🏁">Endgame</SectionHeading>
          <Field label="Endgame Notes">
            <Textarea placeholder="Describe endgame behavior..." value={form.endgameNotes} onChange={set('endgameNotes')} />
          </Field>
          <Field label="Climb Level">
            <ClimbButtons value={form.climbLevel} onChange={setVal('climbLevel')} />
          </Field>
        </Card>

        {/* Defense & Incidents */}
        <Card>
          <SectionHeading icon="🛡️">Defense &amp; Incidents</SectionHeading>

          <Field label="Defended?">
            <Toggle options={['Yes', 'No']} value={form.defended} onChange={setVal('defended')} />
            {form.defended === 'Yes' && (
              <div style={{ marginTop: 8 }}>
                <Textarea placeholder="Notes on how they were defended..." value={form.defendedNotes} onChange={set('defendedNotes')} rows={2} />
              </div>
            )}
          </Field>

          <Field label="Played Defense?">
            <Toggle options={['Yes', 'No']} value={form.playedDefense} onChange={setVal('playedDefense')} />
            {form.playedDefense === 'Yes' && (
              <div style={{ marginTop: 8 }}>
                <Textarea placeholder="Notes on their defense..." value={form.defenseNotes} onChange={set('defenseNotes')} rows={2} />
              </div>
            )}
          </Field>

          <Field label="Immobilized / Breakdown?">
            <Toggle options={['Yes', 'No']} value={form.immobilized} onChange={setVal('immobilized')} />
            {form.immobilized === 'Yes' && (
              <div style={{ marginTop: 8 }}>
                <Textarea placeholder="Describe the breakdown..." value={form.immobilizedNotes} onChange={set('immobilizedNotes')} rows={2} />
              </div>
            )}
          </Field>

          <Field label="Penalties" hint="optional">
            <Textarea placeholder="Any penalties? Leave blank if none." value={form.penalties} onChange={set('penalties')} rows={2} />
          </Field>
        </Card>

        {/* Other Notes */}
        <Card>
          <SectionHeading icon="📝">Other Notes</SectionHeading>
          <div style={{ marginBottom: 12 }}>
            <Textarea placeholder="Any other observations..." value={form.otherNotes} onChange={set('otherNotes')} rows={3} />
          </div>
        </Card>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: 14,
            backgroundColor: submitting ? '#3a8a8c' : TEAL,
            color: '#000',
            fontWeight: 900,
            fontSize: 16,
            letterSpacing: '0.05em',
            cursor: submitting ? 'not-allowed' : 'pointer',
            border: 'none',
            transition: 'all 0.15s',
            marginTop: 4,
          }}
        >
          {submitting ? 'Submitting...' : 'Submit Scout'}
        </button>
      </form>
    </>
  )
}
