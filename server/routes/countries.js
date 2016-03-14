import express from 'express'
const router = express.Router()

const countries = [
  {
    id: 1,
    name: 'United Kingdom'
  },
  {
    id: 2,
    name: 'France'
  },
  {
    id: 3,
    name: 'Spain'
  }
]

router.get('/countries', (req, res) => {
  res.json(countries)
})

router.get('/countries/:id', (req, res) => {
  const id = Number(req.params.id)
  const country = countries.filter((country) => {
    if (country.id === id) {
      return true
    }
  })

  res.json(country)
})

router.post('/countries', (req, res) => {
  countries.push(req.body)
  res.status(201).send('Created')
})

router.put('/countries/:id', (req, res) => {
})

router.delete('/countries/:id', (req, res) => {
  delete countries[req.params.id]
})

module.exports = router
