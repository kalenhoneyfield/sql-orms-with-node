const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db',
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: true,
  },
})

const db = {
  sequelize,
  Sequelize,
  models: {},
}

db.models.Movie = require('./models/movie')(sequelize)
db.models.Person = require('./models/person')(sequelize)

module.exports = db