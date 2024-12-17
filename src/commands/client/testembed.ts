import {
    ActionRow,
  ActionRowBuilder,
  blockQuote,
  bold,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  italic,
  quote,
  SlashCommandBuilder,
  spoiler,
  subtext,
  TextChannel,
} from "discord.js";
import { Button, Command, UserToDb, UserToShow } from "../../lib/types";
import {
    EmbedResponseCharacterFullData,
  EmbedResponseCharacters,
  EmbedResponseCharactersFullInfo,
  EmbedResponseUser,
} from "../../utils/embeds";
import { GetSingleCharacterData } from "../../utils/EnkaClient";

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName("panga")
    .setDescription("ping command"),

  async execute(client, interaction) {
    const delay = Date.now() - interaction.createdAt.getTime();
    const uid = 0

    // const user:CharacterData = await GetSingleCharacterData(uid)
    // const embedResponse = EmbedResponseCharacterFullData(user)

// Ensure action rows are in the correct type for the reply
await interaction.reply({
    // embeds: [embedResponse],
});


  },
};