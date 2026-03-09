import { createContext, useState, useContext } from 'react'

const BookingContext = createContext()

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([])
  const [currentBooking, setCurrentBooking] = useState(null)

  const addBooking = (booking) => {
    const newBooking = {
      id: Date.now(),
      ...booking,
      createdAt: new Date(),
    }
    setBookings([...bookings, newBooking])
    setCurrentBooking(newBooking)
    return newBooking
  }

  const updateBooking = (id, updates) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, ...updates } : b))
    if (currentBooking?.id === id) {
      setCurrentBooking({ ...currentBooking, ...updates })
    }
  }

  const getBooking = (id) => {
    return bookings.find(b => b.id === id)
  }

  return (
    <BookingContext.Provider value={{ bookings, currentBooking, addBooking, updateBooking, getBooking }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  return useContext(BookingContext)
}
