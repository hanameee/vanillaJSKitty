// function getItem(key) {
//   const value = sessionStorage.getItem(key);

//   if(key === 'data') return value === null ? null : JSON.parse(value);
//   else return value === null ? [] : JSON.parse(value);
// }

// function setItem(key, value) {
//   if(value === null || value === undefined) return;

//   const toJson = JSON.stringify(value);

//   sessionStorage.setItem(key, toJson);
// }

// export { getItem, setItem };

function getItem(key) {
    const value = localStorage.getItem(key);
    return value;
}

function setItem(key, value) {
    localStorage.setItem(key, value);
}

export { getItem, setItem };
