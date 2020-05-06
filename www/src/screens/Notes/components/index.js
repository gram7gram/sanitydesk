import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import Fetch from "../actions/Fetch";
import Card from "./Card";
import { TOGGLE_ADD_FORM } from '../actions';

class Notes extends React.Component {

  componentDidMount() {
    this.props.dispatch(Fetch())
  }

  toggleAdd = () => {
    this.props.dispatch({
      type: TOGGLE_ADD_FORM,
      payload: true
    });
  };

  renderContent = () => {
    const { items, isLoading, isAddVisible, model } = this.props.Notes;

    if (items.length === 0 && !isAddVisible) {
      if (!isLoading) {
        return <div className="text-center py-3">
          <h4>There are no notes</h4>
          <p>Start creating your notes by pressing Add</p>
        </div>;
      } else {
        return <div className="text-center py-3">
          <i className="fa fa-spin fa-circle-notch fa-2x"/>
        </div>;
      }
    }

    return <div className="container-fluid">
      <div className="row">

        {isAddVisible ? <div className="col-12 col-md-6 col-lg-4 col-xl-3">
          <Card model={model}/>
        </div> : null}

        {items.map(item =>
          <div key={item.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
            <Card model={item}/>
          </div>
        )}
      </div>
    </div>;
  };

  render() {

    return <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card my-3 bg-darker text-light">
            <div className="card-header">
              <div className="row">
                <div className="col-6">
                  <h3 className="m-0">SanityDesk Notes</h3>
                </div>
                <div className="col-6 text-right">
                  <button className="btn btn-sm btn-success" onClick={this.toggleAdd}>
                    <i className="fa fa-plus"/> Add
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body px-0">

              {this.renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}

const selectors = createStructuredSelector({
  Notes: store => store.Notes,
});

export default connect(selectors)(Notes);
