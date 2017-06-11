import getConfig from '../config';
const domain = getConfig().apiDomain;

export const UPDATE_FIELD = 'UPDATE_FIELD';
export const updateField = (name, value) => ({
  type: UPDATE_FIELD,
  name,
  value
});

export const POST_FORM = 'POST_FORM';
export const POST_FORM_FAILURE = 'POST_FORM_FAILURE';
export const POST_FORM_SUCCESS = 'POST_FORM_SUCCESS';
export const postForm = (data) => ({
  type: POST_FORM,
  formData: data
});
export const postFormFailure = (error) => ({
  type: POST_FORM_FAILURE,
  message: error
});
export const postFormSuccess = (result) => ({
  type: POST_FORM_SUCCESS,
  result: result
});


export const sendSubmission = data => dispatch => {

  let domain = getConfig().apiDomain;
  let opts = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  };

  dispatch(postForm(data));

  return fetch(`${domain}submission/`, opts)
    .then(response => {
      if (response.status >= 400) {
        dispatch(postFormFailure('Bad response from server'));
        return;
      }
      return response.json();
    })
    .then(result => {
      if (typeof result == 'undefined') {
        dispatch(postFormFailure('No valid response from server'));
        return;
      }

      if (typeof result.error !== 'undefined') {
        dispatch(postFormFailure(result.error));
        return;
      }

      dispatch(postFormSuccess(result));
    });
};
