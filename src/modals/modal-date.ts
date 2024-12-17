import { Modal } from "../lib/types";
import { AttachmentBuilder } from "discord.js";

export const modal: Modal = {
    name: "modal-date",

    async execute(client, interaction) {
        const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/

        
        console.log("Modal handler invoked");
        try {
            if (interaction.isModalSubmit()) {
                const nameValue = interaction.fields.getTextInputValue("name-value");
                const dateValue = interaction.fields.getTextInputValue("date-value")
                
                // if(regex.test(dateValue)){
                    await interaction.reply({ content: `El Torneo: ${nameValue} y esta programado para el dia: ${dateValue}` });
                    console.log(regex.test(dateValue))
                // }
                // else{
                    // await interaction.reply({content:"La fecha esta mal escrita"})
                // }
            }
        } catch (error) {
            // console.error("Error processing modal submission:", error);

            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    content: "Something went wrong with your submission.",
                    ephemeral: true,
                });
            }
        }
    },
};
