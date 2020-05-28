import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Welcome } from 'pages/Welcome'
import { SignUp } from 'pages/SignUp'
import { Login } from 'pages/Login'
import { Secret } from 'pages/Secret'
import { PageSetup } from 'components/PageSetup'


export const App = () => {
  return (
    <PageSetup>
      <BrowserRouter>
        <Switch>
          <Route path='/'exact>
            <Welcome />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/secret'>
            <Secret />
          </Route>
        </Switch>
      </BrowserRouter>
    </PageSetup>
  )
}

