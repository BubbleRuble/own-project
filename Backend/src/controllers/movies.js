const { Movie } = require('../models/Movie');

const { HttpError, ctrlWrapper } = require('../helpers');

// const getAll = async (req, res) => {
//   const { _id: owner } = req.user;
//   const { page = 1, limit = 3 } = req.query;
//   const skip = (page - 1) * limit;
//   const result = await Movie.find({ owner }, '-createdAt -updatedAt', {
//     skip,
//     limit,
//   }).populate('owner', 'name email');
//   res.json(result);
// };

const getAllMovies = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Movie.find({owner});
  res.json(result);
};

const addMovie = async (req, res) => {
  const { _id: owner } = req.user; 
  const result = await Movie.create({...req.body, owner});
  res.status(201).json(result);
};

const getMoviesByTitle = async (req, res) => {
    const { _id: owner } = req.user;
    const { search } = req.query;

  if (!search) {
    const result = await Movie.findOne({owner});
    return res.json(result);
  }

  const result = await Movie.find({
    owner,
    title: { $regex: search, $options: 'i' },
  });

  if (result.length === 0) {
    return res.json([]);
  }
  res.json(result);
};

const getById = async (req, res) => {
  const { _id: owner} = req.body;
  const { id } = req.params;
  const result = await Movie.findById({_id: id, owner}, req.body, {new: true});

  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const updateById = async (req, res) => {
  const { _id: owner} = req.body;
  const { id } = req.params;
  const result = await Movie.findByIdAndUpdate({_id: id, owner}, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { _id: owner} = req.body;
  const { id } = req.params;
  const result = await Movie.findByIdAndUpdate({_id: id, owner}, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { _id: owner} = req.body;
  const { id } = req.params;
  const result = await Movie.findByIdAndRemove({_id: id, owner});
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({
    message: 'Delete success',
  });
};

module.exports = {
  getAllMovies: ctrlWrapper(getAllMovies),
  getMoviesByTitle: ctrlWrapper(getMoviesByTitle),
  getById: ctrlWrapper(getById),
  addMovie: ctrlWrapper(addMovie),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
