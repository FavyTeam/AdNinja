import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST || 'localhost',
        name: 'adware',
        password: process.env.DB_USERNAME || 'admin',
        username: process.env.DB_PASSWORD || 'root',
        port: process.env.DB_PORT || '3306'
    },
    jwt: {
        secret: 'WALLET-TEST'
    }
};