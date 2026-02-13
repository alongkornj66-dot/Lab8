const { Coffee } = require('../models')

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
      const coffee = await Coffee.create(req.body)
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
}
