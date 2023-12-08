import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

export const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.userId);
  const dispatch = useDispatch();
  const [pet,setPet] = useState([])
  const [petPic,setPetPic] = useState('')

  const [appointments, setAppointments] = useState([]);
  const [isAppointmentsLoading, setIsAppointmentsLoading] = useState(false);
  const [appointmentsError, setAppointmentsError] = useState(null);



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/users/${userId}`);
        setFormData(response.data.user);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data", error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const fetchAppointments = async () => {
    try {
      setIsAppointmentsLoading(true);
      const response = await axios.get(`/api/appointments/users/${userId}`);
      console.log("pet ID",response.data.appointments[0].petId)
       const getPet = await axios.get(`/api/pets/${response.data.appointments[0].petId}`)
      setAppointments(response.data.appointments);
      setIsAppointmentsLoading(false);
      console.log(getPet)
     setPet(getPet.data.pet.name)
     setPetPic(getPet.data.pet.picture)
    } catch (error) {
      console.error('Error fetching appointments', error);
      setAppointmentsError(error);
      setIsAppointmentsLoading(false);
    }
  }
  console.log(pet)
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/edit/${userId}`, formData);
      toggleEditMode();
    } catch (error) {
      console.error("Update Error", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This cannot be undone"
      )
    ) {
      console.log(`Deleting user with ID: ${userId}`);
      try {
        await axios.delete(`/api/users/delete/${userId}`, {
          userId,
        });
        navigate("/login");
      } catch (error) {
        console.error("Error deleting account", error);
      }
    }
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login')
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error Loading Profile</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      {isEditMode ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={toggleEditMode}>
            Cancel
          </button>
          <button onClick={handleDeleteAccount}>Delete My Account</button>
        </form>
      ) : (
          <div>
          <p>First Name: {formData.firstName}</p>
          <p>Last Name: {formData.lastName}</p>
          <p>Email: {formData.email}</p>
          <p>Phone Number: {formData.phoneNumber}</p>
          <button onClick={toggleEditMode}>Edit</button>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={fetchAppointments}>View Appointments</button>

          {isAppointmentsLoading && <div>Loading Appointments...</div>}
          {appointmentsError && <div>Error Loading Appointments</div>}
            {!isAppointmentsLoading && appointments.length > 0 && (
              <div>
                <h2>My Appointments</h2>
                {appointments.map(appointment => (
                  <div key={appointment.id}>
                    <p> Appointment Date: {appointment.date}</p>
                    <p>Pet:{appointment.petId}</p>
                    <p>petName:{pet}</p>
                    <p>petPic:{petPic}</p>
                    </div>
                ))}
                </div>
      )}
      </div>
       )}</div>
  )};
