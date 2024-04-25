export const validateOtp = (value: string) => {
  if (value.length < 6) {
    return { ['otp']: 'please enter full otp' };
  }
  if (isNaN(value as unknown as number)) {
    return { ['otp']: 'only numbers are allowed' };
  }
  return null;
};
