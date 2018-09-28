const assert = require('assert');
const User = require('../src/user');

console.log('... In create_test.js')

describe('Creating records', ()=>{
  it('Saves a user', (done)=>{

    const joe = new User({name:'Joe'});

    joe.save()
      .then(()=>{
        // it is saved b/c it is not new
        const joeHasBeenSaved = !joe.isNew;

        assert(joeHasBeenSaved);
        // If assert above take falsy value, exception will
        // thrown and done() will never called
        done();
      });

  });
});
