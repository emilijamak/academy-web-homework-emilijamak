# Frontend Homework Assignment

## Overview

This is a simple Infinity-Scroll capable web application with lazy loading feature. It allows users to browse photos and favourite them.

Tech Stack

1. React
2. React Hooks
3. Typescript
4. CSS
5. Pexels API
6. LocalStorage
7. Jest

### API 
1. Pexels API - to fetch curated photos dynamically
2. fetchPhotos plugin - a wrapper function for handling API requests

### React Hooks
Using useState, useEffect, useRef to manage components state, effects, and DOM interactions

Testing
- Jest – For unit testing.


## Features

- User is able to scroll the gallery and see information of the photos
- User is able to save favorite photos
- User is able to see all the favorite photos

## Data Flow

- Website application starts and photos are fetched from Pexel API and stored to Local Storage
- On scroll gallery fetches and loads more photos ( user can see first the 'skeleton' of the photo loaded and then the actual photo )
- Liked photo is resaved  updated to Local Storage with liked attribute now changed from 'liked: false' to 'liked: true'
- When 'Favorite' clicked on navigation bar - photos that have 'liked: true' attribute are loaded
- When 'All Photos' clicked on navigation bar - photos that have 'liked: false' attribute are loaded
- On reload photos are fetched from Local Storage and displayed again


# Getting started

Make sure that you have Node.js (v16 or later) downloaded
1. Close Repository
``` sh
git clone https://github.com/emilijamak/academy-web-homework-emilijamak
```

2. Install dependencies
``` sh
npm install
# or
yarn install
```

3. Running the Project
```sh
npm run dev
# or
yarn dev
```
This will start project on http://localhost:5173/

4. Running Tests
```sh
npm test
# or
yarn test
```

