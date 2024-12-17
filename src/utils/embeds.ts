import { bold, EmbedBuilder, italic } from "discord.js";
import { UserToShow } from "../lib/types";
import { Character } from "enka-network-api";
import { GetUserCharactersData } from "./EnkaClient";
import { WeaponData } from "../lib/types/ImageData";
import { Artifact } from "../lib/types/artifacts";


export const EmbedResponseUser = (isNew:boolean,userData:UserToShow):EmbedBuilder => {

    const PAIMON1 = "https://www.pngall.com/wp-content/uploads/15/Paimon-PNG-Images-300x225.png"
    const PAIMON2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZah1cHF-vmQIiVTboDtDfTyo_lK4C9__ZuQ&s"
    const embedResponse = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(isNew ? "Welcome Traveler":`Welcome Back ${userData.Gametag}`)
    .setAuthor({ name: 'P.A.I.M.O.N.', iconURL: PAIMON1, url: 'https://discord.js.org' })
    .setDescription('Please Confirm Your Information')
    .setThumbnail(userData.Avatar)
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: bold('Genshin UID'), value: italic(userData.Uid.toString()), inline: true },
        { name: bold('Genshin User'), value: italic(userData.Gametag), inline: true },
        { name: bold('Discord User'), value: italic(userData.Username),inline:true },
    )
    .setTimestamp()
    .setFooter({ text: 'Emergency Food!', iconURL: PAIMON1 });


    return embedResponse
}


export const EmbedResponseCharacters = (user:UserDataCharacters):EmbedBuilder => {

    const PAIMON1 = "https://www.pngall.com/wp-content/uploads/15/Paimon-PNG-Images-300x225.png"
    const PAIMON2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZah1cHF-vmQIiVTboDtDfTyo_lK4C9__ZuQ&s"
    const embedResponse = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(`Welcome Back ${user.Gametag}`)
    .setAuthor({ name: 'P.A.I.M.O.N.', iconURL: PAIMON1, url: 'https://discord.js.org' })
    .setDescription('Please Confirm Your Information')
    .setThumbnail(user.Avatar)
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: bold('Genshin UID'), value: italic(user.Uid.toString()), inline: true },
        { name: bold('Genshin User'), value: italic(user.Gametag), inline: true },
        { name: bold('Discord User'), value: italic(user.Username),inline:true },
    )
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: bold('Character'), value: italic(user.Characters[0].name), inline: true },
        { name: bold('Level'), value: italic(user.Characters[0].level.toString()), inline: true },
        { name: bold('Max Level'), value: italic(user.Characters[0].maxLevel.toString()),inline:true },
        { name: bold('See Full Stats'), value: italic('stats'),inline:true },)
    .setTimestamp()
    .setFooter({ text: 'Emergency Food!', iconURL: PAIMON1 });


    return embedResponse
}

export const EmbedResponseCharactersFullInfo = (user:UserDataCharacters):EmbedBuilder => {

    const PAIMON1 = "https://www.pngall.com/wp-content/uploads/15/Paimon-PNG-Images-300x225.png"
    const PAIMON2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZah1cHF-vmQIiVTboDtDfTyo_lK4C9__ZuQ&s"
    const embedResponse = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(`Welcome Back ${user.Gametag}`)
    .setAuthor({ name: 'P.A.I.M.O.N.', iconURL: PAIMON1, url: 'https://discord.js.org' })
    .setDescription('Your Characters')
    .setThumbnail(user.Avatar)
    .setTimestamp()
    .setFooter({ text: 'Emergency Food!', iconURL: PAIMON1 });

    user.Characters.forEach((c,index) => {

        embedResponse.addFields(
            { name: bold(`Character & Level`), value: `${italic(c.name)}\t${italic(c.level.toString())}`, inline: false },
        )
    });
    return embedResponse
}

export const EmbedResponseCharacterFullData = (user:UserDataCharacters,character:string):EmbedBuilder => {

    const PAIMON1 = "https://www.pngall.com/wp-content/uploads/15/Paimon-PNG-Images-300x225.png"
    const PAIMON2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZah1cHF-vmQIiVTboDtDfTyo_lK4C9__ZuQ&s"
    const embedResponse = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(`Welcome Back ${user.Gametag}`)
    .setAuthor({ name: 'P.A.I.M.O.N.', iconURL: PAIMON1, url: 'https://discord.js.org' })
    .setDescription(`Personaje: ${character}`)
    .setThumbnail(user.Avatar)

    .setTimestamp()
    .setFooter({ text: 'Emergency Food!', iconURL: PAIMON1 });

    const selectedCharacter = user.Characters.find(x=>x.name == character)
    selectedCharacter?.statsList.forEach((c,index) => {
        // console.log(c.statName," ",c.value)

        if(c.value != "0" && c.value != "0.0%")
        {
            embedResponse.addFields(
                { name: bold(c.statName), value: `${italic(c.value)}`, inline: false },
            )
        }
    });

    return embedResponse
}


export interface UserDataCharacters{
    Username:string;
    UserId:string;
    Gametag:string;
    Uid:number
    Characters:CharacterDataBuild[]
    Avatar:string
}

export interface CharacterDataBuild{
    name: string;          // Character name
    level: number;        // Character level
    maxLevel: number;     // Character's maximum level
    statsList: Stat[];    // List of stats for the character
    element:string;
    splashImage:string;
    weapon:WeaponStats
    artifacts:Artifact[]
}
export interface WeaponStats {
    Name:string;
    Image:string;
    MainStatName:string;
    MainStat:string;
    SecondStat:string;
    SecondStatName:string;
    IsPercent:boolean;
    Level:string;
    MaxLevel:string;
    Refinament:string;
}
// Interface for individual stats
export interface Stat {
    statName: string; // The name of the stat
    value: string;    // The value of the stat
}