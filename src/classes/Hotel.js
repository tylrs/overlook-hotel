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

  updateCustomersBookingsAndRooms() {
    //combine data using corresponding rooms
    //sort this data into each customer
    //combine
    //output is an array of new objects
    //iterate through all bookings using map
    //forEach booking find the corresponding roomNumber in the rooms data
    //add new properties on the booking from rooms data
    //return the new booking object
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
