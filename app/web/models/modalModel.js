import * as types from '../icp/constants';
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
