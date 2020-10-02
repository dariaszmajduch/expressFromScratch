## Project configuration
When project is run for the first time:
1. Run `docker-compose build && docker-compose up`
2. If any errors occur log in to docker container `docker exec -it mongo_work_org /bin/bash`
3. Log in to database as a root user `mongo mongodb://root:rootpass@mongo_work_org:27017`
4. Change DB to `use mongo_work_org` 
5. Create a new user 
   ```
   db.createUser({
     user: "workOrganizerUser",
     pwd: "pass123",
     roles: [ { role: "readWrite", db: "mongo_work_org" } ]
   });
   ```
6. If you want you can add dummy data to tables
   ```
   db.Tasks.insert({
     taskName: 'First task',
     description: 'Description for first task job',
     isStarted: true,
     type: 'manual, automated',
   });
   db.Notes.insert({
     title: 'My title',
     description: 'My desc'
   });
   ```
7. To check data in table use `db.Tasks.find()`. To remove all data from table use `db.Tasks.remove({})`
8. All other action form MongoDB should be done by created user `mongo mongodb://workOrganizerUser:pass123@mongo_work_org:27017/mongo_work_org`
9. Rerun project by `docker-compose up`
10. Project should be available on `http://localhost:3000`

## Need to be updated...
To run a project use `node index.js`

Tests:
* run all tests: `npm test`
* watch mode: `npm test -- --watch`
* verify coverage: `npm test -- --coverage`

ESLint:
* create config file `./node_modules/.bin/eslint --init`
* after adding run script in package.json (explicitly pointed files and directories which should be checked) verification could be done by running `npm run lint`
