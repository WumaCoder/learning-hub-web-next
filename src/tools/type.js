export const isNumber = (str) => {
  str = str + "";
  return str.search(/\d+/gim) !== -1;
};

export const isObject = (v) => {
  if (!v) {
    return false;
  }
  return typeof v === "object";
};

export const isArray = (v) => v instanceof Array;

export const isEmpty = (v) => {
  if (!v) {
    return true;
  }
  if (isArray(v) && !v.length) {
    return true;
  }
  return false;
};
