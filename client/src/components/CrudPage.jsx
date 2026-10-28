import { useState } from 'react'
import useLocalStorage, { uid } from '../hooks/useLocalStorage'

// Generic list + add/edit/delete page backed by localStorage.
// fields:  [{ name, label, type: 'text'|'number'|'email'|'select', options? }]
// columns: [{ key, label, render?(row) }]
export default function CrudPage({ title, subtitle, noun, storageKey, seed, fields, columns }) {
  const [rows, setRows] = useLocalStorage(storageKey, seed)
  const [q, setQ] = useState('')
  const [editing, setEditing] = useState(null) // null = closed, {} = new, row = edit

  const filtered = rows.filter((r) =>
    Object.values(r).join(' ').toLowerCase().includes(q.toLowerCase())
  )

  function onSubmit(e) {
    e.preventDefault()
    const fd = new FormData(e.target)
    const data = {}
    fields.forEach((f) => {
      const v = fd.get(f.name)
      data[f.name] = f.type === 'number' ? Number(v) : v.trim()
    })
    if (editing.id) setRows(rows.map((r) => (r.id === editing.id ? { ...r, ...data } : r)))
    else setRows([{ id: uid(), ...data }, ...rows])
    setEditing(null)
  }

  function remove(id) {
    if (confirm(`Delete this ${noun}?`)) setRows(rows.filter((r) => r.id !== id))
  }

  return (
    <>
      <header className="page-head">
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <button className="btn primary" onClick={() => setEditing({})}>+ Add {noun}</button>
      </header>

      <div className="card">
        <div className="toolbar">
          <input className="search" placeholder={`Search ${title.toLowerCase()}...`} value={q} onChange={(e) => setQ(e.target.value)} />
          <span className="muted">{filtered.length} of {rows.length}</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {columns.map((c) => <th key={c.key}>{c.label}</th>)}
                <th style={{ width: 130 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  {columns.map((c) => <td key={c.key}>{c.render ? c.render(r) : r[c.key]}</td>)}
                  <td className="actions">
                    <button className="btn ghost" onClick={() => setEditing(r)}>Edit</button>
                    <button className="btn ghost danger" onClick={() => remove(r.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {!filtered.length && (
                <tr><td colSpan={columns.length + 1} className="empty">No {title.toLowerCase()} found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div className="overlay" onClick={() => setEditing(null)}>
          <form className="modal" key={editing.id || 'new'} onSubmit={onSubmit} onClick={(e) => e.stopPropagation()}>
            <h2>{editing.id ? 'Edit' : 'Add'} {noun}</h2>
            {fields.map((f) => (
              <label key={f.name}>
                {f.label}
                {f.type === 'select' ? (
                  <select name={f.name} defaultValue={editing[f.name] ?? f.options[0]} required>
                    {f.options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input name={f.name} type={f.type || 'text'} defaultValue={editing[f.name] ?? ''} min={f.type === 'number' ? 0 : undefined} required />
                )}
              </label>
            ))}
            <div className="modal-actions">
              <button type="button" className="btn" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn primary">Save</button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
