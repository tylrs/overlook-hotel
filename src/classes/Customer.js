import User from './User.js';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);

class Customer extends User {
  constructor(customerData) {
    super()
    this.id = customerData.id;
    this.name = customerData.name;
    this.userName = `customer${customerData.id}`;
    this.bookings = [];
  }

  returnBookings(type, currentDate) {
    return this.bookings.filter((booking) => {
      if (type === 'past') {
        return dayjs(booking.date).isBefore(currentDate);
      } else {
        return dayjs(booking.date).isSameOrAfter(currentDate);
      }
    })
  }

  returnTotalSpent() {
    
  }
}

export default Customer;
