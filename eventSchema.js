// eventSchema.js
const { buildSchema } = require('graphql');

// Créer un schéma GraphQL
const eventSchema = buildSchema(`
    type Query {
        event(id: Int!): Event
        events: [Event]
    }
    type Mutation {
        addEvent(name: String!, categorie: String!): Event
        deleteEvent(id: Int!): Int
    }
    type Event {
        id: Int
        name: String
        categorie: String
        
    }
    type DeleteEventResponse {
        message: String
      }
`);
module.exports = eventSchema;