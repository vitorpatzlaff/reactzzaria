import React, { useState, useEffect, useReducer, useRef } from 'react'
import t from 'prop-types'
import {
  CircularProgress,
  Grid
} from '@mui/material'
import TextField from './text-field'

function FormAddress ({ onUpdate = () => {} }) {
  const [cep, setCep] = useState('')
  const [fetchingCep, setFetchingCep] = useState(false)
  const [addressState, dispatch] = useReducer(reducer, initialState)
  const numberField = useRef(null)
  const addressField = useRef(null)

  useEffect(() => {
    onUpdate(addressState)
  }, [addressState, onUpdate])

  useEffect(() => {
    async function fecthAddress () {
      if (cep.length < 9) {
        return
      }

      console.log('buscar cep:', cep)

      setFetchingCep(true)
      const data = await fetch(`https://ws.apicep.com/cep/${cep}.json`)
      setFetchingCep(false)

      if (!data.ok) {
        dispatch({ type: 'RESET' })
        addressField.current.focus()
        return
      }

      const result = await data.json()
      console.log('result:', result)

      if (!result.ok) {
        dispatch({
          type: 'FAIL',
          payload: {
            error: result.message
          }
        })
        return
      }

      dispatch({
        type: 'UPDATE_FULL_ADDRESS',
        payload: result
      })

      numberField.current.focus()
    }

    fecthAddress()
  }, [cep])

  function handleChangeCep (e) {
    setCep(cepMask(e.target.value))
  }

  function cepMask (value) {
    return value
      .replace(/\D+/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1')
  }

  function handleChangeField (e) {
    const { name, value } = e.target

    dispatch({
      type: 'UPDATE_FIELD',
      payload: { name, value }
    })
  }

  return (
    <Grid container spacing={2} alignItems='center'>
      <TextField
        label='CEP'
        xs={4}
        autoFocus
        value={cep}
        onChange={handleChangeCep} // eslint-disable-line
        error={!!addressState.error}
      />
      <Grid item xs={8}>
        {fetchingCep && <CircularProgress size={24} />}
      </Grid>

      {[
        {
          label: 'Rua',
          xs: 9,
          name: 'address',
          inputRef: addressField
        },

        {
          label: 'Número',
          xs: 3,
          name: 'number',
          inputRef: numberField
        },

        {
          label: 'Complemento',
          xs: 6,
          name: 'complement'
        },

        {
          label: 'Bairro',
          xs: 6,
          name: 'district'
        },

        {
          label: 'Cidade',
          xs: 9,
          name: 'city'
        },

        {
          label: 'Estado',
          xs: 3,
          name: 'state'
        }
      ].map((field) => (
        <TextField
          {...field}
          key={field.name}
          value={addressState[field.name]}
          onChange={handleChangeField} // eslint-disable-line
          disabled={fetchingCep}
        />
      ))}

    </Grid>
  )
}

FormAddress.propTypes = {
  onUpdate: t.func
}

function reducer (state, action) {
  console.log('action:', action)

  switch (action.type) {
    case 'UPDATE_FULL_ADDRESS':
      return {
        ...state,
        ...action.payload,
        error: null
      }

    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }

    case 'FAIL':
      return {
        ...initialState,
        error: action.payload.error
      }

    case 'RESET':
      return initialState

    default:
      return state
  }
}

const initialState = {
  code: '',
  address: '',
  number: '',
  district: '',
  complement: '',
  city: '',
  state: '',
  error: null
}

export default FormAddress
