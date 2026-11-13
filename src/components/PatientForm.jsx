import { useState } from 'react'
import { X } from 'lucide-react'

const blank = { name: '', age: '', gender: 'Female', phone: '', email: '', notes: '' }
export default function PatientForm({ patient, onSave, onClose }) {
  const [form, setForm] = useState(patient || blank)
  const [error, setError] = useState('')
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const submit = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.age || !form.phone.trim()) return setError('Name, age, and phone number are required.')
    if (Number(form.age) < 0 || Number(form.age) > 120) return setError('Please enter an age between 0 and 120.')
    onSave({ ...form, name: form.name.trim(), phone: form.phone.trim(), age: Number(form.age) })
  }
  return <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/30 p-3 sm:p-4"><form onSubmit={submit} className="my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl sm:p-6"><div className="mb-5 flex items-center justify-between"><div><h2 className="text-lg font-bold text-slate-900">{patient ? 'Edit patient' : 'Add patient'}</h2><p className="mt-1 text-xs text-slate-400">Patient information</p></div><button type="button" onClick={onClose} className="text-slate-400"><X size={20} /></button></div><div className="grid gap-4 sm:grid-cols-2">{[['name', 'Full name', 'text'], ['age', 'Age', 'number'], ['phone', 'Phone number', 'tel'], ['email', 'Email address', 'email']].map(([key, label, type]) => <label key={key} className="text-xs font-semibold text-slate-600">{label}<input required={['name','age','phone'].includes(key)} type={type} value={form[key] || ''} onChange={(e) => update(key, e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" /></label>)}<label className="text-xs font-semibold text-slate-600">Gender<select value={form.gender} onChange={(e) => update('gender', e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal outline-none"><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option></select></label><label className="text-xs font-semibold text-slate-600 sm:col-span-2">Additional notes<textarea rows="3" value={form.notes || ''} onChange={(e) => update('notes', e.target.value)} className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" /></label></div>{error && <p className="mt-4 text-xs font-medium text-red-500">{error}</p>}<div className="mt-6 flex flex-col-reverse justify-end gap-2 sm:flex-row sm:gap-3"><button type="button" onClick={onClose} className="rounded-lg px-4 py-2.5 text-xs font-bold text-slate-500 hover:bg-slate-50">Cancel</button><button className="rounded-lg bg-[#2f80ed] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#246fce]">{patient ? 'Save changes' : 'Add patient'}</button></div></form></div>
}
