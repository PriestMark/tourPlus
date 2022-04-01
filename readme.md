
***Essential for app to work is to create config.env file with next fields:***
'''
NODE_ENV=development '(delete-this-text: in case you need to setup different env, make sure to make a code changes. Currently supports development, all other will be treated as prod)'
PORT=enter-your-desired-port-here
DATABASE='connection string to your DB'
DATABASE_PASSWORD='mongo DB password'

JWT_SECRET='enter here with your secret phrase'
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
'''
