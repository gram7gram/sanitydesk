import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CHANGED } from '../actions';
import moment from 'moment';
import Save from '../actions/Save';
import Remove from '../actions/Remove';

let timeoutId;

const Card = ({ model }) => {

  const [ active, setActive ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ changes, setChanges ] = useState(false);
  const dispatch = useDispatch();

  const isValid = model.title || model.text

  const change = name => e => {
    dispatch({
      type: CHANGED,
      payload: {
        id: model.id,
        [name]: e.target.value
      }
    });

    setChanges(true)

    requestSave();
  };

  const requestSave = () => {

    if (!changes) return

    clearTimeout(timeoutId);
    timeoutId = setTimeout(save, 1000);

  };

  const save = () => {

    if (!isValid) return;
    if (loading) return;

    setLoading(true);

    try {
      dispatch(Save(model, () => {
        setLoading(false);
        setChanges(false);
      }));
    } catch (e) {
      console.log(e);
    }

  };

  const remove = () => {

    if (loading) return;

    setLoading(true);

    try {
      dispatch(Remove(model, () => {
        setLoading(false);
        setChanges(false);
      }));
    } catch (e) {
      console.log(e);
    }

  };

  const onFocusIn = () => {

    setActive(true);

    requestSave();

  };

  const onFocusOut = () => {

    setActive(false);

    requestSave();

  };

  return <div className={"card mb-2 bg-dark text-light" + (active ? " border-light" : "")}>

    <div className="card-header p-1">
      <input type="text"
             className="form-control form-control-sm bg-transparent text-light note-input"
             placeholder="Enter title..."
             onChange={change('title')}
             onFocus={onFocusIn}
             onBlur={onFocusOut}
             value={model.title || ''}/>
    </div>
    <div className="card-body p-1">

      <textarea
        className="form-control form-control-sm bg-transparent text-light note-input"
        onChange={change('text')}
        placeholder="Enter your note..."
        onFocus={onFocusIn}
        onBlur={onFocusOut}
        value={model.text || ''}/>

    </div>
    <div className="card-footer p-1 ">

      <div className="row">

        <div className="col-6 text-left">
          {model.createdAt
            ? <div className="small text-muted">
              Last update: {moment(model.createdAt).format('HH:mm')}
            </div>
            : null}
        </div>

        <div className="col-6 text-right">
          {model.id && !loading
            ? <i className="fa fa-trash p-2" onClick={remove}/>
            : null}

          {loading
            ? <i className="fa fa-spin fa-circle-notch p-2"/>
            : null}
        </div>
      </div>
    </div>
  </div>;
};

export default Card;
