# Known bugs (maintainer notes)

Two intentional bugs for open-source contribution practice. Create one GitHub issue per bug, fix them via PRs, then delete this file.

## 1. Auth: logging out doesn't log you out  (good first issue)

**Symptom:** Click "Log out" in the sidebar — nothing happens. Even after a page reload you stay signed in, and the sidebar shows `false` as the user.

**Where to look:** `client/src/App.jsx` (`logout`, and how `session` is read from `localStorage`).

**Expected:** Logout clears the session and redirects to `/login`.

## 2. Orders: stock is reduced by 1 regardless of quantity  (moderate)

**Symptom:** Create an order for 10 units of a product. The order total is correct, but Inventory stock drops by only 1. Repeating this lets stock drift far from reality.

**Where to look:** `client/src/pages/Orders.jsx` (`addOrder`).

**Expected:** Stock decreases by the ordered quantity. Bonus: restore stock when an order is deleted or set to `Cancelled`, and make the Dashboard revenue ignore cancelled orders.
