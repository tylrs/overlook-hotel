import chai from 'chai';
const expect = chai.expect;
import User from '../src/classes/User.js';

describe('User Class', function() {
  let user;
  beforeEach (() => {
    user = new User();
  })
  it('should be an instance of a user class', function() {

    expect(user).to.be.an.instanceOf(User);
  });
});
