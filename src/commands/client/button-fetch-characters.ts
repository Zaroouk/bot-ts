import { ButtonStyle, SlashCommandBuilder } from "discord.js";
import { Command } from "../../lib/types";
import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";

export const command:Command = {
    data: new SlashCommandBuilder()
    .setName("fetch-characters")
    .setDescription("show characters for the selected user")
    .setDMPermission(false),

    async execute(client,interaction){
        const rowButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
            .setCustomId(`fetch-character_${interaction.user.username}_2`)
            .setLabel('Mostrar')
            .setStyle(ButtonStyle.Primary))

        await interaction.reply({content:"Mostrar Personajes?",components:[rowButtons]})
    }

}


