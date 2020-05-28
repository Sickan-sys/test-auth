import React from 'react'
import { Container} from '../components/Container'
import { H1 } from '../components/TextStyles'
import { StyledLink } from '../components/StyledLink'

export const Welcome = () => {
  return (
    <Container>
      <H1>Welcome to the Biggest Secret Ever!</H1>
      <StyledLink to='/signup'>To Sign Up</StyledLink> 
      <StyledLink to='/login'>To Login</StyledLink>
    </Container>
  )
}

