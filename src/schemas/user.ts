import Document from "mongoose";
import { Schema, model } from "mongoose";

interface IUser extends Document {
    UserId:number;
    Uid:number;
    NameInGame:string;
}

const SUser = new Schema<IUser>({
    UserId:{type:Number,required:true},
    Uid:{type:Number,required:true},
    NameInGame:{type:String,required:true}
})

export const MUsr = model<IUser>('Users', SUser)