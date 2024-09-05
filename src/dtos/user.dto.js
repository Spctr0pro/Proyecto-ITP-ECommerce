import { createHash } from "../utils/security.js";

export default class UserDTO {
    fromModel(model) {
        return {
            id: model.id,
            fullName: `${model.first_name} ${model.last_name}`,
            email: model.email,
            roles: model.roles,
        };
    }

    fromData(data) {
        data.fullName = data.first_name + ' ' + data.last_name; 
        const name = data.fullName?.split(" ");

        return {
            id: data.id || null,
            first_name: name[0] ?? "",
            last_name: name[1] ?? "",
            age: data.age,
            email: data.email,
            password: data.password ? createHash(data.password) : null,
            roles: data.roles,
        };
    }
}