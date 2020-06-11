const db = require('./db');
const {
  Op
} = db.Sequelize;

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
    const movie3 = await Movie.build({
      title: 'Toy Story 3',
      runtime: 103,
      releaseDate: '2010-06-18',
      isAvailableOnVHS: false,
    });
    await movie3.save();
    Movie.findAll({
      attributes: ['id', 'title'],
      // where: {
      //   releaseDate: {
      //     [Op.gte]: '2004-01-01'
      //   },
      //   runtime: {
      //     [Op.gt]: 95,
      //   },
      // },
      order: [
        ['id', 'ASC']
      ],
      raw: true,
    }).then((data) => {
      console.log(data);
    });
    Person.findAll({
      raw: true,
    }).then((data) => {
      console.log(data);
    });

    // const toyStory3 = await Movie.findByPk(3)
    // // toyStory3.isAvailableOnVHS = true;
    // // await toyStory3.save();
    // await toyStory3.update({
    //   isAvailableOnVHS: true,
    // });

    // console.log(toyStory3.get({
    //   plain: true
    // }))

    const toyStory = await Movie.findByPk(1)
    await toyStory.destroy()

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