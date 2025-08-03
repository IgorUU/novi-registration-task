module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: "8.0.12",
      skipMD5: true,
    },
    instance: {
      dbName: "jest",
    },
    autoStart: false,
  },
};
