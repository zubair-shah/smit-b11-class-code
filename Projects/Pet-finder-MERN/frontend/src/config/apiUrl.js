
export let apiUrl = null;
let mode = import.meta.env.MODE
if (mode === "development") {
    apiUrl = import.meta.env.VITE_PROD_API_URL
} else {
    apiUrl = import.meta.env.VITE_PROD_API_URL
}

