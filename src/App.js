import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []

const App = () => {
  const [user, setUserState] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])

    }
  }

  const setUser = (user) => setUserState(user)

  const clearUser = () => setUserState(null)

  const deleteAlert = (id) => {
    setMsgAlerts(alerts => alerts.filter((msg) => msg.id !== id))
  }

  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    setMsgAlerts(alerts => [...alerts, { heading, message, variant, id }])
  }

  return (
    <Fragment>
      <Header user={user} />
      {msgAlerts.map((msgAlert) => (
        <AutoDismissAlert
          key={msgAlert.id}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
          id={msgAlert.id}
          deleteAlert={deleteAlert}
        />
      ))}
      <main className='container'>
        <Route
          path='/sign-up'
          render={() => (
            <SignUp msgAlert={msgAlert} setUser={setUser} />
          )}
        />
        <Route
          path='/sign-in'
          render={() => (
            <SignIn msgAlert={msgAlert} setUser={setUser} />
          )}
        />
        <AuthenticatedRoute
          user={user}
          path='/sign-out'
          render={() => (
            <SignOut
              msgAlert={msgAlert}
              clearUser={clearUser}
              user={user}
            />
          )}
        />
        <AuthenticatedRoute
          user={user}
          path='/change-password'
          render={() => (
            <ChangePassword msgAlert={msgAlert} user={user} />
          )}
        />
              <ChangePassword msgAlert={this.msgAlert} user={user} />
          )}
        />
      </main>
    </Fragment>
  )
}

export default App
