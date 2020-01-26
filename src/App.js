import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LazyImport from './lazyload';
import routes from './routes';

class App extends React.Component {
  handleImportPage = page => {
    return LazyImport({
      loader: () => import(`./pages/${page}`)
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {routes.map(route => (
            <Route
              exact
              key={route.path}
              path={route.path}
              component={this.handleImportPage(route.component)}
            />
          ))}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
