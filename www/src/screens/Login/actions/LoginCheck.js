import request from 'axios';
import parameters from '../../../parameters';
import { LOGIN_BEFORE, LOGIN_FAILURE, LOGIN_SUCCESS } from '../actions';
import Cookie from 'js-cookie';

export default (username, onComplete) => (dispatch) => {

  dispatch({
    type: LOGIN_BEFORE
  });

  request.post(parameters.apiHost + `/v1/login`, {
    username
  })
    .then(({ data }) => {

      if (onComplete) onComplete();

      Cookie.set('accessToken', data.accessToken)

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data
      });
    })
    .catch(e => {
      console.log(e);

      if (onComplete) onComplete();

      dispatch({
        type: LOGIN_FAILURE,
        payload: {
          status: e.response ? e.response.status : 0,
          data: e.response ? e.response.data : null
        }
      });
    });
}
