import { FC } from "react";
import { Stack, styled, Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "../../assets";
import { data } from "../../utils/data";

type Props = {};

const Root = styled(Stack)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "nowrap",
  flexDirection: "row",
  "& .header-logo": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "nowrap",
    padding: "0 54px",
  },
  "& .header-menu": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "nowrap",
    padding: "0 54px",
    background: "#7765E3",
    height: 139,
    width: 320,
    "& .header-menu--item": {
      color: "#f6f6f6",
      height: 30,
      "&.active": {
        borderBottom: "2px solid #f6f6f6",
      },
    },
  },
}));

export const Header: FC<Props> = (props) => {
  let location = useLocation();

  return (
    <Root>
      <Box className="header-logo">
        <Logo />
        <Typography ml={2} fontWeight={600} variant="button">
          {data.logoName}
        </Typography>
      </Box>

      <Box className="header-menu">
        {data.menu.map((item) => (
          <Link
            key={item.id}
            className={`${
              location.pathname === item.href ? "active" : ""
            } header-menu--item`}
            to={item.href}
          >
            {item.name}
          </Link>
        ))}
      </Box>
    </Root>
  );
};
