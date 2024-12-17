import { SlashCommandAssertions, SlashCommandBuilder } from "discord.js";
import { Command } from "../../lib/types";
import { Mdb } from "../../schemas/db";

export const command:Command = {
    data:new SlashCommandBuilder().setName("db").setDescription("Shows the amount of times this command has been executed!"),

    async execute(client,interaction){
        const dbData = await Mdb.findOne({userId:interaction.user.id})

        if(!dbData){
            await Mdb.create({userId:interaction.user.id,count:1})
            return await interaction.reply({content:'This is the first Time your executing this command',ephemeral:true})
        }

        dbData.count++
        await dbData.save()
        await interaction.reply({content:`The Count has been executed ${dbData.count} times`,ephemeral:true})
    }
}