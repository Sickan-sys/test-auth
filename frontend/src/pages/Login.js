
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Form, Input, Button } from 'components/Form'
import { Container } from 'components/Container'
import { H1 } from 'components/TextStyles'
//import { Input } from 'components/Input'
//import { Button } from '../components/Form/Button'

//const URL_SIGNUP = 'http://localhost:8080/sessions'
const URL_SIGNUP = 'https://week20-auth-app.herokuapp.com/'

export const Login = props => {
  const history = useHistory()
  const [name, setName] = useState()
  const [password, setPassword] = useState()
  const [errorMessage, setErrorMessage] = useState()
  // const [accessToken, setAccessToken] = useState()
  const [failedLogin, setFailedLogin] = useState(false)

  const handleLogIn = event => {
    event.preventDefault()

    fetch(URL_SIGNUP,
      {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => {
          if (!res.ok) {
            throw 'Could not log in, please try again.',
            setFailedLogin(true)
          }
          return res.json()
        })
        .then((json) => {
          console.log(json)
          history.push('/secret')
        })
  }


  return (
    <Container>
      <Form onSubmit={handleLogIn}>
        {!failedLogin && <H1>Log in fellow seeker!</H1>}
        {failedLogin && <H1>Fellow seeker, try again! Something was amiss...</H1>}
          <Input
            type='text'
            value={name}
            placeholder='name'
            onChange={event => setName(event.target.value)}
            required
          />
          <Input
            type='password'
            value={password}
            placeholder="password"
            required
            onChange={event => setPassword(event.target.value)} />
        <Button
          type="submit"
          onClick={handleLogIn}>
          Submit
        </Button>
      </Form>
    </Container>
  )
}

