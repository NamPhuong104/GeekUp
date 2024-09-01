import BankAccounts from './BankAccounts';
import Customers from './Customers';
import Cards from './Cards';
import { Link, Outlet } from 'react-router-dom';

function Homepage() {
  return (
    <>
      <ul>
        <li>
          <Link to={'/customers'}>
            <Customers />
          </Link>
        </li>
        <li>
          <Link to={'/bank-accounts'}>
            <BankAccounts />
          </Link>
        </li>
        <li>
          <Link to={'/cards'}>
            <Cards />
          </Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
}

export default Homepage;
