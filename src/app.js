import express from 'express'
import cors from 'cors'
import userRouter from './routers/user.js'
import jobRouter from './routers/jobs.js'
import './db/mongoose.js'

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors())
app.use(userRouter, jobRouter)

app.get('', (request, response) => {
  response.send('It works!')
})

app.listen(port, () => {
  console.log(`Node running on port ${port}`)
})
