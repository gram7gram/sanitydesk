import request from 'axios';
import parameters from '../../../parameters';
import { REMOVE_BEFORE, REMOVE_FAILURE, REMOVE_SUCCESS } from '../actions';

export default (model, onComplete) => (dispatch, getState) => {

  const { accessToken } = getState().Login;

  dispatch({
    type: REMOVE_BEFORE
  });

  request.delete(parameters.apiHost + `/v1/notes/${model.id}`, {
    headers: {
      Authorization: accessToken
    }
  })
    .then(() => {

      if (onComplete) onComplete();

      dispatch({
        type: REMOVE_SUCCESS,
        payload: {
          id: model.id
        }
      });
    })
    .catch(e => {
      console.log(e);

      if (onComplete) onComplete();

      dispatch({
        type: REMOVE_FAILURE,
        payload: {
          status: e.response ? e.response.status : 0,
          data: e.response ? e.response.data : null
        }
      });
    });
}
