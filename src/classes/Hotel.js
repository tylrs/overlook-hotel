import Customer from './Customer.js'

class Hotel {
  constructor(bookings, rooms, customers) {
    this.bookings = bookings;
    this.rooms = rooms;
    this.customers = [];
  }

  instantiateCustomers(customerData) {
    customerData.forEach(customerInfo => {
      let customer = new Customer(customerInfo);
      this.customers.push(customer);
    })
  }

  updateCustomersDetailedBookings() {
    //iterate through customers
    //get detailed bookings
    //filter through bookings
    //return only bookings.userID === customer.id
    let detailedBookings = this.getDetailedBookings();
    this.customers.forEach(customer => {
      customer.bookings = detailedBookings.filter(booking => {
        return booking.userID === customer.id;
      })
    })
  }

  getDetailedBookings() {
    return this.bookings.map(booking => {
      let foundRoom = this.rooms.find(room => {
        return room.number === booking.roomNumber;
      })
      let newBooking = {
        ...booking,
        ...foundRoom
      }
      return newBooking;
    })
  }

  getAvailableRooms(date) {
    let filteredBookings = this.bookings.filter(booking => {
      return booking.date === date;
    }).map(booking => {
      return booking.roomNumber;
    })
    return this.rooms.filter(room => {
      return !filteredBookings.includes(room.number)
    })
  }

  filterRoomByType(date, type) {
    return this.getAvailableRooms(date).filter(room => {
      return room.roomType === type;
    })
  }
}

export default Hotel;
