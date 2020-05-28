import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container } from 'components/Container'
import { H1, P } from 'components/TextStyles'


const nasaApi = 'https://api.nasa.gov/planetary/apod?api_key=08iR4WWfCjNzN30nufKyaR5LGHFjgXgynks7MDcF'


const URL_SECRET = 'http://localhost:8080/secret'

export const Secret = () => {
  const [nasa, setNasa] = useState([])

  useEffect(() => {
    fetch(nasaApi)
      .then((res) => res.json())
      .then((json) => setNasa(json))
  }, [])

  return (
    <Container>
      <H1>{nasa.title}</H1>
      <Image src={nasa.url} />
      <P>{nasa.explanation}</P>
    </Container>
  )
}

const Image = styled.img`
  width: 100%;
  height: auto;
  `
