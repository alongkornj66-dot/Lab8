const { Menu } = require('../models')
const path = require('path')

module.exports = {
  // Get all menus
  async index (req, res) {
    try {
      const menus = await Menu.findAll()
      res.send(menus)
    } catch (err) {
      res.status(500).send({
        error: 'The menus information was incorrect'
      })
    }
  },
  // Create menu
  async create (req, res) {
    try {
      console.log('Creating menu with data:', req.body)
      const payload = Object.assign({}, req.body)
      if (req.body.image) payload.image = req.body.image
      const menu = await Menu.create(payload)
      console.log('Menu created successfully:', menu.toJSON())
      res.send(menu.toJSON())
    } catch (err) {
      console.error('Error creating menu:', err.message)
      res.status(500).send({
        error: 'Create menu incorrect: ' + err.message
      })
    }
  },
  // Edit menu
  async put (req, res) {
    try {
      console.log('Updating menu', req.params.menuId, 'with data:', req.body)
      const result = await Menu.update(req.body, {
        where: {
          id: req.params.menuId
        }
      })
      console.log('Update result:', result)
      if (result[0] === 0) {
        return res.status(404).send({
          error: 'Menu not found'
        })
      }
      res.send(req.body)
    } catch (err) {
      console.error('Error updating menu:', err.message)
      res.status(500).send({
        error: 'Update menu incorrect: ' + err.message
      })
    }
  },
  // Delete menu
  async delete (req, res) {
    try {
      const menu = await Menu.findOne({
        where: {
          id: req.params.menuId
        }
      })
      if (!menu) {
        return res.status(403).send({
          error: 'The menu information was incorrect'
        })
      }
      await menu.destroy()
      res.send(menu)
    } catch (err) {
      res.status(500).send({
        error: 'The menu information was incorrect'
      })
    }
  },
  // Show menu
  async show (req, res) {
    try {
      const menu = await Menu.findByPk(req.params.menuId)
      res.send(menu)
    } catch (err) {
      res.status(500).send({
        error: 'The menu information was incorrect'
      })
    }
  },
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
