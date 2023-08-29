const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "URL shortener API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple url shortener application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        url: "https://github.com/qobulovasror",
        email: "qobulovasror0@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: 'Development server',
      },
    ],
  },
  apis: ["./routes/*.js"],
};

export default options;