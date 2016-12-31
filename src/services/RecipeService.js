import { Recipe } from '../models';

export default class RecipeService {
  static async all() {
    try {
      return await Recipe.find({});
    } catch (err) {
      console.log(err);
    }
  }

  static async findOne(id) {
    try {
      return await Recipe.findById(id);
    } catch (err) {
      throw new Error('Recipe not found');
    }
  }
}
