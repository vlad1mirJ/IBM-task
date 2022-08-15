import React from "react"
import styled from "styled-components"
import moment from "moment"
import { Link } from "react-router-dom"

const CompanyTile = ({ info, dateFrom, dateTo }) => {
  const dates = {
    dateFrom: dateFrom || moment().subtract(1, "months").format("YYYY-MM-DD"),
    dateTo: dateTo || moment().format("YYYY-MM-DD"),
  }
  const handleClick = () => {
    fetch("http://127.0.0.1:5000/click", {
      method: "POST",
      body: JSON.stringify({
        companyName: info.name,
        dateFrom: dates.dateFrom,
        dateTo: dates.dateTo,
      }),
    })
  }
  return (
    <Conatiner className="profile">
      <Link
        to={`/${info.ticker}`}
        state={{ info, dates }}
        onClick={() => handleClick()}
      >
        <Logo src={info.logo} alt="logo" />
        <div className="companyName">
          {info.name} | {info.country}
        </div>
      </Link>
      <div className="currency">Currency: {info.currency}</div>
      <div className="webUrl">
        <a href={info.weburl} target="_blank" rel="noreferrer">
          {info.weburl}
        </a>
      </div>
    </Conatiner>
  )
}

export default CompanyTile

const Conatiner = styled.div`
  width: 15.625em;
  height: 8.0625em;
  border: 1px solid black;
  padding: 2em;
  border-radius: 7px;
  font-size: 1rem;
  .companyName {
    cursor: pointer;
    font-weight: 600;
  }
  .webUrl {
    text-decoration: underline;
    cursor: pointer;
  }
`

const Logo = styled.img`
  width: 50px;
`
