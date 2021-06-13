export const fetchApiData = (type) => {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusMessage);
      } else {
        return response.json();
      }
    })
};

export const postApiData = (data) => {
  let body = {
    'userID': data.userID,
    'date': data.date,
    'roomNumber': data.roomNumber
  }
  return fetch(`http://localhost:3001/api/v1/bookings`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  })
}
