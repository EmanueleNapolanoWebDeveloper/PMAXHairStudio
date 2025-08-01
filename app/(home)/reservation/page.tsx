'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useState } from 'react'

export default function SimpleCalendar() {
    const [events] = useState([
        {
            id: '1',
            title: 'Evento esempio',
            date: '2025-08-10',
        },
        {
            id: '2',
            title: 'Altro evento',
            date: '2025-08-15',
        },
    ])

    return (
        <>
            <div className="bg-white rounded-2xl p-6 shadow-md max-w-4xl mx-auto mt-[7rem]">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                    Calendario Eventi
                </h2>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    height="auto"
                    headerToolbar={{
                        start: 'prev,next today',
                        center: 'title',
                        end: '',
                    }}
                />
            </div>
        </>

    )
}
