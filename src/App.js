import Home from './pages/Home';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './layouts/Layout';
import Application from './pages/Application';


const router = createHashRouter([
  {
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: <Application />,
        path: "",
      },

      {
        element: <Application />,
        path: "/app"
      }
    ]
  },

]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
