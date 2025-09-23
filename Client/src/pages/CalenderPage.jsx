import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment"; // for localizer
import toast from "react-hot-toast";
import styled from "styled-components";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import EditEventModal from "../components/EditEventModal";
import { BiCategoryAlt } from "react-icons/bi";
import { useEffect } from "react";
// Extract and normalize date range
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfDay,
  endOfDay,
} from "date-fns";
import AddEventModal from "../components/AddEventModal";
import ShowCategoryModal from "../components/ShowCategoryModal";
import Loader2 from "../components/Loader2";

const localizer = momentLocalizer(moment);

// Glassy background wrapper
const Wrapper = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, #d9e4f5 0%, #f7d9e3 100%);
  /* background-size: 200% 200%; */
  min-height: 100vh;
  font-family: "Inter", sans-serif;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  /* animation: gradientMove 8s ease infinite; */

  /* @keyframes gradientMove {
    0% {
      background-position: top left;
    }
    50% {
      background-position: bottom right;
    }
    100% {
      background-position: top left;
    }
  } */
`;

// Heading
const Heading = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(90deg, #7f00ff, #e100ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
  text-align: center;
`;

// Glass effect form
const Form = styled.form`
  /* position: absolute; */
  /* top: 0; */
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(135deg, #d9e4f5 0%, #f7d9e3 100%);
  /* background: rgba(255, 255, 255, 0.2); */
  /* backdrop-filter: blur(12px) saturate(150%); */
  /* filter: saturate(150%); */
  border-radius: 16px;
  box-shadow: 0 10px 32px rgba(6, 15, 142, 0.15);
  width: 100%;
  max-width: 800px;

  input,
  button {
    padding: 0.75rem 1rem;
    border-radius: 10px;
    font-size: 0.95rem;
    border: none;
    outline: none;
    transition: all 0.2s ease;
  }

  input {
    background: rgba(255, 255, 255, 0.6);
    flex: 1;
    min-width: 180px;
    color: #333;

    &:focus {
      background: rgba(255, 255, 255, 0.8);
      box-shadow: 0 0 0 2px #9a4ef1;
    }
  }

  button {
    background: linear-gradient(90deg, #9a4ef1, #ff6ec7);
    color: white;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(154, 78, 241, 0.4);
    }
  }
`;

// Calendar with modern styling
const CalendarStyled = styled(Calendar)`
  height: 70rem;
  width: 100%;
  max-width: 1100px;
  border-radius: 20px;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(14px) saturate(180%);

  .rbc-toolbar {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    padding: 0.5rem;
    margin-bottom: 1rem;

    button {
      background: transparent;
      color: #333;
      font-weight: 500;
      padding: 0.4rem 0.8rem;
      border-radius: 6px;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(154, 78, 241, 0.1);
        color: #9a4ef1;
      }
    }
  }

  .rbc-event {
    border-radius: 8px;
    padding: 4px 8px;
    font-weight: 500;
    width: 100%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    margin: 0 !important; /* Override any unwanted margins */
    overflow: visible;
  }

  .rbc-today {
    background: rgba(255, 255, 255, 0.4);
  }

  .rbc-addons-dnd-resizable {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .rbc-addons-dnd-resize-ns-anchor {
    position: absolute;
    left: 0;
    right: 6px;
    width: 100%;
    margin: 0 auto;
    height: 8px; /* Anchor height */
    background: transparent; // Transparent look
    cursor: ns-resize;
    z-index: 10; /* Bring on top for interaction */
    transition: background 0.2s ease;
  }

  .rbc-addons-dnd-resize-ns-anchor:first-of-type {
    top: -4%; //Top edge
    /* background: #000000ff; */
    /* border-top-left-radius: 6px;
    border-top-right-radius: 6px; */
    border-radius: 6px;
    text-align: center;
  }

  .rbc-addons-dnd-resize-ns-anchor:last-of-type {
    bottom: -4.5px;
    /* border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px; */
    border-radius: 6px;
    /* background: #ec0000ff; */
  }

  /* Optional visual for testing */
  .rbc-addons-dnd-resize-ns-anchor:hover {
    background: rgba(95, 0, 217, 0.15);
    box-shadow: 0 0 6px rgba(95, 0, 217, 0.4);
  }
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: linear-gradient(90deg, #9a4ef1, #ff6ec7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(154, 78, 241, 0.4);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.065);
  }

  /* Tooltip */
  &::after {
    content: "Add new task"; /* tooltip text */
    position: absolute;
    right: 110%; /* move to the left of the button */
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.75);
    color: white;
    font-size: 0.85rem;
    padding: 6px 10px;
    border-radius: 6px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  &:hover::after {
    opacity: 1;
    transform: translateY(-50%) translateX(-4px); /* slight slide-in */
  }
`;

