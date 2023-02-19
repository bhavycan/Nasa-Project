**Note: Configuration For WINDOWS users only!**
### `npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"`

This will set your set shell for npm run-scripts in Windows [Know more how to set shell in windows for npm](https://stackoverflow.com/questions/23243353/how-to-set-shell-for-npm-run-scripts-in-windows)

## Server Architecture

![Server Architecture](https://github.com/pranta-barua007/NASA-mission-control/blob/master/__readme-images/nasa.png?raw=true)

## Available Scripts
In the project directory, you can run:
### `npm run watch`

Starts the server with Nodemon & Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run deploy`

Builds the app for production to the `server/public` folder and serves from the node server.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Launching Look 🌎

The Landing Page of the website is fetching the data from the manually doenloaded CSV file from Nasa's website. Application shorts the only 8 habitable planets from more than 10000+ discovered planets from the kepler telescope and give thoes only 8 planet options
for mission. User can Launch the schedual by filling the information.

![image](https://user-images.githubusercontent.com/94931828/219980313-99b8165b-5b05-48f9-b696-8b9a689a05b6.png)

## Upcoming 🚀

User can see the launch in this page by date. In addition, website also play with the SpaceX API and load the real time data to this page. User can also abort the mission.

![image](https://user-images.githubusercontent.com/94931828/219980643-7befe980-af14-4620-a42f-801cf8f6c79d.png)

## History ✖️

User can see the aborted and previous launches in this page. Red flaged are aborted mission and the green flafed are successfully launched mission.

![image](https://user-images.githubusercontent.com/94931828/219980706-0c28ed4e-5927-4b3f-8103-708c5d393e67.png)


