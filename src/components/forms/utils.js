const removeBlanks = (object) => {
    let objectWithoutBlanks = {};

    for (let key in object) {
        let item = object[key];

        if (item !== "" && item !== undefined) {
            objectWithoutBlanks[key] = item;
        }
    }
    return objectWithoutBlanks;
}

export default removeBlanks;