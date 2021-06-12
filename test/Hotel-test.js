import chai from 'chai';
const expect = chai.expect;
import {customerData, roomsData, bookingsData, allRoomsBooked} from './sample-data.js'
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
    expect(hotel.filterRoomByType('2021/01/09', 'single room')).to.deep.equal([roomsData[2], roomsData[3], roomsData[4]]);
  });

  it('should have a method which returns an empty array if no rooms of a requested type are available', function() {
    expect(hotel.filterRoomByType('2020/02/05', 'residential suite')).to.deep.equal([]);
  });
})
