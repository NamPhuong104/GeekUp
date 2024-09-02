import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutComponent from '../layout/Layout';
import Customers from '../page/Customers';
import BankAccounts from '../page/BankAccounts';
import Cards from '../page/Cards';
import CustomerSegments from '../page/CustomerSegments';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutComponent />,
    children: [
      {
        path: 'customers',
        element: <Customers />,
      },
      {
        path: 'bank-accounts',
        element: <BankAccounts />,
      },
      {
        path: 'cards',
        element: <Cards />,
      },
      {
        path: 'customer-segments',
        element: <CustomerSegments />,
      },
      {
        path: '*',
        element: <div>404 Not Found</div>, // Optional: handle unknown routes
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
