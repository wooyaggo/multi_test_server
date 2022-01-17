module.exports = {
    apps: [{
        name: "App",
        script: "./bin/index.js",
        env_production: {
            NODE_ENV: "production",
        },
        env_development: {
            NODE_ENV: "development",
        },
        watch: [
            "./bin/",
        ],
    }]
}
