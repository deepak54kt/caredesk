import { useEffect, useMemo, useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import Appointments from './pages/Appointments'
import PatientHistory from './pages/PatientHistory'
import Medicines from './pages/Medicines'
import Settings from './pages/Settings'
import { demoAppointments } from './data/appointments'
import { demoPatients } from './data/patients'
import { demoHistory } from './data/history'
import { medicines as defaultMedicines } from './data/medicines'
import { readImage } from './data/imageStore'

const STORAGE_KEYS = {
  patients: 'caredesk_patients',
  appointments: 'caredesk_appointments',
  history: 'caredesk_history',
  medicines: 'caredesk_medicines',
  profile: 'caredesk_profile',
}

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [activePage, setActivePage] = useState('Dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [patients, setPatients] = useState(() => readStorage(STORAGE_KEYS.patients, demoPatients))
  const [appointments, setAppointments] = useState(() => readStorage(STORAGE_KEYS.appointments, demoAppointments))
  const [history, setHistory] = useState(() => readStorage(STORAGE_KEYS.history, demoHistory))
  const [medicines, setMedicines] = useState(() => readStorage(STORAGE_KEYS.medicines, defaultMedicines))
  const [profile, setProfile] = useState(() => readStorage(STORAGE_KEYS.profile, { fullName: 'Jordan Davis', jobTitle: 'Care coordinator', email: '', imageKey: '', imageName: '' }))
  const [profileImageUrl, setProfileImageUrl] = useState('')

  useEffect(() => localStorage.setItem(STORAGE_KEYS.patients, JSON.stringify(patients)), [patients])
  useEffect(() => localStorage.setItem(STORAGE_KEYS.appointments, JSON.stringify(appointments)), [appointments])
  useEffect(() => localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history)), [history])
  useEffect(() => localStorage.setItem(STORAGE_KEYS.medicines, JSON.stringify(medicines)), [medicines])
  useEffect(() => localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile)), [profile])
  useEffect(() => {
    let active = true
    let objectUrl = ''
    readImage(profile.imageKey).then((file) => {
      if (!active) return
      if (file) {
        objectUrl = URL.createObjectURL(file)
        setProfileImageUrl(objectUrl)
      } else setProfileImageUrl('')
    }).catch(() => setProfileImageUrl(''))
    return () => {
      active = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [profile.imageKey])

  const pageProps = useMemo(() => ({
    patients, setPatients, appointments, setAppointments, history, setHistory, medicines, setMedicines, profile: { ...profile, imageUrl: profileImageUrl }, setProfile, onNavigate: setActivePage,
  }), [patients, appointments, history, medicines, profile, profileImageUrl])

  return (
    <div className="min-h-screen bg-[#f7faff] text-slate-900">
      <Sidebar activePage={activePage} onNavigate={setActivePage} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-slate-900/30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <main className="min-h-screen min-w-0 overflow-x-hidden lg:ml-[248px]">
        <Header profile={{ ...profile, imageUrl: profileImageUrl }} onMenu={() => setSidebarOpen(true)} />
        <div className="mx-auto w-full max-w-[1440px] min-w-0 px-4 pb-10 pt-5 sm:px-8 sm:pt-6 lg:px-10">
          {activePage === 'Dashboard' && <Dashboard {...pageProps} />}
          {activePage === 'Patients' && <Patients {...pageProps} />}
          {activePage === 'Appointments' && <Appointments {...pageProps} />}
          {activePage === 'Patient History' && <PatientHistory {...pageProps} />}
          {activePage === 'Medicines' && <Medicines {...pageProps} />}
          {activePage === 'Settings' && <Settings {...pageProps} />}
        </div>
      </main>
    </div>
  )
}

export default App
