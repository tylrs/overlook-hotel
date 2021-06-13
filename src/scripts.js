// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import domUpdates from './domUpdates.js'
import {fetchApiData} from './apiCalls.js'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import {customerData, roomsData, bookingsData, allRoomsBooked} from '../test/sample-data.js'
import Customer from './classes/Customer.js'
import Hotel from './classes/Hotel.js'

let currentCustomer, hotel, currentDate, availableRooms;

// querySelectors
const dashboard = document.getElementById('dashboard');
const futureBookingsSection = document.getElementById('futureBookings');
const pastBookingsSection = document.getElementById('pastBookings');
const totalSpent = document.getElementById('totalSpent');
const addNewBookingsButton = document.getElementById('addNewBookingsButton');
const calendarView = document.getElementById('calendarView');
const calendarInput = document.getElementById('calendarInput');
const searchCalendar = document.getElementById('searchCalendar');
const availableRoomView = document.getElementById('availableRoomView');
const availableRoomsSection = document.getElementById('availableRoomsSection');
const filterTagsSection = document.getElementById('filterTagsSection');
const filterTagsContainer = document.getElementById('filterTagsContainer');
const filterRoomTypeButton = document.getElementById('filterRoomTypeButton');
const goBackCalendarButton = document.getElementById('goBackButton');

window.onload = instantiateData();
addNewBookingsButton.addEventListener('click', renderNewBookingsView);
searchCalendar.addEventListener('click', showAvailableRooms);
filterRoomTypeButton.addEventListener('click', showFilteredRooms);
goBackButton.addEventListener('click', determineViewToGoBackTo);

function fetchAllData() {
  return Promise.all([fetchApiData('customers'), fetchApiData('bookings'), fetchApiData('rooms')]);
}

function instantiateData() {
  currentDate = '2020/02/03';
  fetchAllData()
    .then(promise => {
      console.log(promise[0]['customers'])
      hotel = new Hotel(promise[1]['bookings'], promise[2]['rooms'])
      hotel.instantiateCustomers(promise[0]['customers'])
      hotel.instantiateCustomers(customerData);
      hotel.updateCustomersDetailedBookings();
      let currentCustomer = hotel.customers[0];
      populateDashboard(currentCustomer, currentDate, totalSpent);
    })
    .catch((error) => {
      console.log(error)
    })
}

function determineViewToGoBackTo(event) {
  let header = event.target.nextElementSibling.innerText;
  if (header.includes('Available')) {
    renderNewBookingsView();
  } else {
    showAvailableRooms();
  }
}

function showAvailableRooms() {
  let searchDate = calendarInput.value;
  domUpdates.hide(calendarView);
  domUpdates.show(availableRoomView);
  domUpdates.show(filterTagsSection);
  availableRooms = hotel.getAvailableRooms(searchDate);
  domUpdates.renderAvailableRooms(availableRoomsSection, availableRooms, searchDate);
  domUpdates.renderAvailableTags(filterTagsContainer, availableRooms)
}

function showFilteredRooms() {
  event.preventDefault();
  let tagRadioButtons = document.querySelectorAll('input[type="radio"]');
  domUpdates.renderFilteredRooms(availableRoomsSection, availableRooms, tagRadioButtons, hotel);
  domUpdates.hide(filterTagsSection);
}

function populateDashboard(currentCustomer, currentDate, totalSpent) {
  domUpdates.renderBookingsCards(futureBookingsSection, currentCustomer, currentDate, 'past')
  domUpdates.renderBookingsCards(pastBookingsSection, currentCustomer, currentDate, 'future/present')
  domUpdates.renderInnerText(totalSpent, `$${currentCustomer.returnTotalSpent()}`);
}

function renderNewBookingsView() {
  domUpdates.renderCalendar(calendarInput, currentDate);
  domUpdates.show(calendarView);
  domUpdates.hide(dashboard);
  domUpdates.hide(addNewBookingsButton);
}
