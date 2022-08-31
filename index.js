import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import 'dotenv/config'

const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const database = client.db('blog-app')
const entries = database.collection('entries')


client.connect()
console.log('Connected to Mongo')


const app = express()
app.use(cors())
app.use(express.json())

app.listen(4040, () => console.log('API running on port 4040'))

app.get('/', async (req, res) => {
    const allEntries = await entries.find().toArray()
    res.send(allEntries)
})
