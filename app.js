const db = require('./db');

const {
  Movie,
  Person
} = db.models;
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

// async IIFE
(async () => {
  await db.sequelize.authenticate();
  await db.sequelize.sync({
    force: true,
  });
  try {
    await Movie.create({
      title: 'Toy Story',
      runtime: 81,
      releaseDate: '1995-11-22',
      isAvailableOnVHS: true,
    });
    await Movie.create({
      title: 'The Incredibles',
      runtime: 115,
      releaseDate: '2004-04-14',
      isAvailableOnVHS: true,
    });
    await Person.create({
      firstName: 'Guy',
      lastName: 'Guy',
    });
    Movie.findAll({
      raw: true,
    }).then((data) => {
      console.log(data);
    });
    Person.findAll({
      raw: true,
    }).then((data) => {
      console.log(data);
    });
    // const movieInstances = await Promise.all([
    //   Movie.create({
    //     title: 'Toy Story'
    //   }),
    //   Movie.create({
    //     title: 'The Incredibles'
    //   }),
    // ]);
    // const moviesJSON = movieInstances.map(movie => movie.toJSON());
    // console.log(moviesJSON)
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map((err) => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
})();