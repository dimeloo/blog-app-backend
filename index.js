import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import 'dotenv/config'

/**********************************************************************/
// Database Connection
const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const database = client.db('blog-app')
const entries = database.collection('entries')

client.connect()
console.log('Connected to Mongo')
const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.listen(PORT, () => console.log('API running on port', PORT))

/**********************************************************************/
// Get all Blog entries
app.get('/', async (req, res) => {
  const allEntries = await entries.find().toArray()
  res.send(allEntries)
})

/**********************************************************************/
// Add a Blog entry
app.post('/', async (req, res) => {
  await entries.insertOne(req.body)
  res.json('Blog Entry was added')
})

/**********************************************************************/
// Delete a Blog entry
app.delete('/', async (req, res) => {
  await entries.findOneAndDelete(req.query)
  res.json('Blog Entry was deleted')
})

/**********************************************************************/
// Update a Blog entry
app.put('/', async (req, res) => {
  await entries.findOneAndUpdate(req.query, { $set: req.body })
  res.json('Blog Entry was updated')
})
