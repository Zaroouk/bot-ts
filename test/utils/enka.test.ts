import { GetAllCharactersData, GetAvatar, GetSingleCharacterData, GetUserCharactersData, GetUserData } from '../../src/utils/EnkaClient';
import { UserDataCharacters } from '../../src/utils/embeds'

const uid = 825436941
describe('Get All Characters for AutoComplete', () => {

  it('should return an array of characters', async () => {
    const result = GetAllCharactersData();
    
    // Ensure the result is defined
    expect(result).toBeDefined();

    // Ensure the result is an array
    expect(Array.isArray(result)).toBe(true);
    result.forEach((character) => {
      expect(character).toHaveProperty('Id');
      expect(character).toHaveProperty('Name');
    });

  });
});

describe("Get User Data", () => {
  it('should return a Id and Username', async () => {
    const result = await GetUserData(uid)

    expect(result).toBeDefined()
    expect(result).toHaveProperty("Id")
    expect(result).toHaveProperty("Name")
  })
})

describe("Get Avatar", () => {
  it('should return String for avatar image', async () => {
    
    const result = await GetAvatar(uid)

    expect(result).toBeDefined()
    expect(typeof result).toBe("string")
  })
})

describe("Get User Characters Data", () => {
  it('should return user data along with the info for the characters', async () => {
    
    const result = await GetUserCharactersData(uid)

    expect(result).toBeDefined()
    expect(result).toHaveProperty("Username")
    expect(result).toHaveProperty("Uid")
    expect(result).toHaveProperty("Gametag")
    expect(result).toHaveProperty("UserId")
  })
})

//TODO TEST TO BE WRITTEN AS CHARACTERID MIGHT BE WRONG FOR TYPING
// describe("Get Single Character Data", () => {
//   it('should return build info for a character of a defined user', async () => {
//     const characterId = "Hu Tao"
//     const result = await GetSingleCharacterData(uid,characterId)

//     expect(result).toBeDefined()
//     expect(result).toHaveProperty("Username")
//     expect(result).toHaveProperty("Uid")
//     expect(result).toHaveProperty("Gametag")
//     expect(result).toHaveProperty("UserId")
//   })
// })
