/** @type {import('jest').Config} */
const config = {
    preset: 'ts-jest', // Use ts-jest to handle TypeScript
    testEnvironment: 'node', // Default environment for Node.js
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files using ts-jest
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Recognize TS files
  };
  
  export default config;
  