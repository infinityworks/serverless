import * as ActionTypes from '../actions';

const initialState = { fields: {} };

const submission = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_FIELD:
      // clone our immutable state
      let updatedState = Object.assign({}, state,{
        fields: Object.assign({}, state.fields, {
           [action.name]: action.value
        })
      });
      return updatedState;

    case ActionTypes.POST_FORM:
      return Object.assign({}, state, {
        isSending: true
      });

    case ActionTypes.POST_FORM_FAILURE:
      return Object.assign({}, state, {
          isSending: false,
          error: action.message
        });

    case ActionTypes.POST_FORM_SUCCESS:
      return Object.assign({}, state, {
        isSending: false,
        sendApplicationResult: action.result,
        error: null
      });
  }

  // return original state
  return state;
};

export default submission;
