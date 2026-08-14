
import { useState } from 'react'
import { supabase } from '../supabase'


// Simple auth component for login/signup
export default function Auth() {
  const [email, setEmail] =
    useState('')

// 
  const [password, setPassword] =
    useState('')

// Toggle between login and signup
  const [isLogin, setIsLogin] =
    useState(true)

  // Handle login/signup  
  const handleAuth = async (e) => {
    e.preventDefault()

    if (isLogin) {
        // LOGIN
      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password
        })

      if (error) {
        alert(error.message)
      }
    } else {
      // SIGNUP
      const { error } =
        await supabase.auth.signUp({
          email,
          password
        })

      if (error) {
        alert(error.message)
      } else {
        alert(
          'Account created. Check email.'
        )
      }
    }
  }

  return (
    <div>

      <h2>
        {isLogin ? 'Login' : 'Sign Up'}
      </h2>

      <form onSubmit={handleAuth}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />
        <br />

        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          {isLogin
            ? 'Login'
            : 'Create Account'}
        </button>

      </form>

      <br />

      <button
        onClick={() =>
          setIsLogin(!isLogin)
        }
      >
        {isLogin
          ? 'Need an account?'
          : 'Already have an account?'}
      </button>

    </div>
  )
}
