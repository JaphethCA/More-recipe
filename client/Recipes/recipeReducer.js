import {
  FETCH_LATEST_RECIPES_FAILED,
  FETCH_LATEST_RECIPES_START,
  FETCH_LATEST_RECIPES_SUCCESS,
  FETCH_SINGLE_RECIPE_FAILED,
  FETCH_SINGLE_RECIPE_START,
  FETCH_SINGLE_RECIPE_SUCCESS,
  FETCH_USER_FAVORITES_FAILED,
  FETCH_USER_FAVORITES_START,
  FETCH_USER_FAVORITES_SUCCESS,
  FETCH_USER_RECIPES_FAILED,
  FETCH_USER_RECIPES_START,
  FETCH_USER_RECIPES_SUCCESS,
  ADD_NEW_RECIPE,
  ADD_NEW_REVIEW_SUCCESS,
  ADD_NEW_REVIEW_FAILED,
  UPVOTE_RECIPE,
  UPDATE_RECIPE,
  DOWNVOTE_RECIPE,
  REMOVE_FROM_FAVORITES,
  DELETE_USER_RECIPE,
  ADD_TO_FAVORITES,
  RECIPE_CREATED,
  REMOVE_FROM_FAVORITES_FAILED,
  DELETE_USER_RECIPE_FAILED,
  ADD_TO_FAVORITES_FAILED
} from './actionTypes';


const initialState = {
  recipes: {
    payload: [],
    totalPages: 0,
    currentPage: 0,
    isFetching: false
  },
  userRecipes: {
    payload: [],
    isFetching: false
  },
  favorites: {
    payload: [],
    isFetching: false
  },
  recipe: {
    notFound: false,
    isFetching: false,
    created: false,
    payload: {
      name: '',
      description: '',
      id: 0,
      ingredients: '',
      direction: '',
      image: null,
      upvotes: 0,
      views: 0,
      downvotes: 0,
      userId: 0,
      createdAt: '',
      updatedAt: '',
      Reviews: [],
      author: {
        username: '',
        photo: null
      },
    }
  }
};


/**
 * updates a recipe in state without mutation
 * @param {Array} recipeList list of recipes
 * @param {Object} recipe recipe to be updated in array
 * @returns {Object} udpated object of item
 */
const updateRecipeList = (recipeList, recipe) => {
  const recipeIndex = recipeList
    .findIndex(indexRecipe => indexRecipe.id === recipe.id);

  const updatedRecipes = recipeList.map((recipeInList, index) => {
    if (index !== recipeIndex) {
      return recipeInList;
    }
    return { ...recipeInList, ...recipe };
  });
  return updatedRecipes;
};

