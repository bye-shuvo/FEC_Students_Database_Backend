const express = require("express");
const router = express.Router();
const pool = require("./database.js");

router.get("/search", (req, res) => {
  try {
    const searchUtils = req.query;
    const placeholders = Object.keys(searchUtils).map((key) => {
      return `${key} = ?`;
    }).join(" AND ");
    const values = Object.values(searchUtils).map((key) => {
      return key;
    });
    pool.query(
      `SELECT * FROM students WHERE ${placeholders ? placeholders : "1"}`,
      values,
      (err, result) => {
        if (err)
          return res.status(500).json({
            message: "Error while executing the query in database.",
            error: err.message,
          });

        if(result.length === 0){
          return res.status(200).json({
            message: "Request Successed !",
            warning: "No student Found!",
          });
        }

        res
          .status(200)
          .json({ message: "Request Executed Successfully!", data: result });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/create", (req, res) => {
  try {
    const data = req.body;
    const placeholders = Object.keys(data)
      .map((key) => {
        return `?`;
      })
      .join(",");
    const columns = Object.keys(data).join(",");
    const values = Object.values(data).map((key) => {
      return key;
    });
    pool.query(
      `INSERT INTO students (${columns}) VALUES (${placeholders})`,
      values,
      (err, result) => {
        if (err)
          return res.status(500).json({
            message: "Error while executing the query in database.",
            error: err.message,
            column: placeholders,
            values: values,
          });

        res
          .status(201)
          .json({ message: "Request Executed Successfully!", data: result });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Error while making the request",
      error: error.message,
    });
  }
});

module.exports = router;
