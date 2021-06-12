class Hotel {
  constructor(bookings, rooms) {
    this.bookings = bookings;
    this.rooms = rooms;
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
//filter through all bookings based on a date
//return bookings on that date
//
