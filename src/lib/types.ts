import { AutocompleteInteraction, ButtonInteraction, ChatInputCommandInteraction, Client, ClientEvents, Collection, ModalSubmitInteraction, SharedSlashCommand, SlashCommandBuilder } from "discord.js";
import { CONFIG } from "../consts";

export type GlobClient = Client<true> & ExtraClient

interface ExtraClient {
    config: typeof CONFIG
    events:Collection<keyof ClientEvents, ()=> void> 
    commands: Collection<string, Command>
    buttons: Collection<string,Button>
    modals: Collection<string, Modal>
}

export interface Event<T extends keyof ClientEvents> {
    name: T,
    rest?:boolean;
    once?:boolean;
    execute: (client: GlobClient,...args: ClientEvents[T]) => void
}

export interface Command {
    data:SharedSlashCommand;
    developer?:boolean
    execute:(client:GlobClient,interaction: ChatInputCommandInteraction) => void
    autocomplete?: (client: GlobClient, interaction: AutocompleteInteraction) => void; // Change here
}

interface Component {
    name:string
}

export interface Button extends Component{
    execute:(client:GlobClient,button:ButtonInteraction, ...args:string[])=>void
}
export interface Modal extends Component {
    // customId:string
    execute:(client:GlobClient,modal:ModalSubmitInteraction)=>void
}

export interface UserToDb {
    Name:string;
    Uid:number;
    DiscordId:number
}

export interface UserDataEnka{
    Name:string;
    Id:number;
}

export interface UserToShow {
    Username:string
    Uid:number;
    Gametag:string;
    Avatar:string
}
