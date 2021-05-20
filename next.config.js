module.exports = {
  target: "serverless",
  webpack: (config) => {
    // Add new rule to the configuration.
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    // Return the updated configuration.
    return config;
  },
};
