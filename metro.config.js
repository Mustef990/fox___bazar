const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add TypeScript extensions to source extensions
config.resolver.sourceExts.push('ts', 'tsx');

// Enable symlinks and modern module resolution
config.resolver.unstable_enableSymlinks = true;
config.resolver.unstable_conditionNames = ['require', 'import', 'react-native', 'browser'];

module.exports = config;