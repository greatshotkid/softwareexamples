
import { useState } from 'react'
import { supabase } from '../supabase'

export default function AppointmentForm() {
  const [customerName, setCustomerName] =
    useState('')

  const [phoneNumber, setPhoneNumber] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [appointmentStart,
    setAppointmentStart] =
    useState('')

  const [duration, setDuration] =
    useState('60')

  const [notes, setNotes] =
    useState('')

  const [image, setImage] =
    useState(null)

  const [loading, setLoading] =
    useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      let imageUrl = null

      // Upload image if selected
      if (image) {
        const fileExt =
          image.name.split('.').pop()

        const fileName =
          `${Date.now()}.${fileExt}`

        const filePath =
          `tattoos/${fileName}`

        const { error: uploadError } =
          await supabase.storage
            .from('tattoo-images')
            .upload(filePath, image)

        if (uploadError) {
          console.log(
            'Image upload error:',
            uploadError
          )

          alert('Image upload failed')

          setLoading(false)

          return
        }

        // Get public URL
        const {
          data: publicUrlData
        } = supabase.storage
          .from('tattoo-images')
          .getPublicUrl(filePath)

        imageUrl =
          publicUrlData.publicUrl
      }

      // Get logged in user
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) {
        alert('You must be logged in')

        setLoading(false)

        return
      }

      // Save appointment to database
      const { error } = await supabase
        .from('appointments')
        .insert([
          {
            customer_name:
              customerName,

            phone_number:
              phoneNumber,

            email: email,

            appointment_start:
              appointmentStart,

            duration_minutes:
              Number(duration),

            notes: notes,

            tattoo_image_url:
              imageUrl,

            user_id: user.id
          }
        ])

      if (error) {
        console.log(
          'Database error:',
          error
        )

        alert(
          'Failed to save appointment'
        )

        setLoading(false)

        return
      }

      alert('Appointment saved')

      // Reset form
      setCustomerName('')
      setPhoneNumber('')
      setEmail('')
      setAppointmentStart('')
      setDuration('60')
      setNotes('')
      setImage(null)

    } catch (error) {
      console.log(error)

      alert('Something went wrong')
    }

    setLoading(false)
  }

  return (
    <div>
      <h2>
        Add Appointment
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) =>
            setCustomerName(
              e.target.value
            )
          }
          required
        />

        <br />
        <br />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) =>
            setPhoneNumber(
              e.target.value
            )
          }
          required
        />

        <br />
        <br />

        <input
          type="email"
          placeholder="Email (Optional)"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <label>
          Appointment Start
        </label>

        <br />

        <input
          type="datetime-local"
          value={appointmentStart}
          onChange={(e) =>
            setAppointmentStart(
              e.target.value
            )
          }
          required
        />

        <br />
        <br />

        <label>
          Duration (Minutes)
        </label>

        <br />

        <input
          type="number"
          value={duration}
          onChange={(e) =>
            setDuration(
              e.target.value
            )
          }
          min="15"
          step="15"
          required
        />

        <br />
        <br />

        <textarea
          placeholder="Tattoo Notes"
          value={notes}
          onChange={(e) =>
            setNotes(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <label>
          Tattoo Reference Image
        </label>

        <br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(
              e.target.files[0]
            )
          }
        />

        <br />
        <br />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? 'Saving...'
            : 'Save Appointment'}
        </button>

      </form>
    </div>
  )
}

