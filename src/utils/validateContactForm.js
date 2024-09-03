export const validateContactForm = (values) => {
    const { firstName, lastName, phoneNum, email } = values;
    const errors = {};

    if (!firstName) {
        errors.firstName = 'Firstname is required!';
    } else if (firstName.length < 2) {
        errors.firstName = 'Must be at least 2 characters!';
    } else if (firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less!';
    }

    if (!lastName) {
        errors.lastName = 'Lastname is required!';
    } else if (lastName.length < 2) {
        errors.lastName = 'Must be at least 2 characters!';
    } else if (lastName.length > 15) {
        errors.lastName = 'Must be 15 characters or less!';
    }

    const reg = /^\d+$/;
    if (!reg.test(phoneNum)) {
        errors.phoneNum = 'The phone number should only contain numbers!';
    }

    if (!email.includes('@')) {
        errors.email = 'Email must contain a @ symbol!';
    }

    return errors;
};