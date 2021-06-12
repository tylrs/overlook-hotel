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
const futureBookingsSection = document.getElementById('futureBookings');
const pastBookingsSection = document.getElementById('pastBookings');


window.onload = instantiateData();

function instantiateData () {
  currentDate = '2020/02/03';
  hotel = new Hotel(bookingsData, roomsData);
  hotel.instantiateCustomers(customerData);
  hotel.updateCustomersDetailedBookings();
  let currentCustomer = hotel.customers[0];
  populateBookings(currentCustomer, currentDate)
}

function populateBookings(currentCustomer, currentDate) {
  domUpdates.renderBookingsCards(futureBookingsSection, currentCustomer, currentDate, 'past')
  domUpdates.renderBookingsCards(pastBookingsSection, currentCustomer, currentDate, 'future/present')
}

//querySelectors
//populate upcoming and past and total spent
