export const fetchApiData = (type) => {
  return fetch(`https://overlook-hotel-api.herokuapp.com/api/v1/${type}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
    })
};

export const fetchCustomer = (id) => {
  return fetch(`https://overlook-hotel-api.herokuapp.com/api/v1/customers/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
    })
}

export const postApiData = (data) => {
  let body = {
    'userID': data.userID,
    'date': data.date,
    'roomNumber': data.roomNumber
  }
  return fetch(`https://overlook-hotel-api.herokuapp.com/api/v1/bookings`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  })
};
