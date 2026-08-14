
import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import Calendar from './components/Calendar'
import AppointmentForm from './components/AppointmentForm'
import Auth from './components/Auth'

function App() {
  const [session, setSession] =
    useState(null)

  useEffect(() => {
    // Get current session
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session)
      })

    // Listen for auth changes
    const {
      data: authListener
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <div>
      {session ? (
      
      <div className="app-layout">

        <div className="sidebar">
          <AppointmentForm />
  </div>

      <div className="calendar-container">
        <Calendar />
  </div>

</div>


      ) : (
        <Auth />
      )}
    </div>
  )
}

export default App

