const url = import.meta.env.VITE_API_URL;

export async function getDBModules() {
  return await fetch(`${url}modules`)
    .then(response => response.json());
}
