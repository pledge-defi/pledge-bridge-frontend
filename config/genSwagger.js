const openAPI = require('@umijs/openapi');

openAPI.generateService({
  requestImportStatement: 'import request from "@/utils/request";',
  schemaPath: `${__dirname}/swagger.json`,
  serversPath: './src/services/pledge/',
  mockFolder: './mock',
});
