import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import {
  CssBaseline,
  createTheme,
  ThemeProvider as MuiThemeProvider
} from '@mui/material'
import { AuthProvider, OrderProvider } from 'contexts'
import App from './app'

const theme = createTheme({
  typography: {
    useNextVariants: true
  }
})

function Root () {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <OrderProvider>
            <CssBaseline />
            <GlobalStyle />

            <BrowserRouter>
              <Routes>
                <Route path='*' element={<App />} />
              </Routes>
            </BrowserRouter>
          </OrderProvider>
        </AuthProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  )
}

const GlobalStyle = createGlobalStyle`
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`

export default Root
