import express from 'express'
import Job from '../models/jobs.js'
import auth from '../middleware/auth.js'

const router = new express.Router()

router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find({})
    res.send(jobs)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

router.post('/jobs', auth, async (req, res) => {
  const job = new Job(req.body)

  try {
    await job.save()
    res.status(201).send(job)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.patch('/jobs/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['title', 'img', 'url', 'description']
  const isValidOperaion = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperaion) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!job) {
      return res.status(400).send()
    }
  } catch (error) {
    return res.status(400).send(error.message)
  }
})

router.delete('/jobs/:id', auth, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id)

    if (!job) {
      return res.status(404).send()
    }

    res.send(job)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

export default router
