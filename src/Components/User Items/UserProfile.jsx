import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { all } from "axios";
import { useSelector, useDispatch } from "react-redux";
import CreateStoryForm from "./CreateStoryForm";
import './UserProfile.css'
import FavPets from "./GettingFavs";

export const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [showFavPets, setShowFavPets] = useState(false);
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
  const [petList,setPetList] = useState([])
  const [favList, setFavList] = useState([])
  const [pet, setPet] = useState([]);
  const [petPic, setPetPic] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [isAppointmentsLoading, setIsAppointmentsLoading] = useState(false);
  const [appointmentsError, setAppointmentsError] = useState(null);
  const [showAppointments, setShowAppointments] = useState(false);
  const [petName,setPetName] = useState([])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/users/${userId}`);
        setFormData(response.data.user);
        setIsLoading(false);
        const res = await axios.get(`/api/pets/adopted/${userId}`)
        console.log(res)
          setPetList(res.data.pets.map((pets)=>{
            return pets
          }))

      } catch (error) {
        console.error("Error fetching user data", error);
        setError(error);
        setIsLoading(false);
      }
    };
    

    fetchUserData();
  }, [userId]);


  const fetchAppointments = async () => {
    if (showAppointments) {
      setShowAppointments(false);
      return;
    }
    try {
      setIsAppointmentsLoading(true);
      const response = await axios.get(`/api/appointments/users/${userId}`);
      console.log("pet ID", response.data.appointments[0]);

      const allAppointments = response.data.appointments.map((appt) => {
        console.log(appt);
        return (
          <div key={appt.appointmentId} className="appointment-card">
            <p> Appointment Date: {appt.date}</p>
            <img src={appt.pet.picture} style={{ width: "20%" }}></img>
            <p>Name: {appt.pet.name}</p>
          </div>
        );
      });
      setAppointments(allAppointments);
      setIsAppointmentsLoading(false);
      setShowAppointments(true);
    } catch (error) {
      console.error("Error fetching appointments", error);
      setAppointmentsError(error);
      setIsAppointmentsLoading(false);
    }
  };

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
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error Loading Profile</div>;
  }

  const toggleStoryForm = () => {
    setShowStoryForm(!showStoryForm)
  }

  const toggleFavPets = () => {
    setShowFavPets(!showFavPets)
  }

  

console.log(petName)
  return (
    <div className="user-profile-container">
      <h1>User Profile</h1>
      {isEditMode ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-button-group">
          <button type="submit">Save</button>
          <button type="button" onClick={toggleEditMode}>
            Cancel
          </button>
          <button onClick={handleDeleteAccount}>Delete My Account</button>
          </div>
        </form>
      ) : (
        <div>
          <p>First Name: {formData.firstName}</p>
          <p>Last Name: {formData.lastName}</p>
          <p>Email: {formData.email}</p>
          <p>Phone Number: {formData.phoneNumber}</p>
          <div>


          <button className="user-profile-button view-appointments-button" onClick={fetchAppointments}>
            {showAppointments ? 'Hide Appointments' : 'View Appointments'}
            </button>

          <button className="user-profile-button favorite-pets-button" onClick={toggleFavPets}>
          {showFavPets ? 'Hide Favorites' : 'View Favorites'}
          </button>
          <button className="user-profile-button share-story-button" onClick={toggleStoryForm}>
            {showStoryForm ? 'Hide Story Form' : 'Share Your Story'}
          </button>

          <button className="user-profile-button edit-button" onClick={toggleEditMode}>Edit</button>
          <button className="user-profile-button logout-button"onClick={handleLogout}>Logout</button>
          </div>
          {isAppointmentsLoading && <div>Loading Appointments...</div>}
          {appointmentsError && <div>Error Loading Appointments</div>}
          {showAppointments && !isAppointmentsLoading && appointments.length > 0 && (
            <div className="appointments-container">
              <h2>My Appointments</h2>
              {appointments}
            </div>
          )}
          {showFavPets && <FavPets favList={favList} setFavList={setFavList}/>}
          {showStoryForm && <CreateStoryForm userId={userId} petList={petList}/>}


        </div>
      )}
    </div>
  );
};

