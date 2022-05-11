import styled from 'styled-components'
import { Grid } from '@mui/material'

const PizzasGrid = styled(Grid).attrs({
  container: true,
  spacing: 2
})`
  && {
    padding: ${({ theme }) => theme.spacing(3)};
  }
`

export default PizzasGrid
