import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
import Membership from './pages/Membership'
import Events from './pages/Events'
import Leadership from './pages/Leadership'
import Documents from './pages/Documents'
import Media from './pages/Media'
import Support from './pages/Support'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="programs" element={<Programs />} />
          <Route path="membership" element={<Membership />} />
          <Route path="events" element={<Events />} />
          <Route path="leadership" element={<Leadership />} />
          <Route path="documents" element={<Documents />} />
          <Route path="media" element={<Media />} />
          <Route path="support" element={<Support />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
