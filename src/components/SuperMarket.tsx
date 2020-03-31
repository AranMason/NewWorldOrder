import React from 'react';
import { SuperMarketStore, SuperMarketOpenings } from '../models/Types';
import moment from 'moment';
import Axios from 'axios';

import './SuperMarket.css';

interface State {
  isLoading: boolean;
  openings: SuperMarketOpenings[];
  next: NextTimeSlots | null;
}

interface NextTimeSlots {
  slot: string;
  available: number;
  date: string;
}

interface Props {

}

class SuperMarket extends React.Component<SuperMarketStore, State>{
  constructor(props: SuperMarketStore) {
    super(props);

    this.state = {
      isLoading: true,
      openings: [],
      next: null
    }
  }

  componentDidMount() {
    Axios.get(`https://www.ishopnewworld.co.nz/CommonApi/Delivery/GetClickCollectTimeSlot?id=${this.props.id}`).then(res => {
      var data = res.data as {
        slots: SuperMarketOpenings[];
      }

      var openings = data.slots.sort((a, b) => {

        var date_a = Date.parse(a.date);
        var date_b = Date.parse(b.date);

        return date_a - date_b;
      });

      this.setState({
        openings,
        next: this.nextOpenings(openings),
        isLoading: false,
      })

    })
  }

  nextOpenings(days: SuperMarketOpenings[]): NextTimeSlots | null {

    const timeSlots = ["07:30AM - 08:00AM", "08:00AM - 08:30AM", "09:00AM - 09:30AM", "10:00AM - 10:30AM", "11:00AM - 11:30AM", "12:00PM - 12:30PM", "01:00PM - 01:30PM", "02:00PM - 02:30PM", "03:00PM - 03:30PM"]

    for (var i = 0; i < days.length; i++) {

      var slots = days[i].timeSlots;

      slots.sort((a, b) => {
        return timeSlots.indexOf(a.slot) - timeSlots.indexOf(b.slot);
      });

      for (var j = 0; j < slots.length; j++) {

        var timeSlot = days[i].timeSlots[j];

        if (timeSlot.available > 0) {
          return {
            slot: timeSlot.slot,
            date: days[i].date,
            available: timeSlot.available,
          }

        }
      }
    }

    return null
  }

  renderNextOpenSpace() {

    if (this.state.isLoading) {
      return <div>
        Loading...
      </div>
    }

    if (!this.state.next) {
      return (
        <div className="Supermarket-info">
          <div><span>Next time slot: </span></div>
          <div>No time slots found</div>
        </div>
      )
    }

    return <div className="Supermarket-info">

      <div><span>Next time slot: </span></div>
      <div>{moment(this.state.next.date, "YYYY-MM-DD").format('LL')}</div>
      <div>{this.state.next.slot}</div>

    </div>


  }

  render(): JSX.Element | null {
    return <section>
      <section>
        <h1>{this.props.name}</h1>
      </section>

      <section>
        {this.props.distance ? <div>Distance: {(this.props.distance / 1000).toFixed(2)}km away</div> : null}

        {this.renderNextOpenSpace()}
      </section>
    </section>
  }
}

export default SuperMarket;