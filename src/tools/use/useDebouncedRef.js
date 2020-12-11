import { customRef } from "vue";

export function useDebouncedRef(value, delay = 200) {
  let debounce = debounced(delay);
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        debounce(() => {
          value = newValue;
          trigger();
        });
      },
    };
  });
}

export function debounced(interval) {
  let timeout = null;
  // TODO: 注意这里可能会引起内存泄漏

  return function(callback) {
    clearTimeout(timeout);
    timeout = setTimeout(callback, interval);
  };
}
