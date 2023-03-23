
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
	name: String,
    image: String,
    git: String,
    live: String,
})

const Projects = mongoose.model('Projects', projectSchema)

module.exports = Projects