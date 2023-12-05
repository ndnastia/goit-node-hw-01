
const {nanoid} = require('nanoid');
const fs = require('fs').promises;
const path = require("path");



 const contactsPath = path.resolve("db", "contacts.json");
 

const listContacts = async() => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
} 
  
  const getContactById = async(contactId) => {
    

    const contacts = await listContacts();
    const contactItem = contacts.find((item) => item.id === contactId);

    return contactItem || null;
    
  }
  
  
  const removeContact = async(contactId) => {
    

    const contacts = await listContacts();
    const removedIndex = contacts.findIndex(contact => contact.id === contactId);

    if(removedIndex !== -1) {
        const removedContact = contacts.splice(removedIndex, 1) [0];
        return removedContact;
    } else {
        return null;
    }
  }
  
  const addContact = async(name, email, phone) => {
    
    const contacts = await listContacts();

    const newContact = {
        id: nanoid(),
        name,
        email, 
        phone
    }

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));
    return newContact;

  }

module.exports = {listContacts, getContactById, addContact, removeContact};