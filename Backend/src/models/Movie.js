const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const genrelist = [
  'action',
  'comedy',
  'drama',
  'horror',
  'science',
  'romance',
  'thriller',
];

const dateRegexp = /^\d{2}-\d{4}$/;

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false
    },
    genre: {
      type: String,
      enum: genrelist,
      required: true,
      lowercase: true,
    },
    date: {
      type: String,
      match: dateRegexp,
      required: true,
    },
    owner:{
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }
  },
  { versionKey: false, timestamps: true },
);

movieSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  favorite: Joi.boolean(),
  genre: Joi.string()
    .case('lower')
    .valid(...genrelist)
    .required(),
  date: Joi.string().pattern(dateRegexp).required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemas = {
  addSchema,
  updateFavoriteSchema,
}

const Movie = model('movie', movieSchema);


module.exports = {
  Movie,
  schemas,
}

