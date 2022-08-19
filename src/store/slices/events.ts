import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from 'store';
import axios, {AxiosError} from 'axios';
import { PATH_API } from 'api';
// Types
import IEventState from 'types/events';
import { ITeamMember, TeamRole } from 'types/team';

//==============================================================================

const initialState: IEventState = {
  error: false,
  inputInvalid: true,
  formStep: 0,
  eventType: null,
  membersSelected: false,
  selectedCoaches: [],
  selectedAthletes: [],
  selectedTrainers: [],
  selectedPhysiotherapists: [],
  selectedStaff: [],
  eventParticipants: {
    coaches: [],
    trainers: [],
    athletes: [],
    physiotherapists: [],
    staff: [],
  },
  eventDate: new Date(),
  createdEvents: [],
  submitSuccessful: false,
};

const slice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    setSubmitSuccessful(state, action) {
      state.submitSuccessful = action.payload;
    },
    resetForm(state) {
      return initialState;
    },
    setInputInvalid(state, action) {
      state.inputInvalid = action.payload;
    },
    setFormStep(state, action) {
      state.formStep = action.payload;
    },
    setEventType(state, action) {
      state.eventType = action.payload;
    },
    setEventDate(state, action) {
      state.eventDate = action.payload;
    },
    setMembersSelected(state) {
      if(
        state.selectedCoaches.length > 0 ||
        state.selectedAthletes.length > 0 ||
        state.selectedPhysiotherapists.length > 0 ||
        state.selectedTrainers.length > 0 ||
        state.selectedStaff.length > 0
      ) {
        state.membersSelected = true;
        state.formStep = 2;
      } else {
        state.membersSelected = false;
        state.formStep = 1;
      }
    },
    unselectAllInDepartment(state, action) {
      switch (action.payload.department) {
        case 'coaches': {
          state.selectedCoaches = [];
          break;
        }
        case 'athletes': {
          state.selectedAthletes = [];
          break;
        }
        case 'trainers': {
          state.selectedTrainers = [];
          break;
        }
        case 'physiotherapists': {
          state.selectedPhysiotherapists = [];
          break;
        }
        case 'staff': {
          state.selectedStaff = [];
          break;
        }
        default:
          return state;
      }
    },
    selectAllInDepartment(state, action) {
      switch (action.payload.department) {
        case 'coaches': {
          state.selectedCoaches = action.payload.coaches;
          break;
        }
        case 'athletes': {
          state.selectedAthletes = action.payload.athletes;
          break;
        }
        case 'trainers': {
          state.selectedTrainers = action.payload.trainers;
          break;
        }
        case 'physiotherapists': {
          state.selectedPhysiotherapists = action.payload.physiotherapists;
          break;
        }
        case 'staff': {
          state.selectedStaff = action.payload.staff;
          break;
        }
        default:
          return state;
      }
    },
    removeSelectedMember(state, action) {
      switch (action.payload.department) {
        case 'coaches': {
          state.selectedCoaches = [
            ...state.selectedCoaches.filter(
              (teamMember) =>
                teamMember.userTeamId != action.payload.teamMember.userTeamId,
            ),
          ];
          break;
        }
        case 'trainers': {
          state.selectedTrainers = [
            ...state.selectedTrainers.filter(
              (teamMember) =>
                teamMember.userTeamId != action.payload.teamMember.userTeamId,
            ),
          ];
          break;
        }
        case 'athletes': {
          state.selectedAthletes = [
            ...state.selectedAthletes.filter(
              (teamMember) =>
                teamMember.userTeamId != action.payload.teamMember.userTeamId,
            ),
          ];
          break;
        }
        case 'physiotherapists': {
        state.selectedPhysiotherapists = [
          ...state.selectedPhysiotherapists.filter(
            (teamMember) =>
              teamMember.userTeamId != action.payload.teamMember.userTeamId,
          ),
        ];
        break;
        }
        case 'staff': {
          state.selectedPhysiotherapists = [
            ...state.selectedPhysiotherapists.filter(
              (teamMember) =>
                teamMember.userTeamId != action.payload.teamMember.userTeamId,
            ),
          ];
        break;
        }
        default:
          return state;
      }
    },
    addSelectedMember(state, action) {
      switch (action.payload.department) {
        case 'coaches': {
          state.selectedCoaches = state.selectedCoaches.concat(
            action.payload.teamMember,
          );
          break;
        }
        case 'trainers': {
          state.selectedTrainers = state.selectedTrainers.concat(
            action.payload.teamMember,
          );
          break;
        }
        case 'athletes': {
          state.selectedAthletes = state.selectedAthletes.concat(
            action.payload.teamMember,
          );
          break;
        }
        case 'athletes': {
          state.selectedAthletes = state.selectedAthletes.concat(
            action.payload.teamMember,
          );
          break;
        }
        case 'physiotherapists': {
          state.selectedPhysiotherapists =
            state.selectedPhysiotherapists.concat(action.payload.teamMember);
          break;
        }
        case 'staff': {
          state.selectedStaff = state.selectedStaff.concat(
            action.payload.teamMember,
          );
          break;
        }
        default:
          return state;
      }
    },
    setCreatedEvents(state, action) {
      state.createdEvents = action.payload;
    },
    setEventParticipants(state) {
      state.eventParticipants.coaches = state.selectedCoaches;
      state.eventParticipants.trainers = state.selectedTrainers;
      state.eventParticipants.athletes = state.selectedAthletes;
      state.eventParticipants.physiotherapists = state.selectedPhysiotherapists;
      state.eventParticipants.staff = state.selectedStaff;
    },
    unsetEventParticipants(state) {
      state.eventParticipants.coaches = [];
      state.eventParticipants.trainers = [];
      state.eventParticipants.athletes = [];
      state.eventParticipants.physiotherapists = [];
      state.eventParticipants.staff = [];
    },
    },
  });

