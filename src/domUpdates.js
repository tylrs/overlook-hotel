import flatpickr from 'flatpickr';

let domUpdates = {
  renderBookingsCards(element, currentCustomer, currentDate, type) {
    element.innerHTML = '';
    let bookings = currentCustomer.returnBookings(type, currentDate)
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
      room.bidet ? bidetMessage = 'Hooray there\'s a bidet!' : bidetMessage = 'No bidet for you'
      availableRoomsSection.innerHTML +=
      `
      <article class="room-card" id="${room.number}">
        <h4>${searchDate}</h4>
        <h5>${room.roomType}</h5>
        <p>Room Number ${room.number}</p>
        <p>Beds: ${room.numBeds} ${room.bedSize}<p>
        <p>$${room.costPerNight}/ night</p>
        <p>Bidet included?</p>
        <p>${bidetMessage}</p>
      </article>
      `
    })
  },

  renderAvailableTags(availableRoomsSection, availableRooms) {
    availableRoomsSection.innerHTML = '';
    let tags = availableRooms.map(room => {
      return room.roomType;
    })
    let uniqueTags = [...new Set(tags)];
    uniqueTags.forEach(tag => {
      availableRoomsSection.innerHTML +=
      `
      <li class="">
				<input type="radio" name="tags" id="${tag}" value="${tag}" />
				<label for="${tag}" class="tags">${tag}</label>
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
    header.innerText = `Filtered by: ${selectedType}`;
    let filteredByType = hotel.filterRoomByType(availableRooms, selectedType);
    let bidetMessage;
    filteredByType.forEach(room => {
      room.bidet ? bidetMessage = 'Hooray there\'s a bidet!' : bidetMessage = 'No bidet for you'
      availableRoomsSection.innerHTML +=
      `
      <article class="room-card" id="${room.number}">
        <h4>${room.dateAvailable}</h4>
        <h5>${room.roomType}</h5>
        <p>Room Number ${room.number}</p>
        <p>Beds: ${room.numBeds} ${room.bedSize}<p>
        <p>$${room.costPerNight}/ night</p>
        <p>Bidet included?</p>
        <p>${bidetMessage}</p>
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
      <article class="big-room-card" id="${selectedRoom.number}">
        <h4>${selectedRoom.dateAvailable}</h4>
        <h5>${selectedRoom.roomType}</h5>
        <p>Room Number ${selectedRoom.number}</p>
        <p>Beds: ${selectedRoom.numBeds} ${selectedRoom.bedSize}<p>
        <p>$${selectedRoom.costPerNight}/ night</p>
        <p>Bidet included?</p>
        <p>${bidetMessage}</p>
      </article>
    `
  },

  displayErrorMessage(element, message) {
    element.innerHTML = `<p class="error-message">${message}</p>`
    const timeout = setTimeout(() => {
      element.innerHTML = ''
    }, 4000)
  },

  show(element) {
    element.classList.remove('hide');
  },

  hide(element) {
    element.classList.add('hide');
  }
}

export default domUpdates;
