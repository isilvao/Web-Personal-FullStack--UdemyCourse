const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const {
    DB_USER,
    DB_HOST,
    DB_PASSWORD,
    API_VERSION,
    IP_SERVER,
} = require("./constants");

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`,
    (error) => {
        if (error) {
            throw error;
        } else {
            console.log("La conexion a la base de datos ha sido exitosa");
        }
    },
);
