function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const API_ROOT = process.env.REACT_APP_API_ROOT || 'http://localhost:3005';

export const PATH_API = {
  root: API_ROOT,
  login: {
    root: path(API_ROOT, '/login'),
  },
  profile: {
    root: path(API_ROOT, '/users/profile'),
    teamInfo: path(API_ROOT, '/teams/me'),
  },
  team: {
    root: path(API_ROOT, '/teams/'),
  },
  activities: {
    root: path(API_ROOT, '/activities/team/'),
    
    /* "/activities/team/:teamId/activity/fitness/:activityId" */
  },
  equipment: {
    root: path(API_ROOT, '/equipment'),
  },
  exercises: {
    root: path(API_ROOT, '/exercises'),
    exeq: path(API_ROOT, '/exercises/ex-eq'),
  },
};