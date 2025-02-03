// If the user who interacted with the bot has a nickname,
// returns that. Otherwise returns their global name
export function getInteractionUserGuildName(interaction){
  if (!interaction) throw new Error("Interaction is undefined or null");
  if (!interaction.member && !interaction.user) throw new Error("Interaction user is undefined or null");
  return interaction.member.nickname ?? interaction.user.globalName;
}