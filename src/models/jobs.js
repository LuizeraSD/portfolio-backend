import mongoose from 'mongoose'
import validator from 'validator'

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  img: {
    type: String,
    trim: true,
    lowercase: true,
    validate (value) {
      if (value) {
        if (!validator.isURL(value)) {
          throw new Error('Image url is invalid')
        }
      }
    }
  },
  url: {
    type: String,
    trim: true,
    lowercase: true,
    validate (value) {
      if (value) {
        if (!validator.isURL(value)) {
          throw new Error('URL is invalid')
        }
      }
    }
  },
  description: {
    type: String,
    required: true
  }
})

const Job = mongoose.model('Job', jobSchema)

export default Job
