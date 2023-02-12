import React, { useRef } from 'react'
import Home from './Home'

function Login() {
  const username = useRef()
  const password = useRef()
  const getUsername = sessionStorage.getItem('usernameData')
  const getPassword = sessionStorage.getItem('passwordData')
  const handleSubmit = () => {
    if (username.current.value === 'biba' && password.current.value === 'biba') {
      sessionStorage.setItem('usernameData', 'biba')
      sessionStorage.setItem('passwordData', 'biba')
    } else if (
      username.current.value === 'boba' &&
      password.current.value === 'boba'
    ) {
      sessionStorage.setItem('usernameData', 'boba')
      sessionStorage.setItem('passwordData', 'boba')
    } else if (username.current.value === 'lupa' && password.current.value === 'lupa') {
      sessionStorage.setItem('usernameData', 'lupa')
      sessionStorage.setItem('passwordData', 'lupa')
    } else if (
      username.current.value === 'pupa' &&
      password.current.value === 'pupa'
    ) {
      sessionStorage.setItem('usernameData', 'pupa')
      sessionStorage.setItem('passwordData', 'pupa')
    }
  }

  // console.log(sessionStorage.usernameData, sessionStorage.passwordData)

  return (
    <div className="text-center">
      {getUsername && getPassword ? (
        <>
          <h3 className="display-5 fw-bold m-3">{`Welcome here, ${sessionStorage.usernameData}!`}</h3>
          <Home />
        </>
      ) : (
        <>
          <div>
            <h3 className="display-5 fw-bold m-3">Welcome to Singles Chat</h3>
            <h4 className="display-6  m-3">
              *put your username and password here*
            </h4>
          </div>
          <main className="form-signin w-50 m-auto">
            <form action="" className="form" onSubmit={handleSubmit}>
              <div className="form-floating">
                <input
                  ref={username}
                  className="form-control mb-2"
                  type="text"
                  placeholder="Name"
                />
                <label>UserName</label>
              </div>
              <div className="form-floating">
                <input
                  ref={password}
                  className="form-control mb-2"
                  type="password"
                  placeholder="Password"
                />
                <label>Password</label>
              </div>
              <button
                className="w-100 btn btn-lg btn-info mt-2"
                type="submit"
              >
                GO
              </button>
              <p className="mt-2 mb-3 text-muted">©2023</p>
            </form>
          </main>
        </>
      )}
    </div>
  )
}

export default Login
