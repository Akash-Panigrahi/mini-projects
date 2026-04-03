import "./App.css";
import Home from "./components/Home/Home";
import ModalPage from "./components/Modal/ModalPage";
import { ModalProvider } from "./components/Modal/ModalContext";
import StarRating from "./components/StarRating/StarRating";
import StarRatingHalf from "./components/StarRating/StarRatingHalf";
import ToDo from "./components/ToDo/ToDo";
import FileExplorer from "./components/FileExplorer/FileExplorer";
import VirtualizedList from "./components/VirtualizedList/VirtualizedList";
import VirtualizedListVariableHeights from "./components/VirtualizedList/VirtualizedListVariableHeights";
import InfiniteScrolling from "./components/InfiniteScrolling/InfiniteScrolling";
import AutoComplete from "./components/AutoComplete/AutoComplete";
import ReverseInfiniteScrolling from "./components/InfiniteScrolling/ReverseInfiniteScrolling";

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
  {
    component: FileExplorer,
    url: "/file-explorer",
  },
  {
    component: VirtualizedList,
    url: "/virtualized-list",
  },
  {
    component: VirtualizedListVariableHeights,
    url: "/virtualized-list-variable-heights",
  },
  {
    component: InfiniteScrolling,
    url: "/infinite-scrolling",
  },
  {
    component: ReverseInfiniteScrolling,
    url: "/reverse-infinite-scrolling",
  },
  {
    component: AutoComplete,
    url: "/autocomplete",
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
