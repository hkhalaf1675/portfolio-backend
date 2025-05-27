export default () => ({
    port: parseInt(process.env.PORT, 10),
    jwt: {
        secret: process.env.JWT_SECRET ?? 'secret key of jwt token',
        expiresIn: process.env.JWT_EXPIRES_IN ?? '1h'
    }
});