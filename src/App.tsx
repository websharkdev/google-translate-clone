import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import "./App.sass";

import { Footer, Header } from "./components";
import { Home, Synonyms, Translate } from "./pages";

type Props = {};

const App: FC<Props> = (props) => {
  return (
    <BrowserRouter>
      <Box>
        <Header />

        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/translate"} element={<Translate />} />
          <Route path={"/synonyms"} element={<Synonyms />} />
        </Routes>

        <Footer />
      </Box>
    </BrowserRouter>
  );
};

export default App;
