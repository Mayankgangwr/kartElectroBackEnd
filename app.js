const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const productController = require("./controllers/productController");

const app = express();
const PORT = process.env.PORT || 3500;

// Define the MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/KartElectro', { useNewUrlParser: true, useUnifiedTopology: true });

// Existing REST API routes
app.use("/api/products", require("./routes/productRoutes"));

// GraphQL setup
const typeDefs = gql`
   type Product {
      _id: ID!
      name: String!
      description: String!
      mrp: Float!
      price: Float!
      category: String!
      imageUrl: String!
      brand: String!
      rating: Float!
      numReviews: Int!
      countInStock: Int!
      createdAt: String!
      updatedAt: String!
   }

   type Query {
      products: [Product!]!
      product(id: ID!): Product
   }

   type Mutation {
      createProduct(name: String!, description: String!, mrp: Float!, price: Float!, category: String!, imageUrl: String!, brand: String!, countInStock: Int!): Product!
      updateProduct(id: ID!, name: String, description: String, mrp: Float, price: Float, category: String, imageUrl: String, brand: String, countInStock: Int): Product!
      deleteProduct(id: ID!): Product
   }
`;

const resolvers = {
   Query: {
      products: productController.getAllProducts,
      product: (_, { id }) => productController.getProductById({ params: { id } }),
   },
   Mutation: {
      createProduct: (_, args) => productController.createProduct({ body: args }),
      updateProduct: (_, args) => productController.updateProduct({ params: { id: args.id }, body: args }),
      deleteProduct: (_, { id }) => productController.deleteProduct({ params: { id } }),
   },
};

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
   await server.start();
   server.applyMiddleware({ app });
}

startServer().then(() => {
   app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
   });
});
