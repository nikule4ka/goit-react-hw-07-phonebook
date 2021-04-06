import {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addContactsSuccess,
  addContactsRequest,
  addContactsError,
  deleteContactsRequest,
  deleteContactsSuccess,
  deleteContactsError,
} from './contacts-action';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4040/';

const fetchContacts = () => async dispatch => {
  dispatch(fetchContactsRequest());

  try {
    const { data } = await axios.get('/contacts');

    dispatch(fetchContactsSuccess(data));
  } catch (error) {
    dispatch(fetchContactsError(error));
  }
};

const addContact = ({ name, number }) => async dispatch => {
  const contact = { name, number };

  dispatch(addContactsRequest());

  try {
    const { data } = await axios.post('/contacts', contact);
    dispatch(addContactsSuccess(data));
  } catch (error) {
    dispatch(addContactsError(error));
  }
};

const deleteContact = id => async dispatch => {
  dispatch(deleteContactsRequest());

  try {
    await axios.delete(`/contacts/${id}`);
    dispatch(deleteContactsSuccess(id));
  } catch (error) {
    dispatch(deleteContactsError(error));
  }
};

export { fetchContacts, addContact, deleteContact };
