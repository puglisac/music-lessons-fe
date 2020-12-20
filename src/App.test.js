import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from "react-router-dom";
import { ExpansionPanelActions } from '@material-ui/core';

test('renders without crashing', () => {
  render(<Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>);
});
test('matches snapshot', () => {
  const { asFragment } = render(<Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>);

  expect(asFragment()).toMatchSnapshot();
});