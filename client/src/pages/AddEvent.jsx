import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  BsUpload,
  BsCalendar,
  BsTicket,
  BsCurrencyDollar,
  BsPeople,
  BsImage,
  BsPlus,
  BsGeoAlt,
  BsClock,
  BsBuilding,
} from "react-icons/bs";

export default function AddEvent() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    owner: user ? user.name : "",
    title: "",
    optional: "",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    ticketPrice: 0,
    image: null,
    likes: 0,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  // Form validation
  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Event title is required");
      return false;
    }
    if (!formData.description.trim()) {
      toast.error("Event description is required");
      return false;
    }
    if (!formData.organizedBy.trim()) {
      toast.error("Organizer name is required");
      return false;
    }
    if (!formData.eventDate) {
      toast.error("Event date is required");
      return false;
    }
    if (!formData.eventTime) {
      toast.error("Event time is required");
      return false;
    }
    if (!formData.location.trim()) {
      toast.error("Event location is required");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("owner", formData.owner);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("optional", formData.optional);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("organizedBy", formData.organizedBy);
      formDataToSend.append("eventDate", formData.eventDate);
      formDataToSend.append("eventTime", formData.eventTime);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("ticketPrice", formData.ticketPrice);
      formDataToSend.append("likes", formData.likes);

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await axios.post("/createEvent", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("🎉 Event posted successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Error posting event:", error);
      toast.error("❌ Failed to post event. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primarylight/20 py-8">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Post Your Event
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your amazing event with the world and connect with your
            audience
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primarydark rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <BsCalendar className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Event Details
                </h2>
                <p className="text-gray-600">Tell us about your event</p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Event Title */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-lg"
                  placeholder="Enter your event title"
                  required
                />
              </div>

              {/* Event Date */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Event Date *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <BsCalendar className="h-6 w-6 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-lg"
                    required
                  />
                </div>
              </div>

              {/* Organized By */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Organized By *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <BsBuilding className="h-6 w-6 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="organizedBy"
                    value={formData.organizedBy}
                    onChange={handleChange}
                    className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-lg"
                    placeholder="Organization name"
                    required
                  />
                </div>
              </div>

              {/* Event Time */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Event Time *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <BsClock className="h-6 w-6 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleChange}
                    className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-lg"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Location *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <BsGeoAlt className="h-6 w-6 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-lg"
                    placeholder="Event venue or address"
                    required
                  />
                </div>
              </div>

              {/* Ticket Price */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Ticket Price (Rs.)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <BsCurrencyDollar className="h-6 w-6 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="ticketPrice"
                    value={formData.ticketPrice}
                    onChange={handleChange}
                    className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-lg"
                    placeholder="0 for free events"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8 space-y-3">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                Event Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-lg resize-none"
                placeholder="Describe your event in detail..."
                required
              />
            </div>

            {/* Optional Field */}
            <div className="mt-8 space-y-3">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                Additional Information (Optional)
              </label>
              <textarea
                name="optional"
                value={formData.optional}
                onChange={handleChange}
                rows={3}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-lg resize-none"
                placeholder="Any additional details about your event..."
              />
            </div>
          </div>

          {/* Image Upload Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <BsImage className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Event Image
                </h2>
                <p className="text-gray-600">
                  Upload a compelling image for your event
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-80 border-3 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-primary transition-all duration-300 group"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <BsUpload className="w-16 h-16 mb-4 text-gray-400 group-hover:text-primary transition-colors" />
                    <p className="mb-2 text-lg text-gray-500 group-hover:text-primary transition-colors">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, JPEG up to 10MB
                    </p>
                  </div>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </div>

              {formData.image && (
                <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-lg text-green-700 font-semibold flex items-center justify-center gap-2">
                    <BsImage className="w-5 h-5" />✓ {formData.image.name}{" "}
                    selected
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-center space-x-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-10 py-4 border-2 border-gray-300 rounded-xl text-gray-700 font-bold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-4 bg-gradient-to-r from-primary to-primarydark text-white font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 transform hover:scale-105"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Posting Event...
                </>
              ) : (
                <>
                  <BsPlus className="w-6 h-6" />
                  Post Event
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
