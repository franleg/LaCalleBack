import dotenv from 'dotenv';

dotenv.config();

export default {
    app: {
        DOMAIN: process.env.DOMAIN,
        PORT: process.env.PORT
    },
    mongo: {
        USER: process.env.MONGO_USER,
        PWD: process.env.MONGO_PASSWORD,
        DB: process.env.MONGO_DATABASE || ''
    },
    jwt: {
        SECRET: process.env.JWT_SECRET,
        COOKIE: process.env.JWT_COOKIE,
    },
    admin: {
        NAME: process.env.ADMIN_NAME,
        LASTNAME: process.env.ADMIN_LASTNAME,
        EMAIL: process.env.ADMIN_EMAIL,
        PWD: process.env.ADMIN_PASSWORD,
    },
    mercadoPago: {
        access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
    }
}
