import { RecipeController } from '../RecipeController';

describe('RecipeController', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('index', () => {

    it('should return all recipes with http response status 200', () => {
      // setup RecipeService's mock
      const recipes = [
        { _id: 1, title: 'Meh' },
        { _id: 2, title: 'LoL' },
      ];
      const all = jest.fn(() => Promise.resolve(recipes));
      const FakeRecipeService = {
        all,
      };

      // setup response spies
      let req, res, jsonSpy, statusSpy;

      req = res = {};
      jsonSpy = jest.fn();
      statusSpy = res.status = jest.fn(() => ({ json: jsonSpy }));

      const controller = new RecipeController({
        recipeService: FakeRecipeService,
      });

      const indexHandler = controller.index();

      // invoke Controller method to get route handler
      // it returns async function (which is return promise)
      // to handle asynchronous assertion, use return keyword
      return indexHandler(req, res).then(() => {
        expect(all).toBeCalled();
        expect(statusSpy).toBeCalledWith(200);
        expect(jsonSpy).toBeCalledWith(recipes);
      });
    });

  });

  describe('show', () => {

    it('should return specific recipe when found and http response status 200', () => {
      // setup RecipeService's mock
      const recipe = { _id: 1, title: 'Meh' };
      const findOne = jest.fn(() => Promise.resolve(recipe));
      const FakeRecipeService = {
        findOne,
      };

      // setup response spies
      let req, res, jsonSpy, statusSpy;

      req = res = {};
      req.params = {
        id: 1
      };
      jsonSpy = jest.fn();
      statusSpy = res.status = jest.fn(() => ({ json: jsonSpy }));

      const controller = new RecipeController({
        recipeService: FakeRecipeService,
      });

      const showHandler = controller.show();

      return showHandler(req, res).then(() => {
        expect(findOne).toBeCalled();
        expect(statusSpy).toBeCalledWith(200);
        expect(jsonSpy).toBeCalledWith(recipe);
      });
    });

    it('should return error response with http response status 404', () => {
      // setup RecipeService's mock
      const findOne = jest.fn(() => Promise.reject('not_found'));
      const FakeRecipeService = {
        findOne,
      };

      // setup response spies
      let req, res, jsonSpy, statusSpy;

      req = res = {};
      req.params = {
        id: 2
      };
      jsonSpy = jest.fn();
      statusSpy = res.status = jest.fn(() => ({ json: jsonSpy }));

      const controller = new RecipeController({
        recipeService: FakeRecipeService,
      });

      const showHandler = controller.show();

      return showHandler(req, res).then(() => {
        expect(findOne).toBeCalled();
        expect(statusSpy).toBeCalledWith(404);
        expect(jsonSpy).toBeCalledWith({
          statusText: 'NOT_FOUND',
          code: 404,
        });
      });
    });

  });

});
