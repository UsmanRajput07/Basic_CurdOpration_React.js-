import React, { useEffect, useReducer, useState } from "react";

export default function Student() {
  const [students, setStudents] = useState([]);
  const [studentname, setStudentname] = useState("student");
  const [teachersname, setTeachersname] = useState([]);
  const [teacherid, setTeacherid] = useState([])

  //  this method is used to render a new table row when we are hit the post api
  const [render, forceUpdate] = useReducer(x=>x+1, 0);

  const Submit = () => {
    const payload = {
      data: {
        name: studentname,
        teachers: teacherid
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
      // forceUpdate()})
      .then((data) => {
        console.log("Studes post",data.data);
        forceUpdate();
      })
      .catch((err) => console.log(err));
  };

  // delete Student

  const DeleteStudent = (e) => {
    const deleteitemid = e.target.closest("tr").querySelector("th").innerHTML;
    const removeitem = e.target.closest("tr");
    const deleteitem = window.confirm("do ypu want to delete");
    if (deleteitem === true) {
      fetch(`http://localhost:1337/api/students/${deleteitemid}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => removeitem.remove())
        .catch((err) => console.log(err));
    }
  };

  //  
  const  handleChange=(selectItem)=>{
    const teachresIDS = [];
    for(let i=0; i<selectItem.length; i++){
      teachresIDS.push(parseInt(selectItem[i].value))
    }
    setTeacherid((teachresIDS))
  }
  useEffect(() => {
    fetch(`http://localhost:1337/api/students?populate=*`, {
      method: "Get",
    })
      .then((res) => res.json())
      .then((data) => {
        const obj = data.data;
        setStudents(obj);
      })
      .catch((err) => console.log(err));

    // show teachers
    fetch(`http://localhost:1337/api/teachers`, {
      method: "GET",
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
        setTeachersname(newobj);
      });
  }, [render]);
  return (
    <>
      <div className="container">
        <h1>Create Student</h1>
        <form>
          <select
            multiple={true}
            id="teacher"
            name="teacher[]"
            className="form-select mb-5"
            aria-label="Default select example"
            onChange={(e)=>{handleChange(e.target.selectedOptions)}}
          >
            {teachersname.map((cv,idx) => {
              return <option key={idx} value={cv.id} >{cv.name}</option>;
            })}
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
              <th scope="col">teachres</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody id="Student">
            {students.map((cv, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{cv.id}</th>
                  <td>{cv.attributes.name}</td>

                  <td id="teacher">
                    {cv.attributes.teachers.data.map((cv2) => {
                      return cv2.attributes.name + " ";
                    })}
                  </td>
                  <td>
                    <button className="btn btn-success btn-sm">View</button>
                    <button className="btn btn-primary btn-sm">Edit</button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(e) => {
                        DeleteStudent(e);
                      }}
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
    </>
  );
}
