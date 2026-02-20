import { createBrowserRouter } from "react-router-dom";
import ViewerPage from "../pages/ViewerPage";

export const router = createBrowserRouter([
  { path: "/", element: <ViewerPage /> },
]);
