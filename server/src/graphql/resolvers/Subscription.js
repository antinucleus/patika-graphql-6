const { filter, pipe } = require("@graphql-yoga/node");

const Subscription = {
    userCreated: {
        subscribe: (_, __, { pubSub }) => pubSub.subscribe("userCreated"),
        resolve: (payload) => payload
    },
    eventCreated: {
        subscribe: (_, __, { pubSub }) => pubSub.subscribe("eventCreated"),
        resolve: (payload) => payload
    },
    participantAdded: {
        subscribe: (_, args, { pubSub }) => pipe(
            pubSub.subscribe("participantAdded"),
            filter((payload) => !args.event_id || payload.event_id === args.event_id)
        ),
        resolve: (payload) => payload
    },
};

module.exports.Subscription = Subscription;