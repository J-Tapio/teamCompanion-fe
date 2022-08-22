import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from 'store';
import axios from 'axios';
import { PATH_API } from 'api';

import { ITeamState } from 'types/team';

const initialState: ITeamState = {
  error: false,
  teamId: null,
  teamName: null,
  teamAddress: null,
  teamMembers: null,
}

const slice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    setTeam(state, action) {
      return {error: false, ...action.payload};
    }
  }
})

export default slice.reducer;
export const { hasError, setTeam } = slice.actions;

//==============================================================================
//TODO: Consider invoking this function immediately when user information has been gathered!
// Currently being invoked within fitness and event creation pages separately - Logic!

export function getTeam(teamId:number) {
  return async () => {
    try {
      const response = await axios.get(PATH_API.team.root + teamId)
      dispatch(setTeam(response.data));
    } catch (error) {
      console.error(error);
      dispatch(hasError(true));
    }
  }
}

//------------------------------------------------------------------------------