import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  BsUpload,
  BsCalendar,
  BsTicket,
  BsPlus,
  BsTrash,
  BsCurrencyDollar,
  BsPeople,
  BsImage,
} from "react-icons/bs";

export default function CreateEvent() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    eventType: "",
    expectedParticipants: "",
    ticketPrice: "",
    quantity: "",
    image: null,
    promotionCaption: "",
  });

  // Table data states
  const [incomeTable, setIncomeTable] = useState([
    { description: "", price: "", reference: "" },
  ]);
  const [expenseTable, setExpenseTable] = useState([
    { description: "", price: "", reference: "" },
  ]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add row to income table
  const addIncomeRow = () => {
    setIncomeTable([
      ...incomeTable,
      { description: "", price: "", reference: "" },
    ]);
  };

  // Remove row from income table
  const removeIncomeRow = (index) => {
    if (incomeTable.length > 1) {
      setIncomeTable(incomeTable.filter((_, i) => i !== index));
    }
  };

  // Add row to expense table
  const addExpenseRow = () => {
    setExpenseTable([
      ...expenseTable,
      { description: "", price: "", reference: "" },
    ]);
  };

  // Remove row from expense table
  const removeExpenseRow = (index) => {
    if (expenseTable.length > 1) {
      setExpenseTable(expenseTable.filter((_, i) => i !== index));
    }
  };

  // Update income table data
  const updateIncomeRow = (index, field, value) => {
    const updated = [...incomeTable];
    updated[index][field] = value;
    setIncomeTable(updated);
  };

  // Update expense table data
  const updateExpenseRow = (index, field, value) => {
    const updated = [...expenseTable];
    updated[index][field] = value;
    setExpenseTable(updated);
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
      const submitData = new FormData();
      submitData.append("owner", user?.name || "");
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("organizedBy", formData.organizedBy);
      submitData.append("eventDate", formData.eventDate);
      submitData.append("eventTime", formData.eventTime);
      submitData.append("location", formData.location);
      submitData.append("ticketPrice", formData.ticketPrice || 0);
      submitData.append("likes", 0);

      if (formData.image) {
        submitData.append("image", formData.image);
      }

      const response = await axios.post("/createEvent", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("🎉 Event created successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("❌ Failed to create event. Please try again.");
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Create Amazing Event
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Design and launch your perfect event with our comprehensive event
            creation tools
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
                  Basic Information
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
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-lg"
                  required
                />
              </div>

              {/* Organized By */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Organized By *
                </label>
                <input
                  type="text"
                  name="organizedBy"
                  value={formData.organizedBy}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-lg"
                  placeholder="Organization name"
                  required
                />
              </div>

              {/* Event Time */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Event Time *
                </label>
                <input
                  type="time"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-lg"
                  required
                />
              </div>

              {/* Event Type */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Event Type
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-lg"
                >
                  <option value="">Select event type</option>
                  <option value="conference">Conference</option>
                  <option value="workshop">Workshop</option>
                  <option value="seminar">Seminar</option>
                  <option value="meetup">Meetup</option>
                  <option value="concert">Concert</option>
                  <option value="festival">Festival</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Location */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-lg"
                  placeholder="Event venue or address"
                  required
                />
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
          </div>

          {/* Ticket Information Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <BsTicket className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Ticket Information
                </h2>
                <p className="text-gray-600">
                  Set your pricing and availability
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
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

              {/* Available Quantity */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Available Quantity
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <BsPeople className="h-6 w-6 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-lg"
                    placeholder="Number of tickets"
                    min="1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Budget Report Card */}
          <div
            className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
            style={{ border: "5px solid red" }}
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <BsCurrencyDollar className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Budget Report
                </h2>
                <p className="text-gray-600">Plan your event finances</p>
              </div>
            </div>

            {/* Income Details */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Expected Income Details
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                        Description
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                        Price (Rs.)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                        Reference
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomeTable.map((row, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={row.description}
                            onChange={(e) =>
                              updateIncomeRow(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Income source"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={row.price}
                            onChange={(e) =>
                              updateIncomeRow(index, "price", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="0"
                            min="0"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={row.reference}
                            onChange={(e) =>
                              updateIncomeRow(
                                index,
                                "reference",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Reference"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => removeIncomeRow(index)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            disabled={incomeTable.length === 1}
                          >
                            <BsTrash className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  type="button"
                  onClick={addIncomeRow}
                  className="mt-4 flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primarydark transition-colors"
                >
                  <BsPlus className="w-4 h-4" />
                  Add Income Row
                </button>
              </div>
            </div>

            {/* Expense Details */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Expected Expense Details
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                        Description
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                        Price (Rs.)
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                        Reference
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenseTable.map((row, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={row.description}
                            onChange={(e) =>
                              updateExpenseRow(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Expense item"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={row.price}
                            onChange={(e) =>
                              updateExpenseRow(index, "price", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="0"
                            min="0"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={row.reference}
                            onChange={(e) =>
                              updateExpenseRow(
                                index,
                                "reference",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Reference"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => removeExpenseRow(index)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            disabled={expenseTable.length === 1}
                          >
                            <BsTrash className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  type="button"
                  onClick={addExpenseRow}
                  className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <BsPlus className="w-4 h-4" />
                  Add Expense Row
                </button>
              </div>
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
                  Creating Event...
                </>
              ) : (
                <>
                  <BsCalendar className="w-6 h-6" />
                  Create Event
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
