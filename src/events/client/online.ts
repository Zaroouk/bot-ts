import mongoose from "mongoose"
import { HandleCommands } from "../../handlers/commands"
import { Event } from "../../lib/types"
import { handleButtons } from "../../handlers/buttons"
import { handleModals } from "../../handlers/modals"
export const event: Event<'ready'> = {
    name:'ready',
    once: true,
    async execute(client){
        console.log(`[CLIENT]: ${client.user.username} is online!`)

        HandleCommands(client)
        handleButtons(client)
        handleModals(client)
        
        await mongoose.connect(process.env.URI ? process.env.URI:"").then(()=>console.log("[MONGODB] Connected to the DB!")).catch(()=>console.error("[MONGODB] Error trying to Connect To DB!"))

        // Connect to the database and perform operations
    }
}