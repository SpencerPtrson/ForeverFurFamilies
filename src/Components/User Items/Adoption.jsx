import { useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router";

export const Adoption = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const userId = useSelector((state) => state.userId);
  const firstName = useSelector((state) => state.firstName);
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getPet = async () => {
      try {
        const response = await axios.get(`/api/pets/${id}`);
        setPet(response.data.pet);
        const res = await axios.get(`/api/users/${userId}`);
        setFormData(res.data.user);
        // console.log(res.data.user)
      } catch (error) {
        console.log("error getting pet", error);
      }
    };
    getPet();
  }, [id]);

  if (!pet) {
    return <div>Loading...</div>;
  }
  const petId = id;

  const {
    name,
    species,
    breed,
    age,
    gender,
    picture,
    medicalHistory,
    personality,
    cityName,
    state,
  } = pet;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Adoption handleSunmit")
    try {
      const res = await axios.post("/api/appointmentCheck", {
        password:formData.password,
        email:formData.email,
        firstName:formData.firstName,
        lastName:formData.lastName,
        userId:userId,
        phoneNumber:formData.phoneNumber
      });
      console.log("passed check", res.data)
      if (res.data.success) {
        const response = await axios.post("/api/appointments/create", {
          userId: userId,
          petId: petId,
          date: date,
        });
        console.log(response.data)
        if (response.data.success) {
          navigate("/UserProfile");
        } else {
          console.log("error creating appointment", response.data.message);
        }
      } else {
        console.log("error checking password", res.data.message);
      }
    } catch (error) {
      console.log("error setting appointment", error);
    }
  };

  return (
    <div>
      <h1>Thanks for considering the adoption of {name}! </h1>
      <img style={{ width: "20%" }} className="img-fluid" src={picture} />
      <div className="register-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Please update any information </h2>
          <h2>and enter password</h2>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder={`${firstName}`}
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder={`${formData.lastName}`}
          />
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder={`${formData.phoneNumber}`}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={`${formData.email}`}
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          {showCalendar && (
            <>
              <Calendar onChange={setDate} value={date} />
              <button type="submit">Set Appointment</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};