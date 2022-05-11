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
import { useAuth, useOrder } from 'hooks'
import FooterCheckout from 'pages/checkout/footer-checkout'
import { HOME } from 'routes'

function CheckoutSuccess () {
  const { userInfo } = useAuth()
  const { order } = useOrder()

  const { address, number, complement, district, code, city, state } = order.address

  return (
    <>
      <Content>
        <Header>
          <H4>Prontinho, {userInfo.user.firstName}!</H4>

          <Typography>
            Seu pedido será entregue no endereço abaixo em até
          </Typography>

          <H6>
            40 minutos =)
          </H6>
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
          variant='outlined'
          size='large'
          color='secondary'
          component={Link}
          to={HOME}
        >
          Voltar para a Página Inicial
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

export default CheckoutSuccess
