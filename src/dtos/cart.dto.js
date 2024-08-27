/* eslint-disable camelcase */

export default class CartDTO {
    fromModel(model) {
        const name = model.name?.split(" ");

        return {
            id: model.id,
            first_name: name[0] ?? "",
            last_name: name[1] ?? "",
            specie: model.specie,
            age: model.age,
        };
    }

    fromData(data) {
        return {
            id: data.id || null,
            name: `${data.first_name?.toUpperCase().trim()} ${data.last_name?.toUpperCase().trim()}`,
            specie: data.specie?.toUpperCase().trim(),
            age: Number(data.age),
        };
    }
}