import React, {useState} from 'react'
import { useHistory } from 'react-router'
import { Container } from '../components/Container'
import { Form, Button, Input} from '../components/Form'
import { H1 } from '../components/TextStyles'

//const URL_SIGNUP = 'http://localhost:8080/users'
const URL_SIGNUP = 'https://week20-auth-app.herokuapp.com/'

export const SignUp = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  // const [accessToken, setAccessToken] = useState()
  // const [signedUp, setSignedUp] = useState(false)
  const [failedSignUp, setFailedSignUp] = useState(false)
  const history = useHistory()

  const handleSubmit = event => {
    event.preventDefault()

    fetch(URL_SIGNUP,
      {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' }
      })
      .then((res) => {
        if (!res.ok) {
          throw 'Could not create account, please try again with different username.',
          setFailedSignUp(true)
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
    <Form onSubmit={handleSubmit}>
      {!failedSignUp && <H1>Sign Up, oh brave one!</H1>}
      {failedSignUp && <H1>Oh brave one, try again! Use another name or email!</H1>}
      <Input
        type='text'
        value={name}
        placeholder='name'
        onChange={event => setName(event.target.value)}
        required
      />
      <Input
        type='email'
        value={email}
        placeholder='email'
        onChange={event => setEmail(event.target.value)}
        required />
      <Input
        type='password'
        value={password}
        placeholder='password'
        onChange={event => setPassword(event.target.value)} 
        required />
      <Button onClick={handleSubmit}>Submit</Button>
    </Form>
    </Container>
  )
  }