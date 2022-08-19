
export type TeamRole = 'Coach' | 'Trainer' | 'Physio' | 'Staff' | 'Athlete';
export type MemberStatus = 'Active' | 'Injured' | 'Inactive' | 'Vacation' | 'Sick';

export interface ITeamMember {
  userId: number;
  userTeamId: number;
  firstName: string;
  lastName: string;
  teamRole: TeamRole;
  status?: MemberStatus;
}

export interface ITeamMembers {
  coaches: ITeamMember[],
  trainers: ITeamMember[],
  athletes: ITeamMember[],
  physiotherapists: ITeamMember[],
  staff: ITeamMember[]
}


interface ITeamAddress {
  streetAddress: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
}

export interface ITeamState {
  error: boolean;
  teamId: number | null;
  teamName: string | null;
  teamAddress: ITeamAddress | null;
  teamMembers: ITeamMembers | null;
}