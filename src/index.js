import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './root'
import reportWebVitals from './reportWebVitals'

import ErrorBoundary from './error'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
  <ErrorBoundary>
    {(hasError) => (
      <Root hasError={hasError} />
    )}
  </ErrorBoundary>
)

reportWebVitals()
