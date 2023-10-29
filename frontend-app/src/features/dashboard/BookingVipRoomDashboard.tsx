import React, { Component } from 'react';

class BookingVipRoomComponent extends Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      bookings: [], // This will store an array of booking objects
      newBooking: {
        BookingDate: '',
        BookingTimeFrom: '',
        BookingTimeTo: '',
        Comment: '',
      },
    };
  }

 
  render() {
    return (
      <div>
        <h1>Book VIP Room</h1>
        <form >
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="BookingDate"
              //value={this.state.newBooking.BookingDate}
              //onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Time From:</label>
            <input
              type="time"
              name="BookingTimeFrom"
              //value={this.state.newBooking.BookingTimeFrom}
              //onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Time To:</label>
            <input
              type="time"
              name="BookingTimeTo"
              //value={this.state.newBooking.BookingTimeTo}
              //onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Comment:</label>
            <textarea
              name="Comment"
              //value={this.state.newBooking.Comment}
             // onChange={this.handleInputChange}
            />
          </div>
          <button type="submit">Book VIP Room</button>
        </form>
        <h2>Bookings</h2>
        <ul>
          {/* {this.state.bookings.map((booking, index) => (
            <li key={index}>
              Date: {booking.BookingDate}, Time From: {booking.BookingTimeFrom}, Time To: {booking.BookingTimeTo}, Comment: {booking.Comment}
            </li>
          ))} */}
        </ul>
      </div>
    );
  }
}

export default BookingVipRoomComponent;
