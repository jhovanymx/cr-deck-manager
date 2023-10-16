export function loginValidate(values) {
  const errors = {}
  const { email, password } = values;

  if (!email) {
    errors.email = "Required"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }

  if (!password) {
    errors.password = "Required"
  } else if (password.length < 8 || password.length > 20) {
    errors.password = "Must be greater than 8and less than 20 characters long"
  }

  return errors
}

export function registerValidate(values) {
  const errors = loginValidate(values)

  const { email, password, cpassword } = values;

  if (!cpassword) {
    errors.cpassword = "Required"
  } else if (cpassword.length < 8 || cpassword.length > 20) {
    errors.cpassword = "Must be greater than 8and less than 20 characters long"
  }

  if (password !== cpassword) {
    errors.cpassword = "Password and Confirm Password don't match"
  }

  return errors
}