import mongoose, { Document, Schema } from "mongoose";

export interface IPokeDex {
    id: ID;
    name: Name;
    type: TypeClass;
    base: Base;
}

export interface Base {
    HP: ID;
    Attack: ID;
    Defense: ID;
    Sp: SP;
    Speed: ID;
}

export interface ID {
    type: TypeElement;
}

export enum TypeElement {
    Number = "Number",
    String = "String",
}

export interface SP {
    " Attack": ID;
    " Defense": ID;
}

export interface Name {
    english: ID;
    japanese: ID;
    chinese: ID;
    french: ID;
}

export interface TypeClass {
    type: TypeElement[];
}

export interface IPokeDexSchema extends IPokeDex { }

const PokeDexSchema: Schema = new Schema(
    {
        "id": {
            "type": "Number"
        },
        "name": {
            "english": {
                "type": "String"
            },
            "japanese": {
                "type": "String"
            },
            "chinese": {
                "type": "String"
            },
            "french": {
                "type": "String"
            }
        },
        "type": {
            "type": [
                "String"
            ]
        },
        "base": {
            "HP": {
                "type": "Number"
            },
            "Attack": {
                "type": "Number"
            },
            "Defense": {
                "type": "Number"
            },
            "Sp": {
                " Attack": {
                    "type": "Number"
                },
                " Defense": {
                    "type": "Number"
                }
            },
            "Speed": {
                "type": "Number"
            }
        }
    },
    { versionKey: false }
)

export default mongoose.model<IPokeDexSchema>("PokeDex", PokeDexSchema);