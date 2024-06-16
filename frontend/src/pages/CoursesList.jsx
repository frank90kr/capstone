import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("/api/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  return (
    <div className="mt-5">
      <h2>Courses List</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesList;
