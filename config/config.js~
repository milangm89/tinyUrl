var config = {
    production: {
        database: 'mongodb://127.0.0.1:27017/tinyurl',
        port: '3030'
    },
    staging: {
        database: 'mongodb://127.0.0.1:27017/tinyurl',
        port: '3010'
    },
    default: {
        database: 'mongodb://127.0.0.1:27017/tinyurl',
        port: '3000'
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}