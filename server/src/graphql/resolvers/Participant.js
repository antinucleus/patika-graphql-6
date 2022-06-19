const { users } = require("../../data.json");

const Participant = {
  user: (parent) => users.find((u) => u.id === +parent.user_id),
};
module.exports.Participant = Participant;
