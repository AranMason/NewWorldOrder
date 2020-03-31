import React from 'react';
import { SuperMarketStore, SuperMarketOpenings, TimeSlot } from '../models/Types';

import Axios from 'axios';

interface State {
  isLoading: boolean;
  openings: SuperMarketOpenings[]
}

interface Props {

}

class SuperMarket extends React.Component<SuperMarketStore, State>{
  constructor(props: SuperMarketStore) {
    super(props);

    this.state = {
      isLoading: true,
      openings: [],
    }
  }

  componentDidMount() {

    Axios.get(`https://www.ishopnewworld.co.nz/CommonApi/Delivery/GetClickCollectTimeSlot?id=${this.props.id}`).then(res => {
      var data = res.data as {
        slots: SuperMarketOpenings[];
      }

      console.log(res);

      this.setState({
        openings: data.slots.sort((a, b) => {

          var date_a = Date.parse(a.date);
          var date_b = Date.parse(b.date);

          return date_a - date_b;
        })
      })

    })
  }

  renderNextOpenSpace() {

    const timeSlots = ["07:30AM - 08:00AM", "08:00AM - 08:30AM", "09:00AM - 09:30AM", "10:00AM - 10:30AM", "11:00AM - 11:30AM", "12:00PM - 12:30PM", "01:00PM - 01:30PM", "02:00PM - 02:30PM", "03:00PM - 03:30PM"]

    var days = this.state.openings;

    var nextOpen: TimeSlot | null = null;

    for (var i = 0; i < days.length; i++) {

      var slots = days[i].timeSlots;

      slots.sort((a, b) => {
        return timeSlots.indexOf(a.slot) - timeSlots.indexOf(b.slot);
      });

      for (var j = 0; j < slots.length; j++) {

        var timeSlot = days[i].timeSlots[j];

        if (timeSlot.available > 0) {
          return (
            <div>
              {days[i].date} - {timeSlot.slot}
            </div>
          )
        }
      }
    }

    return null;

  }

  render(): JSX.Element | null {
    return <section>
      <section>
        <h1>{this.props.name}</h1>
      </section>

      <section>

        {this.renderNextOpenSpace()}
      </section>
    </section>
  }
}

export default SuperMarket;