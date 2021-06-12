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
      inline: true,
      dateFormat: "Y/m/d"
    });
  },

  renderAvailableRooms(availableRoomsSection, filterTagsContainer, hotel, searchDate) {
    availableRoomsSection.innerHTML = '';
    console.log(hotel.rooms);
    let availableRooms = hotel.getAvailableRooms(searchDate)
    console.log(availableRooms);
    let bidetMessage;
    availableRooms.forEach(room => {
      room.bidet ? bidetMessage = 'Hooray there\'s a bidet!' : bidetMessage = 'No bidet for you'
      availableRoomsSection.innerHTML +=
      `
      <article class="booking-card">
        <h5>${room.roomType}</h4>
        <p>Room Number ${room.number}</p>
        <p>Beds: ${room.numBeds} ${room.bedSize}<p>
        <p>$${room.costPerNight}/ night</p>
        <p>Bidet included?</p>
        <p>${bidetMessage}</p>
      </article>
      `
    })
    this.renderAvailableTags(filterTagsContainer, availableRooms);
  },

  renderAvailableTags(container, availableRooms) {
    container.innerHTML = '';
    let tags = availableRooms.map(room => {
      return room.roomType;
    })
    let uniqueTags = [...new Set(tags)];
    uniqueTags.forEach(tag => {
      container.innerHTML +=
      `
      <li class="">
				<input type="checkbox" name="tags" id="${tag}" value="${tag}" />
				<label for="${tag}" class="tags">${tag}</label>
      </li>
      `
    })
  },

  show(element) {
    element.classList.remove('hide');
  },

  hide(element) {
    element.classList.add('hide');
  }
}

export default domUpdates;
