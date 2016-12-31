import mongoose from 'mongoose';
import util from 'util';

// mpromise (mongoose's default promise library) is deprecated
// So we are replacing it with bluebird
// We already replace native Promise with bluebird's Promise in entry file
mongoose.Promise = Promise;

const MONGODB_URL = 'mongodb://localhost/resepku';
const db = mongoose.connect(MONGODB_URL);

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${MONGODB_URL}`);
});

const debugMode = true;

if (debugMode) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    console.log(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

export default db;
