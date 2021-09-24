import axios from "axios";

export async function getAllAnimes() {
  const response = await axios.get(
    `${process.env.NEXT_APP_ROOT_URL}/api/animes`
  );
  return response.data.animes;
}

export async function getAnimeById(id) {
  const allAnimes = await getAllAnimes();
  return allAnimes.find((anime) => anime._id === id);
}

export async function getAllMangas() {
  const response = await axios.get(
    `${process.env.NEXT_APP_ROOT_URL}/api/mangas`
  );
  return response.data.mangas;
}

export async function getMangaById(id) {
  const allMangas = await getAllMangas();
  return allMangas.find((manga) => manga._id === id);
}
