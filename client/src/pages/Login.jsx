import { useState } from 'react'

const USER = { email: 'admin@erp.com', password: 'admin123' }

export default function Login({ onLogin }) {
  const [error, setError] = useState('')

  function submit(e) {
    e.preventDefault()
    const fd = new FormData(e.target)
    const email = fd.get('email').trim().toLowerCase()
    const password = fd.get('password')
    if (email === USER.email && password === USER.password) onLogin(email)
    else setError('Invalid email or password.')
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={submit}>
        <div className="logo big">E</div>
        <h1>Welcome to ERP Lite</h1>
        <p className="muted">Sign in to manage your business</p>
        <label>Email<input name="email" type="email" defaultValue={USER.email} required /></label>
        <label>Password<input name="password" type="password" defaultValue={USER.password} required /></label>
        {error && <p className="error">{error}</p>}
        <button className="btn primary wide">Sign in</button>
        <small className="muted">Demo login: {USER.email} / {USER.password}</small>
      </form>
    </div>
  )
}
