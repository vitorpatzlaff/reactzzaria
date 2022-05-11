import React from 'react'
import styled from 'styled-components'
import { Routes, Route } from 'react-router-dom'
import {
  AppBar,
  Toolbar as MaterialToolbar
} from '@mui/material'
import HeaderCommon from './header-common'
import HeaderCheckout from './header-checkout'
import { CHECKOUT } from 'routes'

const Header = () => (
  <AppBar>
    <Toolbar>
      <Routes>
        <Route path='*' element={<HeaderCommon />} />
        <Route path={CHECKOUT + '/*'} element={<HeaderCheckout />} />
      </Routes>
    </Toolbar>
  </AppBar>
)

const Toolbar = styled(MaterialToolbar)`
  && {
    margin: 0 auto;
    max-width: ${({ theme }) => theme.breakpoints.values.xl}px;
    width: 100%;
  }
`

export default Header
