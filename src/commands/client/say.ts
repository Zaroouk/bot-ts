import { SlashCommandBuilder, TextChannel } from "discord.js";
import { Command } from "../../lib/types";

export const command: Command = {
    data:new SlashCommandBuilder()
        .setName('say')
        .setDescription('the bot sends a message')
        .setDMPermission(false)
        .addStringOption(opt=>opt.setName('mensaje').setDescription('el mensaje que se enviara').setRequired(true)),

    async execute(client,interaction){
        const messageOption = interaction.options.getString('mensaje',true)

        const channel = interaction.channel! as TextChannel;
        try {
            console.log(`Sending message to channel ${channel.id}: ${messageOption}`);
            await channel.send(`${messageOption} a tus sobrinas`);
            await interaction.reply({ content: 'Tu Mensaje se ha enviado correctamente', ephemeral: true });
        } catch (error) {
            console.error('Error sending message:', error);
            await interaction.reply({ content: 'Hubo un error al enviar el mensaje.', ephemeral: true });
        }
    },
}