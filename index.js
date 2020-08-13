import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import createAuth0Client from "@auth0/auth0-spa-js";

// render loading message whilst we determine if we have an authenticated user
ReactDOM.render(<p>Loading...</p>, document.getElementById('root'));

const auth0Options = {
    response: 'code',
    domain: 'dev-pqtsvwwf.eu.auth0.com',
    client_id: 'ga9YZ80sLf04KAH5vtbXhHAbDt9KFQrc',
    redirect_uri: 'http://localhost:3000/'
}

// initiate auth0 client
createAuth0Client(auth0Options).then(async (auth0) => {
    // if user is already logged in, this will return the user
    let user = await getUser(auth0);

    if (!user) {
        try {
            // if no user, try to handle call back
            await auth0.handleRedirectCallback();
            user = await getUser();
            // remove callback token from query string
            window.location.search = '';
        } catch (error) {
            // on error, assume user is not logged in
            console.log(error);
            console.log('user not logged in');

            const UnAuthApp = ({auth0}) => (
                <React.Fragment>
                    <h1>Log in</h1>
                    <button onClick={async () => await auth0.loginWithRedirect()}>Log in</button>
                </React.Fragment>
            )
            // render un-authenticated component
            ReactDOM.render(<UnAuthApp auth0={auth0} />, document.getElementById('root'));
            return;
        }
    }

    // if we get to this line, then we have an authenticated user
    ReactDOM.render(<App auth0={auth0} user={user} />, document.getElementById('root'));
});

const getUser = async (auth0) => {
    try {
        const accessToken = await auth0.getTokenSilently();
        const user = await auth0.getUser();
        return { ...user, accessToken };
    } catch (error) {
        console.log(error);
        return;
    }
}
