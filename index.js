const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const costumerJson1 = require('./data201.json')
const costumerJson2 = require('./data202.json')
const costumerJson3 = require('./data203.json')
const costumerJson4 = require('./data204.json')

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    costumers(municipio: String): [Costumer]
  }
  type Costumer {
    cnpj: String
    identificador: String
    razao: String
    fantasia: String
    situacaoCadastral: String
    dataSituacao: String
    codigoMotivo: String
    cnae: String
    adress: String
    cep: String
    estado: String
    municipio: String
    email: String
    ddd:String
    arrayTelefones: [String]
  }
`);

const costumersData = [...costumerJson1.data, ...costumerJson2.data, ...costumerJson3.data, ...costumerJson4.data]

const getCostumers = (args) => {
    if(args.municipio){
        const municipio = args.municipio
        return costumersData.filter(costumer => costumer.municipio === municipio)
    }
    return costumersData
}

// The root provides a resolver function for each API endpoint
const root = {
    costumers: getCostumers
};

const app = express();
app.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log('Running a GraphQL API server at http://localhost:4000/');
});