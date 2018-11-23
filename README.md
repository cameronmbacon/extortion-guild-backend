# extortion-guild-backend
## Deployed at: https://extortion-guild-backend.herokuapp.com/
##### the link above is the baseURL ^
---
# **Routes**
### GET /auth/bnet
* this is the route used for oAuth2.0 signup via the Battle.net API. Once you have granted extortion-guild-backend permission to access your profile, you will be redirected '/api/current_user'

### GET /api/current_user
* Displays the user's Battle.net profile information if redirected successfully. The default '/' route redirects here if the session cookie has not expired or user has not manually signed out.

### GET /api/logout
* Use this route to manually sign out of the app.

### GET /api/guild
* This route currently uses a hard-coded url to return the information available at https://us.api.blizzard.com/wow/guild/garrosh/extortion
---
***More routes coming soon!***