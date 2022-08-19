// If project grows, useful.
function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

//==============================================================================

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login')
}


export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  events: {
    root: path(ROOTS_DASHBOARD, '/events')
  },
  calendar: {
    root: path(ROOTS_DASHBOARD, '/calendar')
  },
  team: {
    root: path(ROOTS_DASHBOARD, '/team')
  },
  fitness: {
    root: path(ROOTS_DASHBOARD, '/fitness')
  },
  memo: {
    root: path(ROOTS_DASHBOARD, '/memo')
  }
}
