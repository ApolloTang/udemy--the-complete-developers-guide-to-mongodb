const assert = require('assert');
const User = require('../src/user');

console.log('... In reading_test.js')

describe('Reading users out of the database', ()=>{
  let joe;

  beforeEach( done => {
    joe = new User({ name: 'Joe'});
    joe.save().then(() => done());
  });

  it('Finds all users with a name of Joe', done => {

    User.find({ name: 'Joe'})
      .then(
        user => {
          console.log('xxxx user:', user);
          console.log('xxxx joe:', joe);

          // assert( user[0]._id === joe._id ) // <-- This will fail !!!

          //@ _id must parse to string
          assert( user[0]._id.toString() === joe._id.toString() );
          done();
        }
      )

  })


})
