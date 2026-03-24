import "./App.css";
import Home from "./components/Home/Home";
import ModalPage from "./components/Modal/ModalPage";
import { ModalProvider } from "./components/Modal/ModalContext";
import StarRating from "./components/StarRating/StarRating";
import StarRatingHalf from "./components/StarRating/StarRatingHalf";
import ToDo from "./components/ToDo/ToDo";

const PROJECTS = [
  {
    component: Home,
    url: "/home",
  },
  {
    component: StarRating,
    url: "/star-rating",
  },
  {
    component: StarRatingHalf,
    url: "/star-rating-half",
  },
  {
    component: ToDo,
    url: "/todo",
  },
  {
    component: ModalPage,
    url: "/modal",
  },
];

function App() {
  const pathname = window.location.pathname;
  const Component = PROJECTS.find((project) => project.url === pathname)
    ?.component || <></>;

  if (pathname === "/") {
    return PROJECTS.map((project) => (
      <a
        href={project.url}
        key={project.url}
        style={{
          display: "block",
        }}
      >
        {project.url}
      </a>
    ));
  }

  return (
    <ModalProvider>
      <Component />
    </ModalProvider>
  );
}

export default App;
