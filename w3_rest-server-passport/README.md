User Authentication & Authorization and Mongoose Population (W3 & W4)
=======

**User Authentication with Passport**
- Use JSON web tokens for token-based user authentication
- Use Passport module together with passport-local and passport-local-mongoose for setting up local authentication within your server.

**User Authentication & Authorization**
- Check if a verified ordinary user also has admin privileges.
- Allow an ordinary user to only perform GET operations
- Allow only an Admin to perform POST, PUT and DELETE operations
- Allow an Admin to be able to GET all the registered users' information from the database

**Mongoose Population**
- Use Mongoose population to cross-reference users within a comment
- Populate the comments with the users’ information upon querying
