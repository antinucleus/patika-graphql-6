const createMutation = (elements, data, pubSub, name) => {
    const newElement = { id: elements.length + 1, ...data };
    elements.unshift(newElement);
    name && pubSub && pubSub.publish(name, newElement);
    return newElement;
};

const updateMutation = (elements, id, data, name) => {
    const element_index = elements.findIndex((el) => el.id === +id);
    if (element_index === -1) {
        throw new Error(`${name} not found`);
    }
    elements[element_index] = {
        ...elements[element_index],
        ...data,
    };

    return elements[element_index];
};

const deleteMutation = (elements, id, name) => {
    const element_index = elements.findIndex((el) => el.id === +id);
    if (element_index === -1) {
        throw new Error(`${name} not found`);
    }

    const deletedElement = elements.splice(element_index, 1)[0];
    return deletedElement;
};

const deleteAllMutation = (elements) => {
    const count = elements.length;
    elements.length = 0;
    return { count };
};

module.exports = {
    createMutation,
    updateMutation,
    deleteMutation,
    deleteAllMutation
};