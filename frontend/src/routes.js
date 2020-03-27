import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register'
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes() {
  return (
    // BrownserRouter precisa ficar por volta de tudo
    <BrowserRouter>
      {/* O Switch fica responsavel por deixar um rota ser chamada por momento */}
      <Switch>
        {/* atributo exact serve para o DOM certificar que o path é exatamente aquele para mostrar a pagina certa */}
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/incidents/new" component={NewIncident} />
      </Switch>
    </BrowserRouter>
  )
}