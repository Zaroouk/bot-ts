import {
  ActionRowBuilder,
  AnyComponentBuilder,
  ButtonBuilder,
  ModalBuilder,
  ModalSubmitInteraction,
  SlashCommandAssertions,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { Command } from "../../lib/types";
import { Mdb } from "../../schemas/db";

export const command: Command = {
    
  data: new SlashCommandBuilder()
    .setName("pangare")
    .setDescription("its a ping for the modal"),

  async execute(client, interaction) {
    const modal = new ModalBuilder()
      .setCustomId("modal-tester")
      .setTitle("Por Favor Escribe la Fecha");

    const TournamentName = new TextInputBuilder()
      .setCustomId("name-value")
      .setLabel("Escribe El Nombre del Torneo")
      .setPlaceholder("Raiden Shogun Showcase")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const TournamentDate = new TextInputBuilder()
      .setCustomId("date-value")
      .setLabel("Escribe la Fecha")
      .setPlaceholder("23-12-2024")
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    //   const rows = new ActionRowBuilder<TextInputBuilder>()
    //   rows.addComponents(TournamentName)
    //   rows.addComponents(TournamentDate)
    
      modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(TournamentName),
        new ActionRowBuilder<TextInputBuilder>().addComponents(TournamentDate)
      );
    
    await interaction.showModal(modal);

    
  },
};
