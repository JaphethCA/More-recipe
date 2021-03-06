import express from 'express';

import Authenticator from '../middlewares/Authenticator';
import {
  signupValidator,
  signinValidator,
  reviewPostValidator,
  recipeValidator,
  checkParams } from '../middlewares/validators';
import * as userController from '../controllers/userController';
import { postReview, getRecipeReview } from '../controllers/reviewController';
import * as recipeController from '../controllers/recipeController';
import * as favoriteController from '../controllers/favoriteController';
import { upVote, downVote } from '../controllers/votingController';

const apiV1 = express.Router();

// Endpoints for user login and signup
apiV1.post('/users/signup', signupValidator, userController.signup)
  .all('/users/signup', Authenticator.notImplemented);
apiV1.post('/users/signin', signinValidator, userController.signin)
  .all('/users/signin', Authenticator.notImplemented);

// Endpoint for getting all recipes and adding new recipe
apiV1.get(
  '/recipes',
  recipeController.sortOrOrderRecipes,
  recipeController.searchRecipe,
  recipeController.allRecipes
)
  .all('/recipes', Authenticator.notImplemented);

// Endpoints for getting, updating and deleting a single recipe
apiV1.post('/recipe', recipeValidator, recipeController.createRecipe)
  .put(
    '/recipe/:recipeId',
    checkParams,
    recipeValidator,
    recipeController.updateRecipe
  )
  .delete(
    '/recipe/:recipeId',
    checkParams,
    recipeController.deleteRecipe
  )
  .get(
    '/recipe/:recipeId',
    checkParams,
    recipeController.getSingleRecipe
  )
  .all('/recipe/:recipeId', Authenticator.notImplemented);

// Endpoints for users to get, set and remove favorite recipes
apiV1
  .get(
    '/users/favorites',
    favoriteController.getUserFavorites
  )
  .post(
    '/users/favorites/:recipeId',
    checkParams,
    favoriteController.addToFavorites
  )
  .delete(
    '/users/favorites/:recipeId',
    checkParams,
    favoriteController.removeFromFavorites
  )
  .all('/users/favorites/:recipeId', Authenticator.notImplemented);


// Endpoints  for upvoting and down voting recipes
apiV1
  .put('/recipe/:recipeId/upvote', checkParams, upVote)
  .all('/recipe/:recipeId/upvote', Authenticator.notImplemented);

apiV1
  .put('/recipe/:recipeId/downvote', checkParams, downVote)
  .all('/recipe/:recipeId/downvote', Authenticator.notImplemented);


// Enpoints for adding and getting a single review to recipe
apiV1
  .post(
    '/recipe/:recipeId/review',
    checkParams,
    reviewPostValidator,
    postReview
  )
  .all('/recipe/:recipeId/review', Authenticator.notImplemented);

apiV1
  .get('/recipe/:recipeId/reviews', checkParams, getRecipeReview)
  .all('/recipe/:recipeId/reviews', Authenticator.notImplemented);

// Enpoint for getting recipes created by a single user
apiV1
  .get('/users/recipes', recipeController.getUserRecipes)
  .all('/users/recipes', Authenticator.notImplemented);

// Endpoint for getting user info  by id and also getting user profile
apiV1
  .get('/users/profile', userController.userProfile);

apiV1
  .put('/users/profile', userController.updateProfile);


export default apiV1;
