/** @format */

class Storage {
  save = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  get = (key) => {
    const json = localStorage.getItem(key);
    return JSON.parse(json);
  };
}

const storage = new Storage();

export default storage;
