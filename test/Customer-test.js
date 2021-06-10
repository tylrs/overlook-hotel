import chai from 'chai';
const expect = chai.expect;
import {customerData, bookingsData, roomsData} from './sample-data.js'
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

  it('should take in customer data and assign a username', function() {
    expect(customer.userName).to.equal('customer1');
  });
  //
  // it('should have a isManager property with a default value of false', function() {
  //   expect(user.isManager).to.equal(false);
  // });
});
