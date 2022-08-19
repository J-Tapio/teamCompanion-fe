import { IVenue, ICreatedEventParticipants, ICreatedBy } from './events';
import { ITeamMember } from './team';

type Exercises = (ICardioExercise | IStrengthExercise)[];
type ExCategories = 'Cardio' | 'Strength' | null;
type CardioGoal = 'Duration' | 'Distance' | null;
type EventDate = string | null;


export interface ICardioExercise {
  exercisesEquipmentId: number;
  exerciseCategory: 'Cardio';
  equipment: string;
  equipmentId: number;
  exercise: string;
  exerciseId: number;
  cardioGoal: 'Duration' | 'Distance';
  duration?: string;
  distance?: string;
  participants: ITeamMember[];
}

export interface IStrengthExercise {
  exercisesEquipmentId: number;
  exerciseCategory: 'Strength';
  equipment: string;
  equipmentId: number;
  exercise: string;
  exerciseId: number;
  weight: string;
  repetitions: string;
  sets: string;
  participants: ITeamMember[];
}


export interface IFitnessActivity {
  id: number;
  activityTypeId: number;
  activityStart: string;
  activityEnd: string;
  activityNotes: string;
  venue: IVenue;
  participants: ICreatedEventParticipants[];
  createdBy: ICreatedBy;
  createdAt: string;
}

export interface IEquipmentExercise {
  exerciseId: number;
  exerciseName: string;
  exerciseInfo: string | null;
  exerciseVariations: string[];
  exercisePositions: string | null;
  exerciseInformation: string;
}

interface IExercisesEquipment {
  equipmentId: number;
  equipmentName: string;
  equipmentInfo: string | null;
  trainingModality: 'Cardio' | 'Stength';
  exerciseVariations: string[];
  exercisePositions: string | null;
  exerciseInformation: string;
}

export interface IEquipmentWithExercises {
  id: number;
  equipmentName: string;
  equipmentInfo: string | null;
  trainingModality: 'Cardio' | 'Strength';
  exercises: IEquipmentExercise[];
}

interface IExercisesWithEquipment {
  id: number;
  exerciseName: string;
  exerciseInfo: string | null;
  equipment: IExercisesEquipment[];
}

export interface IEquipmentResponse {
  count: number;
  data: IEquipmentWithExercises[];
}

export interface IExercisesResponse {
  count: number;
  data: IExercisesWithEquipment[];
}

export default interface IFitnessProgramState {
  error: boolean;
  inputInvalid: boolean;
  horizontalStep: number;
  formStep: number;
  eventDate: EventDate;
  exerciseCategory: ExCategories;
  cardioGoal: CardioGoal;
  currentCardioExercise: ICardioExercise | null;
  currentStrengthExercise: IStrengthExercise | null;
  createdProgramExercises: Exercises;
  availableEquipment: IEquipmentWithExercises[] | null;
  availableExercises: IExercisesWithEquipment[] | null;
  cardioEquipment: IEquipmentWithExercises[] | null;
  strengthEquipment: IEquipmentWithExercises[] | null;
  createdFitnessEvents: IFitnessActivity[];
  cardioExOptions: IEquipmentExercise[];
  cardioEqOptions: string[];
  strengthExOptions: IEquipmentExercise[];
  strengthEqOptions: string[];
  selectedFitnessEvent: IFitnessActivity | null;
  submitSuccessful: boolean;
}