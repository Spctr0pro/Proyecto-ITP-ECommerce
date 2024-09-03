import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const ticketSchema = new Schema({
    code: {
        type: String,
        required: [ true, "El código es obligatorio" ],
        uppercase: true,
        trim: true,
        unique: true,
    },
    amount: {
        type: Number,
    },
    purchaser: {
        type: String,
        required: [ true, "El correo es obligatorio" ],
        lowercase: true,
        trim: true,
    }
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    versionKey: false, // Elimina el campo __v de versión
});

// Agrega mongoose-paginate-v2 para habilitar las funcionalidades de paginación.
ticketSchema.plugin(paginate);

const Ticket = model("tickets", ticketSchema);

export default Ticket;