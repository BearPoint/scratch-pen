
export const getNpmModules = packageName => {
    const API_URL = 'https://api.skypack.dev/v1'
    return fetch(`${API_URL}/search?q=${packageName}&p=${1}`).then(res=> res.json());
}