import request from 'axios';
import parameters from '../../../parameters';
import { SAVE_BEFORE, SAVE_FAILURE, SAVE_SUCCESS } from '../actions';

export default (model, onComplete) => (dispatch, getState) => {

  const { accessToken } = getState().Login;

  dispatch({
    type: SAVE_BEFORE
  });

  let promise;

  if (model.id) {
    promise = request.put(parameters.apiHost + `/v1/notes/${model.id}`, model, {
      headers: {
        Authorization: accessToken
      }
    });
  } else {
    promise = request.post(parameters.apiHost + '/v1/notes', model, {
      headers: {
        Authorization: accessToken
      }
    });
  }

  promise
    .then(({ data }) => {

      if (onComplete) onComplete()

      dispatch({
        type: SAVE_SUCCESS,
        payload: data
      });
    })
    .catch(e => {
      console.log(e);

      if (onComplete) onComplete()

      dispatch({
        type: SAVE_FAILURE,
        payload: {
          status: e.response ? e.response.status : 0,
          data: e.response ? e.response.data : null
        }
      });
    });
}
