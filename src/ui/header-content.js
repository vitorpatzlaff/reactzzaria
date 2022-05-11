import React from 'react'
import t from 'prop-types'
import { Grid } from '@mui/material'

const HeaderContent = ({ children }) => (
  <Grid container direction='column' alignItems='center'>
    {children}
  </Grid>
)

HeaderContent.propTypes = {
  children: t.node.isRequired
}

export default HeaderContent
