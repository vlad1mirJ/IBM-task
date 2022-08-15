import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import moment from "moment"
import Chart from "react-apexcharts"
import { options } from "./data"

const Company = () => {
  const location = useLocation()
  const { info, dates } = location.state
  const dateFrom = moment(dates.dateFrom).unix()
  const dateTo = moment(dates.dateTo).unix()
  const [series, setSeries] = useState(null)

  // useEffect(() => {
  //   fetch("http://127.0.0.1:5000/click", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       companyName: info.name,
  //       dateFrom: dates.dateFrom,
  //       dateTo: dates.dateTo,
  //     }),
  //   })
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  // }, [])

  useEffect(() => {
    fetch(
      `https://finnhub.io/api/v1/stock/candle?symbol=${info.ticker}&resolution=D&from=${dateFrom}&to=${dateTo}&token=cbr51kaad3i32qd5t2dg`
    )
      .then(res => res.json())
      .then(d => {
        setSeries(prev =>
          d.t.flat(Infinity).map((time, index) => ({
            x: new Date(time * 1000),
            y: [d.o[index], d.h[index], d.l[index], d.c[index]],
          }))
        )
      })
  }, [info.ticker, dateFrom, dateTo])

  return (
    <Container>
      <div className="top">
        <Logo src={info.logo} alt="logo" />
        <h1>{info.ticker}</h1>
      </div>
      {series && (
        <Chart
          height={350}
          type="candlestick"
          series={[{ data: series }]}
          options={options}
        />
      )}
    </Container>
  )
}

export default Company

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  .top {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Logo = styled.img`
  max-width: 50px;
  margin-right: 0.8em;
`
