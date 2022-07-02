import mongoose, { Document, Schema } from "mongoose";

export interface IMoves {
    accuracy: string;
    category: string;
    cname: string;
    ename: string;
    id: string;
    jname: string;
    power: string;
    pp: string;
    type: string;
}

export interface IMovesModel extends IMoves { }

const MovesSchema = new Schema(
    {
        "accuracy": {
            "type": "Number"
        },
        "category": {
            "type": "String"
        },
        "cname": {
            "type": "String"
        },
        "ename": {
            "type": "String"
        },
        "id": {
            "type": "Number"
        },
        "jname": {
            "type": "String"
        },
        "power": {
            "type": "Number"
        },
        "pp": {
            "type": "Number"
        },
        "type": {
            "type": "String"
        }
    },
    { versionKey: false }
)

export default mongoose.model<IMovesModel>("Moves", MovesSchema);