import { useState } from 'react'
import MedicineCard from '../components/MedicineCard'
import MedicineForm from '../components/MedicineForm'
import { medicines as defaultMedicines } from '../data/medicines'
import { PageTitle } from './Patients'

export default function Medicines({ medicines = defaultMedicines, setMedicines }) {
  const [category, setCategory] = useState('All categories')
  const [modal, setModal] = useState(null)
  const categories = ['All categories', ...new Set(medicines.map((item) => item.category))]
  const visible = category === 'All categories' ? medicines : medicines.filter((item) => item.category === category)
  const save = (data) => {
    if (modal?.id) setMedicines(medicines.map((item) => item.id === modal.id ? { ...data, id: item.id } : item))
    else setMedicines([...medicines, { ...data, id: `MED-${Date.now()}` }])
    setModal(null)
  }
  const remove = (id) => {
    if (window.confirm('Delete this medicine?')) setMedicines(medicines.filter((item) => item.id !== id))
  }
  return <PageTitle title="Medicines" description="Reference information for the medicine library." button="Add medicine" onButton={() => setModal({})}>
    <div className="mb-6 flex items-center gap-3"><label className="text-xs font-bold text-slate-600">Filter by category</label><select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">{categories.map((item) => <option key={item}>{item}</option>)}</select></div>
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{visible.map((medicine) => <MedicineCard key={medicine.id} medicine={medicine} onEdit={() => setModal(medicine)} onDelete={() => remove(medicine.id)} />)}</div>
    <p className="mt-7 text-center text-[11px] text-slate-400">Medicine information is for reference only and is not medical advice.</p>
    {modal && <MedicineForm medicine={modal.id ? modal : null} onSave={save} onClose={() => setModal(null)} />}
  </PageTitle>
}
