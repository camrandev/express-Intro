const { BadRequestError } = require("./expressError");

/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  let nums = [];

  for (const num of strNums) {
    if (typeof Number.parseFloat(num) != "number" ||
      isNaN(Number.parseFloat(num))) {
      throw new BadRequestError(`${num} is not a number`);
    }
    nums.push(Number.parseFloat(num));
  }

  return nums;

  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
}

module.exports = { convertStrNums };
