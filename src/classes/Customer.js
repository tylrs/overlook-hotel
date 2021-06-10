import User from './User.js';

class Customer extends User {
  constructor(customerData) {
    super()
    this.userName = `customer${customerData.id}`;
  }
}

export default Customer;
