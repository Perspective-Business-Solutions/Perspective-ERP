import { useState } from 'react'
import useLocalStorage, { uid } from '../hooks/useLocalStorage'
import { KEYS, inventorySeed, customersSeed, ordersSeed, ORDER_STATUSES, inr } from '../data/seed'

const STATUS_COLOR = { Pending: 'amber', Shipped: 'blue', Delivered: 'green', Cancelled: 'red' }

export default function Orders() {
  const [orders, setOrders] = useLocalStorage(KEYS.orders, ordersSeed)
  const [products, setProducts] = useLocalStorage(KEYS.inventory, inventorySeed)
  const [customers] = useLocalStorage(KEYS.customers, customersSeed)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')

  function addOrder(e) {
    e.preventDefault()
    const fd = new FormData(e.target)
    const customer = customers.find((c) => c.id === fd.get('customerId'))
    const product = products.find((p) => p.id === fd.get('productId'))
    const qty = Number(fd.get('qty'))

    if (!customer || !product) return setError('Pick a customer and a product.')
    if (product.stock < qty) return setError(`Only ${product.stock} in stock for ${product.name}.`)

    setOrders([
      {
        id: uid(),
        date: new Date().toISOString().slice(0, 10),
        customerId: customer.id,
        customer: customer.name,
        productId: product.id,
        product: product.name,
        qty,
        total: product.price * qty,
        status: 'Pending',
      },
      ...orders,
    ])
    setProducts(products.map((p) => (p.id === product.id ? { ...p, stock: p.stock - qty } : p)))
    setError('')
    setOpen(false)
  }

  const setStatus = (id, status) => setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)))
  const remove = (id) => confirm('Delete this order?') && setOrders(orders.filter((o) => o.id !== id))

  return (
    <>
      <header className="page-head">
        <div>
          <h1>Sales Orders</h1>
          <p>Create orders and track their status</p>
        </div>
        <button className="btn primary" onClick={() => { setError(''); setOpen(true) }}>+ New order</button>
      </header>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Date</th><th>Customer</th><th>Product</th><th>Qty</th><th>Total</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.date}</td>
                  <td>{o.customer}</td>
                  <td>{o.product}</td>
                  <td>{o.qty}</td>
                  <td>{inr(o.total)}</td>
                  <td>
                    <select className={`status ${STATUS_COLOR[o.status]}`} value={o.status} onChange={(e) => setStatus(o.id, e.target.value)}>
                      {ORDER_STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="actions"><button className="btn ghost danger" onClick={() => remove(o.id)}>Delete</button></td>
                </tr>
              ))}
              {!orders.length && <tr><td colSpan={7} className="empty">No orders yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="overlay" onClick={() => setOpen(false)}>
          <form className="modal" onSubmit={addOrder} onClick={(e) => e.stopPropagation()}>
            <h2>New order</h2>
            <label>Customer
              <select name="customerId" required>
                {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </label>
            <label>Product
              <select name="productId" required>
                {products.map((p) => <option key={p.id} value={p.id}>{p.name} — {inr(p.price)} ({p.stock} in stock)</option>)}
              </select>
            </label>
            <label>Quantity
              <input name="qty" type="number" min="1" defaultValue="1" required />
            </label>
            {error && <p className="error">{error}</p>}
            <div className="modal-actions">
              <button type="button" className="btn" onClick={() => setOpen(false)}>Cancel</button>
              <button className="btn primary">Create order</button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
