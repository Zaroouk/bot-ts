import { Button } from "../lib/types";
import { CharacterDataBuild, EmbedResponseCharacterFullData, EmbedResponseCharacters, EmbedResponseCharactersFullInfo } from "../utils/embeds";
import { GetUserCharactersData } from "../utils/EnkaClient";
import { ImageData } from "../lib/types/ImageData"
import { AssetLink, captureWithDynamicContent, DataDisplay, LinkType } from "../utils/image-generator/generator";
import { AttachmentBuilder } from "discord.js";

export const button:Button = {
    name:"confirmation-add-tournament",

    async execute(client,interaction,confirmationText,tournament){
        // const uid = 662068992
        const confirmation:boolean = confirmationText == "yes" ? true : false
        
        // await interaction.deferReply(); // Defer the reply
        try {
            if(confirmation){
                // const dbData = await TournamentDb.create({tournamentName:tournament,tournamentDate:""})
                await interaction.reply({content:`Confirmed, Tournament: ${tournament} Added`,ephemeral:true})
            }else{
                await interaction.reply({content:"Excelente Buen Dia",ephemeral:true})
            }
        } catch (error) {
            console.log(error)
        }

    }
}