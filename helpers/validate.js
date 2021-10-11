// const express = require('express');

const validateDisplayName = (displayName) => {
  const MIN_LENGTH = 8;
  if (!displayName || displayName.length < MIN_LENGTH) {
    return '"displayName" length must be at least 8 characters long';
  }
};

const validateEmail = (email) => {
  if (!email) return '"email" is required';
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i)) return '"email" must be a valid email';
};

const validatePassword = (password) => {
  const MIN_LENGTH = 6;
  if (!password) return '"password" is required';
  if (password.length < MIN_LENGTH || password.length > MIN_LENGTH) {
    return '"password" length must be 6 characters long';
  }
};

const validateUser = ({ displayName, email, password }) => {
  const displayNameIsValid = validateDisplayName(displayName);
  if (displayNameIsValid) return displayNameIsValid;

  const emailIsValid = validateEmail(email);
  if (emailIsValid) return emailIsValid;
  
  return validatePassword(password);
};

module.exports = {
  validateUser,
};
