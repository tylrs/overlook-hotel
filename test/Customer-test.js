import chai from 'chai';
const expect = chai.expect;
import {customerData, user1BookingsData, roomsData} from './sample-data.js'
import Customer from '../src/classes/Customer.js'

describe('Customer Class', function() {
  let customer;
  beforeEach (() => {
    customer = new Customer(customerData[0]);
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


});
