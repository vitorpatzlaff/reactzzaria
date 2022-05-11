import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { CardActionArea } from '@mui/material'

const CardLink = styled(CardActionArea).attrs({
  component: Link
})`
  && {
    align-items: center;
    display: flex;
    flex-direction: column;
    min-width: 250px;
    padding: ${({ theme }) => theme.spacing(3, 0)};
  }

  @media screen and (max-width: 380px) {
    && {
      min-width: 200px;
    }
  }
`

export default CardLink
