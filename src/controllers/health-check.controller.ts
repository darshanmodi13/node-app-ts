import { Controller, Get, Req, Res } from "routing-controllers";
import { Request, Response } from "express";

// Generic Class
import GenericResponse from "@/utils/GenericResponse";

// Response
import StatusCodes from "@/utils/httpResponseCode";

enum Routes {
  ROOT = "/_",
  HEALTH = "/health",
}

@Controller(Routes.ROOT)
class HealthCheck {
  @Get(Routes.HEALTH)
  health(@Req() req: Request, @Res() res: Response) {
    const response = new GenericResponse({ message: "Hey There!!" });
    return res.status(StatusCodes.OK).json({ message: "Hey There..." });
  }
}

export default HealthCheck;
