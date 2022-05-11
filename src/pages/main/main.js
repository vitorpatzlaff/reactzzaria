import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { withStyles } from '@mui/styles'
import Header from './header'
import * as routes from 'routes'
import { LinearProgress } from '@mui/material'

const ChoosePizzaSize = React.lazy(
  () => import('pages/choose-pizza-size')
)
const ChoosePizzaFlavours = React.lazy(
  () => import('pages/choose-pizza-flavours')
)

const ChoosePizzaQuantity = React.lazy(
  () => import('pages/choose-pizza-quantity')
)

const Checkout = React.lazy(
  () => import('pages/checkout')
)

const CheckoutConfirmation = React.lazy(
  () => import('pages/checkout-confirmation')
)

const CheckoutSuccess = React.lazy(
  () => import('pages/checkout-success')
)

const Main = () => (
  <>
    <Header />

    <Spacer />

    <Suspense fallback={<LinearProgress />}>
      <Routes>
        <Route path={routes.HOME} element={<ChoosePizzaSize />} />
        <Route path={routes.CHOOSE_PIZZA_FLAVOURS} element={<ChoosePizzaFlavours />} />
        <Route path={routes.CHOOSE_PIZZA_QUANTITY} element={<ChoosePizzaQuantity />} />
        <Route path={routes.CHECKOUT} element={<Checkout />} />
        <Route path={routes.CHECKOUT_CONFIRMATION} element={<CheckoutConfirmation />} />
        <Route path={routes.CHECKOUT_SUCCESS} element={<CheckoutSuccess />} />
      </Routes>
    </Suspense>
  </>
)

const style = (theme) => ({
  main: theme.mixins.toolbar
})

const Spacer = withStyles(style)(({ classes }) => (
  <div className={classes.main} />
))

export default Main
