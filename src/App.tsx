import * as React from 'react';
import { Provider } from 'react-redux';
import { TemplateScene } from ':scenes/TemplateScene';
import { store } from './redux/store';


export const App = () => (
  <div>
    <Provider store={store}>
      <TemplateScene />
    </Provider>
  </div>
)