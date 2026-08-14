import { useState } from 'react'
import { supabase } from '../supabase'

export default function AppointmentForm() {
  const [customerName, setCustomerName] =
    useState('')

  const [phoneNumber, setPhoneNumber] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [appointmentStart, setAppointmentStart] =
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
      // -----------------------------------
      // 1. Get logged-in user
      // -----------------------------------

      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser()

      if (userError) {
        console.log(
          'User authentication error:',
          userError
        )

        alert(
          'Unable to verify your account'
        )

        setLoading(false)

        return
      }

      if (!user) {
        alert(
          'You must be logged in to create an appointment'
        )

        setLoading(false)

        return
      }

      console.log(
        'Logged-in user:',
        user.id
      )

      // -----------------------------------
      // 2. Upload image if selected
      // -----------------------------------

      let imagePath = null

      if (image) {
        const fileExt =
          image.name
            .split('.')
            .pop()
            .toLowerCase()

        // Create a unique filename
        const fileName =
          `${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}.${fileExt}`

        // -----------------------------------
        // IMPORTANT:
        // Store the image inside the
        // logged-in user's own folder.
        // -----------------------------------

        const filePath =
          `${user.id}/${fileName}`

        console.log(
          'Uploading image to:',
          filePath
        )

        const {
          error: uploadError
        } = await supabase.storage
          .from('tattoo-images')
          .upload(
            filePath,
            image,
            {
              cacheControl: '3600',
              upsert: false
            }
          )

        if (uploadError) {
          console.log(
            'Image upload error:',
            uploadError
          )

          alert(
            `Image upload failed: ${uploadError.message}`
          )

          setLoading(false)

          return
        }

        // -----------------------------------
        // IMPORTANT:
        //
        // We DO NOT use getPublicUrl()
        // because the bucket is private.
        //
        // Store the Storage path instead.
        // -----------------------------------

        imagePath = filePath

        console.log(
          'Image storage path:',
          imagePath
        )
      }

      // -----------------------------------
      // 3. Save appointment
      // -----------------------------------

      const {
        error: databaseError
      } = await supabase
        .from('appointments')
        .insert([
          {
            customer_name:
              customerName,

            phone_number:
              phoneNumber,

            email:
              email || null,

            appointment_start:
              appointmentStart,

            duration_minutes:
              Number(duration),

            notes:
              notes || null,

            // Store the private Storage path
            // rather than a public URL
            tattoo_image_url:
              imagePath,

            user_id:
              user.id
          }
        ])

      if (databaseError) {
        console.log(
          'Database error:',
          databaseError
        )

        alert(
          `Failed to save appointment: ${databaseError.message}`
        )

        setLoading(false)

        return
      }

      // -----------------------------------
      // 4. Success
      // -----------------------------------

      alert(
        'Appointment saved successfully'
      )

      // -----------------------------------
      // 5. Reset form
      // -----------------------------------

      setCustomerName('')
      setPhoneNumber('')
      setEmail('')
      setAppointmentStart('')
      setDuration('60')
      setNotes('')
      setImage(null)

      // Reset file input
      const fileInput =
        document.querySelector(
          'input[type="file"]'
        )

      if (fileInput) {
        fileInput.value = ''
      }

    } catch (error) {
      console.log(
        'Unexpected error:',
        error
      )

      alert(
        'Something went wrong while saving the appointment'
      )
    }

    setLoading(false)
  }

  return (
    <div>
      <h2>
        Add Appointment
      </h2>

      <form onSubmit={handleSubmit}>

        {/* -------------------------------- */}
        {/* Customer Name */}
        {/* -------------------------------- */}

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

        {/* -------------------------------- */}
        {/* Phone Number */}
        {/* -------------------------------- */}

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

        {/* -------------------------------- */}
        {/* Email */}
        {/* -------------------------------- */}

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

        {/* -------------------------------- */}
        {/* Appointment Start */}
        {/* -------------------------------- */}

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

        {/* -------------------------------- */}
        {/* Duration */}
        {/* -------------------------------- */}

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

        {/* -------------------------------- */}
        {/* Notes */}
        {/* -------------------------------- */}

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

        {/* -------------------------------- */}
        {/* Tattoo Reference Image */}
        {/* -------------------------------- */}

        <label>
          Tattoo Reference Image
        </label>

        <br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const selectedFile =
              e.target.files?.[0]

            setImage(
              selectedFile || null
            )
          }}
        />

        <br />
        <br />

        {/* -------------------------------- */}
        {/* Selected Image */}
        {/* -------------------------------- */}

        {image && (
          <p>
            Selected image:{' '}
            <strong>
              {image.name}
            </strong>
          </p>
        )}

        {/* -------------------------------- */}
        {/* Submit */}
        {/* -------------------------------- */}

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
