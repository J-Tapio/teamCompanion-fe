//TODO: Change filename later eg. to 'events.create.ts' when adding more to landing-page of dashboard where created events are shown etc.
import { ITeamMember, TeamRole } from './team';

export type Event =
  | 'Match'
  | 'Training'
  | 'Fitness'
  | 'Physiotherapy'
  | 'Team Meeting';
// Possibly not needed
type EventDate = Date | null;

export interface IVenue {
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

export interface ICreatedBy {
  userTeamId: number;
  firstName: string;
  lastName: string;
  teamRole: TeamRole;
}

interface ICreatedActivity {
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

interface IEventParticipants {
  coaches: ITeamMember[];
  trainers: ITeamMember[];
  athletes: ITeamMember[];
  physiotherapists: ITeamMember[];
  staff: ITeamMember[];
}

export interface IEventData {
  activityTypeId: number;
  venueId: number;
  activityNotes: string;
  activityStart: string;
  activityEnd: string;
}

export default interface IEventState {
  error: boolean;
  submitSuccessful: boolean;
  inputInvalid: boolean;
  formStep: number;
  eventType: Event | null;
  membersSelected: boolean;
  selectedCoaches: ITeamMember[];
  selectedAthletes: ITeamMember[];
  selectedTrainers: ITeamMember[];
  selectedPhysiotherapists: ITeamMember[];
  selectedStaff: ITeamMember[];
  eventParticipants: IEventParticipants;
  eventDate: Date;
  createdEvents: ICreatedActivity[];
}
