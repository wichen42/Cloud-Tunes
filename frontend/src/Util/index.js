export const shuffleArr = (arr, num) => {
    const res = [...arr].sort(() => 0.5 - Math.random());
    return res.slice(0, num);
}

export const isEqual = (obj1, obj2) => {
    const obj1Entries = Object.entries(obj1);
    const obj2Entries = Object.entries(obj2);
  
    if (obj1Entries.length !== obj2Entries.length) {
      return false;
    }
  
    for (const [key, value] of obj1Entries) {
      if (obj2[key] !== value) {
        return false;
      }
    }
  
    return true;
}