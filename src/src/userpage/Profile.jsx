import { useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import useRegistrationAPI from "../api/useRegistrationsAPI";

export default function Profile({ currentUser }) {
  const [editMode, setEditMode] = useState(0);
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

  function toggleEdit() {
    setEditMode(editMode == 0 ? 1 : 0);
    setDefaults();
  }

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
    toggleEdit();
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

  if (currentUser && editMode == 0) {
    return (
      <div>
        <div>Name: {currentUser.name}</div>
        <div>Email: {currentUser.email}</div>
        <div>Birthday: {currentUser.birthday}</div>
        <div>Gender: {currentUser.gender}</div>
        <button onClick={toggleEdit}>EDIT</button>
      </div>
    );
  } else if (currentUser && editMode == 1) {
    return (
      <div>
        <div>{nameInput.input}</div>
        <div>{emailInput.input}</div>
        <div>{birthdayInput.input}</div>
        <div>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={selectGender}
          />
          <label htmlFor="male">Male</label>

          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={selectGender}
          />
          <label htmlFor="female">Female</label>

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
        <button onClick={updateProfile}>Save</button>
        <button onClick={toggleEdit}>Cancel</button>
      </div>
    );
  }
}
