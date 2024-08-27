import express from "express";
import cookieParser from "cookie-parser";
import paths from "./utils/paths.js";

import { config as dotenvConfig } from "dotenv";
import { connectDB } from "./config/mongoose.config.js";
import { config as configHandlebars } from "./config/handlebars.config.js";
import { config as configPassport } from "./config/passport.config.js";
import { config as configSocket } from "./config/socket.config.js";

// import LoginRouter from "./routes/login.routes.js";
// import ProductRouter from "./routes/products.routes.js";
import ApiUserRouter from "./routers/api/user.router.js";
import ApiAuthRouter from "./routes/api/auth.routes.js";
// import CartRouter from "./routes/carts.routes.js";

// import ApiCartRouter from "./routes/api/cart.routes.js";
import ApiCartRouter from "./routers/api/cart.router.js";
import ApiProductRouter from "./routers/api/product.router.js";
// import HomeRouter from "./routes/home.routes.js";

const server = express();
// Decodificadores del BODY
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Decodificadores de Cookies
server.use(cookieParser(process.env.SECRET_KEY));

// Declaración de ruta estática
server.use("/public", express.static(paths.public));

// Variables de entorno
dotenvConfig({ path: paths.env });

// Motor de plantillas
configHandlebars(server);

// Passport
configPassport(server);

// Conexión con la Base de Datos
connectDB();

// Enrutadores
// server.use("/session", new LoginRouter().getRouter())
// server.use("/products", new ProductRouter().getRouter());
// server.use("/carts", new CartRouter().getRouter());
// server.use("/", new HomeRouter().getRouter());

server.use("/api/auth", new ApiAuthRouter().getRouter());
server.use("/api/carts", new ApiCartRouter().getRouter());
server.use("/api/products", new ApiProductRouter().getRouter());
server.use("/api/users", new ApiUserRouter().getRouter());


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