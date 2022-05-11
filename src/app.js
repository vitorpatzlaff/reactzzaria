import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { LinearProgress } from '@mui/material'
import { auth, onAuthStateChanged } from 'services/firebase'
import { useAuth } from 'hooks'
import { HOME, LOGIN } from 'routes'

const MainPage = lazy(() => import('pages/main'))
const Login = lazy(() => import('pages/login'))

function App () {
  const { userInfo, setUserInfo } = useAuth()
  const [didCheckUserIn, setDidCheckUserIn] = useState(false)

  const { isUserLoggedIn } = userInfo

  const location = useLocation()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user)
      setUserInfo({
        isUserLoggedIn: !!user,
        user: user && {
          ...user,
          firstName: user.displayName ? user.displayName.split(' ')[0] : user.reloadUserInfo.screenName
        }
      })
      setDidCheckUserIn(true)
    })
  }, [setUserInfo])

  if (!didCheckUserIn) {
    return <LinearProgress />
  }

  if (isUserLoggedIn && location.pathname === '/login') {
    return <Navigate to={HOME} replace />
  }

  if (!isUserLoggedIn && location.pathname !== '/login') {
    return <Navigate to={LOGIN} replace />
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes>
        <Route path='*' element={<MainPage />} />
        <Route path={LOGIN} element={<Login />} />
      </Routes>
    </Suspense>
  )
}

export default App
