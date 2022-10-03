import { Box, Grid, styled, Typography } from "@mui/material";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { data } from "../../utils/data";

type Props = {};

const Root = styled(Box)(({ theme }) => ({
  background: "#242424",
  minHeight: 185,
  height: "100%",
  marginTop: "10vw",
  overflow: "hidden",
  "& .footer-left--sidebar": {
    padding: "50px 54px",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    width: "100%",
    "& .footer-box--mail-link": {
      color: "#f6f6f6",
      marginBottom: 12,
    },
    "& .footer-box--mail-secondLink": {
      color: "#c2c2c2",
      marginTop: 12,
    },
  },
  "& .footer-right--sidebar": {
    "& .footer-menu": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      padding: "0 54px",
      height: 139,
      "& .footer-menu--item": {
        color: "#f6f6f6",
        height: 30,
        "&.active": {
          borderBottom: "2px solid #f6f6f6",
        },
      },
    },
    "& .footer-copyright": {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      flexWrap: "nowrap",
      padding: "0 54px",
      background: "#7765E3",
      height: 139,
      width: "100%",
      "& .footer-copyright--title": {
        fontSize: 16,
        fontWeight: 600,
        color: "#f6f6f6",
      },
      "& .footer-copyright--subtitle": {
        fontSize: 14,
        fontWeight: 500,
        textTransform: "initial",
        marginTop: 4,
        color: "#eee",
      },
    },
  },
}));

export const Footer: FC<Props> = (props) => {
  let location = useLocation();
  const getNowYear = new Date().getFullYear();
  return (
    <Root>
      <Grid container>
        <Grid item xs={8} className={"footer-left--sidebar"}>
          <a
            href="mailto:alexey.bortnytskyi@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-box--mail-link"
          >
            alexey.bortnytskyi@gmail.com
          </a>
          <a
            href="tel:34680522262"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-box--mail-secondLink"
          >
            +34 680 522 262
          </a>
          <a
            href="https://www.notion.so/CV-d9f17ad32676467f895a71b48974b6ae"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-box--mail-secondLink"
          >
            CV
          </a>
        </Grid>
        <Grid
          item
          xs={4}
          className={"footer-right--sidebar"}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "column",
          }}
        >
          <Box className="footer-menu">
            {data.menu.map((item) => (
              <Link
                key={item.id}
                className={`${
                  location.pathname === item.href ? "active" : ""
                } footer-menu--item`}
                to={item.href}
              >
                {item.name}
              </Link>
            ))}
          </Box>
          <Box className="footer-copyright">
            <Typography variant="h6" className={"footer-copyright--title"}>
              Glory to Ukraine 💙💛
            </Typography>
            <Typography
              variant="button"
              className={"footer-copyright--subtitle"}
            >
              Developed by webshark @{getNowYear}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Root>
  );
};
