const app = require("./src/app");

const PORT = 3055;

const server = app.listen(PORT, () => {
  console.log(`WSV eCommerce is running on port ${PORT}`);
});

// process.on("SIGINT", () => {
//   server.close(() => {
//     console.log("Server closed");
//     // app.notify.send({
//     //   title: "Server Shutdown",
//     //   message: "The server has been gracefully shut down.",
//     // });
//   });
// });
