import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { deleteImage, readImage, saveImage } from '../data/imageStore'

const blank = { name: '', category: '', description: '', usage: '', image: '', imageKey: '', imageName: '' }

export default function MedicineForm({ medicine, onSave, onClose }) {
  const [form, setForm] = useState(medicine || blank)
  const [previewUrl, setPreviewUrl] = useState(medicine?.image || '')
  const [error, setError] = useState('')
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  useEffect(() => {
    let active = true
    let objectUrl = ''
    readImage(form.imageKey).then((file) => {
      if (!active || !file) return
      objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)
    }).catch(() => undefined)
    return () => {
      active = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [form.imageKey])
  const handleImage = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Choose a JPG, PNG, or WEBP image.')
      return
    }
    try {
      const imageKey = await saveImage(file)
      update('imageKey', imageKey)
      update('imageName', file.name)
      setPreviewUrl(URL.createObjectURL(file))
      setError('')
    } catch {
      setError('The selected image could not be saved.')
    }
  }
  const removeImage = async () => {
    try {
      await deleteImage(form.imageKey)
      setForm((current) => ({ ...current, imageKey: '', imageName: '', image: '' }))
      setPreviewUrl('')
    } catch {
      setError('The image could not be removed.')
    }
  }
  const submit = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.category.trim() || !form.description.trim() || !form.usage.trim()) {
      setError('Name, category, description, and usage are required.')
      return
    }
    onSave({ ...form, name: form.name.trim(), category: form.category.trim(), description: form.description.trim(), usage: form.usage.trim() })
  }
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 p-4"><form onSubmit={submit} className="max-h-[94vh] w-full max-w-lg overflow-auto rounded-2xl bg-white p-6 shadow-2xl"><div className="mb-5 flex items-center justify-between"><div><h2 className="text-lg font-bold">{medicine ? 'Edit medicine' : 'Add medicine'}</h2><p className="mt-1 text-xs text-slate-400">Medicine reference information</p></div><button type="button" onClick={onClose} className="text-slate-400"><X size={20} /></button></div><div className="space-y-4">{[['name', 'Medicine name'], ['category', 'Category'], ['description', 'Description'], ['usage', 'Usage information']].map(([key, label]) => <label key={key} className="block text-xs font-semibold text-slate-600">{label}{key === 'description' || key === 'usage' ? <textarea required rows="3" value={form[key] || ''} onChange={(e) => update(key, e.target.value)} className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" /> : <input required value={form[key] || ''} onChange={(e) => update(key, e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" />}</label>)}<div className="text-xs font-semibold text-slate-600">Medicine image<div className="mt-1.5 flex flex-wrap items-center gap-3"><label className="cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">Choose Image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImage} className="sr-only" /></label>{form.imageName && <span className="text-[11px] text-slate-400">{form.imageName}</span>}{(previewUrl || form.imageKey) && <button type="button" onClick={removeImage} className="text-xs font-semibold text-red-400">Remove</button>}</div></div>{previewUrl && <img src={previewUrl} alt="Medicine preview" className="h-28 w-28 rounded-lg bg-slate-50 object-contain p-2" />}</div>{error && <p className="mt-4 text-xs text-red-500">{error}</p>}<div className="mt-6 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-lg px-4 py-2.5 text-xs font-bold text-slate-500">Cancel</button><button className="rounded-lg bg-[#2f80ed] px-4 py-2.5 text-xs font-bold text-white">{medicine ? 'Save changes' : 'Add medicine'}</button></div></form></div>
}
