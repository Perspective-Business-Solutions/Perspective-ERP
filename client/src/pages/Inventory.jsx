import CrudPage from '../components/CrudPage'
import { KEYS, inventorySeed, inr } from '../data/seed'

export default function Inventory() {
  return (
    <CrudPage
      title="Inventory"
      subtitle="Products and stock levels"
      noun="product"
      storageKey={KEYS.inventory}
      seed={inventorySeed}
      fields={[
        { name: 'name', label: 'Product name' },
        { name: 'sku', label: 'SKU' },
        { name: 'category', label: 'Category' },
        { name: 'price', label: 'Price (₹)', type: 'number' },
        { name: 'stock', label: 'Stock', type: 'number' },
      ]}
      columns={[
        { key: 'name', label: 'Product' },
        { key: 'sku', label: 'SKU' },
        { key: 'category', label: 'Category' },
        { key: 'price', label: 'Price', render: (r) => inr(r.price) },
        {
          key: 'stock',
          label: 'Stock',
          render: (r) => <span className={`badge ${r.stock <= 5 ? 'red' : r.stock <= 15 ? 'amber' : 'green'}`}>{r.stock}</span>,
        },
      ]}
    />
  )
}
