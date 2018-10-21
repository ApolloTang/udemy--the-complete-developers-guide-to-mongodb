const assert = require('assert');
const User = require('../src/user');

console.log('... In update_test.js')

describe('Update a user', ()=>{

  let joe;

  beforeEach ( async () => {
    userInstance1 = new User( { name: 'Joe' })
    await userInstance1.save()

    userInstance2 = new User( { name: 'Kate' })
    await userInstance2.save()
  })


  it('Update with instance.set()', async () => {

    const newName = 'Mike'
    userInstance1.set('name', newName);
    await userInstance1.save();

    const usersFound = await User.findOne({ _id: userInstance1.id });
    assert(usersFound.name === newName);

  });

});
