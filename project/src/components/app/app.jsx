import React from 'react';
import { Switch, Route, Router as BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRoute, PlaceClass } from '../../const';
import { isCheckedAuth } from '../../utils/utils';
import browserHisory from '../../browser-history';
import { getLoadedDataStatus } from '../../store/data/selectors';
import { getAuthorizationStatus } from '../../store/user/selectors';
import Main from '../pages/main';
import SignIn from '../pages/sign-in/sign-in';
import Chosen from '../pages/chosen/chosen';
import Room from '../pages/room/room';
import NotFound from '../pages/not-found/not-found';
import PrivateRoute from '../common/private-route';
import { LoadingScreen } from '../common';

function App() {
  const isDataLoaded = useSelector(getLoadedDataStatus);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return <LoadingScreen />;
  }
  return (
    <div>
      <BrowserRouter history={browserHisory}>
        <Switch>
          <Route path={AppRoute.MAIN} exact>
            <Main />
          </Route>
          <Route path={AppRoute.SIGN_IN} exact>
            <SignIn />
          </Route>
          <PrivateRoute
            path={AppRoute.FAVORITES}
            exact
            render={() => <Chosen />}
          />
          <Route path={AppRoute.ROOM} exact>
            <Room pageType={PlaceClass.NEAR_PLACES} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
