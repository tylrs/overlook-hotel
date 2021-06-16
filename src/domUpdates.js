import flatpickr from 'flatpickr';

let domUpdates = {
  renderBookingsCards(element, currentCustomer, currentDate, type) {
    element.innerHTML = '';
    let bookings = currentCustomer.returnBookings(type, currentDate)
    let bidetMessage;
    bookings.forEach(booking => {
      booking.bidet ? bidetMessage = 'Luxury Bidet' : bidetMessage = 'Sorry, no bidet'
      element.innerHTML +=
      `
        <article class="booking-card" tabindex=0>
          <div class="card-header">
            <h3>Your Booking On:</h3>
            <h3>${booking.date}</h3>
          </div>
          <div class="card-details">
            <div class="booking-info">
              <p>Room #${booking.roomNumber}</p>
              <p>${booking.roomType}</p>
              <p>Beds: ${booking.numBeds} ${booking.bedSize}</p>
              <p>${bidetMessage}</p>
            </div>
            <div class="costPerNight">
              <p>$${booking.costPerNight}/ night</p>
            </div>
          </div>
        </article>
      `
    })
  },

  renderInnerText(element, data) {
    element.innerText = data;
  },

  renderCalendar(element, currentDate) {
    flatpickr(element, {
      defaultDate: currentDate,
      minDate: currentDate,
      inline: true,
      dateFormat: "Y/m/d"
    });
  },

  renderAvailableRooms(availableRoomsSection, availableRooms, searchDate) {
    availableRoomsSection.innerHTML = '';
    let header = document.querySelector('#roomSearchHeader h2');
    header.innerText = 'Available Rooms';
    let bidetMessage;
    availableRooms.forEach(room => {
      room.bidet ? bidetMessage = 'Luxury Bidet' : bidetMessage = 'No bidet for you'
      availableRoomsSection.innerHTML +=
      `
        <article class="room-card" id="${room.number}" role="button" tabindex=0>
          <div class="card-header">
            <h3>Date Available:</h3>
            <h3>${searchDate}</h3>
          </div>
          <div class="card-details">
            <div class="booking-info">
              <p>Room #${room.number}</p>
              <p>${room.roomType}</p>
              <p>Beds: ${room.numBeds} ${room.bedSize}</p>
              <p>${bidetMessage}</p>
            </div>
            <div class="costPerNight">
              <p>$${room.costPerNight}/ night</p>
            </div>
          </div>
        </article>
      `
    })
  },

  renderAvailableTags(availableRoomsSection, availableRooms) {
    availableRoomsSection.innerHTML = '';
    availableRoomsSection.innerHTML = `<legend class="filter-section-title">Filter Available Rooms by Room Type</legend>`
    let tags = availableRooms.map(room => {
      return room.roomType;
    })
    let uniqueTags = [...new Set(tags)];
    uniqueTags.forEach(tag => {
      availableRoomsSection.innerHTML +=
      `
      <li class="filter-tag">
				<input type="radio" name="tags" id="${tag}" value="${tag}" />
				<label class="filter-tag-label" for="${tag}" role="button" tabindex=0>${tag}</label>
      </li>
      `
    })
  },

  renderFilteredRooms(availableRoomsSection, availableRooms, tagRadioButtons, hotel) {
    availableRoomsSection.innerHTML = ''
    let header = document.querySelector('#roomSearchHeader h2');
    let selectedType;
    tagRadioButtons.forEach(tag => {
      tag.checked ? selectedType = tag.value : null;
      tag.checked = false;
    })
    header.innerText = `Rooms Filtered by: ${selectedType}`;
    let filteredByType = hotel.filterRoomByType(availableRooms, selectedType);
    let bidetMessage, className;
    filteredByType.length === 1 ? className = "big-room-card room-card" : className = "room-card";
    filteredByType.forEach(room => {
      room.bidet ? bidetMessage = 'Hooray there\'s a bidet!' : bidetMessage = 'No bidet for you'
      availableRoomsSection.innerHTML +=
      `
        <article class="${className}" id="${room.number}" role="button" tabindex=0>
          <div class="card-header">
            <h3>Date Available:</h3>
            <h3>${room.dateAvailable}</h3>
          </div>
          <div class="card-details">
            <div class="booking-info">
              <p>Room #${room.number}</p>
              <p>${room.roomType}</p>
              <p>Beds: ${room.numBeds} ${room.bedSize}</p>
              <p>${bidetMessage}</p>
            </div>
            <div class="costPerNight">
              <p>$${room.costPerNight}/ night</p>
            </div>
          </div>
        </article>
      `
    })
  },

  displayRoomView(availableRoomsSection, selectedRoom) {
    availableRoomsSection.innerHTML = '';
    let header = document.querySelector('#roomSearchHeader h2');
    header.innerText = 'Book This Room';
    let bidetMessage;
    selectedRoom.bidet ? bidetMessage = 'Hooray there\'s a bidet!' : bidetMessage = 'No bidet for you'
    availableRoomsSection.innerHTML =
    `
      <article class="big-room-card room-card" id="${selectedRoom.number}" role="button" tabindex=0>
        <div class="card-header">
          <h3>Date Available:</h3>
          <h3>${selectedRoom.dateAvailable}</h3>
        </div>
        <div class="card-details">
          <div class="booking-info">
            <p>Room #${selectedRoom.number}</p>
            <p>${selectedRoom.roomType}</p>
            <p>Beds: ${selectedRoom.numBeds} ${selectedRoom.bedSize}</p>
            <p>${bidetMessage}</p>
          </div>
          <div class="costPerNight">
            <p>$${selectedRoom.costPerNight}/ night</p>
          </div>
        </div>
      </article>
    `
  },

  displayMessage(element, message) {
    element.innerHTML = ''
    element.innerHTML = `<p class="error-message">${message}</p>`
  },

  show(element) {
    element.classList.remove('hide');
  },

  hide(element) {
    element.classList.add('hide');
  }
}

export default domUpdates;
