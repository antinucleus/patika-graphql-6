const { events } = require("../../data.json");

const User = {
    events: (parent) => events.filter((e) => e.user_id === +parent.id),
};
module.exports.User = User;