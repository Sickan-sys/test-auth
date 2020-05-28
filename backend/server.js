import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors' 
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/01authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

const port = process.env.PORT || 8082
const app = express()

app.use(cors())
app.use(bodyParser.json())

const authenticateUser = async (req , res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header('Authorization'),
    })
    if (user) {
      req.user = user
      next()
    } else {
      res
        .status(401)
        .json({ loggedOut: true, message: 'Not loged in, please try again' })
    }
  } catch (err) {
    res
      .status(403)
      .json({ message: 'Access token is wrong or missing', errors: err })
  }
}

app.get('/', async (req, res) => {
  const users = await User.find()
  res.json(users)
})

app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = new User({ name, email, password: bcrypt.hashSync(password) })
    const saved = await user.save() 
    res.status(201).json({ userId: saved._id, accessToken: saved.accessToken })
  } catch (err) {
    res.status(400).json({ message: 'Could not create user', errors: err.errors })
  }
})  

app.get('/secret', authenticateUser)
app.get('/secret', (req, res) => {
  res.status(200).json({ secret: 'This is a super secret secret' })
})

app.post('/sessions', async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await User.findOne({ name })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({ userId: user._id, accessToken: user.accessToken })
    } else {
      res.status(404).json({ notFound: true })
    }
  } catch (err) {
    res.status(404).json({ notFound: true })
  }
})
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
