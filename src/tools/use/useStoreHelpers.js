import { useStore } from "vuex";

export function useStoreHelpers(nameSpaced) {
  const store = useStore();
  const commit = (mutationName, ...args) => {
    return store.commit(`${nameSpaced}/${mutationName}`, ...args);
  };
  const dispatch = (actionName, ...args) => {
    return store.dispatch(`${nameSpaced}/${actionName}`, ...args);
  };
  const getters = (actionName, ...args) => {
    return store.getters(`${nameSpaced}/${actionName}`, ...args);
  };
  const instance = {
    commit,
    dispatch,
    getters,
    state: store.state[nameSpaced],
  };

  return instance;
}
