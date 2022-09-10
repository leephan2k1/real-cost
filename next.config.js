const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,

    webpack: (config) => {
        config.resolve.alias['~'] = path.resolve(__dirname, 'src');

        return config;
    },

    images: {
        domains: [
            'salt.tikicdn.com',
            'vn-test-11.slatic.net',
            'filebroker-cdn.lazada.vn',
            'sg-live-01.slatic.net',
            'vn-live-01.slatic.net',
            'my-live-01.slatic.net',
            'sg-test-11.slatic.net',
            'my-test-11.slatic.net',
            'cf.shopee.vn',
        ],
    },
};
