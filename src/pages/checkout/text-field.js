import React from 'react'
import t from 'prop-types'
import {
  Grid,
  TextField as MaterialTextField
} from '@mui/material'

function TextField ({ xs, autoFocus, ...props }) {
  return (
    <Grid item xs={xs}>
      <MaterialTextField
        fullWidth
        inputProps={{
          autoFocus
        }}
        {...props}
      />
    </Grid>
  )
}

TextField.propTypes = {
  autoFocus: t.bool,
  xs: t.number
}

export default TextField
