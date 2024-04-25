export const validateOtp = (value: string | undefined) => {
  if (!value || value.length < 6) {
    return { ['otp']: 'please enter full otp' };
  }
  if (isNaN(value as unknown as number)) {
    return { ['otp']: 'only numbers are allowed' };
  }
  if (value.endsWith('7')) {
    return { otp: 'Oops your otp ends with digit 7!!' };
  }
  return null;
};
