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

  it('should have a userName which is an empty string by default', function() {
    expect(user.userName).to.equal('');
  });

  it('should have a default password of overlook2020', function() {
    expect(user.password).to.equal('overlook2020');
  });

  it('should have a isManager property with a default value of false', function() {
    expect(user.isManager).to.equal(false);
  });
});
