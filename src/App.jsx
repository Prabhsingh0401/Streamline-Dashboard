import './App.css'

import Dashboard from './components/pages/Dashboard'
import LeadsAndForms from './components/pages/LeadsAndForms'
import Proposals from './components/pages/Proposals'
import { SideBar } from './components/sideBar/sideBar'
import Footer from './components/Footer/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
    <Router>
      <SideBar></SideBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads-forms" element={<LeadsAndForms />} />
          <Route path="/proposals" element={<Proposals />} />
        </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App
