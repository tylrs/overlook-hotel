// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import domUpdates from './domUpdates.js'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import {customerData, roomsData, bookingsData, allRoomsBooked} from '../test/sample-data.js'
import Customer from './classes/Customer.js'
import Hotel from './classes/Hotel.js'

let currentCustomer, hotel, currentDate;

// querySelectors
const dashboard = document.getElementById('dashboard');
const futureBookingsSection = document.getElementById('futureBookings');
const pastBookingsSection = document.getElementById('pastBookings');
const totalSpent = document.getElementById('totalSpent');
const addNewBookingsButton = document.getElementById('addNewBookingsButton');
const calendarView = document.getElementById('calendarView');
const calendarInput = document.getElementById('calendarInput');
const searchCalendar = document.getElementById('searchCalendar');


window.onload = instantiateData();
addNewBookingsButton.addEventListener('click', renderNewBookingsView);
searchCalendar.addEventListener('click', retrieveAvailableRooms);

function instantiateData() {
  currentDate = '2020/02/03';
  hotel = new Hotel(bookingsData, roomsData);
  hotel.instantiateCustomers(customerData);
  hotel.updateCustomersDetailedBookings();
  let currentCustomer = hotel.customers[0];
  populateDashboard(currentCustomer, currentDate, totalSpent)
}

function retrieveAvailableRooms() {
  let date = calendarInput.value;
  console.log(date);
  domUpdates.hide(calendarView)
}

function populateDashboard(currentCustomer, currentDate, totalSpent) {
  domUpdates.renderBookingsCards(futureBookingsSection, currentCustomer, currentDate, 'past')
  domUpdates.renderBookingsCards(pastBookingsSection, currentCustomer, currentDate, 'future/present')
  console.log(currentCustomer.bookings)
  domUpdates.renderInnerText(totalSpent, `$${currentCustomer.returnTotalSpent()}`);
}

function renderNewBookingsView() {
  domUpdates.renderCalendar(calendarInput, currentDate);
  domUpdates.show(calendarView);
  domUpdates.hide(dashboard)
}
