import moment from "moment"
import styled from "styled-components"
import { useState } from "react"

const SearchForm = ({ state, setState, setData, data }) => {
  const [error, setError] = useState(null)
  const handleSubmit = () => {
    fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${state.search}&token=cbr51kaad3i32qd5t2dg`
    )
      .then(response => response.json())
      .then(result => {
        if (!result.name) {
          setError("Nothing was found")
        } else if (data.length === 0) {
          setData(prev => [result, ...prev])
        } else {
          !data.some(el => el.ticker === result.ticker) &&
            setData(prev => [result, ...prev])
        }
      })
  }
  const isValidInput = input => {
    return /^[a-zA-Z\s]*$/.test(input)
  }
  return (
    <Container>
      <form
        onSubmit={e => {
          e.preventDefault()
          !error && handleSubmit()
        }}
      >
        {error && <div>{error}</div>}
        <Search
          aria-label="Search by ticker/symbol"
          type="text"
          id="cname"
          name="company name"
          placeholder="Search by ticker/symbol (e.g. AAPL, NFLX)"
          required
          maxLength="35"
          value={state.search}
          onChange={e => {
            if (e.target.value.length > 35) {
              setError("You can not use more than 35 symbols")
              setState(prev => ({
                ...prev,
                search: e.target.value.trim().toUpperCase(),
              }))
            } else if (!isValidInput(e.target.value)) {
              setError("You can use only letters ans spaces")
              setState(prev => ({
                ...prev,
                search: e.target.value.trim().toUpperCase(),
              }))
            } else {
              setError("")
              setState(prev => ({
                ...prev,
                search: e.target.value.trim().toUpperCase(),
              }))
            }
          }}
        />
        <input type="submit" />
        <div className="dates">
          <div>
            <label htmlFor="startDate">From</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              required
              min={moment().subtract(1, "years").format("YYYY-MM-DD")}
              max={moment().format("YYYY-MM-DD")}
              value={state.dateFrom}
              onChange={e =>
                setState(prev => ({ ...prev, dateFrom: e.target.value }))
              }
            />
          </div>
          <div>
            <label htmlFor="endDate">To</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              required
              min={
                state.dateFrom
                  ? state.dateFrom
                  : moment().subtract(1, "years").format("YYYY-MM-DD")
              }
              max={moment().format("YYYY-MM-DD")}
              value={state.dateTo}
              onChange={e =>
                setState(prev => ({ ...prev, dateTo: e.target.value }))
              }
            />
          </div>
        </div>
      </form>
    </Container>
  )
}

export default SearchForm

const Container = styled.div`
  margin: 0 auto;
  max-width: 1100px;
  padding: 15px;
  display: flex;
  justify-content: center;
  input {
    padding: 0.6em;
  }
  label {
    margin-right: 1em;
  }
  .dates {
    display: flex;
    justify-content: space-around;
    margin-top: 1em;
  }
`

const Search = styled.input`
  width: 400px;
  @media (max-width: 515px) {
    width: 300px;
  }
  @media (max-width: 415px) {
    width: 200px;
  }
`
