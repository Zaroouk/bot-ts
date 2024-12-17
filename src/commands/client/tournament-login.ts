import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
  TextChannel,
} from "discord.js";
import { Command } from "../../lib/types";
import { GetUserCharactersData } from "../../utils/EnkaClient";
import { EmbedResponseCharactersFullInfo } from "../../utils/embeds";

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName("tournament")
    .setDescription("register user for tournament")
    .setDMPermission(false)
    .addStringOption((opt) =>
      opt
        .setName("uid")
        .setDescription("the bot will store the uid for the tournament")
        .setRequired(true)
    ),

  async execute(client, interaction) {
    const messageOption = interaction.options.getString("uid", true);

    const channel = interaction.channel! as TextChannel;
    try {
      const newUser = await GetUserCharactersData(parseInt(messageOption));
      newUser.Username = interaction.user.username;
      newUser.UserId = interaction.user.id;
      const embedResponse = EmbedResponseCharactersFullInfo(newUser);

      const actionRows = [];
      const maxButtonsPerRow = 5;
      let currentRow = new ActionRowBuilder<ButtonBuilder>(); // Specify ButtonBuilder type

      // Create buttons for each character
      newUser.Characters.forEach((c, index) => {
        const button = new ButtonBuilder()
          .setCustomId(`tournament-character-selector_${c.name}_${newUser.Uid}`) // Use template literals correctly
          // .setLabel(c.name)
          .setLabel(`${c.name} ${buttonLabel(c.element)}`)
          // .setStyle(ValidateButtonColor(c.element));
          .setStyle(ButtonStyle.Success);
        // const stringer:string =

        currentRow.addComponents(button);

        // If we reach the button limit, push the current row and start a new one
        if ((index + 1) % maxButtonsPerRow === 0) {
          actionRows.push(currentRow);
          currentRow = new ActionRowBuilder<ButtonBuilder>(); // Start a new row
        }
      });

      // Add the last row if it has components
      if (currentRow.components.length > 0) {
        actionRows.push(currentRow);
      }

      // Ensure action rows are in the correct type for the reply
      await interaction.reply({
        embeds: [embedResponse],
        components: actionRows, // Directly pass actionRows
      });

      // console.log(`Sending message to channel ${channel.id}: ${messageOption}`);
      // // await channel.send(messageOption);
      // await interaction.reply({ content: 'Tu Mensaje se ha enviado correctamente', ephemeral: true });
    } catch (error) {
      console.error("Error sending message:", error);
      await interaction.reply({
        content: "Hubo un error al enviar el mensaje.",
        ephemeral: true,
      });
    }
  },
};

function buttonLabel(element: string) {
  switch (element) {
    case "Pyro":
      return "🔥";
    case "Electro":
      return "⚡";
    case "Hydro":
      return "💧";
    case "Anemo":
      return "🍃";
    case "Cryo":
      return "❄️";
    case "Dendro":
      return "🌱";
    case "Geo":
      return "🪨";
    default:
      return "❓"; // Unknown element emoji
  }
}
