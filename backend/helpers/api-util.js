import axios from "axios";

export async function getAllAnimes() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_APP_ROOT_URL}/api/animes`
    );
    return response.data.animes;
  } catch (err) {
    console.log(err);
  }
}

export async function getAnimeById(id) {
  try {
    const allAnimes = await getAllAnimes();
    return allAnimes.find((anime) => anime._id === id);
  } catch (err) {
    console.log(err);
  }
}

export async function getAllMangas() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_APP_ROOT_URL}/api/mangas`
    );
    return response.data.mangas;
  } catch (err) {
    console.log(err);
  }
}

export async function getMangaById(id) {
  try {
    const allMangas = await getAllMangas();
    return allMangas.find((manga) => manga._id === id);
  } catch (err) {
    console.log(err);
  }
}
