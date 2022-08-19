import { TeamRole } from "./team";

export interface LoginCredentials {
  email: string,
  password: string;
}

export interface IUserInfoResponse {
  id: number | null;
  email: string;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: Date | null;
  streetAddress: string | null;
  city: string | null;
  state: string | null;
  zipCode: number | null;
  country: string | null;
}

export interface IUserTeamInfoResponse {
  userTeamId: number | null;
  teamId: number | null;
  teamName: string | null;
  teamRole: TeamRole | null;
}



export interface IUserState {
  loading: boolean;
  error: boolean;
  id: number | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: Date | null;
  streetAddress: string | null;
  city: string | null;
  state: string | null;
  zipCode: number | null;
  country: string | null;
  userTeamId: number | null;
  teamId: number | null;
  teamName: string | null;
  teamRole: TeamRole | null;
}
