import { Table } from "tablifier";
import { Button, GlobClient } from "../lib/types";
import { LoadFiles } from "../lib/files";

export async function handleButtons(client:GlobClient) {
    const table = new Table("Nombre del Boton","Estado")

    client.buttons.clear()

    const files = await LoadFiles("buttons")
    files.forEach(file=>{
        const {button} = require(file) as {button:Button}
        try {
            client.buttons.set(button.name, button)
            table.addRow(button.name,"Cargado")
        } catch (error) {
            table.addRow(button.name,"Error")
        }
    })

    console.log(table.toString())

}