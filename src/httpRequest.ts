import * as https from 'https';

const EPISODE_API = "https://rickandmortyapi.com/api/episode";
const CHARACTER_API = "https://rickandmortyapi.com/api/character";

// type define
type EpisodeInfo = {
  count: number,
  pages: number,
  next: string,
  prev: string
};
type CharactersObj = {
  id: number,
  name: string, 
  status: string,
  species: string,
  type: string,
  gender: string,
  origin: any,
  location: any,
  image: string,
  episode: Array<string>,
  url: string, 
  created: Date
}
type EpisodeResInfo = {
  id: number,
  name: string,
  air_date: string,
  episode: string,
  characters: Array<string>,
  url: string,
  created: Date
}
type EpisodeResult = {
  info: EpisodeInfo,
  results: Array<EpisodeResInfo>
};

type EpisodeCharacterInfo = {
  id: number,
  name: string,
  air_date: string,
  episode: string,
  characters: Array<CharactersObj>,
  url: string,
  created: Date
}

// SERVER FUNCTIONS
const getEpisodes = () => {
  return new Promise((resolve, reject) => {
    https.get(EPISODE_API, res => {
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
};

const getMultipleCharacters = (ids: any) => {
  return new Promise((resolve, reject) => {
    const url = CHARACTER_API + "/" + ids
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

const startApp = () => {
  getEpisodes().then((res: EpisodeResult) => {
    if (res && res.results) {
      const funcs = [];
      const episodes: EpisodeResInfo[] = res.results
      const episodeRes: EpisodeCharacterInfo[] = []
      res.results.forEach((episode: EpisodeResInfo) => {
        const characterurls = episode.characters;
        const characterIds = [];
        characterurls.forEach((url: string) => {
          const characterId = url.split(CHARACTER_API+"/")?.[1]
          characterIds.push(characterId)
        })

        funcs.push(getMultipleCharacters(characterIds))
      });

      Promise.all(funcs)
      .then(res => {
        if (res.length > 0) {
          res.forEach((characters: Array<CharactersObj>, index: number) => {
            episodeRes.push({
              id: episodes[index].id,
              name: episodes[index].name,
              air_date: episodes[index].air_date,
              episode: episodes[index].episode,
              characters: characters,
              url: episodes[index].url,
              created: episodes[index].created
            })
          })
        } else {
          console.log('There is no data in characters of episodes');  
        }
        console.log('The result for episodes ===> ', episodeRes);
      })
      .catch(err => {
        console.log('There is an error to get episodes. error: ', err);
      })
    } else {
      console.log('There is no data in episodes.');
    }
  }).catch(err => {
    console.log('There is an error to get episodes. error: ', err);
  })
}

startApp();