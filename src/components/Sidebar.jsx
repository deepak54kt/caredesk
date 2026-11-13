import { CalendarDays, ClipboardList, LayoutDashboard, Pill, Settings as SettingsIcon, Stethoscope, Users, X } from 'lucide-react'

const items = [
  ['Dashboard', LayoutDashboard], ['Patients', Users], ['Appointments', CalendarDays],
  ['Patient History', ClipboardList], ['Medicines', Pill],
  ['Settings', SettingsIcon],
]

export default function Sidebar({ activePage, onNavigate, open, onClose }) {
  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-248px border-r border-slate-200 bg-white px-4 py-6 transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between px-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2f80ed] text-white"><Stethoscope size={21} strokeWidth={2.2} /></div>
          <span className="text-[20px] font-bold tracking-tight text-slate-900">Care<span className="text-[#2f80ed]">Desk</span></span>
        </div>
        <button className="text-slate-400 lg:hidden" onClick={onClose} aria-label="Close navigation"><X size={20} /></button>
      </div>
      <div className="mb-8 mt-8" />
      <nav className="space-y-1">
        {items.map(([label, Icon]) => <button key={label} onClick={() => { onNavigate(label); onClose() }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-semibold transition ${activePage === label ? 'bg-blue-50 text-[#246fce]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}><Icon size={18} strokeWidth={1.9} />{label}</button>)}
      </nav>
    </aside>
  )
}
