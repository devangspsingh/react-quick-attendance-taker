
import Home from './pages/Home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './layouts/Layout';
import Application from './pages/Application';


const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: <Application />,
        path: "react-quick-attendance-taker/app",
      },

      {
        element: <Application />,
        path: "react-quick-attendance-taker/app"
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
