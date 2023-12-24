import { server, PORT } from "./server/server.js";

server.listen(PORT, () => {

  console.log("Listening on port: " + process.env.PORT);
});
