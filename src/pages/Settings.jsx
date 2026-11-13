import { useState } from 'react'
import { saveImage } from '../data/imageStore'
import { PageTitle } from './Patients'

export default function Settings({ profile, setProfile }) {
  const [form, setForm] = useState(profile)
  const [saved, setSaved] = useState(false)
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const handleImage = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const imageKey = await saveImage(file)
    update('imageKey', imageKey)
    update('imageName', file.name)
    update('imageUrl', URL.createObjectURL(file))
  }
  const save = (event) => {
    event.preventDefault()
    if (!form.fullName.trim() || !form.jobTitle.trim()) return
    setProfile({ fullName: form.fullName.trim(), jobTitle: form.jobTitle.trim(), email: form.email.trim(), imageKey: form.imageKey || '', imageName: form.imageName || '' })
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1800)
  }
  return <PageTitle title="Settings" description="Manage your profile and workspace preferences."><div className="max-w-2xl space-y-5"><form onSubmit={save} className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-sm font-bold text-slate-800">My Profile</h2><p className="mt-1 text-xs text-slate-500">Update the profile shown across CareDesk.</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-xs font-semibold text-slate-600">Full Name<input required value={form.fullName} onChange={(e) => update('fullName', e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" /></label><label className="text-xs font-semibold text-slate-600">Job Title / Designation<input required value={form.jobTitle} onChange={(e) => update('jobTitle', e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" /></label><label className="text-xs font-semibold text-slate-600">Email (optional)<input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" /></label><label className="text-xs font-semibold text-slate-600">Profile Image (optional)<input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImage} className="mt-1.5 block w-full text-xs text-slate-500" />{form.imageName && <span className="mt-1 block text-[11px] text-slate-400">{form.imageName}</span>}</label></div>{(form.imageUrl || profile.imageUrl) && <img src={form.imageUrl || profile.imageUrl} alt="Profile preview" className="mt-4 h-16 w-16 rounded-full object-cover" />}<div className="mt-6 flex items-center gap-3"><button className="rounded-lg bg-[#2f80ed] px-4 py-2.5 text-xs font-bold text-white">Save profile</button>{saved && <p className="text-xs font-semibold text-emerald-600">Profile saved.</p>}</div></form><div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5"><h2 className="text-sm font-bold text-slate-800">About this workspace</h2><p className="mt-2 text-xs leading-5 text-slate-600">Sample records are fictional and for demonstration only. They are not clinical records or medical advice.</p></div></div></PageTitle>
}
