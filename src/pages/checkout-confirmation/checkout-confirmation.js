import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
  Button,
  Container,
  Divider as MaterialDivider,
  Paper,
  Typography
} from '@mui/material'
import {
  Content,
  H4,
  H6,
  OrderInfo
} from 'ui'
import FooterCheckout from 'pages/checkout/footer-checkout'
import { useAuth, useOrder } from 'hooks'
import { CHECKOUT_SUCCESS } from 'routes'

function CheckoutConfirmation () {
  const { userInfo } = useAuth()
  const { order, sendOrder } = useOrder()

  const { address, number, complement, district, code, city, state } = order.address

  return (
    <>
      <Content>
        <Header>
          <H4>Oi {userInfo.user.firstName}!</H4>

          <Typography>
            Confira se está tudo certo com seu pedido
          </Typography>
        </Header>

        <Container maxWidth='sm'>
          <PaperContainer>
            <H6>Seu pedido:</H6>
            <OrderInfo />

            <Divider />

            <H6>Endereço para entrega:</H6>
            <Typography>
              {address},
              {' Nº'} {number}
              {complement && ', ' + complement}<br />
              Bairro: {district}<br />
              {code && 'CEP: ' + code}{code && <br />}
              {city}/{state}
            </Typography>

            <Divider />

            <H6>Telefone para contato:</H6>
            <Typography>
              {order.phone}
            </Typography>
          </PaperContainer>
        </Container>
      </Content>

      <FooterCheckout justifyContent='center'>
        <Button
          variant='contained'
          size='large'
          component={Link}
          to={CHECKOUT_SUCCESS}
          onClick={sendOrder}
        >
          Tudo certo!
        </Button>
      </FooterCheckout>
    </>
  )
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  text-align: center;
`

const PaperContainer = styled(Paper)`
  && {
    padding: ${({ theme }) => theme.spacing(3)};
  }
`

const Divider = styled(MaterialDivider)`
  && {
    margin: ${({ theme }) => theme.spacing(3, 0)}
  }
`

export default CheckoutConfirmation
