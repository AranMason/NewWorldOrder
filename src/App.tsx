import React from 'react';
import './App.css';
import Helmet from 'react-helmet';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AddTodo, AddTodoType } from './state/actions/todo';
import { RootState } from './state/reducers';
import { ReduxActionType } from './models/redux';

/**
 * Defining Connections
 */
interface MapStateType {
  todo: string[];
}

interface MapDispatchType {
  AddTodo: (data: AddTodoType) => ReduxActionType<AddTodoType>;
}
/**
 * Mapping Functions
 */
const mapState = (state: RootState): MapStateType => ({ todo: state.todo.todo });

const mapDispatch = (dispatch: Dispatch): MapDispatchType => {
  return {
    AddTodo: (data: AddTodoType): ReduxActionType<AddTodoType> => dispatch(AddTodo(data)),
  };
};

/**
 * App State
 */
interface ComponentState {
  title: string;
}

type Props = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

/**
 * App Display
 */
class App extends React.Component<Props, ComponentState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      title: 'Test App',
    };
  }

  render(): JSX.Element | null {
    const { title } = this.state;

    return (
      <div className="App-Container">
        <Helmet>
          <title>{title}</title>
          <link href="https://fonts.googleapis.com/css?family=Noto+Sans+JP|Noto+Serif&display=swap" rel="stylesheet" />
        </Helmet>
        <header>
          <h1 className="title">{title}</h1>
        </header>
        <section>
          <h1>Header 1</h1>
          <h2>Header 2</h2>
          <h3>Header 3</h3>
          <h4>Header 4</h4>
          <h5>Header 5</h5>
          <h6>Header 6</h6>
        </section>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
          <span>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </span>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Hyperlink:
          <a href="/">here</a>
        </p>
        <section />
        <footer>Footer</footer>
      </div>
    );
  }
}

export default connect(mapState, mapDispatch)(App);
