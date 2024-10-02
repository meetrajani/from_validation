import React, { useEffect, useState } from "react";
import axios from "../Api/axios";
import { useParams } from "react-router-dom";

const User = () => {

  const { id } = useParams();
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios.get("/users").then((res) => {
      setdata(res.data || []);
    });
  }, []);

  const fliterdata = data.filter((item) => item.id === Number(id));

  return (
    <div className="container text-center">
      <h1>User Dashboard</h1>
      {fliterdata.map((i, index) => (
        <div key={index}>
          <h2>
            Your Name :- {i.firstName} {i.lastName}
          </h2>
          <h4>{i.task || "No task"}</h4>
        </div>
      ))}
    </div>
  );
};

export default User;
