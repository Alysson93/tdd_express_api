module.exports = {
    test: {
        client: 'sqlite3',
        connection: {
            filename: './banco_de_teste.db'
        },
        migrations: {
            directory: 'src/db/migrations'
        }
    }
}