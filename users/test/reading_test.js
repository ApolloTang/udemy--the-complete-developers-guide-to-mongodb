const assert = require('assert');
const User = require('../src/user');

console.log('... In reading_test.js')

describe('Reading users out of the database', ()=>{

  let joe;

  // beforeEach( done => {
  //   joe = new User({ name: 'Joe'});
  //   joe.save().then(() => done());
  // });

  //@ using async await
  beforeEach ( async () => {
    joe = new User( { name: 'Joe' })
    await joe.save()
  })


  it('Finds all users [type array] with a name of Joe', done => {

    User.find({ name: 'Joe'}).then( users => {  //@ [!] Find returns an array, b/c the result can be more then one

      // assert( users[0]._id === joe._id )     //@ <-- This will fail !!!
                                                //@ comparing with '===', _id must be parsed to string
      assert( users[0]._id.toString() === joe._id.toString() );
      done();
    });

  })

  it('Find a user with a particular id', async (/* done */) => { //@ <-- don't pass in 'done' if use async

    const user = await User.findOne( {_id: joe._id} );
    assert( user._id.toString() === joe._id.toString() );
    // done()     //@ <--------------- don't use done because we are using async await

  });

})
