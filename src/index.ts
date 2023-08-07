import app from './app'

const port = process.env.PORT || 4091

app.listen(port, () => {
  console.log(`listening: http:localhost:${port}`)
})
