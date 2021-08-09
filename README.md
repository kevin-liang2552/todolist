# Todolist

To run the app in your local

```bash
cd to-your-root-project-folder
# build your local env. Only need to do one time
docker-compose up -d mysql

# open your mysql client, connect to server localhost. The credential can be found in .env.local file

# run app using the command line below
DOTENV=.env.local npx ts-node -r ts-node/register/transpile-only src/index.ts
```

Then connect to your mysql in localhost, execute the sql to have the structure and you are good to go

# Tests

To run tests, complete inital setup above and then do:

```bash
cd to-your-root-project-folder

# check that the mysql docker container is running. If it is, run the command below
DOTENV=.env.local npx jest
```

## todo
- migration: https://sequelize.org/master/manual/migrations.html
- fix and setup swagger UI: https://swagger.io/tools/swagger-ui/
- setup CI/CD with gitlab: https://docs.gitlab.com/ee/ci/services/mysql.html