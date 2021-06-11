class Hotel {
  constructor(bookings, rooms) {
    this.bookings = bookings;
    this.rooms = rooms;
  }

  returnAvailableRooms(date) {
    let filteredBookings = this.bookings.filter(booking => {
      return booking.date === date;
    }).map(booking => {
      return booking.roomNumber;
    })
    return this.rooms.filter(room => {
      return !filteredBookings.includes(room.number)
    })
  }
}

export default Hotel;
//filter through all bookings based on a date
//return bookings on that date
//
