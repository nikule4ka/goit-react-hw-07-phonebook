import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import s from './Filter.module.css';
import * as contactsActions from '../../redux/contacts/contacts-action';

const Filter = ({ value, onChange }) => (
  <label htmlFor="" className={s.filter__label}>
    Find contacts by name
    <input
      type="text"
      name="filter"
      value={value}
      onChange={onChange}
      required
    />
  </label>
);

Filter.defaultProps = {
  value: '',
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  value: state.contacts.filter,
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(contactsActions.changeFilter(e.currentTarget.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
