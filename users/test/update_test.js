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


  it('Update with instance.updateOne(object)', async () => {

    const newName = 'Mike'

    //@ (node:61995) DeprecationWarning: collection.update is deprecated. Use updateOne, updateMany, or bulkWrite instead.
    //await userInstance1.update({'name': newName});
    await userInstance1.updateOne({'name': newName});
    // await userInstance1.save(); //@ Notice that update does not require you to call save()

    const usersFound = await User.findOne({ _id: userInstance1.id });
    assert(usersFound.name === newName);

  });


  it('Update with ModalClass.update(<<critiria>>, <<document>>)', async () => {

    const newName = 'Mike';

    //@ (node:63212) DeprecationWarning: collection.update is deprecated. Use updateOne, updateMany, or bulkWrite instead.
    // await User.update( {_id: userInstance1.id}, {name: newName})
    await User.updateOne( {_id: userInstance1.id}, {name: newName});

    const usersFound = await User.findOne({ _id: userInstance1.id });
    assert(usersFound.name === newName);

  });


  //
  //
  // it('Update with ModalClass.findOneAndUpdate()', async () => {
  //
  // })
  //
  //
  // it('Udate with ModalClass.findByIdAndUpdate()', async () => {
  //
  // })

});
