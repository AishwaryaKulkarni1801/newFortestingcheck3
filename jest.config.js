const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  preset: 'jest-preset-angular',
  
  // Setup files to run before tests
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  
  // Test environment
  testEnvironment: 'jsdom',
  
  // Root directory for tests
  roots: ['<rootDir>/src/'],
  
  // File extensions to consider for module resolution
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  
  // Module name mapping for path resolution
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@env/(.*)$': '<rootDir>/src/environments/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    // Handle CSS and SCSS imports
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  
  // Transform files
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$'
      }
    ]
  },
  
  // Files to ignore during transformation
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$|@angular|@ngrx|ngx-)'
  ],
  
  // Test file patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(ts|js)',
    '<rootDir>/src/**/*.(test|spec).(ts|js)'
  ],
  
  // Files to collect coverage from
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/app/**/*.module.ts',
    '!src/app/**/*.interface.ts',
    '!src/app/**/*.model.ts',
    '!src/app/**/*.enum.ts',
    '!src/app/**/*.d.ts',
    '!src/app/**/*.config.ts',
    '!src/app/**/index.ts'
  ],
  
  // Coverage output configuration
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text-summary', 'lcov'],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Restore mocks after each test
  restoreMocks: true,
  
  // Verbose output
  verbose: true,
  
  // Error on deprecated features
  errorOnDeprecated: true
};