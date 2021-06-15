#### Overlook Hotel

The Overlook Hotel recreates a basic hotel website. A user can login, view their current and previous bookings, and can also add new bookings based on which rooms are available for a particular date.

The project spec can be found [here](https://frontend.turing.edu/projects/overlook.html).

## Table of Contents

- [Introduction](#introduction)
- [Features](#Demonstration)
- [Technologies](#Technologies)
- [Setup](#Setup/execution-Instructions)
- [Future Iterations](#Future)
- [Original Assignment](#Original)
- [Contributors](#Contributors)

## Install

1. Clone down the api server `git clone https://github.com/turingschool-examples/overlook-api`
   1. This API holds the data our project will fetch in order to populate the browser with info
2. CD into your local clone `cd overlook-api`
3. Install project dependencies `npm install`
4. Run `npm start`
5. Clone down this repository `git clone https://github.com/tylrs/overlook-hotel`
6. CD into your local clone `cd overlook-hotel`
7. Install project dependencies `npm install`
8. Run `npm start` and open `localhost:8080` in your preferred browser

## Goals
* Use OOP to drive the design of the application and the code
* Work with an API to send and receive data
* Solidify the code review process
* Create a robust test suite that thoroughly tests all functionality of a client-side application

## Features

### GIF showing users future and past bookings
![GIF showing users future and past bookings]()

### GIF showing calendar and available cards
![GIF showing calendar and available cards]()

### GIF showing filter options
![GIF showing filter options ]()

### GIF showing add new booking
![GIF showing add new booking]()

### GIF showing responsive app
![GIF showing responsive app]()

## Contributors

This application was written by [Taylor Galloway](https://github.com/tylrs) Mod 2 frontend engineering students at [Turing School of Software & Design](https://turing.edu/).

## Technologies Used

- JavaScript
- HTML
- SCSS
- Mocha/Chai for testing
- Webpack
- fetch API
- [flatpickr for calendar](https://flatpickr.js.org/)
- [dayjs for date formatting](https://day.js.org/)

## Future Additions:

* Add another user who is a manager who can perform different operations with the same data set.
