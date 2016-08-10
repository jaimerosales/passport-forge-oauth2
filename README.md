# Passport-Autodesk-Forge-OAuth2

[Passport](http://passportjs.org/) strategy for authenticating with [Autodesk Forge](https://forge.autodesk.com/)
API's using the OAuth2 API.

This module lets you authenticate using Autodesk Forge in your Node.js applications.
By plugging into Passport, Autodesk Forge authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Installation

    $ npm install passport-forge-oauth2

## Usage

#### Configure Strategy

The Autodesk Forge authentication strategy authenticates users using a Forge account and OAuth2 tokens.  The strategy requires a `verify` callback, which accepts these credentials and calls `done` providing a user, as well as `options` specifying a consumer key, consumer secret, and callback URL.

The Strategy is based in a Three Legged token authentication where Scopes need to be define. To get started and find out more about it [click here](https://developer.autodesk.com/en/docs/oauth/v2/tutorials/get-3-legged-token/)

    var ADSK_FORGE_CLIENT_ID = "--insert-adskforge-client-id-here--"
    , ADSK_FORGE_CLIENT_SECRET = "--insert-adskforge-client-secret-here--",
    , ADSK_FORGE_CALLBACK_URL = "--insert-adskforge-callback-url-here--";

    var options =
    {
      'clientID': ADSK_FORGE_CLIENT_ID,
      'clientSecret': ADSK_FORGE_CLIENT_SECRET,
      'callbackURL': ADSK_FORGE_CALLBACK_URL,
      'tokenURL': ''
    };

Use the _AdskForgeStrategy within Passport. Strategies in passport require a `verify` function, which accept
credentials (in this case, a token, tokenSecret, and profile), and invoke a callback with a user object.

    passport.use(new _adskForgeStrategy
      (options,function (token, tokenSecret, profile, done) {
        process.nextTick(function () {
        return done(null, profile);
      });
    }));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'adskForge'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/login-forge', 
      passport.authenticate('adskForge'), 
      function (req, res) {
        console.log("'/login-forge authenticate"); 
        // Redirects, wont be called
    });
    
    app.get('/oauth/callback',
      passport.authenticate('adskForge', { failureRedirect: '/login' }),
      function (req, res) {
        var temp = req.session.passport;
        req.session.regenerate(function (err) {
          req.session.passport = temp; // restore passport
          req.session.isAuthenticated = true;
          res.redirect('/');
        });
    });

## Examples

For a complete, working example, refer to the [login example](https://github.com/jaimerosales/passport-forge-oauth2/tree/master/examples/login).

## Credits

  - [Jaime Rosales](http://github.com/jaimerosales)
  - [Sarat Venugopal](http://github.com/venugos)
  - based on [Jared Hanson](http://github.com/jaredhanson) previous work

## License

(The MIT License)

Copyright (c) 2012 Jared Hanson

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
