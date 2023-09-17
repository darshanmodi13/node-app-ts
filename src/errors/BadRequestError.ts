import BaseError from "./BaseError";
import StatusCodes from "@/utils/httpResponseCode";

export default class BadRequestError extends BaseError {
  statusCode: number = StatusCodes.BAD_REQUEST;
  message: string;

  constructor(message: string = "Not Found") {
    super(message);
    this.message = message;
  }
}
