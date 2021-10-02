The project runs on nodejs. Make sure you install nodejs

FEATURES:

  - Display product list
  - Product search feature (Autocomplete)
  - Product pagination
  - Display customer list
  - Customer profile with purchase records
  - Database import and delete sample data

USAGE:

Env variables:
  - PORT=5000
  - NODE_ENV=development
  - DATABASE= your mongodb uri


INSTALL DEPENDENCIES(API AND CLIENT)

  npm install
  cd frontend
  
  

RUN

  #Run frontend(:3000) & backend(:5000)
  - npm run dev
  
  
  #Run backend only
  - npm run server
  
  
  

BUILD & DEPLOY

#Create client production build
- cd client
- npm run build

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

IMPORT/DELETE SAMPLE DATA
#Import data
- cd api/dev-data
- node import-dev-data --import

#Delete data
- cd api/dev-data
- node import-dev-data --delete
