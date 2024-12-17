import 'dotenv/config'

import { Client,Collection, Events } from 'discord.js'
import { GlobClient } from './lib/types'
import { HandleEvents } from './handlers/events'
import { CONFIG } from './consts'
import { Glob } from 'glob'

const _client = new Client({
    intents:['Guilds','GuildMembers','GuildMessages','MessageContent']
}) as GlobClient

_client.config = CONFIG
_client.events = new Collection()
_client.commands = new Collection()
_client.buttons = new Collection()
_client.modals = new Collection()

HandleEvents(_client)

_client.on(Events.InteractionCreate, async interaction => {
    if(interaction.isAutocomplete()){
        const command = (interaction.client as GlobClient).commands.get(interaction.commandName);

        if(!command){
            return
        }
        
        try {
            await command.autocomplete?.(interaction.client as GlobClient, interaction);
        } catch (error) {
            console.log(error)
        }
    }
})

// _client.on('ready',(c)=>console.log(`${c.user.username} is online`))

_client.login(process.env.DISCORD_TOKEN)