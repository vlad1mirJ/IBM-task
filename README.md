# IBM internship task

### This project is a part of an IBM JavaScript application developer interview process

## Task

Create a webpage using "Finnhub" APIs, to search and retrieve companies’ stock prices, and show them in the diagram, while logging user actions in the backend service.

## Main Technologies:

- React
- Styled Components
- Node.js
- Apexcharts (for stock price charts)

## Frontend

- The layout is responsive
- The page have an input field for company search by symbol/ticker
  - Search input have validation to allow only up to 35 characters including letters and spaces. All letters are turned into upper case to make sure that user will enter symbol/ticker correctly
  - Error message for invalid input field value appears in red above the input field
- The page have a date picker for stock prices history range.
  - Validation implemented so that user can't pick date earlier than a year ago _(due to API's nature. Free plan only allows to access data up to a year ago)_ and further than today
- Search results are added as tiles below with primary company profile data: name, country, currency, web URL. Because provided API returns only one result per request, companies are added one by one .
- Clicking the company name in the result list opens the stock price history for the selected date range

## Backend

- Created node.js server that logs information into the console when user clicks on company's name.

_In the provided task it was unclear what kind of actions should be logged when user interacts with company's name and stock price chart. An assumption was made that click is enough to demonstrate ability to log any kind of action. Another assumption was made that word console in this context means terminal and not a browser console._
