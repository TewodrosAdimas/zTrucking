interface AppConfig {
  useMockData: boolean;
  apiBaseUrl: string;
}

const config: AppConfig = {
  // Set this to `false` to fetch data from the API
  // Set this to `true` to use local mock data
  useMockData: true, // Change to `false` later to test API
  apiBaseUrl: 'https://jsonplaceholder.typicode.com', // A public API for testing
};

export default config;