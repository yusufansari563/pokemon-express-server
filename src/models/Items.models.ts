import mongoose, { Document, Schema } from "mongoose";

export interface IItems {
    name: Name;
    id: ID;
}

export interface ID {
    type: string;
}

export interface Name {
    japanese: ID;
    english: ID;
    chinese: ID;
}

export interface IItemsModel extends IItems { }

const ItemsSchema: Schema = new Schema(
    {
        "name": {
            "japanese": {
                "type": "String"
            },
            "english": {
                "type": "String"
            },
            "chinese": {
                "type": "String"
            }
        },
        "id": {
            "type": "Number"
        }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IItems>("Items", ItemsSchema);