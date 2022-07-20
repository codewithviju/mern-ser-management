import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchAllUsers } from "../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";
import moment from "moment";

console.log(moment);
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  const { users, loading } = useSelector((state) => state.users);

  if (loading) {
    return <h1>Loading</h1>;
  }
  console.log(users);
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12">
            <div>
              <button
                onClick={() => navigate("/register")}
                className="btn btn-primary"
              >
                Add Student
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Created</th>
                  <th>Profile</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((item) => {
                    return (
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.gender}</td>
                        <td>{item.phone}</td>
                        <td>{moment(item.createdAt).endOf("day").fromNow()}</td>
                        <td>
                          <img
                            src={`http://localhost:9000/${item.profile}`}
                            height="100px"
                            width={"100px"}
                          />
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              dispatch(deleteUser(item._id));
                              dispatch(fetchAllUsers());
                            }}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
