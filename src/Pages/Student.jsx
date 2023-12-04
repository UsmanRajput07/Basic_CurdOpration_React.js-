import React, { useEffect, useState } from "react";

export default function Student() {
  const [students, setStudents] = useState([]);
  const [studentname, setStudentname] = useState("student");

  const Submit = () => {
    const payload = {
      data: {
        name: studentname,
      },
    };
    fetch(`http://localhost:1337/api/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetch(`http://localhost:1337/api/students`, {
      method: "Get",
    })
      .then((res) => res.json())
      .then((data) => {
        const obj = data.data;
        const newobj = obj.map((cv) => {
          return {
            id: cv.id,
            name: cv.attributes.name,
          };
        });
        setStudents(newobj);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="container">
        <h1>Create Student</h1>
        <form>
          <select className="form-select mb-5" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Enter name
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={studentname}
              onChange={(e) => setStudentname(e.target.value)}
              aria-describedby="useranHelp"
            />
          </div>
          <button type="Button" className="btn btn-primary" onClick={Submit}>
            Submit
          </button>
        </form>
        <br />
        <hr />
        <br />
        <table className="table-primary table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((cv, index) => {
              return (
                <tr>
                  <th scope="row">{cv.id}</th>
                  <td>{cv.name}</td>
                  <td>
                    <button className="btn btn-success btn-sm">View</button>
                    <button className="btn btn-primary btn-sm">Edit</button>
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
