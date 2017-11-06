import * as types from '../utils/constants';
export default [
  {
    key: 'loader.loading',
    action: types.LOADING,
    initialState: {
      loading: []
    },
    loading: (state, action) => {
      const {loading} = state.loading;
      const {payload} = action;
      loading.push(payload);
      return {
        loading: [...loading]
      };
    }
  },
  {
    key: 'loader.loaded',
    action: types.LOADED,
    loading: (state, action) => {
      const {loading} = state.loading;
      const i = loading.findIndex(key => (key === action.payload));
      loading.splice(i, 1);
      return {
        loading: [...loading]
      };
    }
  }
];
