import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGED } from '../actions';
import LoginCheck from '../actions/LoginCheck';

const Login = () => {

  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();
  const { username, serverError } = useSelector(state => state.Login);

  const isValid = !!username;

  const check = () => {

    setLoading(true);

    dispatch(LoginCheck(username, () => {
      setLoading(false)
    }));
  };

  const change = name => e => {
    dispatch({
      type: CHANGED,
      payload: {
        [name]: e.target.value
      }
    });
  };

  return <div className="container">
    <div className="row">
      <div className="col-12">
        <div className="card my-3 bg-darker text-light">
          <div className="card-header">
            <h3 className="m-0 text-center">SanityDesk Notes</h3>
          </div>
          <div className="card-body text-center">

            <div className="row">
              <div className="col-8 col-md-6 mx-auto">

                {serverError
                  ? <div className="alert alert-danger">{serverError}</div>
                  : null}

                <div className="form-group">
                  <input type="text" className="form-control text-center"
                         value={username || ''}
                         placeholder="Enter your username..."
                         onChange={change('username')}/>
                </div>

                <button className="btn btn-block btn-primary"
                        onClick={check}
                        disabled={!isValid || loading}>
                  <i className={"fa " + (loading ? "fa-spin fa-circle-notch" : "fa-key")}/>
                  &nbsp;{loading ? "Checking..." : "Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default Login;
