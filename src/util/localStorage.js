function getItem(key) {
    const value = localStorage.getItem(key);
    return value;
}

function setItem(key, value) {
    localStorage.setItem(key, value);
}

export { getItem, setItem };
