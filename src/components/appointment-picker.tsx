"use client"

interface TimeSlot {
  time: string
  available: boolean
}

interface AppointmentPickerProps {
  selectedDate: Date | null
  selectedTime: string | null
  onSelectTime: (time: string) => void
  isOpen: boolean
  onClose: () => void
}

export default function AppointmentPicker({
  selectedDate,
  selectedTime,
  onSelectTime,
  isOpen,
  onClose,
}: AppointmentPickerProps) {
  // Sample time slots - in a real app, these would come from an API based on the selected date
  const morningSlots: TimeSlot[] = [
    { time: "08:00", available: true },
    { time: "08:30", available: false },
    { time: "09:00", available: true },
    { time: "09:30", available: true },
    { time: "10:00", available: false },
    { time: "10:30", available: true },
    { time: "11:00", available: false },
    { time: "11:30", available: true },
  ]

  const afternoonSlots: TimeSlot[] = [
    { time: "13:00", available: true },
    { time: "13:30", available: true },
    { time: "14:00", available: false },
    { time: "14:30", available: true },
    { time: "15:00", available: true },
    { time: "15:30", available: false },
    { time: "16:00", available: true },
    { time: "16:30", available: false },
  ]

  const handleTimeSelect = (time: string) => {
    onSelectTime(time)
  }

  const formatDate = (date: Date | null) => {
    if (!date) return ""
    return date.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })
  }

  if (!isOpen || !selectedDate) return null

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-medium mb-2">Selecciona una hora</h3>
        <p className="text-sm text-gray-600 mb-4 capitalize">{formatDate(selectedDate)}</p>

        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Mañana</h4>
          <div className="grid grid-cols-4 gap-2">
            {morningSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.available && handleTimeSelect(slot.time)}
                disabled={!slot.available}
                className={`py-2 px-3 rounded-lg text-sm transition-colors ${
                  selectedTime === slot.time
                    ? "bg-secondary text-white"
                    : slot.available
                      ? "bg-white border border-gray-300 hover:bg-gray-100"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Tarde</h4>
          <div className="grid grid-cols-4 gap-2">
            {afternoonSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.available && handleTimeSelect(slot.time)}
                disabled={!slot.available}
                className={`py-2 px-3 rounded-lg text-sm transition-colors ${
                  selectedTime === slot.time
                    ? "bg-secondary text-white"
                    : slot.available
                      ? "bg-white border border-gray-300 hover:bg-gray-100"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button onClick={onClose} className="btn-secondary">
            Cancelar
          </button>
          <button onClick={onClose} className="btn-primary" disabled={!selectedTime}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
