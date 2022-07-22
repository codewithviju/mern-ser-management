import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createNewUser,
  getSingleUser,
  fetchAllUsers,
  updateUser,
} from "../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";
const Edit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getSingleUser(id));
  }, []);

  const { user } = useSelector((state) => state.users);
  console.log(user);
  const [inputs, setInputs] = useState({
    name: user.name,
    email: user.email,
    gender: user.gender,
    phone: user.phone,
  });

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const formData = new FormData();

  formData.append("name", inputs.name);
  formData.append("email", inputs.email);
  formData.append("gender", inputs.gender);
  formData.append("phone", inputs.phone);
  formData.append("profile", file);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id, formData }));
    dispatch(fetchAllUsers());
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Edit</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  value={inputs.name}
                  onChange={(e) =>
                    setInputs({ ...inputs, [e.target.name]: e.target.value })
                  }
                  name="name"
                  id=""
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  onChange={(e) =>
                    setInputs({ ...inputs, [e.target.name]: e.target.value })
                  }
                  name="email"
                  value={inputs.email}
                  id="email"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="Gender">Gender</label>
                <div className="form-check form-check-inline m-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    onClick={(e) =>
                      setInputs({ ...inputs, [e.target.name]: e.target.value })
                    }
                    id="gender"
                    value="male"
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    onClick={(e) =>
                      setInputs({ ...inputs, [e.target.name]: e.target.value })
                    }
                    name="gender"
                    id="gender"
                    value="female"
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Female
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="name">Phone</label>
                <input
                  type="number"
                  name="phone"
                  value={inputs.phone}
                  onChange={(e) =>
                    setInputs({ ...inputs, [e.target.name]: e.target.value })
                  }
                  id=""
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Profile</label>
                <input
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setFileName(e.target.files[0].name);
                  }}
                  name="profile"
                  id=""
                  className="form-control"
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="submit"
                  name=""
                  id=""
                  value={"Submit"}
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
