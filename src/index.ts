if (process.env.NODE_ENV !== "production") require("dotenv").config();

import bot from "./core/bot";
import bootstrap from "./utils/bootstrap";
import { Launch } from "./utils/launch";

bootstrap(bot);

const launch = new Launch(bot);
process.env.NODE_ENV === "development" ? launch.development() : launch.production();
