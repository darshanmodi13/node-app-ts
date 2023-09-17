import BaseError from "./BaseError";
import StatusCodes from "@/utils/httpResponseCode";

export default class NotFoundError extends BaseError {
  statusCode: number = StatusCodes.NOT_FOUND;
  message: string;

  constructor(message: string = "Not Found") {
    super(message);
    this.message = message;
  }
}
