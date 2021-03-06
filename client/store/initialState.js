export default {
  profile: {
    payload: {},
    isFetching: false
  },
  results: {
    payload: [],
    isFetching: false
  },
  auth: {
    isAuthenticated: false,
    user: {},
    errors: ''
  },
  recipeReducer: {
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
      },
    }
  }
};
