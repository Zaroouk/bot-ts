import { Button } from "../lib/types";
import { CharacterDataBuild, EmbedResponseCharacterFullData, EmbedResponseCharacters, EmbedResponseCharactersFullInfo } from "../utils/embeds";
import { GetUserCharactersData } from "../utils/EnkaClient";
import { ImageData } from "../lib/types/ImageData"
import { AssetLink, captureWithDynamicContent, DataDisplay, LinkType } from "../utils/image-generator/generator";
import { AttachmentBuilder } from "discord.js";

export const button:Button = {
    name:"fetch-character",

    async execute(client,interaction,username,id){
        // const uid = 662068992
        const user = await GetUserCharactersData(parseInt(id))
        const character:CharacterDataBuild = user.Characters.find(x=>x.name == username) as CharacterDataBuild
        
        const ImageCharacterData:ImageData = {
            Id: 1.,
            BackgroundElement: AssetLink(LinkType.Bg,false,character.element as string),
            Name: character.name as string,
            Level: character.level.toString(),
            MaxLevel: character.maxLevel.toString(),
            Hp: character.statsList.find(x => x.statName == "Max HP")?.value ? character.statsList.find(x => x.statName == "Max HP")?.value as string:"nel",
            Attack: character.statsList.find(x => x.statName == "ATK")?.value ? character.statsList.find(x => x.statName == "ATK")?.value as string:"nel",
            Deffense: character.statsList.find(x => x.statName == "DEF")?.value ? character.statsList.find(x => x.statName == "DEF")?.value as string:"nel",
            ElementalMastery: character.statsList.find(x => x.statName == "Elemental Mastery")?.value ? character.statsList.find(x => x.statName == "Elemental Mastery")?.value as string:"nel",
            CritRate: character.statsList.find(x => x.statName == "CRIT Rate")?.value ? character.statsList.find(x => x.statName == "CRIT Rate")?.value as string:"nel",
            CritDamage: character.statsList.find(x => x.statName == "CRIT DMG")?.value ? character.statsList.find(x => x.statName == "CRIT DMG")?.value as string:"nel",
            EnergyRecharge: character.statsList.find(x => x.statName == "Energy Recharge")?.value ? character.statsList.find(x => x.statName == "Energy Recharge")?.value as string:"nel",
            ElementalDamage: character.statsList.find(x => x.statName == `${character.element} DMG Bonus`)?.value ? character.statsList.find(x => x.statName == `${character.element} DMG Bonus`)?.value as string:"nel",
            Weapon: {
                Id: 1,
                Name: character.weapon.Name,
                Image: character.weapon.Image,
                MainStat: character.weapon.MainStat,
                MainStatIcon: AssetLink(LinkType.Attribute,false,"ATK"),
                MainStatIconType: character.weapon.MainStatName,
                SecondStat: character.weapon.SecondStat,
                SecondStatIcon: AssetLink(LinkType.Attribute,character.weapon.IsPercent, character.weapon.SecondStatName as string),
                SecondStatIconType: character.weapon.SecondStatName,
                Level: character.weapon.Level,
                MaxLevel: character.weapon.MaxLevel,
                Refinament: character.weapon.Refinament
            },
            SplashImage: character.splashImage,
            Artifacts: character.artifacts.map((artifact)=>{
                return{
                    Id:0,
                    Image:artifact.Image,
                    MainStat:artifact.MainStatName,
                    MainStatIcon:AssetLink(LinkType.Attribute,artifact.IsPercent, artifact.MainStatName as string,),
                    MainStatIconType:artifact.MainStatName,
                    MainStatValue:artifact.MainStatValue,
                    SubStats:artifact.Substats.map((subStat)=>{
                        return{
                            IconType:subStat.Name,
                            Icon:AssetLink(LinkType.Attribute,subStat.IsPercent,subStat.Name),
                            StatName:subStat.Name,
                            Value:subStat.Value,
                        }
                    })
                }
            }),
            Element: character.element,
            IconElementalDmg: AssetLink(LinkType.Element,false,character.element as string)
        }
        
        const embedResponse = EmbedResponseCharacterFullData(user,username)
        
        //!TODO lets return an embed with the weapon and artifacts as well as the stats
        //!TODO Artifact

        await interaction.deferReply(); // Defer the reply
        try {
             // Convert Blob to Buffer
            const arrayBuffer = await captureWithDynamicContent(ImageCharacterData)
            const buffer = Buffer.from(arrayBuffer);
            
            const attachmentPng = new AttachmentBuilder(buffer, { name: 'stats.png' });
            await interaction.editReply({
              content: `These are your stats for ${ImageCharacterData.Name}!`,
              files: [attachmentPng],
            });
        } catch (error) {
            console.log(error)
        }

    }
}