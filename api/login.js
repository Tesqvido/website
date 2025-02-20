const express = require('express');
const passport = require('passport');
const passportDiscord = require('passport-discord');
const session = require('express-session');

// Express Serverless Function Setup
const app = express();

// Express Session und Passport Setup
app.use(session({ secret: 'geheim', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Discord OAuth2 Strategy
passport.use(new passportDiscord.Strategy({
  clientID: '1342225724148420769',
  clientSecret: 'JxcmqhFosik26auYDqeKXF4cye7y7svB',
  callbackURL: 'https://shadowquill.vercel.app/callback',
  scope: ['identify', 'email'] // Optional: Füge zusätzliche Berechtigungen hinzu
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile); // Profil an die Session übergeben
}));

// Login Route (Redirect zu Discord)
app.get('/discord', passport.authenticate('discord'));

// Callback Route (Verarbeitung nach erfolgreichem Login)
app.get('/discord-callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  (req, res) => {
    // Nach erfolgreichem Login, Benutzerdaten zurückgeben
    res.json({ user: req.user });
  }
);

// Exportiere die Funktion für Vercel
module.exports = app;
