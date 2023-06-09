import { constants } from "../constants.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stactTrace: err.stack,
      });
      break;

    case constants.UNAUTHORISED:
      res.json({
        title: "Unauthorised",
        message: err.message,
        stactTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stactTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stactTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stactTrace: err.stack,
      });
      break;

    default:
        console.log("No error. All good!");
      break;
  }
};

export default errorHandler;
