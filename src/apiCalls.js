export const fetchApiData = (type) => {
  return fetch(`http://localhost:3001/api/v1/${type}`)
};

// export const postApiData = (type, data) => {
//   let body = {
//     "userID": data.userId,
//     "date": data.todayDate,
//   }
//   if (type === 'sleep') {
//     body["hoursSlept"] = data.inputData.hoursSleptInput;
//     body["sleepQuality"] = data.inputData.sleepQualityInput;
//   } else if (type === 'hydration') {
//     body["numOunces"] = data.inputData.numOuncesInput;
//   } else if (type === 'activity') {
//     body["numSteps"] = data.inputData.numStepsInput;
//     body["minutesActive"] = data.inputData.minutesActiveInput;
//     body["flightsOfStairs"] = data.inputData.flightsOfStairsInput;
//   }
//   return fetch(`http://localhost:3001/api/v1/${type}`, {
//     method: 'POST',
//     body: JSON.stringify(body),
//     headers: {
//       'Content-type': 'application/json'
//     }
//   })
// }
