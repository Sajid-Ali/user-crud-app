export const isValidEmail = email =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
export const isAlphanumeric = s => /^[a-z0-9]+$/i.test(s);
export const isAlphabetsWithSpaces = s => /^[A-Za-z\s]+$/i.test(s);
export const isAlphanumericWithSpace = s => /^[a-z\d\-_\s]+$/i.test(s);
export const isValidNumber = s => /^[0-9]+$/i.test(s);
export const isValidFloat = s => /^-?\d*(\.\d+)?$/i.test(s);
export const isAlphanumericWithDashes = s => /^[a-z0-9 -]+$/i.test(s);
export const isNumberWithDashes = s => /^[0-9 -]+$/i.test(s);
export const isValidCarrierName = s => /^[a-zA-Z0-9 +-_()]+$/i.test(s);
export const isStartWithDash = s => /^-/i.test(s);
export const isValidDomain = s => /^[0-9A-Za-z.]+$/i.test(s);
/* eslint-disable no-useless-escape */
/* eslint-disable prettier/prettier */
export const isValidIPAddress = s => /^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}(?:\-([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))?$/i.test(s);
export const isValidWebUrl = s => /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.test(s);
