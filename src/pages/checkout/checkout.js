import React from 'react'
import styled from 'styled-components'
import { Link, Navigate } from 'react-router-dom'
import {
  Button,
  Grid,
  Paper
} from '@mui/material'
import {
  Content,
  OrderInfo,
  Title as UiTitle
} from 'ui'
import { CHECKOUT_CONFIRMATION, HOME } from 'routes'
import FormAddress from './form-address'
import PhoneField from './phone-field'
import FooterCheckout from 'pages/checkout/footer-checkout'
import { useOrder } from 'hooks'

function Checkout () {
  const { order, addPhone, addAddress } = useOrder()

  if (!order.pizzas.length) {
    return <Navigate to={HOME} replace />
  }

  return (
    <>
      <Content>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Title>Qual o endereço para entrega?</Title>
            <PaperContainer>
              <FormAddress onUpdate={addAddress} />
            </PaperContainer>

            <Title>Qual o seu telefone?</Title>
            <PaperContainer>
              <PhoneField onUpdate={addPhone} />
            </PaperContainer>
          </Grid>

          <Grid container item xs={12} md={6} direction='column'>
            <Title>Informações do seu pedido:</Title>
            <PaperContainer>
              <OrderInfo showOptions />
            </PaperContainer>
          </Grid>
        </Grid>
      </Content>

      <FooterCheckout>
        <Button
          variant='contained'
          component={Link}
          to={CHECKOUT_CONFIRMATION}
        >
          Confirmar pedido
        </Button>
      </FooterCheckout>
    </>
  )
}

const Title = styled(UiTitle).attrs({
  variant: 'h6'
})`
  && {
    text-align: left;
  }
`

const PaperContainer = styled(Paper)`
  && {
    flex-grow: 1;
    margin-bottom: ${({ theme }) => theme.spacing(5)};
    padding: ${({ theme }) => theme.spacing(2)};
  }
`

export default Checkout
