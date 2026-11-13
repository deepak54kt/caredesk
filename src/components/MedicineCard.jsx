import { useEffect, useState } from 'react'
import { ImageOff } from 'lucide-react'
import { readImage } from '../data/imageStore'
export default function MedicineCard({ medicine, onEdit, onDelete }) {
  const [imageUrl, setImageUrl] = useState(medicine.image || '')
  useEffect(() => {
    let objectUrl = ''
    readImage(medicine.imageKey).then((file) => {
      if (file) {
        objectUrl = URL.createObjectURL(file)
        setImageUrl(objectUrl)
      }
    }).catch(() => undefined)
    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl) }
  }, [medicine.imageKey, medicine.image])
  return <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex h-40 items-center justify-center bg-slate-50"><img src={imageUrl} alt={medicine.name} className="h-full w-full object-contain p-5" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex' }} /><div className="hidden items-center gap-2 text-xs text-slate-400"><ImageOff size={16} />Image placeholder</div></div><div className="p-5"><span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-[#246fce]">{medicine.category}</span><h3 className="mt-3 text-sm font-bold text-slate-800">{medicine.name}</h3><p className="mt-2 text-xs leading-5 text-slate-500">{medicine.description}</p><p className="mt-3 border-t border-slate-100 pt-3 text-[11px] leading-4 text-slate-400"><span className="font-bold text-slate-500">Usage: </span>{medicine.usage}</p><div className="mt-4 flex gap-3"><button onClick={onEdit} className="text-xs font-semibold text-[#2f80ed]">Edit</button><button onClick={onDelete} className="text-xs font-semibold text-red-400">Delete</button></div></div></article>
}
