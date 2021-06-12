import chai from 'chai';
const expect = chai.expect;
import {customerData, user1BookingsData, bookingsData, roomsData} from './sample-data.js'
import Customer from '../src/classes/Customer.js'
import Hotel from '../src/classes/Hotel.js'

describe('Customer Class', function() {
  let customer, currentDate, hotel;
  beforeEach (() => {
    customer = new Customer(customerData[0]);
    currentDate = '2020/02/03';
    hotel = new Hotel(bookingsData, roomsData);
  })

  it('should be an instance of a Customer class', function() {
    expect(customer).to.be.an.instanceOf(Customer);
  });

  it('should have default properties for password and isManager', function() {
    expect(customer.password).to.equal('overlook2020');
    expect(customer.isManager).to.equal(false);
  });

  it('should take in customer data and assign an id', function() {
    expect(customer.id).to.equal(1);
  });

  it('should take in customer data and assign a userName', function() {
    expect(customer.userName).to.equal('customer1');
  });

  it('should take in customer data and assign a name', function() {
    expect(customer.name).to.equal('Leatha Ullrich');
  });

  it('should have an array of bookings which is empty by default', function() {
    expect(customer.bookings).to.deep.equal([]);
  });

describe('Customer Class', function() {
  beforeEach (() => {
    user1BookingsData.forEach(booking => {
      customer.bookings.push(booking);
    })
  })
  it('should have a method which returns past bookings', function() {
    expect(customer.returnBookings('past', currentDate)).to.deep.equal([user1BookingsData[1], user1BookingsData[2], user1BookingsData[3]]);
  });

  it('should have a method which returns an empty array if no past bookings are found', function() {

    expect(customer.returnBookings('past', '2019/02/05')).to.deep.equal([]);
  });

  it('should have a method which returns an array of current and future bookings based on current date', function() {

    expect(customer.returnBookings('current&future', currentDate)).to.deep.equal([user1BookingsData[0]]);
  });

  it('should have a method which returns an empty array if no current/future bookings are found', function() {

    expect(customer.returnBookings('current&future', '2020/02/06')).to.deep.equal([]);
  });

  it('should have a method to return the total amount a customer spent on bookings', function() {

    expect(customer.returnTotalSpent()).to.equal(1756);
  });

  it('should return 0 if no bookings have been made', function() {
    customer.bookings = [];

    expect(customer.returnTotalSpent(hotel)).to.equal(0);
  });

  it('should have a method to add new bookings to the bookings array and should return true if booking is new', function() {
    let newBooking = {
      id: '5fwrgu4i7k55hl6uy',
      userID: 2,
      date: '2020/01/24',
      roomNumber: 6,
      roomServiceCharges: []
    };
    expect(customer.addNewBooking(newBooking)).to.equal(true);
    expect(customer.bookings[4]).to.deep.equal(newBooking);
  });

  it('should not add new bookings to the bookings array if that booking already exists', function() {
    let newBooking = {
      id: '5fwrgu4i7k55hl6uy',
      userID: 2,
      date: '2020/01/24',
      roomNumber: 6,
      roomServiceCharges: []
    };
    customer.addNewBooking(newBooking);
    expect(customer.addNewBooking(newBooking)).to.equal(false);
  });
});
});
