import mongoose, { Schema, Document } from "mongoose";

export interface Itype {
    english: string;
    chinese: string;
    japanese: string;
}

const TypeSchema: Schema = new Schema(
    {
        "english": {
            "type": "String"
        },
        "chinese": {
            "type": "String"
        },
        "japanese": {
            "type": "String"
        }
    },
    {
        versionKey: false
    }
)

export default mongoose.model<Itype>("Type", TypeSchema);

