import { Box, Button, Grid, styled, TextField } from "@mui/material";
import { FC, useState, useEffect } from "react";
import { SwitchIcon } from "../../assets";
import { data } from "../../utils/data";
import { fetchData, translateOptions } from "../../utils/fetchData";

type Props = {};

const Root = styled(Box)(({ theme }) => ({
  "& .translate-box--languageBTN": {
    textTransform: "initial",
    minWidth: 120,
    minHeight: 50,
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 24,
    "&.active": {
      color: "#f6f6f6",
      background: "#7765E3",
    },
  },
}));

export const TranslateBody: FC<Props> = (props) => {
  const [originalText, setOriginalText] = useState(
    window.localStorage.getItem("original_text") || ""
  );
  const [translatedText, setTranslatedText] = useState(
    window.localStorage.getItem("translated_text") || ""
  );

  const [language, setLanguage] = useState({
    input: "uk",
    output: "es",
  });

  const handleTranslate = () => {
    fetchData(
      `https://translated-mymemory---translation-memory.p.rapidapi.com/api/get?langpair=${language.input}|${language.output}&q=${originalText}`
    ).then((res) => {
      setTranslatedText(res.responseData.translatedText);

      window.localStorage.setItem(
        "translated_text",
        res.responseData.translatedText
      );
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(
      originalText !== "" &&
        window.localStorage.getItem("original_text") !== originalText
        ? handleTranslate
        : () => console.log("Glory to Ukraine 💙💛"),
      1500
    );
    return () => clearTimeout(timeoutId);
  }, [originalText]);

  const handleSwitchLanguages = () => {
    setLanguage({ input: language.output, output: language.input });

    const translate = {
      original: originalText,
      translated: translatedText,
    };

    setOriginalText(translate.translated);
    setTranslatedText(translate.original);
  };

  return (
    <Root>
      <Grid container columnSpacing={4} padding={4}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            {data.translate_languages.map((item) => (
              <Button
                key={item.id}
                onClick={() => setLanguage({ ...language, input: item.code })}
                className={`translate-box--languageBTN ${
                  language.input === item.code ? "active" : ""
                }`}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          <Box>
            <Button
              onClick={handleSwitchLanguages}
              className={"translate-box--languageBTN"}
            >
              <SwitchIcon />
            </Button>
          </Box>

          <Box>
            {data.translate_languages.map((item) => (
              <Button
                key={item.id}
                onClick={() => setLanguage({ ...language, output: item.code })}
                className={`translate-box--languageBTN ${
                  language.output === item.code ? "active" : ""
                }`}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="translate-box--textfield"
            label=""
            multiline
            minRows={6}
            fullWidth
            maxRows={12}
            placeholder="Input text to translate"
            helperText={`${originalText.length}/5000`}
            onChange={(e) => {
              setOriginalText(e.target.value);
              window.localStorage.setItem("original_text", e.target.value);
            }}
            value={originalText}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="translate-box--textfield"
            label=""
            multiline
            minRows={6}
            fullWidth
            maxRows={12}
            placeholder="Output text to translate"
            helperText={`${translatedText.length}/5000`}
            value={translatedText}
          />
        </Grid>
      </Grid>
    </Root>
  );
};
