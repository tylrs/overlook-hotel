let domUpdates = {
  renderBookingsCards(element, currentCustomer, currentDate, type) {
    element.innerHTML = '';
    let bookings = currentCustomer.returnBookings(type, currentDate)
    bookings.forEach(booking => {
      element.innerHTML +=
      `
        <article class="booking-card">
          <h5>2020/02/04</h4>
          <p>Residential Suite</p>
          <p>Room Number 5</p>
          <p>$358.40 / Night</p>
        </article>
      `
    })
  },

  renderInnerText(element, data) {
    element.innerText = data;
  }
}

export default domUpdates;
