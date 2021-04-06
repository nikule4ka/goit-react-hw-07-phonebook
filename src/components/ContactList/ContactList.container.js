import { connect } from 'react-redux';
import * as contactsOperations from '../../redux/contacts/contacts-operations';
import ContactList from './ContactList';

const getVisibleContacts = (allContacts, filter) => {
  if (!filter.trim()) {
    return allContacts;
  }
  const normalizedFilter = filter.toLowerCase();

  return allContacts.filter(
    ({ name, number }) =>
      name.toLowerCase().includes(normalizedFilter) ||
      number.includes(normalizedFilter),
  );
};

const mapStateToProps = ({ contacts: { items, filter } }) => ({
  contacts: getVisibleContacts(items, filter),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContacts: id => dispatch(contactsOperations.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
