import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, TextChannel } from "discord.js";
import { Command } from "../../lib/types";

export const command: Command = {
    data:new SlashCommandBuilder()
        .setName('new-tournament')
        .setDescription('creates new tournament')
        .setDMPermission(false)
        .addStringOption(opt=>opt.setName('tournament').setDescription('new tournament name').setRequired(true)),

    async execute(client,interaction){
        const messageOption = interaction.options.getString('tournament',true)

        const channel = interaction.channel! as TextChannel;
        try {
            console.log(`Sending message to channel ${channel.id}: ${messageOption}`);
            

            const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                    .setCustomId(`confirmation-add-tournament_yes_${messageOption}`)
                    .setLabel('Yes!')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('confirmation-add-tournament_no')
                    .setLabel('No!')
                    .setStyle(ButtonStyle.Danger)
            );

            // await channel.send(`Tournament for ${messageOption} Added Correctly`);
            await interaction.reply({ content: 'Deseas Agregar la Fecha en este Momento? Presiona YES, en caso agregarla despues presiona NO',components:[row],});
        } catch (error) {
            console.error('Error sending message:', error);
            await interaction.reply({ content: 'Tournament could not be added.', ephemeral: true });
        }
    },
}