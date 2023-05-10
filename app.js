/** Simple demo Express app. */

const express = require("express");
const app = express();

const { findMean, findMedian, findMode } = require("./stats.js");
const { convertStrNums } = require("./utils.js");

// useful error class to throw
const { NotFoundError } = require("./expressError");

app.use(express.json());

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  console.log(req.query.nums)
  //potentially use gaurd statement
  //pull out the numbers using the appropriate request method
  //req.params.nums -> string at first that we need to convert with
  //perform the calculation using the calculation function in stats.js
  const numArray = req.query.nums.split(',')
  const numbers = convertStrNums(numArray);
  const value = findMean(numbers);

  return res.json({
    response: {
      operation: "mean",
      value,
    }
  })
});

/** Finds median of nums in qs: returns {operation: "median", result } */

/** Finds mode of nums in qs: returns {operation: "mean", result } */

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;
