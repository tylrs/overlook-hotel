import User from './User.js';

class Customer extends User {
  constructor(customerData) {
    super()
    this.id = customerData.id;
    this.name = customerData.name;
    this.userName = `customer${customerData.id}`;
    this.bookings = [];
  }
}

export default Customer;
