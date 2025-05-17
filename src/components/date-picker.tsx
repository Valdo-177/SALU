"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"

interface DatePickerProps {
  selectedDate: Date | null
  onChange: (date: Date) => void
  minDate?: Date
  maxDate?: Date
  unavailableDates?: Date[]
  isOpen: boolean
  onClose: () => void
  yearRange?: number // Cuántos años mostrar hacia atrás y adelante
}

export default function DatePicker({
  selectedDate,
  onChange,
  minDate,
  maxDate,
  unavailableDates = [],
  isOpen,
  onClose,
  yearRange = 100, // Por defecto, mostrar 100 años hacia atrás
}: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date())
  const [calendarDays, setCalendarDays] = useState<Array<Date | null>>([])
  const [showYearSelector, setShowYearSelector] = useState(false)

  // Convert unavailable dates to string format for easy comparison
  const unavailableDateStrings = unavailableDates.map((date) => date.toDateString())

  useEffect(() => {
    generateCalendarDays(currentMonth)
  }, [currentMonth])

  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay()

    // Total days in the month
    const daysInMonth = lastDay.getDate()

    // Generate array of days
    const days: Array<Date | null> = []

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    setCalendarDays(days)
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const isDateUnavailable = (date: Date) => {
    // Check if date is in unavailable dates
    if (unavailableDateStrings.includes(date.toDateString())) {
      return true
    }

    // Check if date is before min date
    if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) {
      return true
    }

    // Check if date is after max date
    if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999))) {
      return true
    }

    return false
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString()
  }

  const handleDateClick = (date: Date) => {
    if (!isDateUnavailable(date)) {
      onChange(date)
      onClose()
    }
  }

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("es-ES", { month: "long", year: "numeric" })
  }

  // Generar array de años para el selector
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear()
    const startYear = currentYear - yearRange
    const endYear = currentYear + 5 // Mostrar algunos años futuros

    const years = []
    for (let year = startYear; year <= endYear; year++) {
      years.push(year)
    }
    return years
  }

  const handleYearChange = (year: number) => {
    const newDate = new Date(currentMonth)
    newDate.setFullYear(year)
    setCurrentMonth(newDate)
    setShowYearSelector(false)
  }

  if (!isOpen) return null

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100">
            <ChevronLeft size={20} />
          </button>

          {/* Título del mes con selector de año */}
          <div className="relative">
            <button
              onClick={() => setShowYearSelector(!showYearSelector)}
              className="text-lg font-medium capitalize flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded"
            >
              {formatMonth(currentMonth)}
              <ChevronDown size={16} />
            </button>

            {/* Selector de año */}
            {showYearSelector && (
              <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto z-10 w-40">
                {generateYearOptions().map((year) => (
                  <button
                    key={year}
                    onClick={() => handleYearChange(year)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      year === currentMonth.getFullYear() ? "bg-gray-100 font-medium" : ""
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {["D", "L", "M", "M", "J", "V", "S"].map((day, index) => (
            <div key={index} className="text-center font-medium text-sm py-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <div key={index} className="text-center py-1">
              {day ? (
                <button
                  type="button"
                  onClick={() => handleDateClick(day)}
                  disabled={isDateUnavailable(day)}
                  className={`calendar-day ${isDateUnavailable(day) ? "unavailable" : "available"} ${
                    isSelected(day) ? "selected" : ""
                  } ${isToday(day) ? "today" : ""}`}
                >
                  {day.getDate()}
                </button>
              ) : (
                <span className="w-10 h-10"></span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="btn-secondary mr-2">
            Cancelar
          </button>
          <button onClick={onClose} className="btn-primary">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}




// "use client"

// import { useState, useEffect } from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// interface DatePickerProps {
//   selectedDate: Date | null
//   onChange: (date: Date) => void
//   minDate?: Date
//   maxDate?: Date
//   unavailableDates?: Date[]
//   isOpen: boolean
//   onClose: () => void
// }

// export default function DatePicker({
//   selectedDate,
//   onChange,
//   minDate,
//   maxDate,
//   unavailableDates = [],
//   isOpen,
//   onClose,
// }: DatePickerProps) {
//   const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date())
//   const [calendarDays, setCalendarDays] = useState<Array<Date | null>>([])

//   // Convert unavailable dates to string format for easy comparison
//   const unavailableDateStrings = unavailableDates.map((date) => date.toDateString())

//   useEffect(() => {
//     generateCalendarDays(currentMonth)
//   }, [currentMonth])

//   const generateCalendarDays = (date: Date) => {
//     const year = date.getFullYear()
//     const month = date.getMonth()

//     // First day of the month
//     const firstDay = new Date(year, month, 1)
//     // Last day of the month
//     const lastDay = new Date(year, month + 1, 0)

//     // Day of the week for the first day (0 = Sunday, 6 = Saturday)
//     const firstDayOfWeek = firstDay.getDay()

//     // Total days in the month
//     const daysInMonth = lastDay.getDate()

//     // Generate array of days
//     const days: Array<Date | null> = []

//     // Add empty slots for days before the first day of the month
//     for (let i = 0; i < firstDayOfWeek; i++) {
//       days.push(null)
//     }

//     // Add days of the month
//     for (let i = 1; i <= daysInMonth; i++) {
//       days.push(new Date(year, month, i))
//     }

//     setCalendarDays(days)
//   }

//   const nextMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
//   }

//   const prevMonth = () => {
//     setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
//   }

//   const isDateUnavailable = (date: Date) => {
//     // Check if date is in unavailable dates
//     if (unavailableDateStrings.includes(date.toDateString())) {
//       return true
//     }

//     // Check if date is before min date
//     if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) {
//       return true
//     }

//     // Check if date is after max date
//     if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999))) {
//       return true
//     }

//     return false
//   }

//   const isToday = (date: Date) => {
//     const today = new Date()
//     return (
//       date.getDate() === today.getDate() &&
//       date.getMonth() === today.getMonth() &&
//       date.getFullYear() === today.getFullYear()
//     )
//   }

//   const isSelected = (date: Date) => {
//     return selectedDate && date.toDateString() === selectedDate.toDateString()
//   }

//   const handleDateClick = (date: Date) => {
//     if (!isDateUnavailable(date)) {
//       onChange(date)
//       onClose()
//     }
//   }

//   const formatMonth = (date: Date) => {
//     return date.toLocaleDateString("es-ES", { month: "long", year: "numeric" })
//   }

//   if (!isOpen) return null

//   return (
//     <div className="modal" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <div className="flex justify-between items-center mb-4">
//           <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100">
//             <ChevronLeft size={20} />
//           </button>
//           <h3 className="text-lg font-medium capitalize">{formatMonth(currentMonth)}</h3>
//           <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100">
//             <ChevronRight size={20} />
//           </button>
//         </div>

//         <div className="grid grid-cols-7 gap-1 mb-2">
//           {["D", "L", "M", "M", "J", "V", "S"].map((day, index) => (
//             <div key={index} className="text-center font-medium text-sm py-1">
//               {day}
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-7 gap-1">
//           {calendarDays.map((day, index) => (
//             <div key={index} className="text-center py-1">
//               {day ? (
//                 <button
//                   type="button"
//                   onClick={() => handleDateClick(day)}
//                   disabled={isDateUnavailable(day)}
//                   className={`calendar-day ${isDateUnavailable(day) ? "unavailable" : "available"} ${
//                     isSelected(day) ? "selected" : ""
//                   } ${isToday(day) ? "today" : ""}`}
//                 >
//                   {day.getDate()}
//                 </button>
//               ) : (
//                 <span className="w-10 h-10"></span>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="mt-4 flex justify-end">
//           <button onClick={onClose} className="btn-secondary mr-2">
//             Cancelar
//           </button>
//           <button onClick={onClose} className="btn-primary">
//             Aceptar
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
