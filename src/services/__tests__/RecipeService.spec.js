import { RecipeService } from '../RecipeService';

/**
 * Just mock service deps
 */
describe('RecipeService', () => {

  describe('all', async () => {

    it('should return all recipes', async () => {
      const recipes = [
        { _id: 1, title: 'Meh' },
        { _id: 2, title: 'LoL' },
      ];
      const findSpy = jest.fn(() => recipes);
      const fakeRecipeModel = {
        find: findSpy,
      };

      const recipeService = new RecipeService({
        Recipe: fakeRecipeModel
      });

      const results = await recipeService.all();
      expect(results).toEqual(recipes);
      expect(findSpy).toBeCalled();
    });

  });

  describe('findOne', async () => {

    it('should throw Error when no data was found', async () => {
      const findByIdSpy = jest.fn(() => {
        throw new Error('xx');
      });
      const fakeRecipeModel = {
        findById: findByIdSpy,
      };

      const recipeService = new RecipeService({
        Recipe: fakeRecipeModel
      });

      try {
        await recipeService.findOne('smdf70sd234sdfsa');
      } catch (err) {
        expect(err.message).toBe('Recipe not found');
      }
    });

  });


});
