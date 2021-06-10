import chai from 'chai';
const expect = chai.expect;
import {customerData, roomsData, bookingsData} from './sample-data.js'
import Customer from '../src/classes/Customer.js'
import Hotel from '../src/classes/Hotel.js'

describe('Hotel Class', function() {
  let customer, currentDate, hotel;
  beforeEach (() => {
    customer = new Customer(customerData[0]);
    currentDate = '2020/02/03';
    hotel = new Hotel(bookingsData, roomsData);
  })

  it('should be an instance of a Hotel class', function() {
    expect(hotel).to.be.an.instanceOf(Hotel);
  });

  it('should hold an array of all bookings', function() {
    expect(hotel.bookings).to.deep.equal(bookingsData);
  });

  it('should hold an array of all rooms', function() {
    expect(hotel.rooms).to.deep.equal(roomsData);
  });
})
