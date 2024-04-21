import { useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import useRegistrationAPI from "../api/useRegistrationsAPI";
import "./profile.css";

export default function Profile({ currentUser, createPopUp }) {
  const nameInput = useInput("text", "Name");
  const emailInput = useInput("email", "Email");
  const birthdayInput = useInput("date", "Birthday");
  const [gender, setGender] = useState(null);
  const { updateUser } = useRegistrationAPI();

  useEffect(() => {
    if (currentUser) {
      setDefaults();
    }
  }, [currentUser]);

  function updateProfile() {
    let updatedInfo = {
      name: nameInput.value,
      email: emailInput.value,
    };
    console.log(birthdayInput.value);
    if (birthdayInput.value) {
      updatedInfo.birthday = birthdayInput.value;
    }
    if (gender) {
      updatedInfo.gender = gender;
    }
    updateUser(updatedInfo);
    createPopUp("Profile updated successfully.");
  }

  function setDefaults() {
    nameInput.setValue(currentUser.name);
    emailInput.setValue(currentUser.email);
    birthdayInput.setValue(currentUser.birthday || "");
    setGender(currentUser.gender || "");
  }

  const selectGender = (e) => {
    setGender(e.target.value);
  };

  if (currentUser) {
    return (
      <div className="profile-section">
        <h2>PROFILE</h2>
        <p>Manage your account information.</p>
        <br />

        <div className="input-wrapper text">{nameInput.input}</div>
        <br />
        <div className="input-wrapper text">{emailInput.input}</div>
        <br />

        <div className="input-wrapper text">{birthdayInput.input}</div>
        <br />

        <div className="input-wrapper radio">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={selectGender}
          />
          <label htmlFor="male">Male</label>
        </div>
        <div className="input-wrapper radio">
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={selectGender}
          />
          <label htmlFor="female">Female</label>
        </div>
        <div className="input-wrapper radio">
          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            checked={gender === "other"}
            onChange={selectGender}
          />
          <label htmlFor="other">Other</label>
        </div>
        <br />
        <button onClick={updateProfile}>Save</button>
      </div>
    );
  }
}
