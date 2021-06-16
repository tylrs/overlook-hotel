import './css/base.scss';
import domUpdates from './domUpdates.js'
import {fetchApiData, postApiData, fetchCustomer} from './apiCalls.js'
import Customer from './classes/Customer.js'
import Hotel from './classes/Hotel.js'

let currentCustomer, hotel, currentDate, availableRooms, selectedRoom;

// querySelectors
const dashboard = document.getElementById('dashboard');
const futureBookingsSection = document.getElementById('futureBookings');
const pastBookingsSection = document.getElementById('pastBookings');
const futureBookingsTitle = document.getElementById('futureBookingsTitle');
const pastBookingsTitle = document.getElementById('pastBookingsTitle');
const totalSpent = document.getElementById('totalSpent');
const addNewBookingsButton = document.getElementById('addNewBookingsButton');
const calendarView = document.getElementById('calendarView');
const calendarInput = document.getElementById('calendarInput');
const searchCalendar = document.getElementById('searchCalendar');
const availableRoomView = document.getElementById('availableRoomView');
const availableRoomsSection = document.getElementById('availableRoomsSection');
const cardSectionTitle = document.getElementById('cardSectionTitle');
const filterTagsSection = document.getElementById('filterTagsSection');
const filterTagsContainer = document.getElementById('filterTagsContainer');
const filterRoomTypeButton = document.getElementById('filterRoomTypeButton');
const goBackButton = document.getElementById('goBackButton');
const submitBookingButton = document.getElementById('submitBookingButton');
const loginButton = document.getElementById('loginButton');
const userNameInput = document.getElementById('userNameInput');
const passwordInput = document.getElementById('passwordInput');
const loginView = document.getElementById('loginView');
const errorMessageContainer = document.getElementById('errorMessageContainer');
const submitBookingButtonSection = document.getElementById('submitBookingButtonSection');

// window.onload = validateLogin();
addNewBookingsButton.addEventListener('click', renderNewBookingsView);
searchCalendar.addEventListener('click', showAvailableRooms);
filterRoomTypeButton.addEventListener('click', showFilteredRooms);
goBackButton.addEventListener('click', determineViewToGoBackTo);
availableRoomsSection.addEventListener('click', displayClickedRoom);
availableRoomsSection.addEventListener('keydown', displayClickedRoom);
submitBookingButton.addEventListener('click', postNewBooking)
loginButton.addEventListener('click', validateLogin);

function validateLogin() {
  event.preventDefault();
  let userName = userNameInput.value;
  let password = passwordInput.value;
  passwordInput.value = '';
  userNameInput.value = '';
  if (userName.includes('customer')) {
    fetchCustomer(userName.split('r')[1])
    .then(data => {
      let customer = new Customer(data)
      validatePassword(customer, password);
    })
    .catch(error => {
      let message = `Error please try a different username or password!`
      domUpdates.displayMessage(errorMessageContainer, message)
      domUpdates.show([errorMessageContainer]);
      const timeout = setTimeout(() => {
        domUpdates.hide([errorMessageContainer]);
      }, 3000)
    })
  } else {
    let message = `Error please try a different username or password!`
    domUpdates.displayMessage(errorMessageContainer, message)
    domUpdates.show([errorMessageContainer]);
    const timeout = setTimeout(() => {
      domUpdates.hide([errorMessageContainer]);
    }, 3000)
  }
}

function validatePassword(customer, password) {
  if (customer.password === password) {
    instantiateCustomerLogin(customer);
  } else {
    throw new Error('Incorrect password');
  }
}

function instantiateCustomerLogin(customer) {
  currentDate = '2020/02/03';
  fetchAllData()
    .then(promise => {
      hotel = new Hotel(promise[1]['bookings'], promise[2]['rooms']);
      hotel.addCustomer(customer);
      hotel.updateCustomersDetailedBookings();
      currentCustomer = hotel.customers[0];
      populateDashboard(currentCustomer, currentDate, totalSpent);
    })
    .catch((error) => {
      let message = `Error please try logging in again!`
      domUpdates.displayMessage(errorMessageContainer, message)
      domUpdates.show([errorMessageContainer]);
      const timeout = setTimeout(() => {
        domUpdates.hide([errorMessageContainer]);
      }, 3000)
    })
}

function fetchAllData() {
  return Promise.all([fetchApiData('customers'), fetchApiData('bookings'), fetchApiData('rooms')]);
}

