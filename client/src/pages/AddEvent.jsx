
import  { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function AddEvent() {
  const {user} = useContext(UserContext);
  const [formData, setFormData] = useState({

    owner: user? user.name : "",
    title: "",
    optional:"",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    ticketPrice: 0,
    image: '',
    likes: 0
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({ ...prevState, image: file }));
  };
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     console.log(reader.result);
  //     setFormData((prevState) => ({ ...prevState, image: reader.result }));
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file); // Convert image to Base64
  //   }
  // };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("/createEvent", formData)
  //     .then((response) => {
  //       console.log("Event posted successfully:", response.data);

  //     })
  //     .catch((error) => {
  //       console.error("Error posting event:", error);
  //     });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post("/createEvent", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Event posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting event:", error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formDataToSend = new FormData();
  //   formDataToSend.append("owner", formData.owner);
  //   formDataToSend.append("title", formData.title);
  //   formDataToSend.append("optional", formData.optional);
  //   formDataToSend.append("description", formData.description);
  //   formDataToSend.append("organizedBy", formData.organizedBy);
  //   formDataToSend.append("eventDate", formData.eventDate);
  //   formDataToSend.append("eventTime", formData.eventTime);
  //   formDataToSend.append("location", formData.location);
  //   formDataToSend.append("ticketPrice", formData.ticketPrice);
  //   formDataToSend.append("likes", formData.likes);

  //   // Append Image
  //   if (formData.image) {
  //     formDataToSend.append("image", formData.image);
  //   }

  //   try {
  //     const response = await axios.post("/createEvent", formDataToSend, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     console.log("Event posted successfully:", response.data);
  //   } catch (error) {
  //     console.error("Error posting event:", error);
  //   }
  // };
  return (
    <div className='flex flex-col ml-20 mt-10'>
      <div><h1 className='font-bold text-[36px] mb-5'>Post an Event</h1></div>

      <form onSubmit={handleSubmit} className='flex flex-co'>
      <div className='flex flex-col gap-5'>
        <label className='flex flex-col'>
          Title:
          <input
            type="text"
            name="title"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Description:
          <textarea
            name="description"
            className=' rounded mt-2 pl-5 px-4 py-2 ring-sky-700 ring-2 h-8 border-none'
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Organized By:
          <input
            type="text"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            name="organizedBy"
            value={formData.organizedBy}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Event Date:
          <input
            type="date"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Event Time:
          <input
            type="time"
            name="eventTime"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.eventTime}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Location:
          <input
            type="text"
            name="location"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Ticket Price:
          <input
            type="number"
            name="ticketPrice"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.ticketPrice}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Image:
          <input
            type="file"
            name="image"

            className=' rounded mt-2 pl-5 px-4 py-10 ring-sky-700 ring-2 h-8 border-none'
            onChange={handleImageUpload}
          />
        </label >
        <button className='primary' type="submit">Submit</button>
        </div>

      </form>
    </div>
  );
}
