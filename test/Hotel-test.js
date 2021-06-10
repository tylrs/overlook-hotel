import chai from 'chai';
const expect = chai.expect;
import {customerData, user1BookingsData, roomsData} from './sample-data.js'
import Customer from '../src/classes/Customer.js'
import Hotel from '../src/classes/Hotel.js'

describe('Hotel Class', function() {
  let customer, currentDate, hotel;
  beforeEach (() => {
    customer = new Customer(customerData[0]);
    currentDate = '2020/02/03';
    hotel = new Hotel();
  })

  it('should be an instance of a Hotel class', function() {
    expect(hotel).to.be.an.instanceOf(Hotel);
  });
})
