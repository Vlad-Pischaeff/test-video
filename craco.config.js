const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
    webpack: {
        alias: {
            '@store': resolvePath('./src/store'),
            '@compnts': resolvePath('./src/compnts'),
            '@assets': resolvePath('./src/assets')
        }
    },
}