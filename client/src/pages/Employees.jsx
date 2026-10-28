import CrudPage from '../components/CrudPage'
import { KEYS, employeesSeed, inr } from '../data/seed'

export default function Employees() {
  return (
    <CrudPage
      title="Employees"
      subtitle="Your team and their roles"
      noun="employee"
      storageKey={KEYS.employees}
      seed={employeesSeed}
      fields={[
        { name: 'name', label: 'Full name' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'department', label: 'Department', type: 'select', options: ['Sales', 'Finance', 'Warehouse', 'HR', 'IT'] },
        { name: 'role', label: 'Role' },
        { name: 'salary', label: 'Monthly salary (₹)', type: 'number' },
      ]}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'department', label: 'Department', render: (r) => <span className="badge blue">{r.department}</span> },
        { key: 'role', label: 'Role' },
        { key: 'salary', label: 'Salary', render: (r) => inr(r.salary) },
      ]}
    />
  )
}
