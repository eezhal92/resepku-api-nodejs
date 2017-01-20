import app from './app';
import mongoose from 'mongoose';
import BluebirdPromise from 'bluebird';

// use bluebird's Promise as default Promise
Promise = BluebirdPromise;

// activate long stac traces for debuggin
Promise.longStackTraces();

// use bluebird promise in mongoose
mongoose.Promise = Promise;

Promise.resolve()
  .then(() => {
    return require('./models/setup');
  })
  .then(() => {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log('Server is running on PORT : %s', PORT);
    });
  });
