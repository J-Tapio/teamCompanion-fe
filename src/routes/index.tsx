import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import { PATH_DASHBOARD } from './paths';
// View loader for dashboard
import Loader from '../components/Loader';
//Guards
import AuthGuard from '../guards/AuthGuard';
// Dashboard layout
import Dashboard from '../pages/dashboard/Dashboard';

//============================================================================//

/* function Loadable(Component: React.ElementType) {
  const { pathname } = useLocation();
  const isDashBoard = pathname.includes('/dashboard');

  return ((props: unknown) => {
    if(isDashBoard) {
      return(
        <Dashboard>
          <Suspense fallback={
            <Loader />
          }>
            <Component {...props} />
          </Suspense>
        </Dashboard>
      );
    } else {
      return (
        <Component {...props} />
      );
    }
  })
} */

const Loadable = (Component: React.ElementType) => (props: object) => {
  const { pathname } = useLocation();
  const isDashBoard = pathname.includes(PATH_DASHBOARD.root);
  if (isDashBoard) {
    return (
      <AuthGuard>
        <Dashboard>
          <Suspense fallback={<Loader />}>
            <Component {...props} />
          </Suspense>
        </Dashboard>
      </AuthGuard>
    );
  } else {
    return (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    );
  }
}


export default function Router() {
  return useRoutes([
    // Login
    {
      path: '/auth',
      children: [
        {
          path: 'login',
          element: <Login />,
        },
        /* {
          path: 'register',
          element: 
        } */
      ],
    },
    {
      path: '/',
      element: <Navigate to="/dashboard/events" replace={true} />,
    },
    {
      // Dashboard - currently will just directly take to events.
      path: '/dashboard',
      children: [
        {
          path: '/dashboard',
          element: <Navigate to="/dashboard/events" replace={true} />,
        },
        {
          path: 'events',
          element: <TeamEvents />,
        },
        {
          path: 'calendar',
          element: <Calendar />,
        },
        {
          path: 'team',
          element: <TeamMembers />,
        },
        {
          path: 'fitness',
          element: <FitnessProgram />,
        },
        {
          path: 'memo',
          element: <Memo />,
        },
      ],
    },
    {
      path: '/404',
      element: <Page404 />,
    },
    {
      path: '/500',
      element: <Page500 />,
    },
    { path: '*', element: <Navigate to="/404" replace={true} /> },
  ]);
}

// Import components

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));

// Dashboard
const DashBoard = Loadable(lazy(() => import('../pages/dashboard/Dashboard')));

const TeamEvents = Loadable(lazy(() => import('../pages/dashboard/views/TeamEvents')));

const Calendar = Loadable(lazy(() => import('../pages/dashboard/views/EventCreation')));

const TeamMembers = Loadable(lazy(() => import('../pages/dashboard/views/TeamMembers')));

const FitnessProgram = Loadable(lazy(() => import('../pages/dashboard/views/FitnessProgram')));
//TODO: Rename Memo to Kanban?
const Memo = Loadable(lazy(() => import('../pages/dashboard/views/Kanban')));

// Other pages
const Page404 = Loadable(lazy(() => import('../pages/Page404')))
const Page500 = Loadable(lazy(() => import('../pages/Page500')));