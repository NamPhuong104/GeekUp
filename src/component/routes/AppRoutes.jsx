import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../layout/Layout';
import Customers from '../page/Customers';
import BankAccounts from '../page/BankAccounts';
import Cards from '../page/Cards';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/customers',
        element: <Customers />,
      },
      {
        path: '/bank-accounts',
        element: <BankAccounts />,
      },
      {
        path: '/cards',
        element: <Cards />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
