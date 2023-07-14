//Importacion y configuracion de Mongoose para la conexion a la base de datos

const mongoose = require("mongoose");
const app = require("./app");
mongoose.set("strictQuery", true); //Supress warning

const {
    DB_USER,
    DB_HOST,
    DB_PASSWORD,
    API_VERSION,
    IP_SERVER,
} = require("./constants");

// Puerto donde se va a levantar el servidor
const PORT = process.env.PORT || 3977;

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`,
    (error) => {
        if (error) {
            throw error;
        } else {
            console.log("La conexion a la base de datos ha sido exitosa");
            app.listen(PORT, () => {
                console.log("######################");
                console.log("###### API REST ######");
                console.log("######################");
                console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}/`);
            });
        }
    },
);
