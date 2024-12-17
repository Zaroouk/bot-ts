import { UserDataEnka } from "../lib/types";
import { Artifact } from "../lib/types/artifacts";
import { WeaponData } from "../lib/types/ImageData";
import {
  CharacterDataBuild,
  Stat,
  UserDataCharacters,
  WeaponStats,
} from "./embeds";

import { EnkaClient } from "enka-network-api";
const enka = new EnkaClient();

export const GetAllCharactersData = (lan = "en"): CharacterAutoComplete[] => {
  const characters = enka.getAllCharacters();

  let Characters: CharacterAutoComplete[] = [];

  characters.map((c: any) => {
    const CharacterData: CharacterAutoComplete = {
      Name: c.name.get(lan),
      Id: c.id,
    };
    Characters.push(CharacterData);
  });
  return Characters;
};

export const GetUserData = async (uid: number): Promise<UserDataEnka> => {
  const name = await enka.fetchUser(uid).then((user: any) => user.nickname);
  const User: UserDataEnka = {
    Name: name,
    Id: uid,
  };
  return User;
};

export const GetAvatar = async (uid: number): Promise<string> => {
  return await enka
    .fetchUser(uid)
    .then((user: any) => user.profilePicture.icon.url);
};
// export const GetAllArtifactSets = () => {
//   const artifacts = enka.getAllArtifactSets();
// };

export const GetUserCharactersData = async (uid: number) => {
  const user = await enka.fetchUser(uid);

  const characters = user.characters;

  const CharacterMap = new Map<number, CharacterDataBuild>();

  characters.map((value: any, index: number) => {
    const name = value.characterData.name.get();
    const level = value.level;
    const maxLevel = value.maxLevel;
    const element = value.characterData.element.name.get();
    const statsList: Stat[] = value.stats.statProperties.map((stats: any) => {
      return { statName: stats.fightPropName.get(), value: stats.valueText };
    });
    const weapon: WeaponStats = {
        Name: value.weapon.weaponData.name.get(),
        Image: value.weapon.weaponData.icon.url,
        MainStatName: value.weapon.weaponStats[0].fightPropName.get(),
        MainStat: value.weapon.weaponStats[0].valueText,
        SecondStat: value.weapon.weaponStats[1].valueText,
        Level: value.weapon.level,
        MaxLevel: value.weapon.maxLevel,
        Refinament: value.weapon.refinementRank,
        SecondStatName: value.weapon.weaponStats[1].fightPropName.get(),
        IsPercent: value.weapon.weaponStats[1].fightPropName.get() == "Elemental Mastery" ? false:true
    };
    const splash = `https://enka.network/ui${
      value.characterData.splashImage.url.split(
        "https://api.ambr.top/assets/UI"
      )[1]
    }`;

    const artifactsArray: Artifact[] = value.artifacts.map((artifact: any) => {
        return {
            Name: "",
            SetName: "",
            MainStatName:artifact.mainstat.fightPropName.get(),
            MainStatValue: artifact.mainstat.valueText,
            IsPercent: artifact.mainstat.isPercent,
            Image:artifact.artifactData.icon.url,
            Substats: artifact.substats.total.map((subStat:any) => {
                      return {
                        Name: subStat.fightPropName.get(),
                        Value: subStat.valueText,
                        IsPercent: subStat.isPercent,
                      };
                    })
                }});

    CharacterMap.set(index, {
        name: name,
        level: level,
        maxLevel: maxLevel,
        statsList: statsList,
        element: element,
        splashImage: splash,
        weapon: weapon,
        artifacts: artifactsArray

        //!TODO arrange types

    });
  });

  const characterData: UserDataCharacters = {
    Username: "",
    UserId: "",
    Gametag: user.nickname as string,
    Uid: uid,
    Characters: Array.from(CharacterMap.values()),
    Avatar: user.profilePicture?.icon.url as string,
  };
  return characterData;
};

export const GetSingleCharacterData = async (
  uid: number,
  characterId: number
) => {
  const user = await enka.fetchUser(uid);

  const characters = user.characters;
  // const x = user.ch
  // characters.filter(x=>x)
  characters.forEach((c) => {
    c.characterData.name.get();
    c.characterData.id;
  });
  const chacterFound = characters.find(
    (c) => c.characterData.id == characterId
  );

  // characters.cha
  return chacterFound;
};

// create a function to tell the user when the spiral abyss resets that is every 16th of each month
// investigate if we can display a live counter

// const domer = (uid:number) =>{
//     const user = await enka.fetchUser(uid)
//     // const chars = user.characters[0].stats.statProperties[0]
//     // user.characters[0].
// }

export interface CharacterAutoComplete {
  Name: string;
  Id: number;
}
export interface ArtifactSet {
  Name: string;
  Id: string;
  TwoPiece: string;
  FourPiece: string;
  Goblet: Artifact;
  Circlet: Artifact;
  Sands: Artifact;
  Feather: Artifact;
  Flower: Artifact;
}
// export interface Artifact {
//   Name: string;
//   SetName: string;
//   MainStatName: string;
//   MainStatValue: string;
//   IsPercent:boolean;
//   Substats: SubStat[];
// }
// export interface SubStat {
//   Name: string;
//   Value: string;
//   IsPercent: boolean;
// }
