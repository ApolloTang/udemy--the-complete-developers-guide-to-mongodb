const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // Use node's es6 promise

console.log('... In test_helpers.js')

// This only run once, and before all tests.
before(done=>{
  const DATABASE_NAME = 'users_test'; // If does not exist mongoose will create this database for you.
  mongoose.connect(
    `mongodb://localhost/${DATABASE_NAME}`,
    // https://stackoverflow.com/questions/50448272/avoid-current-url-string-parser-is-deprecated-warning-by-setting-usenewurlpars
    // For the following see above link:
    { useNewUrlParser: true }
  );

  mongoose.connection
    .once('open', ()=>{
      console.log('connected');
      done();
    })
    .on('error', err=>console.warn('Warning: ', err) )
})


// Run before each test
beforeEach(done=>{

  // Start the database with clean slate
  mongoose.connection
    .collections
    .users
    .drop(()=>done());
});
