export const sleep = (interval) => {
  return new Promise((resolve) => setTimeout(resolve, interval));
};

export const wrap = (promise) =>
  promise.then((res) => [null, res]).catch((err) => [err, null]);
