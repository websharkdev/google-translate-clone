import { Box, Grid, styled, TextField, Typography } from "@mui/material";
import { FC, useState, useEffect } from "react";
import { fetchData, synonymsOptions } from "../../utils/fetchData";

type Props = {};

const Root = styled(Box)(({ theme }) => ({
  minHeight: "200px",
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& .synonyms-container--wrapper": {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    width: "100%",
    "& .synonyms-container--synonymsItem": {
      padding: "5px 15px",
      background: "#73AB84",
      borderRadius: 20,
      color: "#fff",
    },
  },
}));

export const SynonymsBody: FC<Props> = (props) => {
  const [filtredSynonyms, setFiltredSynonyms] = useState<string[]>();
  const [synonymsText, setSynonymsText] = useState("");
  const [synonymsData, setSynonymsData] = useState(
    window.localStorage.getItem("synonyms_data") || ""
  );

  const handleSynonyms = () => {
    const url = `https://synonyms-word-info.p.rapidapi.com/v1/synonyms?str=${synonymsText}`;
    fetchData(url, synonymsOptions).then((res) => {
      setSynonymsData(JSON.stringify(res.data));
      window.localStorage.setItem("synonyms_data", JSON.stringify(res.data));
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(
      synonymsText.toLocaleLowerCase() !== ""
        ? handleSynonyms
        : () => console.log("Glory to Ukraine 💙💛"),
      1500
    );
    return () => clearTimeout(timeoutId);
  }, [synonymsText]);

  useEffect(() => {
    const filtredWord = (word: string | number) =>
      word !== +word && word !== "nou" && word !== "ver" && word !== "adj";

    const data = JSON.parse(synonymsData)
      .synonyms.flat()
      .filter((word: string | number) => filtredWord(word));

    // @ts-ignore
    setFiltredSynonyms([...new Set(data)]);
  }, [synonymsText, synonymsData]);

  return (
    <Root>
      <Grid container columnSpacing={4} padding={4}>
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight={600} mb={2}>
            Synonyms
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            id="synonyms-container--textfield"
            onChange={(e) => {
              setSynonymsText(e.target.value);
              window.localStorage.setItem("synonyms_text", e.target.value);
            }}
            value={synonymsText}
            type="text"
            placeholder={
              window.localStorage.getItem("synonyms_text") || "Type some things"
            }
            fullWidth
          />
        </Grid>

        <Grid item xs={8}>
          <Box
            className={"synonyms-container--wrapper"}
            columnGap={2}
            rowGap={2}
          >
            {filtredSynonyms?.map((item: string) => (
              <Box key={item} className={"synonyms-container--synonymsItem"}>
                {item}
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Root>
  );
};
