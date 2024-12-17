import { Event } from "../../lib/types";

export const event: Event<"interactionCreate"> = {
  name: "interactionCreate",

  async execute(client, interaction) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      if (
        command.developer &&
        client.config.developers.includes(interaction.user.id)
      )
        return await interaction.reply({
          content: "This Command can only be used by a developer",
          ephemeral: true,
        });

      command.execute(client, interaction);
    } else if (interaction.isButton()) {
      const buttonInfo = interaction.customId.split("_");
      const button = client.buttons.get(buttonInfo[0]);
      if (!button) return;
      button.execute(client, interaction, ...buttonInfo.slice(1));
    } else if (interaction.isModalSubmit()) {
      console.log("we have it");

      const modalInfo = interaction.customId;
      const modal = client.modals.get(modalInfo);

      if (!modal) return new Error("There is no code");

      if (!modal) {
        console.error("No handler found for this modal:", modalInfo);
        return interaction.reply({
          content:
            "No handler is associated with this modal. Please report this issue.",
          ephemeral: true,
        });
      }

      try {
        modal.execute(client, interaction);
      } catch (error) {
        console.error("Error executing modal handler:", error);
        if (!interaction.replied && !interaction.deferred) {
          await interaction.reply({
            content: "There was an error handling your modal submission.",
            ephemeral: true,
          });
        }
      }
    }
  },
};
