export default class RecipeController {
  static index(RecipeService) {
    return async (req, res) => {
      const recipes = await RecipeService.all();

      return res.status(200).json(recipes);
    };
  }

  static show(RecipeService) {
    return async (req, res) => {
      try {
        const recipe = await RecipeService.findOne(req.params.id);

        return res.status(200).json(recipe);
      } catch (err) {
        return res.status(404).json({
          statusText: 'NOT_FOUND',
          code: 404,
        });
      }
    };
  }

  static create(RecipeService) {
    return async (req, res) => {
      return 'yey';
    };
  }
}
