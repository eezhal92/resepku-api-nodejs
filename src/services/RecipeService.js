import { Recipe } from '../models';

export class RecipeService {
  constructor(options) {
    this.options = options;
  }

  async all() {
    let recipes;
    try {
      recipes = await this.options.Recipe.find({});
    } catch (err) {
      throw err;
    }

    return recipes;
  }

  async findOne(id) {
    try {
      return await this.options.Recipe.findById(id);
    } catch (err) {
      throw new Error('Recipe not found');
    }
  }
}

export default new RecipeService({
  Recipe,
});
