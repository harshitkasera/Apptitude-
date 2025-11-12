import React, { useState, useEffect } from "react";
import "./Style/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);

useEffect(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
    setUser(JSON.parse(userData));
  }
}, []);



  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  if (!user) {
    return <h2>Loading user profile...</h2>;
  }
  if (!user.createdAt) {
  user.createdAt = new Date().toISOString();
}


  return (
    <div>
      <div className="prof-box">
        <div className="pp">
          <img
            src={photo || user.photo || "https://via.placeholder.com/120"}
            alt="profile"
            className="prof-dp"
          />
          <input type="file" onChange={handlePhotoChange} />

          <div>
            <h2>{user.name}</h2>
            <p className="pro-p">
              User ID: <span className="font-semibold">{user._id}</span>
            </p>
            <p className="pro-p">Email: {user.email}</p>
            <p className="pro-p">
           Joined: {user.createdAt ? new Date(user.createdAt).toDateString() : "Date not available"}
            {console.log("User data:", user)}
            </p> 
          </div>
        </div>
      </div>

      <div>
        <img className="prof-img" src="./Images/profile.webp" alt="banner" />
      </div>
    </div>
  );
};

export default Profile;
