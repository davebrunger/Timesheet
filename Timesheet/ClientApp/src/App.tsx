import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { Users } from './components/users/Users';
import { Tasks } from './components/tasks/Tasks';
import { MenuItem } from './models/menuItem';

import './custom.css'

const menuItems: MenuItem[] = [
  { label: "Dashboard", path: "/", component: Dashboard, exact: true },
  { label: "Users", path: "/users", component: Users },
  { label: "Tasks", path: "/tasks", component: Tasks }
];

export const AppContext = React.createContext({ menuItems: menuItems });

export default function App(): JSX.Element {

  const menuItems = React.useContext(AppContext).menuItems;

  return (
    <Layout>
      <Switch>
        {menuItems.map((m, i) => <Route key={i} exact={m.exact} path={m.path} component={m.component} />)}
      </Switch>
    </Layout>
  );
}
