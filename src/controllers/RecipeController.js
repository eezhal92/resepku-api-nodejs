import { recipeService, pdfService } from '../services';

export class RecipeController {
  constructor(options) {
    this.options = options;
  }

  index = () => async (req, res) => {
    try {
      const recipes = await this.options.recipeService.all();

      res.status(200).json(recipes);
    } catch (err) {
      res.status(500).json({
        message: err.stack,
      });
    }
  };

  show = () => async (req, res) => {
    try {
      const recipe = await this.options.recipeService.findOne(req.params.id);

      return res.status(200).json(recipe);
    } catch (err) {
      return res.status(404).json({
        statusText: 'NOT_FOUND',
        code: 404,
      });
    }
  };

  download = () => async (req, res) => {
    try {
      const recipe = await this.options.recipeService.findOne(req.params.id);
      const filename = await this.options.pdfService.generateForRecipe(recipe);

      return res.download(filename);
    } catch (err) {
      return res.status(500).json({
        statusText: 'BAD SERVER',
        code: 500,
      });
    }
  };
}

export default new RecipeController({
  recipeService,
  pdfService,
});
