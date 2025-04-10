import Root from "./routes/Root";
import LaCarte from "./routes/LaCarte";
import APropos from "./routes/APropos";
import Contact from "./routes/Contact";
import Erreur from "./routes/Erreur";

const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <Erreur />,
    children: [
      {
        path: "/",
        element: <LaCarte />,
      },
      {
        path: "a-propos",
        element: <APropos />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
];

export default routes;
