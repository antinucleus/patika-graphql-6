const { users, locations, participants } = require("../../data.json");
const Event = {
    user: (parent) => users.find((u) => u.id === +parent.user_id),
    location: (parent) => locations.find((l) => l.id === +parent.location_id),
    participants: (parent) =>
        participants.filter((p) => p.event_id === +parent.id),
};
module.exports.Event = Event;