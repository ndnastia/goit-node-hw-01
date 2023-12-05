const {listContacts, getContactById, removeContact, addContact } = require('./contacts.js')
const argv = require('yargs').argv;

// TODO: рефакторити
const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      return console.table(contacts);

    case 'get':
     const getContact = await getContactById(id);
      return console.table(getContact);

    case 'add':
      const addedContact = await addContact(name, email, phone);
      return console.table(addedContact);

    case 'remove':
     const removedContact = await removeContact(id);
      return console.table(removedContact)

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);