/**
 * @param {Object}  state - initial state
 * @param {Object} action - redux action
 * @returns {Object} - current state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_RECIPE_START:
      return {
        ...state,
        recipe: { ...state.recipe, payload: {}, isFetching: true }
      };

    case FETCH_SINGLE_RECIPE_FAILED:
      return {
        ...state,
        recipe: {
          ...state.recipe, payload: {}, isFetching: false, notFound: true
        }
      };

    case FETCH_SINGLE_RECIPE_SUCCESS:
      return {
        ...state,
        recipe: {
          payload: { ...state.recipe.payload, ...action.recipe },
          isFetching: false,
          notFound: false
        }
      };

    case RECIPE_CREATED:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          created: true
        }
      };

    case ADD_NEW_REVIEW_SUCCESS:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          payload: {
            ...state.recipe.payload,
            Reviews: [
              ...state.recipe.payload.Reviews,
              action.review
            ]
          }
        }
      };
    case ADD_NEW_REVIEW_FAILED:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          payload: {
            ...state.recipe.payload,
            Reviews: [
              ...state.recipe.payload.Reviews
            ]
          }
        }
      };

    case UPVOTE_RECIPE:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          payload: {
            ...state.recipe.payload,
            upvotes: action.recipe.upvotes,
            downvotes: action.recipe.downvotes
          }
        },
        recipes: {
          ...state.recipes,
          payload: updateRecipeList(state.recipes.payload, action.recipe)
        }
      };

    case DOWNVOTE_RECIPE:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          payload: {
            ...state.recipe.payload,
            downvotes: action.recipe.downvotes,
            upvotes: action.recipe.upvotes,
          }
        },
        recipes: {
          ...state.recipes,
          payload: updateRecipeList(state.recipes.payload, action.recipe)
        }
      };

    case FETCH_LATEST_RECIPES_START:
      return {
        ...state,
        recipes: {
          ...state.recipes,
          currentPage: 0,
          payload: [],
          totalPages: 0,
          isFetching: true,
        }
      };

    case FETCH_LATEST_RECIPES_SUCCESS:
      return {
        ...state,
        recipes: {
          currentPage: action.currentPage,
          totalPages: action.totalPages,
          payload: [...action.payload],
          isFetching: false
        }
      };

    case FETCH_LATEST_RECIPES_FAILED:
      return {
        ...state,
        recipes: {
          ...state.recipes,
          isFetching: false
        }
      };

    case UPDATE_RECIPE:
      return {
        ...state,
        recipes: {
          ...state.recipes,
          payload: updateRecipeList(state.recipes.payload, action.recipe)
        },
        userRecipes: {
          ...state.userRecipes,
          payload: updateRecipeList(state.userRecipes.payload, action.recipe)
        },
        favorites: {
          ...state.favorites,
          payload: updateRecipeList(state.favorites.payload, action.recipe)
        }
      };

    case DELETE_USER_RECIPE:
      return {
        ...state,
        recipes: {
          ...state.recipes,
          payload: state.recipes.payload
            .filter(recipe => recipe.id !== action.id)
        },
        userRecipes: {
          ...state.userRecipes,
          payload: state.userRecipes.payload
            .filter(recipe => recipe.id !== action.id)
        },
        favorites: {
          ...state.favorites,
          payload: state.favorites.payload
            .filter(recipe => recipe.id !== action.id)
        }
      };

    case DELETE_USER_RECIPE_FAILED:
      return {
        ...state
      };

    case ADD_NEW_RECIPE:
      return {
        ...state,
        recipes: {
          ...state.recipes,
          payload: [action.recipe, ...state.recipes.payload]
        },
        userRecipes: {
          ...state.userRecipes,
          payload: [action.recipe, ...state.userRecipes.payload]
        }
      };

    case FETCH_USER_RECIPES_START:
      return {
        ...state,
        userRecipes: {
          ...state.userRecipes,
          isFetching: true
        }
      };

    case FETCH_USER_RECIPES_SUCCESS:
      return {
        ...state,
        userRecipes: {
          payload: [...action.payload],
          isFetching: false
        },
        recipe: {
          ...state.recipe,
          created: false
        }
      };

    case FETCH_USER_RECIPES_FAILED:
      return {
        ...state,
        userRecipes: {
          ...state.userRecipes,
          isFetching: false
        }
      };

    case FETCH_USER_FAVORITES_START:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          isFetching: true
        }
      };

    case FETCH_USER_FAVORITES_SUCCESS:
      return {
        ...state,
        favorites: {
          payload: [...action.payload],
          isFetching: false
        }
      };

    case FETCH_USER_FAVORITES_FAILED:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          isFetching: false
        }
      };


    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: {
          payload: [
            action.recipe,
            ...state.favorites.payload
          ]
        }
      };

    case ADD_TO_FAVORITES_FAILED:
      return {
        ...state,
        favorites: {
          ...state.favorites
        }
      };

    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          payload: state.favorites.payload
            .filter(favorite => favorite.id !== action.id)
        }
      };
    case REMOVE_FROM_FAVORITES_FAILED:
      return {
        ...state,
        favorites: {
          ...state.favorites
        }
      };

    default:
      return state;
  }
};
