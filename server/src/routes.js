const isAuthenController = require('./controllers/isAuthenController')
const UserController = require('./controllers/UserController')
const UserAuthenController = require('./controllers/UserAuthenController')
const BlogController = require('./controllers/BlogController')
const UploadController = require('./controllers/UploadController')
const CoffeeController = require('./controllers/CoffeeController') // <--- เพิ่มตรงนี้ (1)

const fileUploadMiddleware = require('./middleware/fileUpload')

module.exports = (app) => {
  // User Management
  app.get('/users', isAuthenController, UserController.index)
  app.post('/user', UserController.create)
  app.put('/user/:userId', UserController.put)
  app.delete('/user/:userId', UserController.remove)
  app.get('/user/:userId', UserController.show)
  app.post('/login', UserAuthenController.login)
  app.post('/register', UserAuthenController.register)

  // Blog Management
  app.post('/blog', BlogController.create)
  app.put('/blog/:blogId', BlogController.put)
  app.delete('/blog/:blogId', BlogController.remove)
  app.get('/blog/:blogId', BlogController.show)
  app.get('/blogs', BlogController.index)

  // Upload Management
  app.post('/upload', fileUploadMiddleware, UploadController.upload)

  // Coffee Management (ร้านกาแฟ) <--- เพิ่มตรงนี้ (2)
  app.get('/coffees', CoffeeController.index)
  app.get('/coffee/:coffeeId', CoffeeController.show)
  app.post('/coffee', CoffeeController.post)
  app.put('/coffee/:coffeeId', CoffeeController.put)
  app.delete('/coffee/:coffeeId', CoffeeController.delete)
}