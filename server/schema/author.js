import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import _ from "lodash";
import BookType from './book.js'
import { books } from "./data.js";
import Book from "../models/book.js";

export default new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books:{
      type: new GraphQLList(BookType),
      async resolve(parent,args){
        return Book.find({ authorId: parent.id });
      }
    }
  }),
});
