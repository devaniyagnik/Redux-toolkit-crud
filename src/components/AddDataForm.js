import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addData } from "../reducers/crudSlice";

const AddDataForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    fullname: "",
    contact: "",
    email: "",
    gender: "",
    dob: "",
    languages: [],
    nationality: "",
    image: null,
  });

  // Redux dispatch function
  const dispatch = useDispatch();

  // React Router navigate function
  const navigate = useNavigate();

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "file") {
      // Update the image field with the selected file
      setFormData((prevState) => ({
        ...prevState,
        [name]: e.target.files[0],
      }));
    } else if (type === "checkbox") {
      // Handle changes in the languages checkboxes
      if (checked) {
        setFormData((prevState) => ({
          ...prevState,
          languages: [...prevState.languages, value],
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          languages: prevState.languages.filter((lang) => lang !== value),
        }));
      }
    } else {
      // Update other form fields
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.languages);
    // Dispatch the addData action with the form data
    if (formData.languages.length === 0) {
      alert("Please select a language");
    } else {
      dispatch(addData(formData));
      console.log(formData);
      // Navigate to the home page after form submission
      navigate("/");
    }
  };
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Add Data</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullname">Fullname:</label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact:</label>
          <input
            type="tel"
            className="form-control"
            id="contact"
            name="contact"
            title="Please use a 10 digit telephone number with no dashes or dots"
            pattern="[0-9]{10}"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <div>
            <label
              className="form-check-label"
              style={{ marginRight: "100px", marginLeft: "25px" }}
            >
              <input
                type="radio"
                className="form-check-input"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                required
              />
              Male
            </label>
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
                required
              />
              Female
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="dob">DOB:</label>
          <input
            type="date"
            className="form-control"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Languages:</label>
          <div>
            <label
              className="form-check-label "
              style={{ marginRight: "100px", marginLeft: "25px" }}
            >
              <input
                type="checkbox"
                className="form-check-input"
                name="languages"
                value="English"
                checked={formData.languages.includes("English")}
                onChange={handleChange}
              />
              English
            </label>
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                name="languages"
                value="Gujarati"
                checked={formData.languages.includes("Gujarati")}
                onChange={handleChange}
              />
              Gujarati
            </label>
          </div>
        </div>

        <div className="form-group ">
          <label htmlFor="nationality">Nationality:</label>
          <select
            className="form-control "
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            required
          >
            <option value="">Select Nationality</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            className="form-control-file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />

          {formData.image && (
            <img
              width="100px"
              src={URL.createObjectURL(formData.image)}
              alt="Selected"
              className="mt-3 img-thumbnail"
            />
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddDataForm;
