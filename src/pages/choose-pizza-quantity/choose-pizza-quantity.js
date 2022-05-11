import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, Navigate, useLocation } from 'react-router-dom'
import {
  Button,
  Input as MaterialInput
} from '@mui/material'
import {
  Content,
  Footer,
  HeaderContent,
  H4
} from 'ui'
import { HOME, CHECKOUT } from 'routes'
import { useOrder } from 'hooks'

function ChoosePizzaQuantity () {
  const [quantity, setQuantity] = useState(1)
  const { addPizzaToOrder } = useOrder()

  const location = useLocation()

  if (!location.state) {
    return <Navigate to={HOME} />
  }

  function handleChange (e) {
    const { value } = e.target

    if (value >= 1) {
      setQuantity(value)
    }
  }

  function addPizza () {
    addPizzaToOrder({
      ...location.state,
      quantity
    })
  }

  return (
    <>
      <Content>
        <HeaderContent>
          <H4>
            Quantas pizzas você gostaria <br />
            de pedir, com esse sabores?
          </H4>
        </HeaderContent>

        <MainContent>
          <Input value={quantity} onChange={handleChange} autoFocus /> {/* eslint-disable-line */}

          <ButtonAddPizza to={HOME} onClick={addPizza}> {/* eslint-disable-line */}
            Adicionar e<br />
            montar outra
          </ButtonAddPizza>
        </MainContent>
      </Content>

      <Footer
        buttons={{
          back: {
            children: 'Mudar sabores'
          },

          action: {
            to: CHECKOUT,
            onClick: addPizza,
            children: 'Finalizar compra'
          }
        }}
      />
    </>
  )
}

const MainContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing(2)};
  `

const Input = styled(MaterialInput).attrs({
  type: 'number'
})`
  && {
    margin-bottom: ${({ theme }) => theme.spacing(3)}
  }

  & input {
    font-size: 80px;
    padding: 10px;
    text-align: center;
    width: 150px;
  }
`

const ButtonAddPizza = styled(Button).attrs({
  variant: 'contained',
  color: 'secondary',
  component: Link
})`
  && {
    text-align: center;
  }
`

export default ChoosePizzaQuantity
