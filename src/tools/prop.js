export const objectPropDefault = (obj, defVal = {}) => {
  const keys = Object.keys(defVal);
  keys.forEach((key) => {
    if (typeof obj[key] !== "undefined") {
      obj[key] = defVal[key];
    }
  });
};
