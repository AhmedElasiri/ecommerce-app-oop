const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

const ApiError = require("./server/utils/apiError");
const globalError = require("./server/middleware/errorMiddleware");
const DatabaseConnection = require("./server/database/dbConnection");
const { webhookCheckout } = require("./server/controller/orderController");
const mountRoutes = require("./server/routes");

dotenv.config({ path: "config.env" });

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 5000;

        this.connectDB();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.handleErrors();
    }

    async connectDB() {
        const db = new DatabaseConnection(process.env.DB_URI);
        await db.connect();
    }

    initializeMiddlewares() {
        this.app.use(cors());
        this.app.options("*", cors());

        this.app.use(compression());

        this.app.use(helmet());

        this.app.use(
            "/webhook-checkout",
            express.raw({ type: "application/json" }),
            webhookCheckout
        );

        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname, "uploads")));

        if (process.env.NODE_ENV === "development") {
            this.app.use(morgan("tiny"));
        }
    }

    initializeRoutes() {
        mountRoutes(this.app);

        this.app.all("*", (req, res, next) => {
            next(
                new ApiError(`Can't find this route: ${req.originalUrl}`, 400)
            );
        });
    }

    handleErrors() {
        this.app.use(globalError);

        process.on("unhandledRejection", (err) => {
            console.log("#".repeat(33));
            console.error(
                `Unhandled Rejection Error: ${err.name} | ${err.message}`
            );
            console.error("Shutting down....");
            process.exit(1);
        });
    }

    start() {
        this.app.listen(this.PORT, () => {
            console.log(`App is running on port ${this.PORT}`);
        });
    }
}

const server = new Server();
server.start();
