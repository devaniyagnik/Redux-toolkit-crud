  import React, { useEffect } from "react";
  import "./Home.css"
  import noimage from "../images/No-Image.png"
  import { useDispatch, useSelector } from "react-redux";
  import { Link } from "react-router-dom";
  import { deleteData } from "../reducers/crudSlice";

  const Home = () => {
   // Get the data from the Redux store
  const data = useSelector((state) => state.crud.data);
  console.log(data);
  // Get the dispatch function to dispatch actions
  const dispatch = useDispatch();

  // Function to handle delete action
  const handleDelete = (index) => {
    dispatch(deleteData(index));
  };


    return (
      <div className="container mt-5">
        <div className="d-flex align-item-center justify-content-between pb-5">
          <h1>Main Application</h1>
          <div className="mt-3 d-flex align-item-center">
            <Link to="/addData">
              <button className="btn btn-success ">Add Data</button>
            </Link>
          </div>
        </div>
        <div className="list-group">
          <div className="row row-cols-lg-2 ">
            {data.map((item, index) => (
              <div className=" col-lg-6 col-12 p-0" key={index}>
              <div className=" list-group-item mx-2 my-2">
                <div className="d-flex align-items-center mobileview">
                  {/* Display image */}
                  {item.image ? (
                    <img
                      src={URL.createObjectURL(item.image)}
                      alt="User"
                      style={{ width: "150px", marginRight: "20px" }}
                    />
                  ): <img src={noimage} style={{ width: "150px", marginRight: "20px" }}></img>}
                  {/* Display other data */}
                  <div className="p-3">
                    <p className="mb-1">Fullname: {item.fullname}</p>
                    <p className="mb-1">Email: {item.email}</p>
                    <p className="mb-1">Contact: {item.contact}</p>
                    <p className="mb-1">DOB: {item.dob}</p>
                    <p className="mb-1">
                      Languages: {item.languages.join(",") || item.languages}
                    </p>
                    <p className="mb-1">Nationality: {item.nationality}</p>
                    <p className="mb-1">Gender: {item.gender}</p>
                  </div>
                </div>
                <div className="d-flex btnmobileview">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                  <Link to={`/updateData/${index}`}>
                    <button className="btn btn-primary btn-sm ml-2">Edit</button>
                  </Link>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default Home;
