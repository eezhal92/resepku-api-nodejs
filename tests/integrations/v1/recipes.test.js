import supertest from 'supertest';

import app from '../../../src/server';

import { setUpDB, tearDownDB } from './db';
import { Recipe } from '../../../src/models';

beforeAll(() => {
  return setUpDB();
});

afterAll(() => {
  return tearDownDB();
});

const request = supertest(app);

describe('Recipes', () => {

  describe('GET /recipes', () => {

    it('should return all recipes', () => {
      return request
        .get('/api/v1/recipes')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body.length).toBe(2);
        });
    });

  });

  describe('GET /recipes/:id', () => {
    it('should return specific book when found', () => {
      return Recipe({ title: 'Jagung Bakar', categories: ['palu'] }).save((err, recipe) => {
        return request
          .get(`/api/v1/recipes/${recipe.id}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(res => {
            expect(res.body._id).toBe(recipe.id);
            expect(typeof res.body.title).toBe('string');
          });
      });
    });

    it('should return 404 when book is not found', () => {
      return request
        .get('/api/v1/recipes/99')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body.statusText).toBe('NOT_FOUND');
          expect(res.body.code).toBe(404);
        });
    });

  });

});