export default slice.reducer;

export const {
  hasError,
  setSubmitSuccessful,
  resetForm,
  setInputInvalid,
  setFormStep,
  setEventType,
  setEventDate,
  setMembersSelected,
  unselectAllInDepartment,
  selectAllInDepartment,
  addSelectedMember,
  removeSelectedMember,
  setEventParticipants,
  unsetEventParticipants,
  setCreatedEvents,
} = slice.actions;


//==============================================================================
//TODO: Move types and import here later.

interface IActivityBody {
  activityTypeId: number;
  opponentName?: string;
  opponentLogo?: string;
  activityNotes: string;
  venueId: number;
  activityStart: string;
  activityEnd: string;
}

interface IVenue {
  venueId: number;
  venueName: string;
  streetAddress: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
}

export interface ICreatedEventParticipants {
  coaches: Omit<ITeamMember, 'status'>[];
  trainers: Omit<ITeamMember, 'status'>[];
  physiotherapists: Omit<ITeamMember, 'status'>[];
  athletes: Omit<ITeamMember, 'status'>[];
  staff: Omit<ITeamMember, 'status'>[];
}

interface ICreatedBy {
  userTeamId: number;
  firstName: string;
  lastName: string;
  teamRole: TeamRole
}

//TODO: Add types to axios response data
export interface ICreatedActivity {
  id: number;
  activityTypeId: number;
  activityType: string;
  activityStart: string;
  activityEnd: string;
  activityNotes: string;
  venue: IVenue;
  participants: ICreatedEventParticipants;
  createdBy: ICreatedBy;
  updatedBy?: null | number;
  createdAt: string;
  opponentName?: null | string;
  opponentLogo?: null | string;
}

interface IParticipantsBody {
  userTeamId: number;
}

//------------------------------------------------------------------------------
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'accessToken',
)}`;

//------------------------------------------------------------------------------

export function addEvent(teamId:number, eventData:IActivityBody, participantData: {data: IParticipantsBody[]}) {
  return async () => {
    try {
      // Create event
      const respEvent = await axios.post(PATH_API.activities.root + teamId, eventData);
      const createdEventId = respEvent.data.id;
      console.log("Created event id", createdEventId);
      // Add participants
      await axios.post(PATH_API.activities.root + teamId + '/activity/' + createdEventId + '/participants', participantData);

      dispatch(resetForm());
      dispatch(setSubmitSuccessful(true));
    } catch (error) {
      if(error instanceof AxiosError) {
        if (error.response?.status !== 404) {
          console.error(error);
        }
      }
      dispatch(resetForm());
      dispatch(hasError(true));
    }
  };
}

//------------------------------------------------------------------------------

//! Currently just iterate over created fitness events from response.
export function getEvents(teamId:number) {
  return async () => {
    try {
      // Redundant situation when axios response is wrapped in property data and response object itself contains data property with response information.
      const events = (await axios.get(PATH_API.activities.root + teamId + '?participants=true')).data.data;

      //! Currently just fitness events can be created
      if(events.fitness.length > 0) {
        let createdEvents = events.fitness.map((createdEvent:ICreatedActivity) => createdEvent);
        dispatch(setCreatedEvents(createdEvents))
      }
    } catch (error) {
      if(error instanceof AxiosError) {
        if(error.response?.status !== 404) {
          console.error(error);
        }
      }
    }
  }
}

//------------------------------------------------------------------------------