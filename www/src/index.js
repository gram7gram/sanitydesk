import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';

import configureStore from './store';

import Notes from './screens/Notes/components';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/style.css';
import WithLogin from './hoc/WithLogin';

const rootElement = document.getElementById('root');

try {
  const store = configureStore();

  render(<Provider store={store}>

    <WithLogin>
      <Notes/>
    </WithLogin>

  </Provider>, rootElement);

} catch (e) {
  console.error(e);

  // window.location.reload();
}
