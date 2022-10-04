import * as https from 'https';

const API = "https://rickandmortyapi.com/api";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: object;
  location: object;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

const httpGetRequest = (url: string) => {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = "";
      let obj = null
      res.on('data', d => {
        data += d
      });
      res.on('end', () => {
        obj = JSON.parse(data);
        resolve(obj)
      });
    }).on("error", err => {
      reject(err)
    });
  })
}

const fetchCharacters = async (characters: string[]): Promise<Character[]> => {
  const characterIds = characters.map(
    (character) => character.split("/").reverse()[0]
  );

  try {
    const charactersResponse = await httpGetRequest(
      `${API}/character/${characterIds.join(",")}`
    ) as Character[];

    return charactersResponse;
  } catch {
    console.error("Error Getting Characters");
    return [];
  }
};

const fetchAllEpisodes = async (): Promise<Episode[]> => {
  try {
    const episodesResponse = await httpGetRequest(`${API}/episode`);

    return episodesResponse['results'] as Episode[];
  } catch {
    console.error("Error Getting Episodes");
    return [];
  }
};

const fetchEpisodesThenPopulate = async () => {
  const allEpisodes = await fetchAllEpisodes();  

  const characterEpisodes = await Promise.all(
    allEpisodes.map(async (episode: Episode) => ({
      ...episode,
      characters: await fetchCharacters(episode.characters),
    }))
  );
  console.log(characterEpisodes);
};

fetchEpisodesThenPopulate();