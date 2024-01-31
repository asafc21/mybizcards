import ROUTES from "../routes/ROUTES";

const alwaysLinks = [
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.ABOUTUS, children: "About Us page" },
];
const loggedInLinks = [{ to: "/profile", children: "Profile page" }];
const bizLinks = [{ to: ROUTES.MYCARDS, children: "My Cards" }];
const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "Register page" },
  { to: ROUTES.LOGIN, children: "Login page" },
];

export { alwaysLinks, loggedInLinks, loggedOutLinks, bizLinks };
