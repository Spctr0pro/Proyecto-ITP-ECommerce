import express from "express";
import cookieParser from "cookie-parser";
import paths from "./utils/paths.js";

import { config as configDotenv } from "./config/dotenv.config.js";
import { config as configHandlebars } from "./config/handlebars.config.js";
import { config as configSocket } from "./config/socket.config.js";
import { config as configPassport } from "./config/passport.config.js";
import { config as configCORS } from "./config/cors.config.js";
import { connectDB } from "./config/mongoose.config.js";

import apiAuthRouter from "./routers/api/auth.routes.js";
import apiSessionRouter from "./routers/api/session.router.js";
import apiCartRouter from "./routers/api/cart.router.js";
import apiProductRouter from "./routers/api/product.router.js";
import apiUserRouter from "./routers/api/user.router.js";

import CartViewRouter from "./routers/carts.view.router.js";
import ProductViewRouter from "./routers/products.view.router.js";
import HomeViewRouter from "./routers/home.view.router.js";
import LoginViewRouter from "./routers/login.view.router.js";

const server = express();
configDotenv(paths);
connectDB();

// Decodificadores del BODY
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Decodificadores de Cookies
server.use(cookieParser(process.env.SECRET_KEY));

// Declaración de ruta estática
server.use("/public", express.static(paths.public));

// Motor de plantillas
configHandlebars(server);

// Passport
configPassport(server);

// Conexión con la Base de Datos

console.log(process.env.FRONTEND_HOST);

configCORS(server);

server.use("/login", new LoginViewRouter().getRouter());
server.use("/products", new ProductViewRouter().getRouter());
server.use("/carts", new CartViewRouter().getRouter());
server.use("/", new HomeViewRouter().getRouter());

server.use("/api/auth", new apiAuthRouter().getRouter());
server.use("/api/carts", new apiCartRouter().getRouter());
server.use("/api/products", new apiProductRouter().getRouter());
server.use("/api/sessions", new apiSessionRouter().getRouter());
server.use("/api/users", new apiUserRouter().getRouter());

// Control de rutas inexistentes
server.use("*", (req, res) => {
    res.status(404).send("<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>");
});

// Control de errores internos
server.use((error, req, res) => {
    console.log("Error:", error.message);
    res.status(500).send("<h1>Error 500</h1><h3>Se ha generado un error en el servidor</h3>");
});

// Método oyente de solicitudes
const serverHTTP = server.listen(process.env.PORT, () => {
    console.log(`Ejecutándose en http://localhost:${process.env.PORT}`);
});

// Servidor de WebSocket
configSocket(serverHTTP);