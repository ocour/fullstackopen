const reverse = (string) => {
    return string
        .split("")
        .reverse("")
        .join("");
};

const average = (array) => {
    // same
    // const reducer = (sum, item) => sum + item;
    const reducer = (sum, item) => {
        return sum + item;
    };

    return array.length === 0
        ? 0
        : array.reduce(reducer, 0) / array.length;
};

module.exports = {
    reverse,
    average,
};