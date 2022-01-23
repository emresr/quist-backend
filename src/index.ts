/* eslint-disable import/first */
import dotenv from "dotenv";

const result = dotenv.config();
if (result.error) {
   dotenv.config({ path: ".env.default" });
}

import util from "util";
import app from "./app";
import logger from "./logger";

const PORT = process.env.PORT || 4000;

let debugCallback = null;
if (process.env.NODE_ENV === "development") {
   debugCallback = (
      collectionName: string,
      method: string,
      query: any,
      doc: string
   ): void => {
      const message = `${collectionName}.${method}(${util.inspect(query, {
         colors: true,
         depth: null,
      })})`;
      logger.log({
         level: "verbose",
         message,
         consoleLoggerOptions: { label: "MONGO" },
      });
   };
}

const serve = app.listen(PORT, () => {
   logger.info(` Server is up at http://localhost:${PORT}🚀`);

   if (process.env.NODE_ENV === "development") {
      logger.info(
         `⚙️  Swagger UI hosted at http://localhost:${PORT}/dev/api-docs`
      );
   }
});
