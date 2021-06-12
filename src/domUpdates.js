import flatpickr from 'flatpickr';

let domUpdates = {
  renderBookingsCards(element, currentCustomer, currentDate, type) {
    element.innerHTML = '';
    let bookings = currentCustomer.returnBookings(type, currentDate)
    console.log(bookings[0]);
    let bidetMessage;
    bookings.forEach(booking => {
      booking.bidet ? bidetMessage = 'Hooray there\'s a bidet!' : bidetMessage = 'No bidet for you'
      element.innerHTML +=
      `
        <article class="booking-card">
          <h5>${booking.date}</h4>
          <p>${booking.roomType}</p>
          <p>Room Number ${booking.roomNumber}</p>
          <p>Beds: ${booking.numBeds} ${booking.bedSize}<p>
          <p>$${booking.costPerNight}/ night</p>
          <p>Bidet included?</p>
          <p>${bidetMessage}</p>
        </article>
      `
    })
  },

  renderInnerText(element, data) {
    element.innerText = data;
  },

  renderCalendar(element, currentDate) {
    console.log('okay');
    flatpickr(element, {
      defaultDate: currentDate,
      minDate: currentDate,
      inline: true
    });
  }
}

export default domUpdates;
