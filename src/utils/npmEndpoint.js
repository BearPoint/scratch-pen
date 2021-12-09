export const getNpmModules = q => {
    return fetch(`https://api.npms.io/v2/search/suggestions?q=${q}&size=10`).then(res=> res.json());
}