import "./App.css";
import Home from "./components/Home/Home";
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
];

function App() {
  let Component;

  const pathname = window.location.pathname;

  switch (pathname) {
    case "/star-rating":
      Component = StarRating;
      break;
    case "/star-rating-half":
      Component = StarRatingHalf;
      break;
    case "/todo":
      Component = ToDo;
      break;
    case "/home":
    default:
      Component = Home;
      break;
  }

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

  return <Component />;
}

export default App;
