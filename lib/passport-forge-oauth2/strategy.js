var util = require('util')
, OAuth2Strategy = require('passport-oauth2');

/**
 * `Strategy` constructor.
 *
 * The Autodesk Forge authentication strategy authenticates requests by delegating to
 * Forge using the OAuth2 protocol.
 *
 * OAuth, specifically OAuth2, is the open standard used across 
 * the Forge Platform for token-based authentication and authorization.
 *
 * Applications must supply a `verify` callback which accepts a `token`,
 * `tokenSecret` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Required options for base class:
 *
 *   - `clientID`        identifies client to Autodesk Forge
 *   - `clientSecret`    secret used to establish ownership of the 
 *                       clientSecret key
 *   - `callbackURL`     Callback URLs are specified in two places. 
 *                       You first specify a callback URL for your app in 
 *                       the My Apps section. Then, when you redirect 
 *                       your user to the Autodesk login flow, you also 
 *                       specify the callback URL in the redirect_uri 
 *                       parameter.
 * Examples:
 *
 *     passport.use(new _adskForgeStrategy({
 *         clientID: '5zw90va0UuwMKTnPS5sLsdgZjDkVYXN7',
 *         clientSecret: '7I6uN1rjneirxiMW'
 *         callbackURL: 'https://www.example.net/auth/adskForge/callback'
 *       },
 *       function(token, tokenSecret, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */

// Required options for base class
//  *         clientID: '123-456-789',                                      // Note: Not client_id
//  *         clientSecret: 'shhh-its-a-secret'                             // Note: Not client_secret
//  *         callbackURL: 'https://www.example.net/auth/example/callback'
function Strategy (options, verify) {
    options = options || {};
    options.scope = options.scope || "data:read";
    options.authorizationURL = "https://developer.api.autodesk.com/authentication/v1/authorize";
    options.tokenURL = "https://developer.api.autodesk.com/authentication/v1/gettoken";

    OAuth2Strategy.call(this, options, verify);

    this.name = 'adskForge'; 
    // Without this, the authenticate method will not get called
    this._oauth2.useAuthorizationHeaderforGET(true); 
};

util.inherits(Strategy, OAuth2Strategy);

/**
 * Inherit from `OAuth2Strategy`.
 */
Strategy.prototype.authenticate = function (req, options) {
    console.log("In AdskForgeStrategy.prototype.authenticate");
    OAuth2Strategy.prototype.authenticate.call(this, req, options);
};

/**
 * Retrieve user profile from Autodesk Forge.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         
 *   - `id`               the user's Autodesk ID
 *   - `username`         the user's Autodesk username
 *   - `displayName`      the user's full name
 *   - `name.familyName`  the user's last name
 *   - `name.givenName`   the user's first name
 *   - `profileUrl`       the URL of the profile for the user on Autodesk
 *   - `emails`           the proxied or contact email address granted by the user
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */

 //////////////////////////////////////
 //                                  //
 // TODO USERPROFILE IMPLEMENTATION  //
 //                                  //
 //////////////////////////////////////

 
/**
 * Expose `Strategy`.
 */
module.exports = Strategy;