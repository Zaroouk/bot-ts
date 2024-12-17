import {
    ActionRow,
  ActionRowBuilder,
  blockQuote,
  bold,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  italic,
  quote,
  SlashCommandBuilder,
  spoiler,
  subtext,
  TextChannel,
} from "discord.js";
import { Button, Command, UserToDb, UserToShow } from "../../lib/types";
import {
  EmbedResponseCharacters,
  EmbedResponseCharactersFullInfo,
  EmbedResponseUser,
} from "../../utils/embeds";
import { GetUserCharactersData } from "../../utils/EnkaClient";

export const command: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ping command"),

  async execute(client, interaction) {
    const delay = Date.now() - interaction.createdAt.getTime();

    const user: UserToShow = {
      Gametag: "Mavri",
      Uid: 1234,
      Username: interaction.user.username,
      Avatar: "https://enka.network/ui/UI_AvatarIcon_Mualani_Circle.png",
    };

    // Create an array to hold multiple action rows


    // const embedResponse = new EmbedBuilder().setTitle('Pong!').setDescription(`The bot's delay is ${delay}ms`).setColor('Aqua')
    // const embedResponse = EmbedResponseUser(true,user)
    const newUser = await GetUserCharactersData(646835862);
newUser.Username = interaction.user.username;
newUser.UserId = interaction.user.id;
const embedResponse = EmbedResponseCharactersFullInfo(newUser);

// Create an array to hold multiple action rows
const actionRows = [];
const maxButtonsPerRow = 5;
let currentRow = new ActionRowBuilder<ButtonBuilder>(); // Specify ButtonBuilder type

// Create buttons for each character
newUser.Characters.forEach((c, index) => {
    const button = new ButtonBuilder()
        .setCustomId(`fetch-character_${c.name}_${newUser.Uid}`) // Use template literals correctly
        // .setLabel(c.name)
        .setLabel(`${c.name} ${buttonLabel(c.element)}`)
        // .setStyle(ValidateButtonColor(c.element));
        .setStyle(ButtonStyle.Success);
        // const stringer:string = 

    currentRow.addComponents(button);

    // If we reach the button limit, push the current row and start a new one
    if ((index + 1) % maxButtonsPerRow === 0) {
        actionRows.push(currentRow);
        currentRow = new ActionRowBuilder<ButtonBuilder>(); // Start a new row
    }
});

// Add the last row if it has components
if (currentRow.components.length > 0) {
    actionRows.push(currentRow);
}

// Ensure action rows are in the correct type for the reply
await interaction.reply({
    embeds: [embedResponse],
    components: actionRows, // Directly pass actionRows
});


  },
};

const ValidateButtonColor = (element:string):ButtonStyle =>{
    return ButtonStyle.Primary;
}

const buttonLabel = (element:string) => {
    switch (element) {
        case 'Pyro':
            return '🔥';
        case 'Electro':
            return '⚡';
        case 'Hydro':
            return '💧';
        case 'Anemo':
            return '🍃';
        case 'Cryo':
            return '❄️';
        case 'Dendro':
            return '🌱';
        case 'Geo':
            return '🪨';
        default:
            return '❓'; // Unknown element emoji
    }
};

//! Move Logic to Use EmbedResponse Function
//!TODO create buttons for the embed to choose to edit uid
//!TODO Create Buttons to show set of artifacts for each character
//!TODO Check if the discord user is already in the database and if its using another uid to ask if want to change
