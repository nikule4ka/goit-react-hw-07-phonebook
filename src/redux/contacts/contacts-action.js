import { createAction } from '@reduxjs/toolkit';
import shortid from 'shortid';

const addContact = createAction('contacts/Add', ({ name, number }) => ({
  payload: {
    id: shortid.generate(),
    name,
    number,
  },
}));

const deleteContact = createAction('contacts/Delete');

const changeFilter = createAction('contacts/ChangeFilter');

export { addContact, deleteContact, changeFilter };
