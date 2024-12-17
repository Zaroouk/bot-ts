// Define a type for artifact rarity (1-5 stars)
type ArtifactRarity = 1 | 2 | 3 | 4 | 5;

// Define a type for artifact set bonuses
interface SetBonus {
  pieceCount: number; // 2-piece or 4-piece bonus
  effect: string;     // Description of the effect
}

// Define a type for artifact main stats
interface MainStat {
  type: string;       // e.g., "ATK%", "HP%", "Elemental Mastery"
  value: number;      // The main stat value
}

// Define a type for artifact sub-stats
// interface SubStat {
//   type: string;       // e.g., "Crit Rate", "Crit Damage", "ATK%"
//   value: number;      // The sub-stat value
// }

// // Define a type for individual artifacts
// interface Artifact {
//   name: string;             // Artifact name
//   set: string;              // Artifact set name
//   rarity: ArtifactRarity;   // Artifact rarity (1-5 stars)
//   level: number;            // Current level (0-20)
//   mainStat: MainStat;       // Main stat of the artifact
//   subStats: SubStat[];      // Array of sub-stats
//   type: "Flower" | "Plume" | "Sands" | "Goblet" | "Circlet"; // Artifact type
// }

export interface Artifact {
  Name: string;
  SetName: string;
  Rarity:string;
  Level:number;
  MainStatName: string;
  MainStatValue: string;
  IsPercent:boolean;
  Type: "Flower" | "Plume" | "Sands" | "Goblet" | "Circlet"; // Artifact type
  Substats: SubStat[];
  Image:string;
}
export interface SubStat {
  Name: string;
  Value: string;
  IsPercent: boolean;
}


// Define a type for artifact sets
interface ArtifactSet {
  setName: string;       // Name of the artifact set
  setBonuses: SetBonus[]; // Array of set bonuses (2-piece, 4-piece)
  artifacts: Artifact[];  // Array of artifacts in the set
}

