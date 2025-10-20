/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
// import logoimf from "../../../api/uploads/"

export default function IndexPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  //! Fetch events from the server ---------------------------------------------------------------
  useEffect(() => {
    setLoading(true);
    axios
      .get("/createEvent")
      .then((response) => {
        console.log("18---", response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //! Like Functionality --------------------------------------------------------------
  const handleLike = (eventId) => {
    axios
      .post(`/event/${eventId}`)
      .then((response) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId ? { ...event, likes: event.likes + 1 } : event
          )
        );
        console.log("done", response);
      })
      .catch((error) => {
        console.error("Error liking ", error);
      });
  };

  return (
    <div className="bg-gradient-to-br from-background to-primarylight/20">
      {/* Hero Section */}
      <div className="relative">
        <div className="hidden sm:block">
          <div className="relative h-[400px] overflow-hidden">
            <img
              src="../assets/Hero1.jpg"
              alt="Event Management Platform"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-4xl mx-auto px-8 text-white">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                  Discover Amazing <span className="text-primary">Events</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl">
                  Find, book, and attend the best events in your city. From
                  concerts to conferences, we've got you covered.
                </p>

                <div className="flex justify-center">
                  <button className="bg-primary hover:bg-primarydark text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105">
                    Explore Events
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these amazing events happening around you
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Loading State */}
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))
          ) : events.length > 0 ? (
            events.map((event) => {
              const eventDate = new Date(event.eventDate);
              const currentDate = new Date();
              {
                /* console.log("66---", eventDate,"---", currentDate); */
              }

              //! Check the event date is passed or not ---------------------------------------------------------------------------------------
              if (
                eventDate > currentDate ||
                eventDate.toDateString() === currentDate.toDateString()
              ) {
                return (
                  <div
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
                    key={event._id}
                  >
                    {/* Event Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src="../assets/PartyImg.jpg"
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                      {/* Like Button */}
                      <div className="absolute top-4 right-4">
                        <button
                          onClick={() => handleLike(event._id)}
                          className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                        >
                          <BiLike className="w-5 h-5 text-gray-700 hover:text-primary" />
                        </button>
                      </div>

                      {/* Price Badge */}
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {event.ticketPrice === 0
                            ? "Free"
                            : `Rs. ${event.ticketPrice}`}
                        </span>
                      </div>

                      {/* Like Count */}
                      <div className="absolute bottom-4 right-4 flex items-center gap-1 text-white">
                        <BiLike className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {event.likes}
                        </span>
                      </div>
                    </div>

                    {/* Event Content */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>

                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <svg
                            className="w-4 h-4 mr-2 text-primary"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {new Date(event.eventDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                          , {event.eventTime}
                        </div>

                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                          {event.description}
                        </p>
                      </div>

                      {/* Organizer Info */}
                      <div className="border-t pt-4 mb-4">
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <span className="text-gray-500">Organized by</span>
                            <p className="font-semibold text-gray-900">
                              {event.organizedBy}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-gray-500">Created by</span>
                            <p className="font-semibold text-gray-900">
                              {event.owner}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Book Ticket Button */}
                      <Link to={"/event/" + event._id} className="block">
                        <button className="w-full bg-primary hover:bg-primarydark text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2 group-hover:scale-105">
                          Book Ticket
                          <BsArrowRightShort className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              }
              return null;
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <div className="w-32 h-32 bg-primarylight rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-16 h-16 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No Events Available
              </h3>
              <p className="text-gray-600 text-center max-w-md mb-6">
                There are currently no upcoming events. Check back later or
                create your own event!
              </p>
              <Link to="/createEvent">
                <button className="bg-primary hover:bg-primarydark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg">
                  Create Event
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
