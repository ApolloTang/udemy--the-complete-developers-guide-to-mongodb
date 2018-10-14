const assert = require('assert');
const User = require('../src/user');

console.log('... In delete_test.js')

describe('Deleting a user', ()=>{

  let joe;
  let joe2;

  beforeEach ( async () => {
    joe = new User( { name: 'Joe' })
    await joe.save()
    joe2 = new User( { name: 'Joe' })
    await joe2.save()
  })

  it('Delete a user using model instance remove', async () => {

    const userDidCreate = !!await User.findOne({ _id: joe._id})
    await joe.remove()
    const userIsAbsence = !await User.findOne({ _id: joe._id})

    assert( userDidCreate && userIsAbsence )

  });


  // it('Delete a user using model Class.remove( <<critiria>> )', async () => {
  //@ (node:74371) DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
  it('Delete one or more user using model Class.deleteMany( <<conditions>> )', async () => {

    let users = await User.find({name: 'Joe'})
    const usersDidCreate = users.length > 0

    //remove a bunch of records with some given conditions
    await User.deleteMany({name: 'Joe'})

    users = await User.find({name: 'Joe'})
    const usersIsAbsence = (users.length === 0)

    assert( usersDidCreate && usersIsAbsence )

  });

  // it('Delete a user using model Class.findAndRemove( <<critiria>> )', async () => {
  //
  //   const userDidCreate = !!await User.findOne({ _id: joe._id})
  //   await User.remove({_id: joe._id})
  //   const userIsAbsence = !await User.findOne({ _id: joe._id})
  //
  //   assert( userDidCreate && userIsAbsence )
  //
  // });
  //
  // it('Delete a user using model Class.findByIdAndRemove()', async () => {
  //
  //   const userDidCreate = !!await User.findOne({ _id: joe._id})
  //   await User.findByIdAndRemove( joe._id )
  //   const userIsAbsence = !await User.findOne({ _id: joe._id})
  //
  //   assert( userDidCreate && userIsAbsence )
  //
  // });
});
