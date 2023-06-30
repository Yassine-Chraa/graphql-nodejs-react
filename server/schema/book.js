import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import _ from "lodash";
import AuthorType from "./author.js";
import { authors } from "./data.js";
import Author from "../models/author.js";

export default new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      async resolve(parent, args) {
        return await Author.findById(parent.authorId);
      },
    },
  }),
});
