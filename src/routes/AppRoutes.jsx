import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutComponent from '../layout/Layout';
import Customers from '../component/Customers/Customers';
import BankAccounts from '../component/BankAccounts/BankAccounts';
import OnlineAccounts from '../component/OnlineAccounts/OnlineAccounts';
import Cards from '../component/Cards/Cards';
//import BankAccounts from '../page/BankAccounts';
//import Cards from '../page/Cards';
//import CustomerSegments from '../page/CustomerSegments';
import CustomerSegments from '../component/CustomerSegments/CustomerSegments';
import NiceAccountNumber from '../component/NiceAccountNumber/NiceAccountNumber';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutComponent />,
    children: [
      {
        index: true,
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
        path: 'online-accounts',
        element: <OnlineAccounts />,
      },
      {
        path: 'nice-accounts',
        element: <NiceAccountNumber />,
      },
      {
        path: '*',
        element: <div>404 Not Found</div>,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
