const assert = require('assert');
const User = require('../src/user');

const FILENAME = __filename.slice(__dirname.length + 1);

describe(`[${FILENAME}] Update a user`, ()=>{

  let userInstance1;
  let userInstance2;

  beforeEach ( async () => {
    userInstance1 = new User( { name: 'Joe' })
    await userInstance1.save()

    userInstance2 = new User( { name: 'Kate' })
    await userInstance2.save()
  })


  it('Update with instance.set(key,value)', async () => {

    const newName = 'Mike'
    userInstance1.set('name', newName);
    await userInstance1.save();

    const usersFound = await User.findOne({ _id: userInstance1.id });
    assert(usersFound.name === newName);

  });


  // it('Update with instance.update(object)', async () => { //@ instance.update does not work ??
  it('Update with instance.set(object)', async () => {

    const newName = 'Mike'
    // userInstance1.update({'name': newName}); //@ instance.update does not work ??
    userInstance1.set({'name': newName});
    await userInstance1.save();

    const usersFound = await User.findOne({ _id: userInstance1.id });
    assert(usersFound.name === newName);

  });
});
