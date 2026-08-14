
import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { supabase } from '../supabase'

export default function Calendar() {
  // Appointments state
  const [appointments, setAppointments] =
    useState([])

  // Selected appointment for modal
  const [
    selectedAppointment,
    setSelectedAppointment
  ] = useState(null)

  // Edit mode
  const [isEditing, setIsEditing] =
    useState(false)

  // Edit form states
  const [editName, setEditName] =
    useState('')

  const [editPhone, setEditPhone] =
    useState('')

  const [editEmail, setEditEmail] =
    useState('')

  const [editNotes, setEditNotes] =
    useState('')

  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  // Fetch appointments
  const fetchAppointments = async () => {
    // Get current user
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) return

    // Fetch ONLY current user's appointments
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('user_id', user.id)

    if (error) {
      console.log(
        'Error fetching appointments:',
        error
      )
      return
    }

    setAppointments(data)
  }

  // Load appointments on mount
  useEffect(() => {
    fetchAppointments()
  }, [])

  // Delete appointment
  const deleteAppointment = async () => {
    const confirmDelete = window.confirm(
      'Delete this appointment?'
    )

    if (!confirmDelete) return

    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', selectedAppointment.id)

    if (error) {
      console.log(error)

      alert('Delete failed')

      return
    }

    alert('Appointment deleted')

    setSelectedAppointment(null)

    fetchAppointments()
  }

  // Start editing
  const startEditing = () => {
    setEditName(
      selectedAppointment.title
    )

    setEditPhone(
      selectedAppointment.phone || ''
    )

    setEditEmail(
      selectedAppointment.email || ''
    )

    setEditNotes(
      selectedAppointment.notes || ''
    )

    setIsEditing(true)
  }

  // Update appointment
  const updateAppointment = async () => {
    const { error } = await supabase
      .from('appointments')
      .update({
        customer_name: editName,

        phone_number: editPhone,

        email: editEmail,

        notes: editNotes
      })
      .eq('id', selectedAppointment.id)

    if (error) {
      console.log(error)

      alert('Update failed')

      return
    }

    alert('Appointment updated')

    setIsEditing(false)

    setSelectedAppointment(null)

    fetchAppointments()
  }

  return (
    <div>
      <h1>
        Tattoo Appointments
      </h1>

      <button onClick={handleLogout}>
        Logout
      </button>

      <br />
      <br />

      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin
        ]}

        initialView="timeGridWeek"

        height="90vh"

        selectable={true}

        nowIndicator={true}

        slotMinTime="08:00:00"

        slotMaxTime="22:00:00"

        // Convert DB appointments
        // into calendar events
        events={appointments.map(
          (appointment) => {
            // Start date
            const start = new Date(
              appointment.appointment_start
            )

            // End date
            const end = new Date(start)

            // Duration
            const duration =
              Number(
                appointment.duration_minutes
              ) || 60

            // Add duration
            end.setMinutes(
              end.getMinutes() + duration
            )

            // Return event
            return {
              id: appointment.id,

              title:
                appointment.customer_name,

              start: start,

              end: end,

              extendedProps: {
                phone:
                  appointment.phone_number,

                email:
                  appointment.email,

                notes:
                  appointment.notes,

                image:
                  appointment
                    .tattoo_image_url
              }
            }
          }
        )}

        // Appointment click
        eventClick={(info) => {
          setSelectedAppointment({
            id: info.event.id,

            title: info.event.title,

            start: info.event.start,

            end: info.event.end,

            ...info.event.extendedProps
          })
        }}
      />

      {/* Modal */}
      {selectedAppointment && (
        <div className="modal-overlay">
          <div className="modal">

            {isEditing ? (
              <div>

                <h2>
                  Edit Appointment
                </h2>

                <input
                  type="text"
                  value={editName}
                  onChange={(e) =>
                    setEditName(
                      e.target.value
                    )
                  }
                />

                <br />
                <br />

                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) =>
                    setEditPhone(
                      e.target.value
                    )
                  }
                />

                <br />
                <br />

                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) =>
                    setEditEmail(
                      e.target.value
                    )
                  }
                />

                <br />
                <br />

                <textarea
                  value={editNotes}
                  onChange={(e) =>
                    setEditNotes(
                      e.target.value
                    )
                  }
                />

                <br />
                <br />

                <button
                  onClick={
                    updateAppointment
                  }
                >
                  Save Changes
                </button>

                <br />
                <br />

                <button
                  onClick={() =>
                    setIsEditing(false)
                  }
                >
                  Cancel
                </button>

              </div>
            ) : (
              <div>

                <h2>
                  {selectedAppointment.title}
                </h2>

                <p>
                  <strong>Phone:</strong>
                  {' '}
                  {
                    selectedAppointment.phone
                  }
                </p>

                <p>
                  <strong>Email:</strong>
                  {' '}
                  {
                    selectedAppointment.email
                  }
                </p>

                <p>
                  <strong>Start:</strong>
                  {' '}
                  {selectedAppointment.start.toLocaleString()}
                </p>

                <p>
                  <strong>End:</strong>
                  {' '}
                  {selectedAppointment.end.toLocaleString()}
                </p>

                <p>
                  <strong>Notes:</strong>
                  {' '}
                  {
                    selectedAppointment.notes
                  }
                </p>

                {selectedAppointment.image && (
                  <img
                    src={selectedAppointment.image}
                    alt="Tattoo Reference"
                    className="tattoo-reference-image"
                  />
                )}

                <br />
                <br />

                <button
                  onClick={startEditing}
                >
                  Edit Appointment
                </button>

                <br />
                <br />

                <button
                  onClick={
                    deleteAppointment
                  }
                >
                  Delete Appointment
                </button>

                <br />
                <br />

                <button
                  onClick={() => {
                    setSelectedAppointment(
                      null
                    )

                    setIsEditing(false)
                  }}
                >
                  Close
                </button>

              </div>
            )}

          </div>
        </div>
      )}
    </div>
  )
}

