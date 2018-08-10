var options = {
  host: 'api.github.com', // <-- Private github api url. If not passed, defaults to 'api.github.com'
  pathPrefix: null, // <-- Private github api url prefix. If not passed, defaults to null.
  protocol: 'https', // <-- http protocol 'https' or 'http'. If not passed, defaults to 'https'
  user: 'flyinmryan', // <-- Your Github username
  repo: '101LilyBay', // <-- Your repository to be used a db
  remoteFilename: 'db.json' // <- File with extension .json
};
 
// Require GithubDB
var GithubDB = require('github-db').default;
// Initialize it with the options from above.
var githubDB = new GithubDB(options);
var personalAccessToken = process.env.TOKEN;
// Authenticate Github DB -> grab a token from here https://github.com/settings/tokens
githubDB.auth(personalAccessToken);
 
// Connect to repository
githubDB.connectToRepo();
 
// You are now authenticated with Github and you are ready to use it as your database.
githubDB.save({"message": "wooohoo"});