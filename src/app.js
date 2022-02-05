import express from 'express'

const app = express()
const port = process.env.PORT || 3001

app.get('', (request, response) => {
  response.send('It works!')
})

app.listen(port, () => {
  console.log(`Node running on port ${port}`)
})
