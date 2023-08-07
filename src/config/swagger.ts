import 'dotenv/config'
import swaggerAutogen from 'swagger-autogen'

const port = process.env.PORT || 5000

const doc = {
  info: {
    version: '1.0.0',
    title: 'My API',
    description: 'Documentation of Auth Token and Refresh Token API',
  },
  host: `localhost:${port}`, // by default: 'localhost:3000'
  basePath: '/api/v1', // by default: '/'
  schemes: ['http'], // by default: ['http']
  consumes: ['application/json'], // by default: ['application/json']
  produces: ['application/json'], // by default: ['application/json']
  tags: [
    {
      name: '', // Tag name
      description: '', // Tag description
    },
  ],
  securityDefinitions: {}, // by default: empty object
  definitions: {}, // by default: empty object (Swagger 2.0)
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  }, // by default: empty object (OpenAPI 3.x)
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['src/routes.ts']

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  import('../app.js')
})
