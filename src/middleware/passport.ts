// Importando módulos necessários do Passport e da estratégia de autenticação do Google
import passport from 'passport';
import GooglePassport from 'passport-google-oauth20';

// Importando configurações de ambiente
import { env } from '../env';

// Extração da estratégia do Passport para autenticação via Google
const GoogleStrategy = GooglePassport.Strategy;

// Definindo tipos para os dados do perfil OAuth
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

// Função para mapear os dados do perfil OAuth para um formato simplificado
const userProfile = (profile: IOauthUser) => {
  const { id, name, emails, provider } = profile;

  let firstName;
  let lastName;
  let email;

  // Extraindo informações do perfil OAuth
  if (emails && emails.length) email = emails[0].value;
  if (name.givenName) firstName = name.givenName;
  if (name.familyName) lastName = name.familyName;

  // Retornando um objeto simplificado com as informações necessárias do perfil
  return {
    id,
    firstName,
    lastName,
    email,
    provider,
  };
};

// Configurando a serialização do usuário para armazenar apenas o ID na sessão
passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});

// Configurando a desserialização do usuário para recuperar o ID a partir da sessão
passport.deserializeUser(function (id: any, done) {
  done(null, id);
});

// Configurando a estratégia de autenticação do Google com Passport
passport.use(
  new GoogleStrategy(
    {
      // Configurações do cliente Google
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
      passReqToCallback: true,
    },
    // Função de callback que é chamada após a autenticação bem-sucedida
    (_req: any, _accessToken: any, _refreshToken: any, profile: any, cb: any) =>
      cb(null, userProfile(profile))
  )
);
