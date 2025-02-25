const express = require('express')
const app = express()
const { execSync } = require('child_process')

// get the port from env variable
const PORT = process.env.PORT || 5000

app.use(express.static('dist'))
const gitCommand = 'git rev-parse HEAD'



const childOut = execSync(gitCommand)
const commit_hash = childOut.toString().trim()
app.get('/version', async (req, res) => {
  res.send('commit:'.concat(commit_hash))
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on port ${PORT}`)
})