function populateDashboard(currentCustomer, currentDate, totalSpent) {
  domUpdates.renderBookingsCards(futureBookingsSection, currentCustomer, currentDate, 'future/present')
  domUpdates.renderBookingsCards(pastBookingsSection, currentCustomer, currentDate, 'past')
  domUpdates.renderInnerText(totalSpent, `$${currentCustomer.returnTotalSpent()}`);
  domUpdates.renderInnerText(futureBookingsTitle, `Upcoming Bookings for ${currentCustomer.name.split(' ')[0]}`)
  domUpdates.renderInnerText(pastBookingsTitle, `Previous Bookings for ${currentCustomer.name.split(' ')[0]}`)
  domUpdates.show([dashboard, addNewBookingsButton]);
  domUpdates.hide([loginView]);
  availableRoomsSection.classList.remove('available-cards-centered');
}

function showAvailableRooms() {
  let searchDate = calendarInput.value;
  availableRoomsSection.classList.remove('available-cards-centered');
  domUpdates.hide([calendarView, submitBookingButton, submitBookingButtonSection]);
  domUpdates.show([availableRoomView, filterTagsSection, goBackButton, cardSectionTitle]);
  availableRooms = hotel.getAvailableRooms(searchDate);
  if (availableRooms.length) {
    domUpdates.renderAvailableRooms(availableRoomsSection, availableRooms, searchDate);
    domUpdates.renderAvailableTags(filterTagsContainer, availableRooms)
  } else {
    let message = 'Sorry, there are no available rooms for that day'
    availableRoomsSection.innerHTML = '';
    let header = document.querySelector('#roomSearchHeader h2');
    header.innerText = 'Available Rooms';
    domUpdates.displayMessage(availableRoomsSection, message)
    availableRoomsSection.classList.add('available-cards-centered');
    domUpdates.hide([filterTagsSection]);
  }
}

function showFilteredRooms() {
  event.preventDefault();
  let tagRadioButtons = document.querySelectorAll('input[type="radio"]');
  domUpdates.renderFilteredRooms(availableRoomsSection, availableRooms, tagRadioButtons, hotel);
  domUpdates.hide([filterTagsSection]);
}

function renderNewBookingsView() {
  domUpdates.renderCalendar(calendarInput, currentDate);
  availableRoomsSection.classList.remove('available-cards-centered');
  domUpdates.show([calendarView]);
  domUpdates.hide([dashboard, availableRoomView, addNewBookingsButton, submitBookingButton, submitBookingButtonSection]);
}

function displayClickedRoom(event) {
  if ((event.target.closest('article') && event instanceof MouseEvent) || event.keyCode === 13) {
    selectedRoom = availableRooms.find(room => {
      return room.number === parseInt(event.target.closest('article').id);
    })
    domUpdates.hide([filterTagsSection]);
    domUpdates.show([submitBookingButton, submitBookingButtonSection]);
    domUpdates.displayRoomView(availableRoomsSection, selectedRoom);
  }
}

function postNewBooking() {
  let data = formatPost();
  postApiData(data)
  .then(response => {
    if (!response.ok) {
      throw new Error()
    } else {
      return response.json();
    }
  })
  .then(data => {
    let message = "Congratulations, a new booking was added!"
    domUpdates.displayMessage(availableRoomsSection, message);
    availableRoomsSection.classList.add('available-cards-centered');
    domUpdates.hide([submitBookingButton, submitBookingButtonSection, goBackButton, cardSectionTitle]);
    const timeout = setTimeout(() => {
      displayHomeView();
    }, 2000)
  })
  .catch(error => {
    let message = `Sorry, something went wrong on our end! Try Again!`
    domUpdates.displayMessage(availableRoomsSection, message)
    availableRoomsSection.classList.add('available-cards-centered');
    domUpdates.hide([submitBookingButton, submitBookingButtonSection, cardSectionTitle]);
  })
}

function formatPost() {
  let submitData = {
    userID: currentCustomer.id,
    date: selectedRoom.dateAvailable,
    roomNumber: selectedRoom.number
  }
  return submitData;
}

function displayHomeView() {
  instantiateCustomerLogin(currentCustomer);
  domUpdates.hide([availableRoomView])
  domUpdates.show([dashboard, addNewBookingsButton]);
}

function determineViewToGoBackTo(event) {
  let header = event.target.nextElementSibling.innerText;
  if (header.includes('Available')) {
    renderNewBookingsView();
  } else {
    showAvailableRooms();
  }
}
