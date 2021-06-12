// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import {customerData, roomsData, bookingsData, allRoomsBooked} from '../test/sample-data.js'
import Customer from './classes/Customer.js'
import Hotel from './classes/Hotel.js'

let currentCustomer, hotel, currentDate;

customer = new Customer(customerData[0]);
currentDate = '2020/02/03';
hotel = new Hotel(bookingsData, roomsData);
// instantiate customer, hotel, currentDate
//querySelectors
//populate upcoming and past and total spent
