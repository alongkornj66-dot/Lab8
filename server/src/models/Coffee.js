module.exports = (sequelize, DataTypes) => {
  const Coffee = sequelize.define('Coffee', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    type: DataTypes.STRING,
    status: DataTypes.STRING
  })
  return Coffee
}