import { Page } from "puppeteer";
import { ArtifactData, ImageData } from "../../lib/types/ImageData";
export { captureWithDynamicContent };
import { SubStat } from "../../lib/types/ImageData";


const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const handlebars = require('handlebars');

export interface SVG_Atributes {
    ataque: string;
    critDmg: string;
    critRate: string;
    def: string;
    hp: string;
    maestria: string;
    recarga: string;
    pyro: string;
    hydro: string;
    dendro: string;
    geo: string;
    cryo: string;
    electro: string;
    anemo: string;
}

export enum LinkType {
    Bg = "bg",
    Attribute = "attribute",
    Element = "element"
}

export interface DataDisplay {
    name: string;
    title: string;
    date: string;
    weapon: string;
    fruits: string[];
}

// Capture the page with dynamic content and SVG injection
async function captureWithDynamicContent(data:ImageData):Promise<Buffer> {
    const fontPath = path.resolve(__dirname, 'fonts/zh-cn.ttf');
    const fontData = await fs.readFile(fontPath);
    const fontBase64 = fontData.toString('base64');

    

    // Read HTML template and compile with Handlebars
    const htmlTemplate = await fs.readFile(path.resolve(__dirname, 'template.html'), 'utf8');
    const template = handlebars.compile(htmlTemplate);
    const htmlContent = template(data); // Generate HTML content with dynamic data
    

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Wait for the page to load completely
    const loaded = page.waitForNavigation({
        waitUntil: 'load'
    });

    // Set the content for the page
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    await loaded;

    // Set the viewport for the browser
    await page.setViewport({ width: 1200, height: 800 });

    // Inject the custom font style with Base64
    await page.addStyleTag({
        content: `
            @font-face {
                font-family: 'font-genshin';
                src: url(data:font/ttf;base64,${fontBase64}) format('truetype');
            }
            * {
                font-family: 'font-genshin', sans-serif;
            }
        `
    });

    await page.waitForSelector('#capture', { timeout: 5000 });

    // Select the element you want to capture and take a screenshot
    const element = await page.$('#capture');

    const buffer = await element.screenshot({ 
        type: 'png',
        omitBackground: true,
        clip: { x: 2, y: 112, width: 1645, height: 940 }
    });

    await browser.close();

    return buffer;
}

export const AssetLink = (AssetType:LinkType,IsPercent:boolean,Asset:string):string=>{
    const attributes = {
        DefPercent:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1732336009/svgs/atributes/def_percent_im8ikn.svg",
        Attack:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1731639950/svgs/atributes/atq_m97qxl.svg",
        EnergyRecharge:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1731639949/svgs/atributes/recarga_energia_w4nroc.svg",
        ElementalMastery:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1731639948/svgs/atributes/maestria_dwblhq.svg",
        CritRate:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1731639947/svgs/atributes/crit_rate_xdsqvq.svg",
        Hp:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1731639947/svgs/atributes/hp_zgkiju.svg",
        CritDamage:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1731639947/svgs/atributes/crit_dmg_zjv1ip.svg",
        Def:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1731639946/svgs/atributes/def_y0lsq3.svg",
        HpPercent:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1732336066/svgs/atributes/hp_percent_vkuhji.svg",
        AttackPercent:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1732336004/svgs/atributes/atq_percent_hriyzy.svg"
    }
    const Elements = {
        Anemo:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1731639951/svgs/elements/anemo_dmg_sodock.svg",
        Cryo:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1731639949/svgs/elements/cryo_dmg_ggisye.svg",
        Pyro:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1731639949/svgs/elements/pyro_dmg_s7aaoj.svg",
        Geo:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1731639949/svgs/elements/geo_dmg_vwqxt5.svg",
        Hydro:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1731639948/svgs/elements/hydro_dmg_h4rjlp.svg",
        Electro:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1731639948/svgs/elements/electro_dmg_e7hcva.svg",
        Dendro:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1731639947/svgs/elements/dendro_dmg_ijl86p.svg"
    }
    const ElementBackground = {
        Anemo:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1730225065/BGELEMENTS/ANEMO_BG_Blank_uwv6bv.png",
        Geo:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1730225064/BGELEMENTS/GEO_BG_Blank_tvjs2p.png",
        Pyro:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1730225064/BGELEMENTS/PYRO_BG_Blank_ibje97.png",
        Hydro:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1730225064/BGELEMENTS/HYDRO_BG_Blank_bz7opp.png",
        Dendro:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1730225064/BGELEMENTS/DENDRO_BG_Blank_lxdidw.png",
        Electro:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1730225063/BGELEMENTS/ELECTRO_BG_Blank_zwcszv.png",
        Cryo:"https://res.cloudinary.com/do0bxzfhq/image/upload/v1730225062/BGELEMENTS/CRYO_BG_Blank_gnokii.png"
    }

    let AssetFromType = ""
    const attributesMap = new Map<string, string>()
    const attributesPercentMap = new Map<string, string>()
    const elementsMap = new Map<string, string>()
    const bgMap = new Map<string, string>()

    attributesMap.set("ATK",attributes.Attack)
    attributesMap.set("Energy Recharge",attributes.EnergyRecharge)
    attributesMap.set("CRIT DMG",attributes.CritDamage)
    attributesMap.set("CRIT Rate",attributes.CritRate)
    attributesMap.set("Elemental Mastery",attributes.ElementalMastery)
    attributesMap.set("DEF",attributes.Def)
    attributesMap.set("HP",attributes.Hp)


    attributesPercentMap.set("ATK",attributes.AttackPercent)
    attributesPercentMap.set("HP",attributes.HpPercent)
    attributesPercentMap.set("DEF",attributes.DefPercent)


    elementsMap.set("Pyro",Elements.Pyro)
    elementsMap.set("Dendro",Elements.Dendro)
    elementsMap.set("Electro",Elements.Electro)
    elementsMap.set("Geo",Elements.Geo)
    elementsMap.set("Hydro",Elements.Hydro)
    elementsMap.set("Anemo",Elements.Anemo)
    elementsMap.set("Cryo",Elements.Cryo)

    bgMap.set("Pyro",ElementBackground.Pyro)
    bgMap.set("Dendro",ElementBackground.Dendro)
    bgMap.set("Electro",ElementBackground.Electro)
    bgMap.set("Geo",ElementBackground.Geo)
    bgMap.set("Hydro",ElementBackground.Hydro)
    bgMap.set("Anemo",ElementBackground.Anemo)
    bgMap.set("Cryo",ElementBackground.Cryo)
    
    switch (AssetType) {
            case "bg":
                AssetFromType = bgMap.get(Asset) as string
                // console.log("inside ",elementsMap.get(Asset) as string)
            break;

            case "element":
                AssetFromType = elementsMap.get(Asset) as string
                // console.log("inside ",elementsMap.get(Asset) as string)
            break;

            case "attribute":
                AssetFromType = IsPercent && (Asset == "DEF" || Asset == "HP" || Asset == "ATK") ? attributesPercentMap.get(Asset) as string : attributesMap.get(Asset) as string
                // console.log("inside ",IsPercent ? attributesPercentMap.get(Asset) as string : attributesMap.get(Asset) as string)
            break;
    
        default:
            break;
    }
    
    return AssetFromType
}