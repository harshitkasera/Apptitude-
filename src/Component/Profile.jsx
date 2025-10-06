import React, { useState } from "react";
import './Style/Profile.css'

const Profile = () => {
  // ✅ State for editable name & photo
  const [name, setName] = useState("Harshit Kasera");
  const [photo, setPhoto] = useState(null);

  // 📸 Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };
  const userId = "USR12345";
  return (
    <div>
      {/* 🧑‍💻 Profile Section */}
      <div className="prof-box">
        <div className="pp">
          <img
            src={photo || "https://via.placeholder.com/120"}
            className="prof-dp"
          />
          <input
            type="file"
            onChange={handlePhotoChange}
          
          />

        <div>
          <h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              
              />
          </h2>
          <p className="pro-p">User ID- <span className="font-semibold">{userId}</span></p>
          <p className="pro-p">Joined- 12 Aug 2025</p>
              </div>
        </div>
      </div>
    
    <div>
      <img className="prof-img" src="./Images/profile.webp"/>
    </div>
    
    </div>
  );
};

export default Profile;
