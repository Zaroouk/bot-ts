import { SlashCommandBuilder, TextChannel } from "discord.js";
import { Command, UserToDb, UserToShow } from "../../lib/types";
import { GetAvatar, GetUserData } from "../../utils/EnkaClient";
import mongoose from "mongoose";
import { MUsr } from "../../schemas/user";
import { EmbedResponseUser } from "../../utils/embeds";


const myUid = 646835862
//!TODO need a way to wait for the promise

export const command: Command = {
    data:new SlashCommandBuilder()
        .setName('register')
        .setDescription('register UID for user to manage')
        .setDMPermission(false)
        .addStringOption(opt=>opt.setName('uid').setDescription('the user set').setRequired(true)),

    async execute(client,interaction){
        const messageOption = interaction.options.getString('uid',true)

        const channel = interaction.channel! as TextChannel;
        try {
            const nombre = (await GetUserData(parseInt(messageOption))).Name
            
            console.log(`Sending message to channel ${channel.id}: ${messageOption}`);
            // if(messageOption){
                const user:UserToDb = {
                    Uid:parseInt(messageOption),
                    Name:nombre,
                    DiscordId:parseInt(interaction.user.id)
                }
                const userDb = await MUsr.findOne({Uid:parseInt(messageOption)})
                if (userDb) {
                    // User found
                    console.log('User found:', userDb);
                } else {
                    // No user found
                    console.log('No user found with the specified UID');
                }

                if(!userDb){
                    await MUsr.create({NameInGame:user.Name,UserId:user.DiscordId,Uid:user.Uid,})
                    console.log("we created it and there was no id on file")
                    const userToEmbed:UserToShow = {
                        Username: interaction.user.username,
                        Uid: user.Uid,
                        Gametag: user.Name,
                        Avatar: await GetAvatar(user.Uid)
                    }
                    const embedResponse = EmbedResponseUser(true,userToEmbed)
    
                    return await interaction.reply({embeds:[embedResponse],ephemeral:true})
                }else{
                    console.log(user.DiscordId == parseInt(interaction.user.id) ? "user was successfully received":"Userid mismatch")
                    
                    const userToEmbed:UserToShow = {
                        Username: interaction.user.username,
                        Uid: user.Uid,
                        Gametag: user.Name,
                        Avatar: await GetAvatar(user.Uid)
                    }
                    const embedResponse = EmbedResponseUser(false,userToEmbed)
                    return await interaction.reply({embeds:[embedResponse],ephemeral:true})

                }

                
                
            // }else{
            //     await interaction.reply({content:`User with UID: ${messageOption} Doesn't Exist!`,ephemeral:true})
            // }
        } catch (error) {
            console.error('Error sending message:', error);
            await interaction.reply({ content: 'Hubo un error al enviar el mensaje.', ephemeral: true });
        }
    },
}