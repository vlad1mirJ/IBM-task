import React from "react"
import CompanyTile from "./CompanyTile"
import hardData from "../data"
import styled from "styled-components"

const Hero = () => {
  return (
    <Container>
      {hardData.map(d => (
        <CompanyTile key={d.ticker} info={d} />
      ))}
    </Container>
  )
}

export default Hero

const Container = styled.div`
  margin: 0 auto;
  max-width: 1100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;
  padding: 15px;
`
