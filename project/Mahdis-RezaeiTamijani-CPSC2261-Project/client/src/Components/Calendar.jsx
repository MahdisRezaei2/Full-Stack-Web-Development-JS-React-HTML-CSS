import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import AddEventModal from "./AddEventModal";
import axios from "axios";
import moment from "moment";
import EditEvent from "./EditEvent";

export default function (props) {
	// creating the states
	const [modalOpen, setModalOpen] = useState(false);
	const [events, setEvents] = useState([]);
	const calendarRef = useRef(null);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")));
    
	// handle function
	const handleEventEdit = (event) => {
		setSelectedEvent(event);
		setEditModalOpen(true);
	};
	async function handleEventUpdate(updatedEvent) {
		try {
			// Update the event on the server
			await axios.put(`/api/calendar/update-event/${updatedEvent.id}`, updatedEvent);

			// Update the event in the state
			setEvents((prevEvents) => prevEvents.map((event) => (event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event)));
		} catch (error) {
			// Handle the error here
			console.error("Error while updating event:", error);
		}
	}
	const onEventAdded = (event) => {
		let calendarApi = calendarRef.current.getApi();
		calendarApi.addEvent({
			start: moment(event.start).toDate(),
			end: moment(event.end).toDate(),
			title: event.title,
		});
	};
	async function handleEventAdd(data) {
		try {
			await axios.post("/api/calendar/create-event", data);
		} catch (error) {
			// Handle the error here
			console.error("Error while adding event:", error);
		}
	}
	async function handleDateSet(data) {
		const response = await axios.get("/api/calendar/get-events?start=" + moment(data.start).toISOString() + "&end=" + moment(data.end).toISOString());
		setEvents(response.data);
	}
    // for the dark mode
	const changeTheme = (theme) => {
		setTheme(theme); // Toggle theme
		localStorage.setItem("theme", theme);
	};

	return (
		<section className={theme ? "theme-dark" : ""}>
			<div>
				<div className="content-bg-color main-content">
					<h1>Dark Mode</h1>
					<button onClick={() => changeTheme(!theme)}>Dark Mode</button> 
				</div>
			</div>
			<button onClick={() => setModalOpen(true)}>Add Event</button>

			<div style={{ position: "relative", zIndex: 0 }}>
				<FullCalendar
					ref={calendarRef}
					events={events}
					plugins={[dayGridPlugin]}
					initialView="dayGridMonth"
					eventAdd={(event) => handleEventAdd(event)}
					datesSet={(date) => handleDateSet(date)}
				/>
			</div>

			<AddEventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={(event) => onEventAdded(event)} />

			<EditEvent
				isOpen={editModalOpen}
				onClose={() => setEditModalOpen(false)}
				event={selectedEvent}
				onEventUpdated={(updatedEvent) => handleEventUpdate(updatedEvent)}
			/>
		</section>
	);
}
