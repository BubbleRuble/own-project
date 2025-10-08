const express = require('express');

const ctrl = require('../../controllers/movies');

const {validateBody, isValidId, authenticate} = require('../../middlewares');

const {schemas} = require('../../models/Movie')

const router = express.Router();

router.get('/movies', authenticate, ctrl.getMoviesByTitle);

router.get('/movies/all', authenticate, ctrl.getAllMovies);

router.get('/movies/:id', authenticate, isValidId, ctrl.getById);

router.post('/movies', authenticate, validateBody(schemas.addSchema), ctrl.addMovie );

router.put('/movies/:id', authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch('/movies/:id', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

router.delete('/movies/:id', authenticate, isValidId, ctrl.deleteById);

module.exports = router;
//localhost:3000/movies
