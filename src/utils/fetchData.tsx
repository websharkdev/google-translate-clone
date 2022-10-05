const translate_api_key = "04867229a3mshbca99457d7e0128p1cbdcfjsna0693e77a9f1";
const synonyms_api_key = "04867229a3mshbca99457d7e0128p1cbdcfjsna0693e77a9f1";

export const translateOptions = {
  headers: {
    "X-RapidAPI-Key": translate_api_key,
    "X-RapidAPI-Host":
      "translated-mymemory---translation-memory.p.rapidapi.com",
  },
};

export const synonymsOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": synonyms_api_key,
    "X-RapidAPI-Host": "synonyms-word-info.p.rapidapi.com",
  },
};

export const fetchData = async (
  url = `https://translated-mymemory---translation-memory.p.rapidapi.com/api/get?langpair=en|uk&q=Hello`,
  options = translateOptions
) => {
  const data = await fetch(url, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return data;
};
