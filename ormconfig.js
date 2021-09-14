module.exports = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "latihan_nestjs",
    entities: [],
    synchronize: true,
    dropSchema: false,
    logging: true,
    entities: ['src/**/*.entity.ts', 'dist/**/*.entity.js'],
};