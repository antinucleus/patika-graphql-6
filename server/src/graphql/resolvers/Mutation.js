const { createMutation, updateMutation, deleteMutation, deleteAllMutation } = require("../../helpers");
const { users, participants, locations, events } = require("../../data.json");
const Mutation = {
    // User
    createUser: (_, { data }, { pubSub }) => createMutation(users, data, pubSub, "userCreated"),
    updateUser: (_, { id, data }) => updateMutation(users, id, data, "User"),
    deleteUser: (_, { id }) => deleteMutation(users, id, "User"),
    deleteAllUsers: () => deleteAllMutation(users),

    // Participant
    createParticipant: (_, { data }, { pubSub }) => createMutation(participants, data, pubSub, "participantAdded"),
    updateParticipant: (_, { id, data }) =>
        updateMutation(participants, id, data, "Participant"),
    deleteParticipant: (_, { id }) =>
        deleteMutation(participants, id, "Participant"),
    deleteAllParticipants: () => deleteAllMutation(participants),

    // Location
    createLocation: (_, { data }) => createMutation(locations, data),
    updateLocation: (_, { id, data }) =>
        updateMutation(locations, id, data, "Location"),
    deleteLocation: (_, { id }) => deleteMutation(locations, id, "Location"),
    deleteAllLocations: () => deleteAllMutation(locations),

    // Event
    createEvent: (_, { data }, { pubSub }) => createMutation(events, data, pubSub, "eventCreated"),
    updateEvent: (_, { id, data }) => updateMutation(events, id, data, "Event"),
    deleteEvent: (_, { id }) => deleteMutation(events, id, "Event"),
    deleteAllEvents: () => deleteAllMutation(events),
};

module.exports.Mutation = Mutation;