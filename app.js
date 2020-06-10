const Sequelize = require('sequelize');
// const { say } = require('cowsay');

// let log = console.log;

// console.log = function(...arguments){
//     let args = arguments.join(' ')
//     let moo = {
//         text: args,
//         e: 'oO',
//         T: 'U '
//     }
//     let cowMoo = [say(moo)]
//     log.apply(console, cowMoo);
// }


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'movies.db',
    logging: true
  });

class Movie extends Sequelize.Model {}
Movie.init({
    title: Sequelize.STRING
}, { sequelize });

// async IIFE
(async () => {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
    try {
        const movie = await Movie.create({
            title: 'Toy Story',
          })
          console.log(movie.toJSON())
    } catch (error) {
      console.error('Error connecting to the database: ', error)
    }
  })();

