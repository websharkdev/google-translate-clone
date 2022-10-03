import { FC } from "react";
import { Box, styled, Grid, Typography, Button } from "@mui/material";
import { HomeBG } from "../../assets";
import { data } from "../../utils/data";
import { Link } from "react-router-dom";

type Props = {};

const Root = styled(Box)(({ theme }) => ({
  padding: "0 54px",
  "& .home-container--buttons": {
    marginTop: 54,
    "& .home-container--button": {
      textTransform: "initial",
      minWidth: 165,
      minHeight: 50,
      fontSize: 16,
      fontWeight: 500,
      "&.button-primary": {
        color: "#f6f6f6",
        background: "#7765E3",
        marginRight: 24,
      },
    },
  },
}));

export const Home: FC<Props> = (props) => {
  return (
    <Root>
      <Grid
        container
        flexWrap="nowrap"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Grid item xs={6}>
          <Typography
            className={"home-container--subtitle"}
            variant="subtitle1"
          >
            Welcome to {data.logoName}
          </Typography>
          <Typography
            className={"home-container--title"}
            variant="h1"
            fontSize={64}
            fontWeight={700}
          >
            {data.home_title}
          </Typography>

          <Box className={"home-container--buttons"}>
            {data.home_buttons.map((item) => (
              <Link key={item.id} to={item.href}>
                <Button className={`home-container--button ${item.className}`}>
                  {item.name}
                </Button>
              </Link>
            ))}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <HomeBG />
        </Grid>
      </Grid>
    </Root>
  );
};
