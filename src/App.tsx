import React from 'react';
import './App.css';
import Helmet from 'react-helmet';
import Axios from 'axios';
import { getDistance } from 'geolib';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AddTodo } from './state/actions/todo';
import { RootState } from './state/reducers';
import * as Types from './models/Types';

import SuperMarket from './components/SuperMarket';

/**
 * Defining Connections
 */
interface MapStateType {
  todo: string[];
}

interface MapDispatchType {
  AddTodo: (data: Types.AddTodo) => Types.ActionAddTodo;
}
/**
 * Mapping Functions
 */
const mapState = (state: RootState): MapStateType => ({ todo: state.todo.todo });

const mapDispatch = (dispatch: Dispatch): MapDispatchType => {
  return {
    AddTodo: (data: Types.AddTodo): Types.ActionAddTodo => dispatch(AddTodo(data)),
  };
};

/**
 * App State
 */
interface ComponentState {
  title: string;
  supermarkets: Types.SuperMarketStore[];
  isLoading: boolean;
  userLocation: {
    latitude: number;
    longitude: number;
  }
}

type Props = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

/**
 * App Display
 */
class App extends React.Component<Props, ComponentState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      title: 'New World Order',
      supermarkets: [],
      isLoading: true,
      userLocation: {
        latitude: 0,
        longitude: 0,
      }
    };

    this.gotUserLocation = this.gotUserLocation.bind(this)
  }

  gotUserLocation(pos: any) {



    Axios.get("https://www.ishopnewworld.co.nz/CommonApi/Store/GetStoreList").then((res: any) => {

      this.setState({
        supermarkets: res.data.stores,
        isLoading: false,
        userLocation: {
          latitude: pos.coords.latitude || 0,
          longitude: pos.coords.longitude || 0,
        }
      })

    })
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.gotUserLocation);

  }

  renderIsLoading() {


    if (this.state.isLoading) {
      return (
        <div>
          For this app to work, you will need to allow access to your location. This data is not stored, only to find the nearest stores to you.
        </div>
      )
    } else {
      return (
        <div className="supermarket-container">
          {this.state.supermarkets.map((store) => {

            var withinRange = getDistance(this.state.userLocation, {
              latitude: store.latitude,
              longitude: store.longitude
            })

            //Distance is within 5km
            if (withinRange > 5000) {
              return null;
            }

            return (
              <SuperMarket key={store.id} {...store} />
            )

          })
          }
        </div>
      )
    }
  }

  render(): JSX.Element | null {
    const { title } = this.state;

    return (
      <div className="App-Container">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <header>
          <h1 className="title">{title}</h1>
        </header>

        <section>
          {this.renderIsLoading()}
        </section>
        <footer>Created by Aran Mason</footer>
      </div>
    );
  }
}

export default connect(mapState, mapDispatch)(App);
