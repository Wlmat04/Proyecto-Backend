import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Proyecto_Clinica",
      version: "1.0.0",
      description: "API de clinica",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

export default swaggerJsDoc(swaggerOptions);
