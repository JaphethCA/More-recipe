import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Favorites from '../components/favorites/Favorites';


const propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired
};

const FavoritesPage = (props) => {
  const { user, favorites, recipes } = props;
  const hasFavorites = favorites.length > 0;
  return (
    <div >
      <div >
        {hasFavorites ? <Favorites user={user} favorites={favorites} recipes={recipes} /> : (
          <div className="center">
            <h4>Sorry, you have not added any favorite yet!</h4>
            <p>Click on the <i className="material-icons red-text">favorite</i> button on recipe page to add as favorite</p>
          </div>
          )}
      </div>
    </div>
  );
};

FavoritesPage.propTypes = propTypes;

const mapStateToProps = state => ({
  favorites: state.favorites,
  recipes: state.recipes,
  reviews: state.reviews,
  user: state.auth.user
});

export default connect(mapStateToProps, {})(FavoritesPage);
