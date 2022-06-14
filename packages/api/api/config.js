const config = {
    secrets: {
        jwt: 'testjwtauthtoken',
        jwtExp:  60 * 60 * 12 //lasts 12 hours
    },
};

module.exports = config;