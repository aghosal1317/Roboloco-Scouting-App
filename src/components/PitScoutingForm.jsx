import { useState } from 'react'
import Toast from './Toast'

const SHEET_URL = import.meta.env.VITE_SHEET_URL
const YELLOW = '#fee801'
const TEAL = '#61dde1'

/* ── primitives ── */

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

function SectionHeading({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
      <span style={{ color: YELLOW, fontWeight: 800, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, backgroundColor: '#2a2a2a' }} />
    </div>
  )
}

function Field({ label, hint, required, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
        <span style={{ color: YELLOW, fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {label}
        </span>
        {required && <span style={{ color: TEAL, fontSize: 11 }}>*</span>}
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

function Textarea({ placeholder, value, onChange, rows = 3 }) {
  return (
    <textarea rows={rows} placeholder={placeholder} value={value} onChange={onChange}
      style={{ ...inputStyle, resize: 'vertical' }}
      onFocus={e => (e.target.style.borderColor = YELLOW)}
      onBlur={e => (e.target.style.borderColor = '#2e2e2e')}
    />
  )
}

/* Single-select pill buttons */
function Toggle({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {options.map(opt => {
        const on = value === opt
        return (
          <button key={opt} type="button" onClick={() => onChange(opt)}
            style={{
              padding: '8px 20px', borderRadius: 999, fontWeight: 700, fontSize: 13,
              cursor: 'pointer', border: `1.5px solid ${on ? TEAL : '#333'}`,
              backgroundColor: on ? TEAL : '#1a1a1a', color: on ? '#000' : '#aaa',
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

/* Multi-select pill buttons (each independently toggled) */
function MultiToggle({ options, value = [], onChange }) {
  const toggle = (opt) => {
    const next = value.includes(opt) ? value.filter(v => v !== opt) : [...value, opt]
    onChange(next)
  }
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {options.map(opt => {
        const on = value.includes(opt)
        return (
          <button key={opt} type="button" onClick={() => toggle(opt)}
            style={{
              padding: '8px 20px', borderRadius: 999, fontWeight: 700, fontSize: 13,
              cursor: 'pointer', border: `1.5px solid ${on ? TEAL : '#333'}`,
              backgroundColor: on ? TEAL : '#1a1a1a', color: on ? '#000' : '#aaa',
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

/* ── form state ── */

const defaultForm = {
  teamNumber: '',
  weight: '',
  driveTrain: '',
  swerveMotors: [],
  swerveMotorsOther: '',
  hopperCapacity: '',
  traversal: [],          // Bump, Trench
  collection: [],         // Outpost, Depot
  driveTeamExp: '',
  bulldozing: '',
  intakeType: '',
  intakeOther: '',
  shooterStyle: '',
  shootMode: '',
  shootingPositions: '',
  climb: [],
  climbTiming: [],
  hasAuto: '',
  autoPaths: '',
  autoAlign: '',
  autoAlignOther: '',
  otherNotes: '',
}

export default function PitScoutingForm() {
  const [form, setForm] = useState(defaultForm)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState(null)

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))
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
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'pit',
          ...form,
          swerveMotors: form.swerveMotors.includes('Other')
            ? [...form.swerveMotors.filter(m => m !== 'Other'), form.swerveMotorsOther].filter(Boolean).join(', ')
            : form.swerveMotors.join(', '),
          traversal: form.traversal.join(', '),
          collection: form.collection.join(', '),
          climb: form.climb.join(', '),
          climbTiming: form.climbTiming.join(', '),
          intakeType: form.intakeType === 'Other' ? form.intakeOther : form.intakeType,
          autoAlign: form.autoAlign === 'Other' ? form.autoAlignOther : form.autoAlign,
        }),
      })
      showToast('Pit data saved to sheet.')
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

      {/* Swag reminder banner */}
      <div style={{
        backgroundColor: '#1a1200', border: `1.5px solid ${YELLOW}`,
        borderRadius: 12, padding: '12px 16px', marginBottom: 16,
        display: 'flex', alignItems: 'flex-start', gap: 10,
      }}>
        <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
        <p style={{ color: YELLOW, fontSize: 13, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
          Pick up swag at their pit to return to Saanvi as evidence of scouting!
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Robot Info */}
        <Card>
          <SectionHeading>Robot Info</SectionHeading>

          <Field label="Team Being Pit Scouted" required hint="e.g. 5338">
            <Input type="number" placeholder="Team number..." value={form.teamNumber} onChange={set('teamNumber')} />
          </Field>

          <Field label="Weight" hint="lbs, without bumpers/batteries — e.g. 100">
            <Input type="number" placeholder="e.g. 100" value={form.weight} onChange={set('weight')} />
          </Field>

          <Field label="Drive Train" required>
            <Toggle
              options={['Swerve', 'Tank', 'Mecanum']}
              value={form.driveTrain}
              onChange={setVal('driveTrain')}
            />
          </Field>

          <Field label="Swerve Motors" hint="select all that apply">
            <MultiToggle
              options={['Vortex', 'Neo', 'Kraken', 'Other']}
              value={form.swerveMotors}
              onChange={setVal('swerveMotors')}
            />
            {form.swerveMotors.includes('Other') && (
              <div style={{ marginTop: 8 }}>
                <Input placeholder="Describe swerve motor..." value={form.swerveMotorsOther} onChange={set('swerveMotorsOther')} />
              </div>
            )}
          </Field>
        </Card>

        {/* Capabilities */}
        <Card>
          <SectionHeading>Capabilities</SectionHeading>

          <Field label="Hopper Capacity" hint="e.g. 35">
            <Input type="number" placeholder="e.g. 35" value={form.hopperCapacity} onChange={set('hopperCapacity')} />
          </Field>

          <Field label="Can Traverse">
            <MultiToggle
              options={['Bump', 'Trench']}
              value={form.traversal}
              onChange={setVal('traversal')}
            />
          </Field>

          <Field label="Can Collect From">
            <MultiToggle
              options={['Outpost', 'Depot']}
              value={form.collection}
              onChange={setVal('collection')}
            />
          </Field>
        </Card>

        {/* Drive Team */}
        <Card>
          <SectionHeading>Drive Team</SectionHeading>

          <Field label="Drive Team Experience" hint="based on seasons participated">
            <Input type="number" placeholder="e.g. 3" value={form.driveTeamExp} onChange={set('driveTeamExp')} />
          </Field>

          <Field label="Bulldozing" hint="practiced? any specific features?">
            <Textarea placeholder="Has the team practiced bulldozing? Any specific features?" value={form.bulldozing} onChange={set('bulldozing')} rows={2} />
          </Field>
        </Card>

        {/* Scoring Mechanisms */}
        <Card>
          <SectionHeading>Scoring Mechanisms</SectionHeading>

          <Field label="Intake Type" required>
            <Toggle
              options={['Linear', 'Slapdown', '4 Bar', 'Other']}
              value={form.intakeType}
              onChange={setVal('intakeType')}
            />
            {form.intakeType === 'Other' && (
              <div style={{ marginTop: 8 }}>
                <Input placeholder="Describe intake type..." value={form.intakeOther} onChange={set('intakeOther')} />
              </div>
            )}
          </Field>

          <Field label="Shooter Mechanism Style" hint="turret, double shooter, etc.">
            <Textarea placeholder="Describe their shooter mechanism..." value={form.shooterStyle} onChange={set('shooterStyle')} rows={2} />
          </Field>

          <Field label="Shooting Mode">
            <Toggle
              options={['Shoot on the Move', 'Fixed Shooting']}
              value={form.shootMode}
              onChange={setVal('shootMode')}
            />
          </Field>

          {form.shootMode === 'Fixed Shooting' && (
            <Field label="Shooting Positions" hint="flush, trench, etc.">
              <Textarea placeholder="What are their shooting positions?" value={form.shootingPositions} onChange={set('shootingPositions')} rows={2} />
            </Field>
          )}
        </Card>

        {/* Endgame */}
        <Card>
          <SectionHeading>Endgame</SectionHeading>

          <Field label="Climb Level" hint="select all that apply">
            <MultiToggle
              options={['L1', 'L2', 'L3', 'No / Not Functional']}
              value={form.climb}
              onChange={setVal('climb')}
            />
          </Field>

          <Field label="When Can They Climb?" hint="select all that apply">
            <MultiToggle
              options={['Auto', 'Endgame', 'Cannot Climb']}
              value={form.climbTiming}
              onChange={setVal('climbTiming')}
            />
          </Field>
        </Card>

        {/* Autonomous */}
        <Card>
          <SectionHeading>Autonomous</SectionHeading>

          <Field label="Do they have auto(s)? Do they work?">
            <Textarea placeholder="Describe their auto(s) and whether they work..." value={form.hasAuto} onChange={set('hasAuto')} rows={2} />
          </Field>

          <Field label="Auto Path(s)" hint="climbing, feeder, preload, etc.">
            <Textarea placeholder="What are their auto path(s)?" value={form.autoPaths} onChange={set('autoPaths')} rows={2} />
          </Field>

          <Field label="Auto Align During Tele-Op?" required>
            <Toggle
              options={['Yes', 'No', 'Other']}
              value={form.autoAlign}
              onChange={setVal('autoAlign')}
            />
            {form.autoAlign === 'Other' && (
              <div style={{ marginTop: 8 }}>
                <Input placeholder="Describe..." value={form.autoAlignOther} onChange={set('autoAlignOther')} />
              </div>
            )}
          </Field>
        </Card>

        {/* Other Notes */}
        <Card>
          <SectionHeading>Other Notes</SectionHeading>
          <div style={{ marginBottom: 12 }}>
            <Textarea placeholder="Any other observations..." value={form.otherNotes} onChange={set('otherNotes')} rows={3} />
          </div>
        </Card>

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
