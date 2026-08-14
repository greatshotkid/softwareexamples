import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { supabase } from '../supabase'

export default function Calendar() {
  // -----------------------------------
  // Appointments state
  // -----------------------------------

  const [appointments, setAppointments] =
    useState([])

  // -----------------------------------
  // Selected appointment for modal
  // -----------------------------------

  const [
    selectedAppointment,
    setSelectedAppointment
  ] = useState(null)

  // -----------------------------------
  // Edit mode
  // -----------------------------------

  const [isEditing, setIsEditing] =
    useState(false)

  // -----------------------------------
  // Edit form states
  // -----------------------------------

  const [editName, setEditName] =
    useState('')

  const [editPhone, setEditPhone] =
    useState('')

  const [editEmail, setEditEmail] =
    useState('')

  const [editNotes, setEditNotes] =
    useState('')

  // -----------------------------------
  // Logout
  // -----------------------------------

  const handleLogout = async () => {
    const { error } =
      await supabase.auth.signOut()

    if (error) {
      console.log(
        'Logout error:',
        error
      )

      alert('Logout failed')

      return
    }

    console.log('User logged out')
  }

  // -----------------------------------
  // Fetch appointments
  // -----------------------------------

  const fetchAppointments = async () => {
    // Get current logged-in user
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (userError) {
      console.log(
        'User error:',
        userError
      )

      return
    }

    if (!user) {
      console.log(
        'No logged-in user'
      )

      return
    }

    // Fetch ONLY this user's appointments
    const {
      data,
      error
    } = await supabase
      .from('appointments')
      .select('*')
      .eq(
        'user_id',
        user.id
      )
      .order(
        'appointment_start',
        {
          ascending: true
        }
      )

    if (error) {
      console.log(
        'Error fetching appointments:',
        error
      )

      return
    }

    setAppointments(
      data || []
    )
  }

  // -----------------------------------
  // Load appointments when component
  // mounts
  // -----------------------------------

  useEffect(() => {
    fetchAppointments()
  }, [])

  // -----------------------------------
  // Delete appointment
  // -----------------------------------

  const deleteAppointment = async () => {
    if (!selectedAppointment) {
      return
    }

    const confirmDelete =
      window.confirm(
        'Delete this appointment?'
      )

    if (!confirmDelete) {
      return
    }

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      alert(
        'You must be logged in'
      )

      return
    }

    const {
      error
    } = await supabase
      .from('appointments')
      .delete()
      .eq(
        'id',
        selectedAppointment.id
      )
      .eq(
        'user_id',
        user.id
      )

    if (error) {
      console.log(
        'Delete error:',
        error
      )

      alert(
        'Delete failed'
      )

      return
    }

    alert(
      'Appointment deleted'
    )

    setSelectedAppointment(
      null
    )

    setIsEditing(false)

    fetchAppointments()
  }

  // -----------------------------------
  // Start editing
  // -----------------------------------

  const startEditing = () => {
    if (!selectedAppointment) {
      return
    }

    setEditName(
      selectedAppointment.title || ''
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

  // -----------------------------------
  // Update appointment
  // -----------------------------------

  const updateAppointment = async () => {
    if (!selectedAppointment) {
      return
    }

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      alert(
        'You must be logged in'
      )

      return
    }

    const {
      error
    } = await supabase
      .from('appointments')
      .update({
        customer_name:
          editName,

        phone_number:
          editPhone,

        email:
          editEmail || null,

        notes:
          editNotes || null
      })
      .eq(
        'id',
        selectedAppointment.id
      )
      .eq(
        'user_id',
        user.id
      )

    if (error) {
      console.log(
        'Update error:',
        error
      )

      alert(
        'Update failed'
      )

      return
    }

    alert(
      'Appointment updated'
    )

    setIsEditing(false)

    setSelectedAppointment(
      null
    )

    fetchAppointments()
  }

  // -----------------------------------
  // Open appointment
  // -----------------------------------

  const handleAppointmentClick =
    async (info) => {
      const appointment =
        info.event.extendedProps

      let signedImageUrl = null

      // -----------------------------------
      // Create signed URL for private image
      // -----------------------------------

      if (appointment.image) {
        console.log(
          'Creating signed URL for:',
          appointment.image
        )

        const {
          data,
          error
        } = await supabase.storage
          .from('tattoo-images')
          .createSignedUrl(
            appointment.image,
            3600
          )

        if (error) {
          console.log(
            'Signed URL error:',
            error
          )
        } else {
          signedImageUrl =
            data?.signedUrl || null
        }
      }

      // -----------------------------------
      // Set selected appointment
      // -----------------------------------

      setSelectedAppointment({
        id:
          info.event.id,

        title:
          info.event.title,

        start:
          info.event.start,

        end:
          info.event.end,

        phone:
          appointment.phone,

        email:
          appointment.email,

        notes:
          appointment.notes,

        image:
          signedImageUrl,

        imagePath:
          appointment.image
      })

      setIsEditing(false)
    }

  return (
    <div>

      {/* -------------------------------- */}
      {/* Page heading */}
      {/* -------------------------------- */}

      <h1>
        Tattoo Appointments
      </h1>

      {/* -------------------------------- */}
      {/* Logout */}
      {/* -------------------------------- */}

      <button
        onClick={handleLogout}
      >
        Logout
      </button>

      <br />
      <br />

      {/* -------------------------------- */}
      {/* Calendar */}
      {/* -------------------------------- */}

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

        // --------------------------------
        // Convert database appointments
        // into calendar events
        // --------------------------------

        events={appointments.map(
          (appointment) => {

            // Appointment start
            const start =
              new Date(
                appointment.appointment_start
              )

            // Appointment end
            const end =
              new Date(start)

            // Duration
            const duration =
              Number(
                appointment.duration_minutes
              ) || 60

            // Add duration
            end.setMinutes(
              end.getMinutes() +
              duration
            )

            return {
              id:
                appointment.id,

              title:
                appointment.customer_name,

              start:
                start,

              end:
                end,

              extendedProps: {

                phone:
                  appointment.phone_number,

                email:
                  appointment.email,

                notes:
                  appointment.notes,

                // IMPORTANT:
                // This is now a STORAGE PATH,
                // not a public URL.
                image:
                  appointment.tattoo_image_url
              }
            }
          }
        )}

        // --------------------------------
        // Appointment click
        // --------------------------------

        eventClick={
          handleAppointmentClick
        }

      />

      {/* -------------------------------- */}
      {/* Appointment Modal */}
      {/* -------------------------------- */}

      {selectedAppointment && (

        <div className="modal-overlay">

          <div className="modal">

            {/* ========================== */}
            {/* EDIT MODE */}
            {/* ========================== */}

            {isEditing ? (

              <div>

                <h2>
                  Edit Appointment
                </h2>

                {/* Customer name */}

                <label>
                  Customer Name
                </label>

                <br />

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

                {/* Phone */}

                <label>
                  Phone Number
                </label>

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

                {/* Email */}

                <label>
                  Email
                </label>

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

                {/* Notes */}

                <label>
                  Tattoo Notes
                </label>

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

                {/* Save */}

                <button
                  onClick={
                    updateAppointment
                  }
                >
                  Save Changes
                </button>

                <br />
                <br />

                {/* Cancel */}

                <button
                  onClick={() =>
                    setIsEditing(false)
                  }
                >
                  Cancel
                </button>

              </div>

            ) : (

              /* ========================== */
              /* VIEW MODE */
              /* ========================== */

              <div>

                <h2>
                  {
                    selectedAppointment.title
                  }
                </h2>

                {/* Phone */}

                <p>
                  <strong>
                    Phone:
                  </strong>
                  {' '}
                  {
                    selectedAppointment.phone ||
                    'Not provided'
                  }
                </p>

                {/* Email */}

                <p>
                  <strong>
                    Email:
                  </strong>
                  {' '}
                  {
                    selectedAppointment.email ||
                    'Not provided'
                  }
                </p>

                {/* Start */}

                <p>
                  <strong>
                    Start:
                  </strong>
                  {' '}
                  {
                    selectedAppointment.start
                      ?.toLocaleString()
                  }
                </p>

                {/* End */}

                <p>
                  <strong>
                    End:
                  </strong>
                  {' '}
                  {
                    selectedAppointment.end
                      ?.toLocaleString()
                  }
                </p>

                {/* Notes */}

                <p>
                  <strong>
                    Notes:
                  </strong>
                  {' '}
                  {
                    selectedAppointment.notes ||
                    'No notes'
                  }
                </p>

                {/* ====================== */}
                {/* Tattoo Image */}
                {/* ====================== */}

                {selectedAppointment.image && (

                  <div>

                    <p>
                      <strong>
                        Tattoo Reference:
                      </strong>
                    </p>

                    <img
                      src={
                        selectedAppointment.image
                      }
                      alt="Tattoo Reference"
                      className="tattoo-reference-image"
                    />

                  </div>

                )}

                <br />

                {/* ====================== */}
                {/* Edit */}
                {/* ====================== */}

                <button
                  onClick={
                    startEditing
                  }
                >
                  Edit Appointment
                </button>

                <br />
                <br />

                {/* ====================== */}
                {/* Delete */}
                {/* ====================== */}

                <button
                  onClick={
                    deleteAppointment
                  }
                >
                  Delete Appointment
                </button>

                <br />
                <br />

                {/* ====================== */}
                {/* Close */}
                {/* ====================== */}

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
