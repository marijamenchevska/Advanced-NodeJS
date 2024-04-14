import session from 'express-session';

const authSession = session({
    secret: 'user_key_for_auth_357',
    name: 'user_id',
    cookie: {
        maxAge: 60 * 60 * 1000
    },
    saveUninitialized: true,
    resave: true
});

export default authSession;