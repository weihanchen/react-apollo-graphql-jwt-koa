import React from 'react'

import {
   Route,
   IndexRoute
} from 'react-router-dom'

//import components
import App from './components/App'

import {
   AuthContainer,
   LoginContainer,
   ProfileContainer,
   RegisterContainer
} from './containers'



const Routes = (
   <App>
      <Route path='/' component={AuthContainer} />
      <Route path='/auth' component={AuthContainer} />
      <Route path='/login' component={LoginContainer} />
      <Route path='/profile' component={ProfileContainer} />
      <Route path='/register' component={RegisterContainer} />
   </App>
)

export default Routes