import styled from 'styled-components'
import { Divider as MaterialDivider } from '@mui/material'

const Divider = styled(MaterialDivider)`
  && {
  margin: ${({ theme }) => theme.spacing(3, 0)};
  width: 100%;
}
`

export default Divider
