import { JsonController, Get, Req, Res } from "routing-controllers";
import { Request, Response } from "express";

// Generic Class
import GenericResponse from "@/utils/GenericResponse";

// Response
import StatusCodes from "@/utils/httpResponseCode";

// Swagger
import { OpenAPI } from "routing-controllers-openapi";
enum Routes {
  ROOT = "/_",
  HEALTH = "/health",
}

@JsonController(Routes.ROOT)
class HealthCheck {
  @Get(Routes.HEALTH)
  @OpenAPI({ description: "Health Check" })
  health(@Req() req: Request, @Res() res: Response) {
    const response = new GenericResponse({ message: "Hey There!!" });
    return res.status(StatusCodes.OK).json(response.getBody());
  }
}

export default HealthCheck;
