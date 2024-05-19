const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const { testConnection } = require('./db_query');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost'
    });

    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);

    // memastikan terhubung dengan database
    testConnection;
}

init();