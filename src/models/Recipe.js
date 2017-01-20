import mongoose from 'mongoose';

/**
 * Schema
 */
const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  categories: [String],
});

/**
 * Instance methods
 */
RecipeSchema.method({

});

/**
 * Static methods
 */
RecipeSchema.statics = {

};

export default mongoose.model('Recipe', RecipeSchema);
