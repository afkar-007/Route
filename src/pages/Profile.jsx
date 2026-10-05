import React, { useEffect, useState } from "react";
import Navbar from "../components/Nav";
import "../styles/Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const id = localStorage.getItem("id");

      const response = await fetch(
        `https://route66-backend-1-v5us.onrender.com/user/getOneUser/${id}`,
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setUser(data.oneUser);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="route66-profile-page">
          <div className="profile-loading">
            <i className="bi bi-arrow-repeat"></i>
            <p>Loading profile...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="route66-profile-page">
        <div className="profile-container">
          {/* PROFILE HEADER */}

          <div className="profile-cover">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* PROFILE DETAILS */}

          <div className="profile-details">
            <h1>{user?.name}</h1>

            <p className="profile-email">
              <i className="bi bi-envelope"></i>
              {user?.email}
            </p>

            <div className="profile-info">
              <div className="profile-info-item">
                <i className="bi bi-person"></i>

                <div>
                  <span>Name</span>
                  <p>{user?.name}</p>
                </div>
              </div>

              <div className="profile-info-item">
                <i className="bi bi-envelope"></i>

                <div>
                  <span>Email</span>
                  <p>{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
