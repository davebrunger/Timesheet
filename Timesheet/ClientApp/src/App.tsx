import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { Users } from './components/users/Users';
import { Tasks } from './components/tasks/Tasks';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Dashboard} />
        <Route path='/users' component={Users} />
        <Route path='/tasks' component={Tasks} />
      </Layout>
    );

    /*
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
    );
    */
  }
}
