import * as types from './constants';
export default [
  {
    key: 'modal',
    action: types.MODAL,
    initialState: {
      show: false,
      data: {}
    },
    loading: (state, action) => {
      const {payload} = action;
      return {...payload};
    }
  }
];
