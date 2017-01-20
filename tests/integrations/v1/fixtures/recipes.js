import { Recipe } from 'models';

const recipes = [
  {
    title: 'Gudeg',
    categories: ['spicy', 'javanese']
  },
  {
    title: 'Lalampa',
    categories: ['spicy', 'unique']
  },
];

const createRecipes = (cb) => {
  // create some data
  const promises = recipes.map((recipe) => (
    Recipe(recipe).save((err) => {
      if (err) throw err;
    })
  ));

  return Promise.all(promises).then(cb);
}

export default createRecipes;
