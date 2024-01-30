import ROUTES from "../routes/ROUTES";

const myLinks = [
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.REGISTER, children: "Register page" },
  { to: ROUTES.LOGIN, children: "Login page" },
];

const alwaysLinks = [
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.ABOUTUS, children: "About Us page" },
];
const loggedInLinks = [{ to: "/profile", children: "Profile page" }];
const bizLinks = [{ to: ROUTES.CREATECARD, children: "Create page" }];
const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "Register page" },
  { to: ROUTES.LOGIN, children: "Login page" },
];

export default myLinks;
export { alwaysLinks, loggedInLinks, loggedOutLinks, bizLinks };
