import mongoose from 'mongoose';
import BluebirdPromise from 'bluebird';
import app from './app';

// use bluebird's Promise as default Promise
Promise = BluebirdPromise; // eslint-disable-line

// activate long stac traces for debuggin
Promise.longStackTraces();

// use bluebird promise in mongoose
mongoose.Promise = Promise;

Promise.resolve()
  .then(() => require('./models/setup')) // eslint-disable-line
  .then(() => {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log('Server is running on PORT : %s', PORT);
    });
  });
