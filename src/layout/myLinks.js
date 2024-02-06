import ROUTES from "../routes/ROUTES";

const alwaysLinks = [
  { to: ROUTES.HOME, children: "Home" },
  { to: ROUTES.ABOUTUS, children: "About Us" },
];
const loggedInLinks = [{ to: ROUTES.FAVORITECARD, children: "Favorites" }];
const bizLinks = [{ to: ROUTES.MYCARDS, children: "My Cards" }];
const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "Register" },
  { to: ROUTES.LOGIN, children: "Login" },
];

export { alwaysLinks, loggedInLinks, loggedOutLinks, bizLinks };
