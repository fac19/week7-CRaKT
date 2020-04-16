# week7-CRaKT

# week7-CRaKT

1. Clone repo
2. Change into folder
3. Run NPM install
4. Create a local production database called whatever you like.
   in psql
   CREATE DATABASE localprod WITH OWNER youruser;
5. Create a test database called localtest with the same owner/user
   CREATE DATABASE localtest WITH OWNER youruser;
   Alternatively edit testin package,josn to use a db of your choosing
6. Create an .env file in project root
   - PGDATABASE=local_production_database_name
   - PGUSER=your_user
   - PGPASSWORD=your_password
7. npm run setupdb
   Alternatively import db/init.sql in your preffered db admin tool

## Running tests

`npm run test`
