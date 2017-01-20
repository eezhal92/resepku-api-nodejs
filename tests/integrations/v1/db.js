import mongoose from 'mongoose';
import createRecipes from './fixtures/recipes';
import { Recipe } from '../../../src/models';

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

const MONGODB_URL = 'mongodb://localhost/resepku-test';

export const setUpDB = async () => {
  // plugin bluebird promise in mongoose
  mongoose.Promise = Promise;

  // connect to mongo db
  mongoose.connect(MONGODB_URL, {
    server: {
      socketOptions: { keepAlive: 1 },
    },
  });

  mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${MONGODB_URL}`);
  });

  console.log('creating fixtures...');
  await createRecipes();
  console.log('fixtures created!');
};

export const tearDownDB = async () => {
  console.log('tearing down...');
  await Recipe.remove({});
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  console.log('db was dropped!');
};
