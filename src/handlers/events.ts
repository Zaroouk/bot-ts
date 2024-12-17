
import { Table } from "tablifier";
import { GlobClient } from "../lib/types";
import { LoadFiles } from "../lib/files";
import { Event } from "../lib/types";

export async function HandleEvents(client:GlobClient): Promise<void>{
    const table = new Table('Nombre del Evento', 'Estado')

    client.events.clear()

    const files = await LoadFiles('events')

    files.forEach(file=>{
        const { event } = require(file) as {event:Event<any>}

        try {
            const execute = (...args:any[])=> event.execute(client, ...args)
            client.events.set(event.name,execute)

            if(event.rest){
                if(event.once) client.rest.once(event.name,execute)
                    else client.rest.on(event.name,execute)
            }else{
                if(event.once) client.once(event.name,execute)
                    else client.on(event.name,execute)
            }

            table.addRow(event.name,'Cargado')
        } catch (error) {
            table.addRow(event.name,'Error')
        }
    })

    console.log(table.toString())
}