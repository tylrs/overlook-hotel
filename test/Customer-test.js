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

  it('should have a method which returns past bookings', function() {
    customer.bookings = user1BookingsData;

    expect(customer.returnBookings('past', currentDate)).to.deep.equal([user1BookingsData[1], user1BookingsData[2]]);
  });

  it('should have a method which returns current and future bookings', function() {
    customer.bookings = user1BookingsData;

    expect(customer.returnBookings('current&future', currentDate)).to.deep.equal([user1BookingsData[0], user1BookingsData[3]]);
  });

  it('should have a method to return the sum of all amount spent on bookings', function() {
    customer.bookings = user1BookingsData;

    expect(customer.returnTotalSpent(hotel)).to.equal(1685);
  });


});
