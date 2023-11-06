const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const cors = require('cors');

const app = express();
// 允许跨域请求
app.use(cors());


console.log("schema==", schema)
console.log("resolvers==", resolvers)
// 将GraphQL中间件添加到应用程序
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true
}));


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`GraphQL server is running on port ${PORT}`);
});
