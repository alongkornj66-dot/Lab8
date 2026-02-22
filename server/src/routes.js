// src/routes.js

const CoffeeController = require('./controllers/CoffeeController')
const MenuController = require('./controllers/MenuController')
const UserController = require('./controllers/UserController')
const UserAuthenController = require('./controllers/UserAuthenController')
const isAuthenController = require('./controllers/isAuthenController')
const coffeeUpload = require('./middleware/coffeeUpload')

module.exports = (app) => {

  // Test route
  app.get('/test', (req, res) => {
    res.send({ message: 'Server is running!' })
  })

  // ===============================
  // Auth Routes
  // ===============================
  app.post('/login', UserAuthenController.login)
  app.post('/register', UserAuthenController.register)

  // ===============================
  // Users Routes (ต้อง login ก่อน)
  // ===============================
  app.get('/users', isAuthenController, UserController.index)
  app.get('/user/:userId', isAuthenController, UserController.show)
  app.post('/user', isAuthenController, UserController.create)
  app.put('/user/:userId', isAuthenController, UserController.put)
  app.delete('/user/:userId', isAuthenController, UserController.remove)

  // ===============================
  // Coffee Routes
  // ===============================
   app.get('/coffees', CoffeeController.index)
  app.post('/coffee', CoffeeController.create)
  app.put('/coffee/:coffeeId', CoffeeController.put)
  app.delete('/coffee/:coffeeId', CoffeeController.delete)
  app.get('/coffee/:coffeeId', CoffeeController.show)
  app.post('/coffee-upload', coffeeUpload.single('image'), CoffeeController.upload)

  // ===============================
  // Menu Routes
  // ===============================
  app.get('/menus', MenuController.index)
  app.post('/menu', MenuController.create)
  app.put('/menu/:menuId', MenuController.put)
  app.delete('/menu/:menuId', MenuController.delete)
  app.get('/menu/:menuId', MenuController.show)
  app.post('/menu-upload', coffeeUpload.single('image'), MenuController.upload)
}
