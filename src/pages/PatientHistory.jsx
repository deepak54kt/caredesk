import { useMemo, useState } from 'react'
import { ClipboardList } from 'lucide-react'
import HistoryForm from '../components/HistoryForm'
import { PageTitle } from './Patients'

export default function PatientHistory({ patients, history, setHistory }) {
  const [selected, setSelected] = useState(patients[0]?.id || '')
  const [modal, setModal] = useState(null)
  const patient = patients.find((p) => p.id === selected)
  const entries = useMemo(() => history.filter((h) => h.patientId === selected).sort((a, b) => b.date.localeCompare(a.date)), [history, selected])
  const save = (data) => {
    if (modal?.id) setHistory(history.map((item) => item.id === modal.id ? { ...data, id: item.id } : item))
    else setHistory([{ ...data, id: `HST-${Date.now()}` }, ...history])
    setModal(null)
  }
  const remove = (id) => {
    if (window.confirm('Delete this history entry?')) setHistory(history.filter((item) => item.id !== id))
  }
  return <PageTitle title="Patient history" description="Review and add chronological consultation entries." button="Add new history" onButton={() => patient && setModal({})}>
    <div className="mb-5 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <label className="text-xs font-bold text-slate-600">Viewing history for</label>
      <select value={selected} onChange={(e) => setSelected(e.target.value)} className="min-w-[220px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"><option value="">Select a patient</option>{patients.map((p) => <option key={p.id} value={p.id}>{p.name} · {p.id}</option>)}</select>
    </div>
    {patient ? <div className="space-y-3">{entries.length ? entries.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row"><div className="flex min-w-0 items-center gap-3"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#2f80ed]"><ClipboardList size={16} /></div><div className="min-w-0"><p className="break-words text-sm font-bold text-slate-700">{item.symptoms}</p><p className="text-[11px] text-slate-400">Consultation on {item.date}</p></div></div><div className="flex flex-wrap items-center gap-3"><span className="text-xs text-slate-400">{item.followUp ? `Follow-up: ${item.followUp}` : 'No follow-up date'}</span><button onClick={() => setModal(item)} className="text-xs font-semibold text-[#2f80ed]">Edit</button><button onClick={() => remove(item.id)} className="text-xs font-semibold text-red-400">Delete</button></div></div>
      <div className="mt-4 grid gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2"><div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Consultation notes</p><p className="mt-1 text-xs leading-5 text-slate-600">{item.notes}</p></div><div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Treatment notes</p><p className="mt-1 text-xs leading-5 text-slate-600">{item.treatment || 'No treatment notes added.'}</p></div></div>
    </article>) : <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"><p className="text-sm font-semibold text-slate-600">No history entries for {patient.name}</p><p className="mt-1 text-xs text-slate-400">Add a new consultation to get started.</p></div>}</div> : <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"><p className="text-sm font-semibold text-slate-600">Select a patient to view history</p><p className="mt-1 text-xs text-slate-400">Each patient can have multiple entries.</p></div>}
    {modal && <HistoryForm patient={patient} entry={modal.id ? modal : null} onSave={save} onClose={() => setModal(null)} />}
  </PageTitle>
}
