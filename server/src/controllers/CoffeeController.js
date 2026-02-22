const { Coffee } = require('../models')
const path = require('path')

module.exports = {
  // Get all coffees
  async index (req, res) {
    try {
      const coffees = await Coffee.findAll()
      res.send(coffees)
    } catch (err) {
      res.status(500).send({
        error: 'The coffees information was incorrect'
      })
    }
  },
  // Create coffee
  async create (req, res) {
    try {
      // If request has image path already (from upload), include it
      const payload = Object.assign({}, req.body)
      if (req.body.image) payload.image = req.body.image
      const coffee = await Coffee.create(payload)
      res.send(coffee.toJSON())
    } catch (err) {
      res.status(500).send({
        error: 'Create coffee incorrect'
      })
    }
  },
  // Edit coffee
  async put (req, res) {
    try {
      // allow updating image via req.body.image
      await Coffee.update(req.body, {
        where: {
          id: req.params.coffeeId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'Update coffee incorrect'
      })
    }
  },
  // Delete coffee
  async delete (req, res) {
    try {
      const coffee = await Coffee.findOne({
        where: {
          id: req.params.coffeeId
        }
      })
      if (!coffee) {
        return res.status(403).send({
          error: 'The coffee information was incorrect'
        })
      }
      await coffee.destroy()
      res.send(coffee)
    } catch (err) {
      res.status(500).send({
        error: 'The coffee information was incorrect'
      })
    }
  },
  // Show coffee
  async show (req, res) {
    try {
      const coffee = await Coffee.findByPk(req.params.coffeeId)
      res.send(coffee)
    } catch (err) {
      res.status(500).send({
        error: 'The coffee information was incorrect'
      })
    }
  }
  ,
  // Upload an image file and return its accessible path
  async upload (req, res) {
    try {
      if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded' })
      }
      // return the public path so frontend can use it directly
      const imagePath = req.protocol + '://' + req.get('host') + '/public/uploads/' + req.file.filename
      res.send({ image: imagePath })
    } catch (err) {
      res.status(500).send({ error: 'Upload failed' })
    }
  }
}
