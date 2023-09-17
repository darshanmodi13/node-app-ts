import validateEnv from "@utils/envalid";
import "reflect-metadata";
import { App } from "@/app";

// ENV setup
validateEnv();

const app = new App();

// Starting Server
app.listen();
