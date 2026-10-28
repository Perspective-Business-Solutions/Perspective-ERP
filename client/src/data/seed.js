export const KEYS = {
  inventory: 'erp_inventory',
  customers: 'erp_customers',
  employees: 'erp_employees',
  orders: 'erp_orders',
}

export const inventorySeed = [
  { id: 'p1', name: 'Wireless Mouse', sku: 'WM-100', category: 'Accessories', price: 799, stock: 42 },
  { id: 'p2', name: 'Mechanical Keyboard', sku: 'MK-210', category: 'Accessories', price: 3499, stock: 8 },
  { id: 'p3', name: '27" Monitor', sku: 'MN-270', category: 'Displays', price: 15999, stock: 14 },
  { id: 'p4', name: 'USB-C Hub', sku: 'UH-070', category: 'Accessories', price: 1599, stock: 4 },
  { id: 'p5', name: 'Laptop Stand', sku: 'LS-030', category: 'Furniture', price: 1299, stock: 25 },
]

export const customersSeed = [
  { id: 'c1', name: 'Aarav Traders', email: 'aarav@traders.in', phone: '9820011223', city: 'Mumbai' },
  { id: 'c2', name: 'Nisha Enterprises', email: 'nisha@enterprise.in', phone: '9811122334', city: 'Pune' },
  { id: 'c3', name: 'Kiran Retail', email: 'kiran@retail.in', phone: '9900011223', city: 'Nashik' },
]

export const employeesSeed = [
  { id: 'e1', name: 'Rohan Mehta', email: 'rohan@erp.com', department: 'Sales', role: 'Sales Lead', salary: 62000 },
  { id: 'e2', name: 'Priya Nair', email: 'priya@erp.com', department: 'Finance', role: 'Accountant', salary: 54000 },
  { id: 'e3', name: 'Sameer Khan', email: 'sameer@erp.com', department: 'Warehouse', role: 'Store Manager', salary: 48000 },
]

export const ordersSeed = [
  { id: 'o1', date: '2026-10-20', customerId: 'c1', customer: 'Aarav Traders', productId: 'p1', product: 'Wireless Mouse', qty: 10, total: 7990, status: 'Delivered' },
  { id: 'o2', date: '2026-10-24', customerId: 'c2', customer: 'Nisha Enterprises', productId: 'p3', product: '27" Monitor', qty: 2, total: 31998, status: 'Shipped' },
  { id: 'o3', date: '2026-10-27', customerId: 'c3', customer: 'Kiran Retail', productId: 'p2', product: 'Mechanical Keyboard', qty: 3, total: 10497, status: 'Pending' },
]

export const ORDER_STATUSES = ['Pending', 'Shipped', 'Delivered', 'Cancelled']
export const inr = (n) => '₹' + Number(n || 0).toLocaleString('en-IN')