const CategoriesButton = styled(FloatingButton)`
  bottom: 6.5rem; /* push it above the add button */
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "Monitor and edit categories"; /* tooltip text */
  }
`;

const DnDCalendar = withDragAndDrop(CalendarStyled);

const CalendarPage = () => {
  // stores total tasks
  const [events, setEvents] = useState([]);

  // add task form data on change
  const [formData, setFormData] = useState({
    title: "",
    start: "",
    end: "",
    category: "",
    description: "",
    color: "#6348fa",
  });

  // right filter -> month, week, day, agenda
  const [currentView, setCurrentView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [isShowCategoryModalOpen, setIsShowCategoryModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);

        // 1. extract token
        const token = localStorage.getItem("token");

        // 2. Send the http request
        const res = await fetch("http://localhost:8000/tasks/categories", {
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        setCategories(data.categories);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    try {
      setIsLoading(true);
      const { start, end } = getRangeDates(currentView, currentDate);

      fetchTasks(start, end);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getRangeDates = (view, date) => {
    switch (view) {
      case "month":
        return {
          start: startOfMonth(date),
          end: endOfMonth(date),
        };
      case "week":
        return {
          start: startOfWeek(date, { weekStartsOn: 1 }),
          end: endOfWeek(date, { weekStartsOn: 1 }),
        };
      case "day":
      case "agenda":
        return {
          start: startOfDay(date),
          end: endOfDay(date),
        };
      default:
        return {
          start: startOfMonth(date),
          end: endOfMonth(date),
        };
    }
  };

  const normalizeInputDates = (startDate, endDate) => {
    let start, end;

    if (Array.isArray(startDate)) {
      start = startDate[0];
      end = startDate[startDate.length - 1];
    } else if (startDate && startDate.start && startDate.end) {
      start = startDate.start;
      end = startDate.end;
    } else {
      start = startDate;
      end = endDate;
    }

    // Ensure full day coverage for 'end'
    start = new Date(start);
    end = new Date(end);
    end.setHours(23, 59, 59, 999);

    return { start, end };
  };

  // Fetch tasks for given range
  const fetchTasks = async (startDate, endDate) => {
    try {
      // let start, end;

      console.log("Raw Dates:", startDate, endDate);

      const { start, end } = normalizeInputDates(startDate, endDate);

      console.log("Normalized:", start, end);

      const startISO = start.toISOString();
      const endISO = end.toISOString();

      const res = await fetch(
        `http://localhost:8000/tasks?start=${startISO}&end=${endISO}`,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();

      if (data.success) {
        const formatted = data.tasks.map((t) => ({
          ...t,
          start: new Date(t.start),
          end: new Date(t.end),
        }));
        setEvents(formatted);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // prevent selecting past time while creating new task
  // const handleSelecting = ({ start, end }) => {
  //   return start >= new Date();
  // };

  // naya task select hone pr selectedSlot m start and end daalega and modal open krega for title for saving the task after wards
  const handleSelectSlot = ({ start, end }) => {
    // setSelectedSlot({ start, end });
    setFormData((prev) => {
      return { ...prev, start, end };
    });
    setIsAddModalOpen(true);
  };

  // add task manually using +
  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!formData.title) {
      toast.error("Please fill title field");
      return;
    }
    if (!formData.start) {
      toast.error("Please fill start field");
      return;
    }
    if (!formData.end) {
      toast.error("Please fill end field");
      return;
    }
    if (!formData.description) {
      toast.error("Please fill description field");
      return;
    }
    if (!formData.category) {
      toast.error("Please fill category field");
      return;
    }

    // Body for sending POST req
    const newEvent = {
      title: formData.title,
      start: new Date(formData.start),
      end: new Date(formData.end),
      description: formData.description,
      category: formData.category,
      color: formData.color,
    };

    console.log("NEW EVENNNNT : ", newEvent);

    // fetch req for creating new task
    const res = await fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(newEvent),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Task successfully added!");
      setEvents([
        ...events,
        {
          ...data.task,
          start: new Date(data.task.start),
          end: new Date(data.task.end),
        },
      ]);
      setFormData({
        title: "",
        start: "",
        end: "",
        description: "",
        category: "",
      });
      setIsAddModalOpen(false);
    }
  };

  // const handleChange = (e) =>
  //   setFormData({ ...formData, [e.target.name]: e.target.value });

  // edit modal ko open krega and selected task ko state m daaalega
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleEventDrop = ({ event, start, end, allDay }) => {
    const updatedEvent = { ...event, start, end, allDay };

    handleEditTask(updatedEvent, event, "Task rescheduled successfully!");
  };

  const handleEventResize = ({ event, start, end }) => {
    console.log("Resizing event:", event, "to", start, end);

    const updatedEvent = { ...event, start, end };

    handleEditTask(updatedEvent, event, "Task duration updated successfully!");
  };

  const handleEditTask = async (updatedEvent, selectedEvent, message) => {
    try {
      // 1. Get the token
      const token = localStorage.getItem("token");

      // 2. Create body and id
      const id = selectedEvent._id;
      console.log("updated event.... : ", updatedEvent);

      const res = await fetch(`http://localhost:8000/tasks/${id}`, {
        method: "PUT",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });

      const data = await res.json();
      console.log("hllllllllllllllllllo", data.task._id);

      // 3. Get the response
      if (data.success) {
        toast.success(message);
        console.log("jllo");
        setEvents((prev) => {
          return prev.map((t) => {
            return t._id === data.task._id
              ? {
                  ...data.task,
                  start: new Date(data.task.start),
                  end: new Date(data.task.end),
                }
              : t;
          });
        });
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteTask = async (selectedEvent) => {
    try {
      // 1. Get the token
      const token = localStorage.getItem("token");

      // 2. Create body and id
      const id = selectedEvent._id;

      const res = await fetch(`http://localhost:8000/tasks/${id}`, {
        method: "DELETE",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      // 3. Get the response
      if (data.success) {
        toast.success("Task deleted successfully!");

        setEvents((prev) => {
          return prev.filter((t) => t._id !== data.deletedTask._id);
        });

        setIsEditModalOpen(false);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader2 label="Preparing your calender..." />
      ) : (
        <>
          <Wrapper>
            <Heading>Vibrant Task Planner</Heading>

            {/* Calendar with drag-select */}
            <DnDCalendar
              localizer={localizer}
              events={events}
              onEventDrop={handleEventDrop}
              onEventResize={handleEventResize}
              resizable
              startAccessor="start"
              endAccessor="end"
              selectable
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              longPressThreshold={10} // Optional: for mobile (ms)
              // onSelecting={handleSelecting}
              scrollToTime={new Date(2025, 0, 1, 8, 0)} // scrolls to 8 AM initially
              defaultView="month"
              onRangeChange={(range, view) => {
                const { start, end } = normalizeInputDates(range);

                fetchTasks(start, end);
              }} // 👈 important
              views={["month", "week", "day", "agenda"]}
              view={currentView}
              popup
              onView={(view) => setCurrentView(view)}
              date={currentDate}
              onNavigate={(date) => setCurrentDate(date)}
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: event.color || "#5834dbff", // fallback
                  color: "white",
                  borderRadius: "6px",
                  padding: "2px 6px",
                  marginRight: "4px",

                  // for hiding the content if overflown
                  overflow: "hidden", // Content jo box se bahar jaye, use hide karega
                  whiteSpace: "nowrap", // Text ko ek hi line mein rakhega
                  textOverflow: "ellipsis",
                },
              })}
              // tooltipAccessor="description"
              tooltipAccessor={(event) => {
                if (currentView === "month") {
                  return event.description
                    ? `${moment(event.start).format("h:mm A")} - ${moment(
                        event.end
                      ).format("h:mm A")} ${event.description}`
                    : `${moment(event.start).format("h:mm A")} - ${moment(
                        event.end
                      ).format("h:mm A")} ${event.title}`;
                } else {
                  return event.description ? event.description : event.title;
                }
              }}
            />
          </Wrapper>

          {isEditModalOpen && selectedEvent && (
            <EditEventModal
              event={selectedEvent}
              onClose={() => setIsEditModalOpen(false)}
              categories={categories}
              setCategories={setCategories}
              showAddCategoryModal={showAddCategoryModal}
              setShowAddCategoryModal={setShowAddCategoryModal}
              onSave={handleEditTask}
              onDelete={handleDeleteTask}
            />
          )}

          <FloatingButton onClick={() => setIsAddModalOpen(true)}>
            +
          </FloatingButton>

          <CategoriesButton onClick={() => setIsShowCategoryModalOpen(true)}>
            <BiCategoryAlt />
          </CategoriesButton>

          {isAddModalOpen && (
            <AddEventModal
              formData={formData}
              setFormData={setFormData}
              setIsAddModalOpen={setIsAddModalOpen}
              handleAddTask={handleAddTask}
              categories={categories}
              setCategories={setCategories}
              showAddCategoryModal={showAddCategoryModal}
              setShowAddCategoryModal={setShowAddCategoryModal}
            />
          )}

          {isShowCategoryModalOpen && (
            <ShowCategoryModal
              categories={categories}
              setCategories={setCategories}
              setIsShowCategoryModalOpen={setIsShowCategoryModalOpen}
              showAddCategoryModal={showAddCategoryModal}
              setShowAddCategoryModal={setShowAddCategoryModal}
            />
          )}
        </>
      )}
    </>
  );
};

export default CalendarPage;
