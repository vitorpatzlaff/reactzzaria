import React from 'react'
import styled from 'styled-components'
import { Typography } from '@mui/material'

const Title = styled(Typography).attrs({
  gutterBottom: true,
  align: 'center'
})``

export const H3 = (props) => <Title variant='h3' {...props} />
export const H4 = (props) => <Title variant='h4' {...props} />
export const H6 = (props) => <Typography variant='h6' {...props} />

export default Title
