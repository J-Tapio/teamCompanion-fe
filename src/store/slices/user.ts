import {createSlice} from '@reduxjs/toolkit';
import { dispatch } from 'store';
import axios from 'axios';
import { PATH_API } from 'api';

import { IUserState, IUserInfoResponse, IUserTeamInfoResponse} from 'types/user';

const initialState: IUserState = {
  loading: true,
  error: false,
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  dateOfBirth: null,
  streetAddress: null,
  city: null,
  state: null,
  zipCode: null,
  country: null,
  userTeamId: null,
  teamId: null,
  teamName: null,
  teamRole: null,
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoader(state, action) {
      state.loading = action.payload;
    },
    hasError(state, action) {
      state.error = action.payload;
    },
    setUser(state, action) {
      return {error: false, loading: true, ...action.payload};
    },
  },
});

export default slice.reducer;
export const {setUser, hasError, setLoader} = slice.actions;

//==============================================================================

axios.defaults.headers.common[
  'Authorization'
] = `Bearer ${localStorage.getItem("accessToken")}`;

export function getUser() {
  return async () => {
    try {
      const responseUserProfile:IUserInfoResponse = (await axios.get(PATH_API.profile.root)).data;
      const responseUserTeamInfo:IUserTeamInfoResponse = (await axios.get(PATH_API.profile.teamInfo)).data.teams[0];

      dispatch(slice.actions.setUser({...responseUserProfile, ...responseUserTeamInfo}));
      dispatch(slice.actions.setLoader(false));
    } catch (error) {
      //TODO: consider if using other action which takes in error message.
      dispatch(slice.actions.hasError(true));
      dispatch(slice.actions.setLoader(false));
    }
  }
}

//------------------------------------------------------------------------------