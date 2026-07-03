import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { AdminLanguageProvider } from './context/AdminLanguageContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import ProgramDetail from './pages/ProgramDetail'
import Programs from './pages/Programs'
import Membership from './pages/Membership'
import Events from './pages/Events'
import Leadership from './pages/Leadership'
import Documents from './pages/Documents'
import Media from './pages/Media'
import Support from './pages/Support'
import Contact from './pages/Contact'
import Volunteer from './pages/Volunteer'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import AdminGuard from './components/admin/AdminGuard'
import AdminLayout from './components/admin/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminHome from './pages/admin/AdminHome'
import AdminEvents from './pages/admin/AdminEvents'
import AdminMedia from './pages/admin/AdminMedia'
import AdminHallBookings from './pages/admin/AdminHallBookings'
import AdminLeadership from './pages/admin/AdminLeadership'
import AdminPrograms from './pages/admin/AdminPrograms'
import { ADMIN_LOGIN_PATH } from './utils/admin'

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename={routerBasename}>
      <Routes>
        <Route path={ADMIN_LOGIN_PATH} element={
          <AdminLanguageProvider>
            <AdminLogin />
          </AdminLanguageProvider>
        } />
        <Route path="/admin" element={<Admin />} />
        <Route element={<AdminGuard />}>
          <Route element={
            <AdminLanguageProvider>
              <AdminLayout />
            </AdminLanguageProvider>
          }>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/media" element={<AdminMedia />} />
            <Route path="/admin/hall-bookings" element={<AdminHallBookings />} />
            <Route path="/admin/leadership" element={<AdminLeadership />} />
            <Route path="/admin/programs" element={<AdminPrograms />} />
          </Route>
        </Route>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="programs" element={<Programs />} />
          <Route
            path="programs/youth-and-education"
            element={<Navigate to="/programs/youth-education" replace />}
          />
          <Route
            path="programs/health-and-wellness"
            element={<Navigate to="/programs/health-wellness" replace />}
          />
          <Route path="programs/:slug" element={<ProgramDetail />} />
          <Route path="membership" element={<Membership />} />
          <Route path="events" element={<Events />} />
          <Route path="leadership" element={<Leadership />} />
          <Route path="documents" element={<Documents />} />
          <Route path="media" element={<Media />} />
          <Route path="support" element={<Support />} />
          <Route path="contact" element={<Contact />} />
          <Route path="volunteer" element={<Volunteer />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route
            path="education-training"
            element={<Navigate to="/programs#education-training" replace />}
          />
          <Route path="book-hall" element={<Navigate to="/events#book-hall" replace />} />
          <Route path="governance" element={<Navigate to="/documents" replace />} />
          <Route path="donate" element={<Navigate to="/support" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </LanguageProvider>
  )
}
