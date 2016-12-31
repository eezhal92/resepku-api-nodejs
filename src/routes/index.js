import express from 'express';

import v1 from './v1';

export default () => {
  const router = express.Router();

  // use routes version 1
  router.use('/v1', v1());
  return router;
};

