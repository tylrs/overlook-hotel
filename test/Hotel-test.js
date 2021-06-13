import chai from 'chai';
const expect = chai.expect;
import {customerData, user1BookingsData, roomsData, bookingsData, allRoomsBooked, detailedBookings} from './sample-data.js'
import Customer from '../src/classes/Customer.js'
import Hotel from '../src/classes/Hotel.js'

describe('Hotel Class', function() {
  let customer, currentDate, hotel;
  beforeEach (() => {
    customer = new Customer(customerData[0]);
    currentDate = '2020/02/03';
    hotel = new Hotel(bookingsData, roomsData, customerData);
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

  it('should hold an array of all customers', function() {
    hotel.instantiateCustomers(customerData);

    expect(hotel.customers.length).to.equal(customerData.length);
  });

  it('should have a method to combine bookings and rooms data', function() {
    expect(hotel.getDetailedBookings()).to.deep.equal(detailedBookings);
  });

  it('should have a method to update customers with their corresponding bookings and rooms', function() {
    hotel.instantiateCustomers(customerData);
    hotel.updateCustomersDetailedBookings();

    expect(hotel.customers[0].bookings.length).to.equal(user1BookingsData.length);
  });

  it('should have a method to filter rooms based on a date and their availability', function() {
    expect(hotel.getAvailableRooms('2020/01/09')).to.deep.equal([roomsData[0], roomsData[1], roomsData[2], roomsData[3], roomsData[5]])
  });

  it('should have a method which returns an empty array if all rooms are booked on a day', function() {
    hotel.bookings = allRoomsBooked;

    expect(hotel.getAvailableRooms('2020/01/09')).to.deep.equal([])
  });

  it('should have a method which returns all rooms if there are no bookings on a given date', function() {
    expect(hotel.getAvailableRooms('2021/01/09')).to.deep.equal(roomsData);
  });

  it('should have a method which filters available rooms by their roomType', function() {
    let availableRooms = hotel.getAvailableRooms('2021/01/09')

    expect(hotel.filterRoomByType(availableRooms, 'single room')).to.deep.equal([roomsData[2], roomsData[3], roomsData[4]]);
  });

  it('should have a method which returns an empty array if no rooms of a requested type are available', function() {
    let availableRooms = hotel.getAvailableRooms('2020/02/05')

    expect(hotel.filterRoomByType(availableRooms, 'residential suite')).to.deep.equal([]);
  });
})
