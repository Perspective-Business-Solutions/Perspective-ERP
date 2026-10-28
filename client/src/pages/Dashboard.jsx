import { load } from '../hooks/useLocalStorage'
import { KEYS, inventorySeed, customersSeed, employeesSeed, ordersSeed, ORDER_STATUSES, inr } from '../data/seed'

export default function Dashboard() {
  const products = load(KEYS.inventory, inventorySeed)
  const customers = load(KEYS.customers, customersSeed)
  const employees = load(KEYS.employees, employeesSeed)
  const orders = load(KEYS.orders, ordersSeed)

  const revenue = orders.reduce((sum, o) => sum + o.total, 0)
  const stockValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)
  const lowStock = products.filter((p) => p.stock <= 5)

  const stats = [
    { label: 'Revenue', value: inr(revenue), tone: 'indigo' },
    { label: 'Orders', value: orders.length, tone: 'blue' },
    { label: 'Customers', value: customers.length, tone: 'green' },
    { label: 'Employees', value: employees.length, tone: 'amber' },
    { label: 'Stock value', value: inr(stockValue), tone: 'violet' },
  ]
  const maxCount = Math.max(1, ...ORDER_STATUSES.map((s) => orders.filter((o) => o.status === s).length))

  return (
    <>
      <header className="page-head">
        <div>
          <h1>Dashboard</h1>
          <p>A quick look at how the business is doing</p>
        </div>
      </header>

      <div className="stats">
        {stats.map((s) => (
          <div key={s.label} className={`stat ${s.tone}`}>
            <span>{s.label}</span>
            <strong>{s.value}</strong>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card pad">
          <h3>Orders by status</h3>
          {ORDER_STATUSES.map((s) => {
            const n = orders.filter((o) => o.status === s).length
            return (
              <div className="bar-row" key={s}>
                <span>{s}</span>
                <div className="bar"><i style={{ width: `${(n / maxCount) * 100}%` }} /></div>
                <b>{n}</b>
              </div>
            )
          })}
        </div>

        <div className="card pad">
          <h3>Low stock</h3>
          {lowStock.length ? (
            lowStock.map((p) => (
              <div className="list-row" key={p.id}>
                <span>{p.name}</span>
                <span className="badge red">{p.stock} left</span>
              </div>
            ))
          ) : (
            <p className="muted">All products are well stocked.</p>
          )}
        </div>
      </div>

      <div className="card pad">
        <h3>Recent orders</h3>
        {orders.slice(0, 5).map((o) => (
          <div className="list-row" key={o.id}>
            <span>{o.customer} <span className="muted">· {o.product} × {o.qty}</span></span>
            <b>{inr(o.total)}</b>
          </div>
        ))}
        {!orders.length && <p className="muted">No orders yet.</p>}
      </div>
    </>
  )
}
