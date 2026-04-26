import { useState, useRef } from 'react'
import Toast from './Toast'

const SHEET_URL = import.meta.env.VITE_SHEET_URL

const YELLOW = '#fee801'
const TEAL = '#61dde1'

const inputStyle = {
  backgroundColor: '#111',
  border: `1.5px solid ${YELLOW}`,
  color: '#fff',
  width: '100%',
  borderRadius: '6px',
  padding: '10px 12px',
  fontSize: '15px',
  outline: 'none',
  resize: 'vertical',
}

const labelStyle = {
  color: YELLOW,
  fontWeight: '600',
  fontSize: '14px',
  display: 'block',
  marginBottom: '5px',
}

function SectionHeading({ children }) {
  return (
    <h2
      className="text-lg font-bold mt-2 mb-4 pb-1"
      style={{
        color: YELLOW,
        borderBottom: `2px solid ${YELLOW}`,
        textDecoration: 'underline',
        textUnderlineOffset: '4px',
      }}
    >
      {children}
    </h2>
  )
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

function TextArea({ placeholder, value, onChange, rows = 3 }) {
  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={inputStyle}
    />
  )
}

function TextInput({ placeholder, value, onChange, type = 'text' }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={inputStyle}
    />
  )
}

function ToggleGroup({ options, value, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt) => {
        const selected = value === opt
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className="px-5 py-2 rounded-full font-semibold text-sm transition-all"
            style={
              selected
                ? { backgroundColor: TEAL, color: '#000', border: `2px solid ${TEAL}` }
                : { backgroundColor: '#000', color: YELLOW, border: `2px solid ${YELLOW}` }
            }
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

function RatingSlider({ value, onChange }) {
  return (
    <div className="flex items-center gap-4">
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1"
        style={{ accentColor: TEAL }}
      />
      <span
        className="text-xl font-bold w-8 text-center"
        style={{ color: TEAL }}
      >
        {value}
      </span>
    </div>
  )
}

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

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e?.target ? e.target.value : e }))

  const setDirect = (key) => (val) =>
    setForm((f) => ({ ...f, [key]: val }))

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!SHEET_URL) {
      showToast('No VITE_SHEET_URL configured. Check your .env file.', 'error')
      return
    }

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
      showToast('Scout submitted!', 'success')
      const savedName = form.scouterName
      setForm({ ...defaultForm, scouterName: savedName })
    } catch (err) {
      showToast('Submission failed. Check your connection.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} />}

      <form
        onSubmit={handleSubmit}
        className="rounded-lg p-6 mb-8"
        style={{ border: `2px solid ${YELLOW}`, backgroundColor: '#0a0a0a' }}
      >
        {/* Match Info */}
        <SectionHeading>Match Info</SectionHeading>

        <Field label="Scouter Name">
          <TextInput
            placeholder="Your name..."
            value={form.scouterName}
            onChange={set('scouterName')}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Match #">
            <TextInput
              type="number"
              placeholder="e.g. 12"
              value={form.matchNumber}
              onChange={set('matchNumber')}
            />
          </Field>
          <Field label="Team #">
            <TextInput
              type="number"
              placeholder="e.g. 5338"
              value={form.teamNumber}
              onChange={set('teamNumber')}
            />
          </Field>
        </div>

        <Field label="Alliance">
          <select
            value={form.alliance}
            onChange={set('alliance')}
            style={inputStyle}
          >
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
          </select>
        </Field>

        {/* Auto */}
        <SectionHeading>Auto</SectionHeading>

        <Field label="Auto Path">
          <TextArea
            placeholder="Describe their auto path..."
            value={form.autoPath}
            onChange={set('autoPath')}
          />
        </Field>

        <Field label="Transition Period">
          <TextArea
            placeholder="What did they do during transition?"
            value={form.transitionPeriod}
            onChange={set('transitionPeriod')}
          />
        </Field>

        {/* Tele-Op */}
        <SectionHeading>Tele-Op</SectionHeading>

        <Field label="Tele-Op ACTIVE Notes">
          <TextArea
            placeholder="What did they do when actively engaged?"
            value={form.teleOpActive}
            onChange={set('teleOpActive')}
          />
        </Field>

        <Field label="Tele-Op INACTIVE Notes">
          <TextArea
            placeholder="What did they do when not engaged?"
            value={form.teleOpInactive}
            onChange={set('teleOpInactive')}
          />
        </Field>

        <Field label="Shooting Rating">
          <RatingSlider
            value={form.shootingRating}
            onChange={setDirect('shootingRating')}
          />
          <div className="mt-2">
            <TextArea
              placeholder="Shooting notes..."
              value={form.shootingNotes}
              onChange={set('shootingNotes')}
              rows={2}
            />
          </div>
        </Field>

        <Field label="Intaking Rating">
          <RatingSlider
            value={form.intakingRating}
            onChange={setDirect('intakingRating')}
          />
          <div className="mt-2">
            <TextArea
              placeholder="Intaking notes..."
              value={form.intakingNotes}
              onChange={set('intakingNotes')}
              rows={2}
            />
          </div>
        </Field>

        {/* Endgame */}
        <SectionHeading>Endgame</SectionHeading>

        <Field label="Endgame Notes">
          <TextArea
            placeholder="Describe endgame behavior..."
            value={form.endgameNotes}
            onChange={set('endgameNotes')}
          />
        </Field>

        <Field label="Climb Level">
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((lvl) => {
              const selected = form.climbLevel === lvl
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, climbLevel: lvl }))}
                  className="flex-1 py-2 rounded-full font-bold text-sm transition-all"
                  style={
                    selected
                      ? { backgroundColor: TEAL, color: '#000', border: `2px solid ${TEAL}` }
                      : { backgroundColor: '#000', color: YELLOW, border: `2px solid ${YELLOW}` }
                  }
                >
                  {lvl}
                </button>
              )
            })}
          </div>
        </Field>

        {/* Defense & Incidents */}
        <SectionHeading>Defense &amp; Incidents</SectionHeading>

        <Field label="Defended?">
          <ToggleGroup
            options={['Yes', 'No']}
            value={form.defended}
            onChange={setDirect('defended')}
          />
          {form.defended === 'Yes' && (
            <div className="mt-2">
              <TextArea
                placeholder="Notes on how they were defended..."
                value={form.defendedNotes}
                onChange={set('defendedNotes')}
                rows={2}
              />
            </div>
          )}
        </Field>

        <Field label="Played Defense?">
          <ToggleGroup
            options={['Yes', 'No']}
            value={form.playedDefense}
            onChange={setDirect('playedDefense')}
          />
          {form.playedDefense === 'Yes' && (
            <div className="mt-2">
              <TextArea
                placeholder="Notes on their defense..."
                value={form.defenseNotes}
                onChange={set('defenseNotes')}
                rows={2}
              />
            </div>
          )}
        </Field>

        <Field label="Immobilized/Breakdown?">
          <ToggleGroup
            options={['Yes', 'No']}
            value={form.immobilized}
            onChange={setDirect('immobilized')}
          />
          {form.immobilized === 'Yes' && (
            <div className="mt-2">
              <TextArea
                placeholder="Describe the breakdown..."
                value={form.immobilizedNotes}
                onChange={set('immobilizedNotes')}
                rows={2}
              />
            </div>
          )}
        </Field>

        <Field label="Penalties (optional)">
          <TextArea
            placeholder="Any penalties? Leave blank if none."
            value={form.penalties}
            onChange={set('penalties')}
            rows={2}
          />
        </Field>

        <Field label="Other Notes">
          <TextArea
            placeholder="Any other observations..."
            value={form.otherNotes}
            onChange={set('otherNotes')}
          />
        </Field>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 rounded-lg font-bold text-black text-base transition-opacity mt-2"
          style={{
            backgroundColor: TEAL,
            opacity: submitting ? 0.7 : 1,
            cursor: submitting ? 'not-allowed' : 'pointer',
          }}
        >
          {submitting ? 'Submitting...' : 'Submit Scout'}
        </button>
      </form>
    </>
  )
}
