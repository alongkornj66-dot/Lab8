module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    status: DataTypes.STRING
  })
  return Menu
}
