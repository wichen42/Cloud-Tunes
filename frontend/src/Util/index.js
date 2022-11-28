export const shuffleArr = (arr, num) => {
    const res = [...arr].sort(() => 0.5 - Math.random());
    return res.slice(0, num);
}
