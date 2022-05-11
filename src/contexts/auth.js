import React, { useState, createContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import { auth, provider, signInWithRedirect, signOut } from 'services/firebase'

const AuthContext = createContext()

function AuthProvider ({ children }) {
  const login = useCallback(() => {
    signInWithRedirect(auth, provider)
  }, [])

  const logout = useCallback(() => {
    signOut(auth).then(() => {
      setUserInfo({
        isUserLoggedIn: false,
        user: null
      })
    })
  }, [])

  const [userInfo, setUserInfo] = useState({
    isUserLoggedIn: false,
    user: null
  })

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      userInfo,
      setUserInfo
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export { AuthProvider, AuthContext }
