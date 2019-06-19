import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import NotFound from './NotFound';
import Favorites from './Favorites';
import Recipe from './Recipe';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      favorites: [],
    };
  }

  componentDidMount() {
    fetch('http://reactrecipes.herokuapp.com/v1/recipes')
      .then(res => res.json())
      .then(recipes => {
        this.setState({ recipes });
      });
  }

      toggleFavorite = id => {
        this.setState(({ favorites, ...state }) => {
          const idx = favorites.indexOf(id);

          if (idx !== -1) {
            return { ...state, favorites: favorites.filter(f => f.id !== id) };
          }

          return { ...state, favorites: [...favorites, id] };
        });
      };

      render() {
        return (
          <BrowserRouter>
            <main>
              <Header />

              <Switch>
                <Redirect from="/home" to="/" />
                <Route
                  exact
                  path="/"
                  render={() => (
                    <Home state={this.state} toggleFavorite={this.toggleFavorite} />
                  )}
                />
                <Route
                  path="/favorites"
                  render={() => (
                    <Favorites state={this.state} toggleFavorite={this.toggleFavorite} />
                  )}
                />
                <Route path="/recipe/:id" component={Recipe} />
                <Route component={NotFound} />
              </Switch>
            </main>
          </BrowserRouter>
        );
      }
}

export default App;
