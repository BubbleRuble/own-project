const express = require('express');

const ctrl = require('../../controllers/movies');

const {validateBody, isValidId, authenticate} = require('../../middlewares');

const {schemas} = require('../../models/Movie')

const router = express.Router();

// authenticate

router.get('/', ctrl.getAll);

router.get('/:id',isValidId, ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.add );

router.put('/:id', isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch('/:id', isValidId, validateBody(schemas.addSchema), ctrl.updateFavorite);

router.delete('/:id', isValidId, ctrl.deleteById);

module.exports = router;
