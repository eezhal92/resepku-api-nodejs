import supertest from 'supertest';

import app from 'app'; // eslint-disable-line

import { setUpDB, tearDownDB } from './db';
import { Recipe } from 'models'; // eslint-disable-line

beforeAll(async () => {
  await setUpDB();
});

afterAll(async () => {
  await tearDownDB();
});

const request = supertest(app);

describe('Recipes', () => {
  describe('GET /recipes', () => {
    it('should return all recipes', () => (
      request
        .get('/api/v1/recipes')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.length).toBe(2);
        })
    ));
  });

  describe('GET /recipes/:id', () => {
    it('should return specific book when found', () => (
      Recipe({ title: 'Jagung Bakar', categories: ['palu'] }).save((err, recipe) => (
        request
          .get(`/api/v1/recipes/${recipe.id}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .expect((res) => {
            // eslint-disable-next-line no-underscore-dangle
            expect(res.body._id).toBe(recipe.id);
            expect(typeof res.body.title).toBe('string');
          })
      ))
    ));

    it('should return 404 when book is not found', () => (
      request
        .get('/api/v1/recipes/99')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.statusText).toBe('NOT_FOUND');
          expect(res.body.code).toBe(404);
        })
    ));
  });
});
