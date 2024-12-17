export interface ImageData {
    Id:number;
    BackgroundElement:string;
    Name:string;
    Level:string;
    MaxLevel:string
    Hp:string;
    Attack:string;
    Deffense:string;
    ElementalMastery:string;
    CritRate:string;
    CritDamage:string;
    EnergyRecharge:string
    ElementalDamage:string;
    Weapon:WeaponData;
    SplashImage:string
    Artifacts:ArtifactData[]
    Element:string
    IconElementalDmg:string;
}

export interface WeaponData {
    Id:number;
    Name:string;
    Image:string
    MainStat:string;
    MainStatIcon:string;
    MainStatIconType:string;
    SecondStat:string;
    SecondStatIcon:string;
    SecondStatIconType:string;
    Level:string;
    MaxLevel:String;
    Refinament:string;
}

export interface ArtifactData {
    Id:number;
    Image:string;
    MainStat:string;
    MainStatIcon:string;
    MainStatIconType:string;
    MainStatValue:string;
    SubStats:SubStat[]
}
export interface SubStat {
    IconType:string;
    Icon:string;
    StatName:string;
    Value:string;
}

const ImageData = [
    "https://enka.network/ui/UI_RelicIcon_15002_4.png",
    "https://enka.network/ui/UI_Gacha_AvatarImg_Kazuha.png",
    "https://enka.network/ui/UI_EquipIcon_Sword_Zephyrus.png"
]


