import express from 'express';
// import validate from 'express-validation';
// import { create, update } from './validator';
import { recipeController } from '../../../controllers';

const router = express.Router();


router.route('/')
  .get(recipeController.index());

router.route('/download/:id')
  .get(recipeController.download());

router.route('/:id')
  .get(recipeController.show());

export default router;
