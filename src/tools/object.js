export const alterPropName = (obj, keyMap = {}) => {
  const transitionKeyList = Object.keys(keyMap);
  transitionKeyList.forEach((key) => {
    if (key !== keyMap[key]) {
      obj[key] = obj[keyMap[key]];
      delete obj[keyMap[key]];
    }
  });
  return obj;
};
