import { apiUrl } from "../config/apiUrl";
async function fetchBreedList({ queryKey }) {
    const animal = queryKey[1];
    if (!animal) return [];
    const res = await fetch(
        `${apiUrl}/breeds?animal=${animal}`
    );
    if (!res.ok) {
        throw new Error(`breeds ${animal} fetch not ok`);
    }
    return res.json();
}

export default fetchBreedList;