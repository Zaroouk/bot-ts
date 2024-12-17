import { Client, RESTPostAPIApplicationCommandsJSONBody } from 'discord.js';
import { Table } from 'tablifier'
import { Command, GlobClient } from '../lib/types';
import { LoadFiles } from '../lib/files';

export async function HandleCommands(client:GlobClient):Promise<void>{
    const table = new Table("Nombre del Commando", "Estado")

    client.commands.clear()
    
    const commands:RESTPostAPIApplicationCommandsJSONBody[] = []
    const files = await LoadFiles('commands')
    files.forEach(file=>{
        const { command } = require(file) as { command:Command }
        try {
            client.commands.set(command.data.name,command)
            commands.push(command.data.toJSON())
            table.addRow(command.data.name,'Cargado')
        } catch (error) {
            table.addRow(command.data.name,'Error')
        }
    })
    client.application.commands.set(commands)
    console.log(table.toString())
}