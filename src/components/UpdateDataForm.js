import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateData } from "../reducers/crudSlice";

const UpdateDataForm = () => {
  // Get the id parameter from the URL
  const { id } = useParams();

  // Get the data for the specific item from the Redux store
  const data = useSelector((state) => state.crud.data[id]);

  // Set up the form data state using useState
  const [formData, setFormData] = useState(data);

  // Get the dispatch function to dispatch actions
  const dispatch = useDispatch();

  // Get the navigate function from React Router
  const Navigate = useNavigate();

  // useEffect hook to update form data when data changes
  useEffect(() => {
    // Update the form data with the fetched data from the Redux store
    if (data) {
      setFormData(data);
      // console.log(data);
    }
  }, [data]);

  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'file') {
      // Update the form data with the selected file
      setFormData((prevState) => ({
        ...prevState,
        [name]: e.target.files[0],
      }));
    } else if (type === 'checkbox') {   
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
    // Dispatch the updateData action with the updated form data and id
    if (formData.languages.length === 0) {
      alert("Please select a language");
    } else {
    dispatch(updateData( { id: 0, data: formData } ));
    // console.log(formData);
    // Navigate back to the home page after form submission
    Navigate('/');
    }
  };

  // JSX code for rendering the form
  return (
    <div className="container mt-4">
      <h1>Update Data</h1>
      <form onSubmit={handleSubmit}>
        {/* Fullname */}
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">Fullname:</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Contact */}
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">Contact:</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            title="Please use a 10 digit telephone number with no dashes or dots" pattern="[0-9]{10}"
            value={formData.contact}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label className="form-label">Gender:</label>
          <div className="form-check">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
              className="form-check-input"
              required
            />
            <label htmlFor="male" className="form-check-label">Male</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
              className="form-check-input"
              required
            />
            <label htmlFor="female" className="form-check-label">Female</label>
          </div>
        </div>

        {/* DOB */}
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">DOB:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Languages */}

        
        <div className="mb-3">
          <label className="form-label">Languages:</label>
          <div className="form-check">
          

            <input
              type="checkbox"
              id="english"
              name="languages"
              value="English"
              checked={formData.languages.includes('English')}
              onChange={handleChange}
              className="form-check-input"
            />
            <label htmlFor="english" className="form-check-label">English</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="Gujarati"
              name="languages"
              value="Gujarati"
              checked={formData.languages.includes('Gujarati')}
              onChange={handleChange}
              className="form-check-input"
            />
            <label htmlFor="Gujarati" className="form-check-label">Gujarati</label>
          </div>
          {/* Add more languages as needed */}
        </div>

        {/* Nationality */}
        <div className="mb-3">
          <label htmlFor="nationality" className="form-label">Nationality:</label>
          <select
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Nationality</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Image */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="form-control"
            required={!formData.image}
          />
        </div>

        {/* Display the selected image */}
        {formData.image && (
          <div className="mb-3">
            <img src={URL.createObjectURL(formData.image)} alt="Selected" style={{ width: '100px' }} />
          </div>
        )}

        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};


export default UpdateDataForm;
