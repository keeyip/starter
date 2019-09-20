import React from 'react';
import ProspectsPage from 'ui/views/Prospects/ProspectsPage';
import CustomersPage from 'ui/views/Customers/CustomersPage';
import {Router} from '@reach/router';

function App() {
  return (
    <div className="App">
      <Router>
        <ProspectsPage path="/" />

        <ProspectsPage path="leads" />

        <CustomersPage path="customers" />
      </Router>
    </div>
  );
}

export default App;
