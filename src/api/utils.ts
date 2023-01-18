export type AppEventType =
  | 'Match'
  | 'Training'
  | 'Fitness'
  | 'Physiotherapy'
  | 'Meeting';

export type DBEventType =
  | 'teamMatch'
  | 'teamPractise'
  | 'teamMeeting'
  | 'fitness'
  | 'rehabilitation';

// Map ActivityType string to correct activityTypeId of DB
export const dbActivityTypeIds = new Map<AppEventType, number>();
dbActivityTypeIds.set('Match', 1);
dbActivityTypeIds.set('Training', 2);
dbActivityTypeIds.set('Meeting', 3);
dbActivityTypeIds.set('Fitness', 4);
dbActivityTypeIds.set('Physiotherapy', 5);

// Map DB activityType string to correct activityType within app
export const dbEventTypes = new Map<DBEventType, AppEventType>();
dbEventTypes.set('teamMatch', 'Match');
dbEventTypes.set('teamPractise', 'Training');
dbEventTypes.set('fitness', 'Fitness');
dbEventTypes.set('rehabilitation', 'Physiotherapy');
dbEventTypes.set('teamMeeting', 'Meeting');
