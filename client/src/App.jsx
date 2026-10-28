import { useState } from 'react'
import { Routes, Route, NavLink, Navigate, Outlet } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Inventory from './pages/Inventory'
import Customers from './pages/Customers'
import Employees from './pages/Employees'
import Orders from './pages/Orders'

const NAV = [
  { to: '/', label: 'Dashboard', icon: '▦', end: true },
  { to: '/orders', label: 'Sales Orders', icon: '🧾' },
  { to: '/inventory', label: 'Inventory', icon: '📦' },
  { to: '/customers', label: 'Customers', icon: '🤝' },
  { to: '/employees', label: 'Employees', icon: '👥' },
]

function Layout({ session, onLogout }) {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand"><div className="logo">E</div><span>ERP Lite</span></div>
        <nav>
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end}>
              <span className="icon">{n.icon}</span>{n.label}
            </NavLink>
          ))}
        </nav>
        <div className="user">
          <span className="muted">{session}</span>
          <button className="btn ghost light" onClick={onLogout}>Log out</button>
        </div>
      </aside>
      <main className="content"><Outlet /></main>
    </div>
  )
}

export default function App() {
  const [session, setSession] = useState(() => {
    const stored = localStorage.getItem('erp_session')
    // ignore the stale "false" value saved by the old buggy logout
    return stored && stored !== 'false' ? stored : null
 })
  const login = (email) => {
    localStorage.setItem('erp_session', email)
    setSession(email)
  }
  const logout = () => {
       localStorage.removeItem('erp_session')
    setSession(null)
   }
  }

  return (
    <Routes>
      <Route path="/login" element={session ? <Navigate to="/" replace /> : <Login onLogin={login} />} />
      <Route element={session ? <Layout session={session} onLogout={logout} /> : <Navigate to="/login" replace />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="customers" element={<Customers />} />
        <Route path="employees" element={<Employees />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
