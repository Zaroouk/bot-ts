import mongoose from "mongoose";
import Document from "mongoose";
import { Schema, model } from "mongoose";

const ModelTournament = new Schema<TournamentDb>({
    tournamentName:{type:String,required:true},
    tournamentDate:{type:String,required:true},
})

interface TournamentDb extends Document {
    tournamentName:string;
    tournamentDate:string;
}

export const TournamentDb = model<TournamentDb>('tournaments', ModelTournament)