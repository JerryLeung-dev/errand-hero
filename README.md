The project runs on nodejs. Make sure you install nodejs (version 14.x) https://nodejs.org/en/.


TECH STACK:
- Front-end: React
- Backend: NodeJs/ExpressJS
- Database: MongoDB
- Deployed on Heroku

FEATURES:

  - Display product list
  - Product search feature (Autocomplete)
  - Product pagination
  - Display customer list
  - Customer profile with purchase records
  - Database import and delete sample data

USAGE:

Create confib.env at the root


Env variables:
  - PORT=5000
  - NODE_ENV=development
  - DATABASE= your mongodb uri (with password as PASSWORD variable) //e.g.: mongodb+srv://admin:<PASSWORD>...
  - DATABASE_PASSWORD= your database password


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


BACKEND Docs
- Base url: http://localhost:5000 (on development) && https://errandhero.herokuapp.com/ (on production)
- Routes: 
  
  
  
    Customers: - /api/v1/customers (get, post)
  
  
               - /api/v1/customers/:slug (get,patch,delete)
  
  
  
    Products : - /api/v1/products (get, post)
  
  
               - /api/v1/products/product-list   (get) //return a list of product names for autocomplete suggestions
    
