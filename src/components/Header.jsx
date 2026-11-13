import { Bell, Menu, Search } from 'lucide-react'

export default function Header({ profile, onMenu }) {
  const initials = profile.fullName.split(/\s+/).filter(Boolean).map((part) => part[0]).join('').slice(0, 2).toUpperCase() || 'JD'
  return <header className="sticky top-0 z-20 flex h-16 min-w-0 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:h-76px sm:px-8 lg:px-10">
    <div className="flex items-center gap-3">
      <button className="text-slate-500 lg:hidden" onClick={onMenu} aria-label="Open navigation"><Menu size={22} /></button>
      <div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-slate-400 sm:flex"><Search size={16} /><span className="text-xs">Search workspace</span><span className="ml-10 rounded bg-slate-100 px-1.5 py-0.5 text-[10px]">⌘ K</span></div>
    </div>
    <div className="flex min-w-0 items-center gap-2 sm:gap-4">
    <span className="mr-1 truncate text-sm font-bold text-slate-700 sm:hidden">CareDesk</span>
      <button className="relative text-slate-400" aria-label="Notifications"><Bell size={19} /><span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#2f80ed]" /></button>
      <div className="h-8 w-px bg-slate-200" />
      <div className="flex min-w-0 items-center gap-2"><div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#dbeafe] text-xs font-bold text-[#246fce]">{profile.imageUrl ? <img src={profile.imageUrl} alt="" className="h-full w-full object-cover" /> : initials}</div><div className="hidden min-w-0 text-left sm:block"><p className="max-w-150px truncate text-xs font-semibold text-slate-700">{profile.fullName}</p><p className="max-w-150px truncate text-[10px] text-slate-400">{profile.jobTitle}</p></div></div>
    </div>
  </header>
}
