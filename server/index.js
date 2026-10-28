import express from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// No database: all ERP data lives in the browser's localStorage.
// The API only exposes app metadata. Future contributors can add routes here.
app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }))
app.get('/api/meta', (_req, res) =>
  res.json({ name: 'ERP Lite', version: '1.0.0', storage: 'localStorage' })
)

// Serve the built React app in production
const dist = path.join(__dirname, '../client/dist')
if (fs.existsSync(dist)) {
  app.use(express.static(dist))
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')))
}

app.listen(PORT, () => console.log(`ERP Lite server running on http://localhost:${PORT}`))
