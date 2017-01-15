import { Recipe } from '../models';

export class RecipeService {
  constructor(options) {
    this.options = options;
  }

  async all() {
    try {
      return await this.options.Recipe.find({});
    } catch (err) {
      console.log(err);
    }
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
