import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandAssertions, SlashCommandBuilder } from "discord.js";
import { Command } from "../../lib/types";
import { Mdb } from "../../schemas/db";
import { TournamentDb } from "../../schemas/tournament";

export const command:Command = {
    data:new SlashCommandBuilder().setName("excel").setDescription("works excel"),

    async execute(client,interaction){
        
        const dbData = await Mdb.findOne({userId:interaction.user.id})
        const dbTournament = await TournamentDb.find()
        
        if(!dbData){

            // Create an array to hold multiple action rows
            const actionRows = [];
            const maxButtonsPerRow = 5;
            let currentRow = new ActionRowBuilder<ButtonBuilder>(); // Specify ButtonBuilder type

            // Create buttons for each character
            dbTournament.forEach((c, index) => {
                const button = new ButtonBuilder()
                    .setCustomId(`fetch-character_${c.tournamentName}_${c.tournamentDate ? true : false }`) // Use template literals correctly
                    // .setLabel(c.name)
                    .setLabel(`${c.tournamentName}`)
                    // .setStyle(ValidateButtonColor(c.element));
                    .setStyle(c.tournamentDate ? ButtonStyle.Success : ButtonStyle.Danger);
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
            
            return await interaction.reply({content:'This is the first Time your executing this command',ephemeral:true})
        }

        
        await interaction.reply({content:`The Count has been executed ${dbData.count} times`,ephemeral:true})
    }
}