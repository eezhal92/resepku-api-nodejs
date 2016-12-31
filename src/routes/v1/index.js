import express from 'express';

import recipes from './recipes';

export default () => {
  const router = express.Router();

  router.use('/recipes', recipes);

  return router;
};
