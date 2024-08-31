import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { STANDARD, ROLES } from "../../../constants/roles.constant.js";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        uppercase: true,
        trim: true,
        minLength: [3, "El nombre debe tener al menos 3 caracteres"],
        maxLength: [25, "El nombre debe tener como máximo 25 caracteres"],
        index: { name: "idx_firstName" },
    },
    last_name: {
        type: String,
        required: [true, "El apellido es obligatorio"],
        uppercase: true,
        trim: true,
        minLength: [3, "El apellido debe tener al menos 3 caracteres"],
        maxLength: [25, "El apellido debe tener como máximo 25 caracteres"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El email es obligatorio"],
        lowercase: true,
        validate: {
            validator: async function (email) {
                const countDocuments = await this.model("users").countDocuments({
                    _id: { $ne: this._id },
                    email, // Atributo de verificación de duplicado
                });
                return countDocuments === 0;
            },
            message: "El email ya está registrado",
        },
    },
    age: {
        type: Number,
        required: [true, "La edad es obligatoria"],
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "carts",
    },
    roles: {
        type: [String],
        uppercase: true,
        enum: {
            values: ROLES,
            message: "Rol no válido",
        },
        default: [STANDARD],
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    versionKey: false, // Elimina el campo __v de versión
});

// Agrega mongoose-paginate-v2 para habilitar las funcionalidades de paginación.
userSchema.plugin(paginate);

const User = model("users", userSchema);

export default User;