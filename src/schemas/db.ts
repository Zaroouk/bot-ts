import mongoose from "mongoose";
import Document from "mongoose";
import { Schema, model } from "mongoose";

interface SDb extends Document {
    userId:string;
    count:number
}

interface TournamentDb extends Document {
    tournamentName:string;
    tournamentDate:string;
}

// interface TournamentDb extends Document {
//     userId:string;
//     count:number
// }

const SDb = new Schema<SDb>({
    userId:{type:String,required:true},
    count:{type:Number,default:1}
})



export const Mdb = model<SDb>('db', SDb)
