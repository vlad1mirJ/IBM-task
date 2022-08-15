import "./App.css"
import { useState } from "react"
import SearchForm from "./components/SearchForm"
import CompanyTile from "./components/CompanyTile"
import Hero from "./components/Hero"
import styled from "styled-components"
import moment from "moment"
import { nanoid } from "nanoid"

function App() {
  const [data, setData] = useState([])
  const [formState, setFormState] = useState({
    search: "",
    dateFrom: moment().subtract(1, "months").format("YYYY-MM-DD"),
    dateTo: moment().format("YYYY-MM-DD"),
  })
  const subtitle = data.length === 0 ? "Popular companies" : "Search results"

  return (
    <div className="App">
      <Container>
        <SearchForm
          state={formState}
          setState={setFormState}
          setData={setData}
          data={data}
        />
        <h2>{subtitle}</h2>

        {data.length === 0 ? (
          <Hero />
        ) : (
          <Result>
            {data.map(info => (
              <CompanyTile
                key={nanoid()}
                info={info}
                dateFrom={formState.dateFrom}
                dateTo={formState.dateTo}
              />
            ))}
          </Result>
        )}
      </Container>
    </div>
  )
}

export default App

const Container = styled.div`
  text-align: center;
`

const Result = styled.div`
  margin: 0 auto;
  max-width: 1100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;
  padding: 15px;
`
