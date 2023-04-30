import http from "http";
import app from "./boot/app";
import graphql from "./boot/graphql";

const port: number = process.env.PORT ? Number(process.env.PORT) : 3500;

graphql(app).then((graphqlPath: string) =>
  console.log(`🚀 Server ready at http://localhost:${port}${graphqlPath}`)
);

const server = http.createServer(app);
const startServer = async () => {
  server.listen(port, () => {
    console.log(`HTTP server starter on port :${port}`);
  });
};

startServer();
