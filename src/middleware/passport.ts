import passport from 'passport';
import GooglePassport from 'passport-google-oauth20';

import { env } from '../env';

const GoogleStrategy = GooglePassport.Strategy;

type IOauthEmail = {
  value: string;
  verified: boolean;
};

type IOauthUser = {
  id: string;
  emails: IOauthEmail[];
  name: { familyName: string; givenName: string };
  provider: string;
};

const userProfile = (profile: IOauthUser) => {
  const { id, name, emails, provider } = profile;

  let firstName;
  let lastName;
  let email;

  if (emails && emails.length) email = emails[0].value;
  if (name.givenName) firstName = name.givenName;
  if (name.familyName) lastName = name.familyName;

  return {
    id,
    firstName,
    lastName,
    email,
    provider,
  };
};

passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id: any, done) {
  done(null, id);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
      passReqToCallback: true,
    },
    (_req: any, _accessToken: any, _refreshToken: any, profile: any, cb: any) =>
      cb(null, userProfile(profile))
  )
);
