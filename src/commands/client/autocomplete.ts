import { SlashCommandBuilder, AutocompleteInteraction } from "discord.js";
import { Command } from "../../lib/types";
import { GetAllCharactersData } from "../../utils/EnkaClient";

const charactersMap = new Map<string,number>()
GetAllCharactersData('es').forEach(c=>{
    const name = c.Name
    const id = c.Id
    charactersMap.set(name,id)
})

export const command: Command = {
    data: new SlashCommandBuilder()
        .setName('decir') // Command name
        .setDescription('el bot envía un mensaje') // Description
        .setDMPermission(false)
        .addStringOption(opt => 
            opt.setName('mensaje')
               .setDescription('el mensaje que se enviará')
               .setRequired(true)
               .setAutocomplete(true)
        ),

    async execute(client, interaction) {
        const messageOption = interaction.options.getString('mensaje', true);
        await interaction.reply({ content: `Dijiste: ${messageOption}`, ephemeral: true });

        
    },

    async autocomplete(client, interaction: AutocompleteInteraction) {
        
        const value = interaction.options.getFocused().toLowerCase();
        // const guild = await interaction.client.guilds.fetch()

        // const stringCharacters:string[] = []
        let choices: string[] = [...charactersMap.keys()];        ;
        // GetAllCharactersData().forEach(c => {
        //     choices.push(c.Name)
        // });
        // charactersMap.forEach(c=>{
        //     c.get('')
        // })


        // await guild.forEach(async guild => {
        //     choices.push(guild.name)
        // })

        const filtered = choices.filter(choice => choice.toLowerCase().includes(value)).slice(0,25);

        if(!interaction) return

        await interaction.respond(
            filtered.map(choice => ({name:choice,value:choice}))
        )
    },
};
