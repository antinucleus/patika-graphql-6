const { users, events, locations, participants } = require("../../data.json");
const Query = {
    user: (_, args) => users.find((u) => u.id === +args.id),
    users: () => users,

    event: (_, args) => events.find((e) => e.id === +args.id),
    events: () => events,

    location: (_, args) => locations.find((l) => l.id === +args.id),
    locations: () => locations,

    participant: (_, args) => participants.find((p) => p.id === +args.id),
    participants: () => participants,
};

module.exports.Query = Query;