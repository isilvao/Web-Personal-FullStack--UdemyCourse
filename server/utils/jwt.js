const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constants");

function createAccessToken(user) {
    const expToken = new Date();
    expToken.setHours(expToken.getHours() + 3);

    const payload = {
        token_type: "access",
        user_id: user._id,
        iat: Date.now(), //Fecha de creacion del token
        exp: expToken.getTime(), //Fecha de expiracion del token
    };

    return jwt.sign(payload, JWT_SECRET_KEY);
}

function createRefreshToken(user) {
    //Se actualiza mensualmente, es para que el usuario no tenga que loguearse cada vez que se le caduca el token
    const expToken = new Date();
    expToken.setMonth(expToken.getMonth() + 1);

    const payload = {
        token_type: "refresh",
        user_id: user._id,
        iat: Date.now(), //Fecha de creacion del token
        exp: expToken.getTime(), //Fecha de expiracion del token
    };

    return jwt.sign(payload, JWT_SECRET_KEY);
}

function decodeToken(token) {
    return jwt.decode(token, JWT_SECRET_KEY, true);
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    decodeToken,
};
