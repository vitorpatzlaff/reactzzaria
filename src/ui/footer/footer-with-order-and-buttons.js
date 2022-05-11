import React from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Button as MaterialButton,
  Grid,
  Typography
} from '@mui/material'
import { useAuth } from 'hooks'
import { singularOrPlural } from 'utils'

function FooterWithOrderAndButtons ({ buttons }) {
  const { userInfo } = useAuth()

  const location = useLocation()
  const navigate = useNavigate()

  const { pizzaSize, pizzaFlavours } = location.state
  const { flavours, name, slices } = pizzaSize

  return (
    <Grid container>
      <OrderContainer>
        <Typography>
          <b>{userInfo.user.firstName}, seu pedido é:</b>
        </Typography>

        <Typography>
          Pizza <b>{name.toUpperCase()}</b> {'- '}
          ({slices} {singularOrPlural(slices, 'fatia', 'fatias')}, {' '}
          {flavours} {singularOrPlural(flavours, 'sabor', 'sabores')})
        </Typography>

        {pizzaFlavours && (
          <Typography>
            {singularOrPlural(pizzaFlavours.length, 'no sabor', 'nos sabores')} {' '}
            <b>{pizzaFlavours.map(({ name }) => name).join(', ')}</b>
          </Typography>
        )}
      </OrderContainer>

      <ButtonsContainer>
        <Button
          variant='outlined'
          {...buttons.back}
          component='a'
          onClick={(e) => {
            e.preventDefault()
            navigate(-1)
          }}
        />

        <Button
          variant='contained'
          {...buttons.action}
          component={Link}
        />
      </ButtonsContainer>
    </Grid>
  )
}

FooterWithOrderAndButtons.propTypes = {
  buttons: t.object.isRequired
}

const OrderContainer = styled(Grid).attrs({
  item: true
})`
  && {
    flex-grow: 1;
  }
`

const ButtonsContainer = styled(Grid).attrs({
  item: true
})`
  && {
    align-items: center;
    display: flex;
  }
`

const Button = styled(MaterialButton)`
  && {
    margin-left: ${({ theme }) => theme.spacing(2)};
    text-align: center;
  }
`

export default FooterWithOrderAndButtons
