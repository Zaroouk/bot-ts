import { Table } from "tablifier";
import { GlobClient, Modal } from "../lib/types";
import { LoadFiles } from "../lib/files";
import { ModalSubmitInteraction, RESTPostAPIApplicationCommandsJSONBody } from "discord.js";

export async function handleModals(client:GlobClient) {
    const table = new Table("Nombre del Modal","Estado")

    client.modals.clear()

    const files = await LoadFiles("modals")

    files.forEach(file=>{
        const { modal } = require(file) as {modal:Modal}
        try {
            client.modals.set(modal.name, modal)

            table.addRow(modal.name,"Cargado")
        } catch (error) {
            table.addRow(modal.name,"Error")
        }
    })

    console.log(table.toString())

}