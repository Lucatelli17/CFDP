module.exports = {
  projectId: "15v9ds",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalRunAllSpecs: true,
    defaultCommandTimeout: 20000,
  },
  retries: { openMode: 0 },
  watchForFileChanges: true,
};
