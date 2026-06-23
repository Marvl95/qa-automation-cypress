export const registrationModal = '.modal-content';

export const registrationFields = {
  name: '#signupName',
  lastName: '#signupLastName',
  email: '#signupEmail',
  password: '#signupPassword',
  repeatPassword: '#signupRepeatPassword',
};

export const registrationButtons = {
  register: `${registrationModal} .modal-footer button`,
  close: `${registrationModal} .modal-header button.close`,
};

export const signInModal = '.modal-content';

export const signInFields = {
  email: '#signinEmail',
  password: '#signinPassword',
};

export const signInButtons = {
  login: `${signInModal} .modal-footer .btn-primary`,
};

export const garagePage = {
  logoutButton: 'a.sidebar_btn.text-danger',
};
