import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as contactsOperations from '../../redux/contacts/contacts-operations';
import {
  getIsLoading,
  getVisibleContacts,
} from '../../redux/contacts/contacts-selectors';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import s from './ContactList.module.css';

class ContactList extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    const { contacts, onDeleteContacts, isloading } = this.props;
    return (
      <>
        {isloading && <Loader type="Puff" color="#00BFFF" height={50} width={50} />}

        <ul className={s.ContactList}>
          {contacts.length ? (
            contacts.map(({ id, name, number }) => (
              <li key={id} id={id} className={s.ContactList__item}>
                <p className={s.ContactList__text}>{name}:</p>
                <p className={s.ContactList__text}>{number}</p>

                <button
                  className={s.ContactList__btn}
                  onClick={() => onDeleteContacts(id)}
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p>No contacts found</p>
          )}
        </ul>
      </>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
  ),
  onDeleteContacts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  contacts: getVisibleContacts(state),
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContacts: id => dispatch(contactsOperations.deleteContact(id)),
  fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
