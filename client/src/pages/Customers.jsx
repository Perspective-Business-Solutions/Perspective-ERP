import CrudPage from '../components/CrudPage'
import { KEYS, customersSeed } from '../data/seed'

export default function Customers() {
  return (
    <CrudPage
      title="Customers"
      subtitle="People and companies you sell to"
      noun="customer"
      storageKey={KEYS.customers}
      seed={customersSeed}
      fields={[
        { name: 'name', label: 'Name' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phone', label: 'Phone' },
        { name: 'city', label: 'City' },
      ]}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'city', label: 'City' },
      ]}
    />
  )
}
