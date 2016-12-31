if (process.env.NODE_ENV === 'production') {
  /* eslint-disable  global-require, import/no-unresolved */
  require('../dist/server.bundle.js');
} else {
  /* eslint-disable  global-require */
  require('./src/index.js');
}
