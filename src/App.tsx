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
import Table from "./components/Table/Table";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import FormBuilder from "./components/FormBuilder/FormBuilder";
import AccordionPage from "./components/Accordion/AccordionPage";
import ThemePage from "./components/Theme/ThemePage";
import Pagination from "./components/Pagination/Pagination";

const PROJECTS = [
  {
    Component: Home,
    pathname: "home",
  },
  {
    Component: StarRating,
    pathname: "star-rating",
  },
  {
    Component: StarRatingHalf,
    pathname: "star-rating-half",
  },
  {
    Component: ToDo,
    pathname: "todo",
  },
  {
    Component: ModalPage,
    pathname: "modal",
  },
  {
    Component: FileExplorer,
    pathname: "file-explorer",
  },
  {
    Component: VirtualizedList,
    pathname: "virtualized-list",
  },
  {
    Component: VirtualizedListVariableHeights,
    pathname: "virtualized-list-variable-heights",
  },
  {
    Component: InfiniteScrolling,
    pathname: "infinite-scrolling",
  },
  {
    Component: ReverseInfiniteScrolling,
    pathname: "reverse-infinite-scrolling",
  },
  {
    Component: AutoComplete,
    pathname: "autocomplete",
  },
  {
    Component: Table,
    pathname: "table",
  },
  {
    Component: KanbanBoard,
    pathname: "kanban-board",
  },
  {
    Component: FormBuilder,
    pathname: "form-builder",
  },
  {
    Component: AccordionPage,
    pathname: "accordion",
  },
  {
    Component: ThemePage,
    pathname: "theme",
  },
  {
    Component: Pagination,
    pathname: "pagination",
  },
];

function App() {
  const pathname = window.location.pathname;

  const { Component } =
    PROJECTS.find((project) => "/" + project.pathname === pathname) || {};

  if (pathname === "/") {
    return PROJECTS.map((project) => (
      <a
        href={"/" + project.pathname}
        key={project.pathname}
        style={{
          display: "block",
        }}
      >
        {project.pathname}
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
