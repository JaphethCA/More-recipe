import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import { ADD_NEW_REVIEW } from './actionTypes';

/**
 * @param {object} review
 * @returns {object} - action
 */
function addNewReview(review) {
  return {
    type: ADD_NEW_REVIEW,
    review
  };
}

export default (id, data) => dispatch => axios.post(`/api/recipe/${id}/review`, data)
  .then((res) => {
    toastr.success(res.data.message);
    dispatch(addNewReview(res.data.review));
  }).catch(error => toastr.error(error.response.data.message));
