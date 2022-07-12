# Minimal (YJs - React - Supabase) offline first Todo Sample test web app

Testing basic implementation and functionalities of YJs with a todo react app and a backup on Supabase. Note that supabase is not the "source of truth" here. It is just doing the job of a backup server. The "source of truth" are all the Yjs apps connected by Webrtc and each of their local Indexeddb databases.

This app is only Offline first because the code is so simple. More complex apps will have to add apropriate Service workers or another alternative.

## How to use

-   This is just a basic create-react-app, so `npm start` is sufficent. For more see the "Create React App Readme" section.

-   The `.env.example` file should be renamed to something like `.env.local` or similar options (see react docs) and edited with the supabase credentials.

-   In Supabase dashboard one needs to create a table named `todos` with the following columns

    ```js
    id: uuid, primary
    title: varchar
    state: bool
    created_at: timestamptz
    updated_at: timestamptz
    ```

-   To test the Webrtc feature of Yjs change the roomName variable in App.jsx to a constant (instead of using UUID) and start 2 different instances of react with `npm start`. Then the changes in one browser window will be reflected in the other.

## Some definitions

-   [Yjs](https://docs.yjs.dev/) is a high-performance CRDT for building collaborative applications that sync automatically. Modular building blocks for building collaborative applications like Google Docs and Figma.

-   [React](https://reactjs.org/) is a JavaScript library for building user interfaces

-   [Supabase](https://supabase.com/) is an open source Firebase alternative. Start your project with a Postgres Database, Authentication, instant APIs, Realtime subscriptions and Storage.

-   With [WebRTC](https://webrtc.org/), you can add real-time communication capabilities to your application that works on top of an open standard. It supports video, voice, and generic data to be sent between peers, allowing developers to build powerful voice- and video-communication solutions. The technology is available on all modern browsers as well as on native clients for all major platforms.

-   [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) is a low-level API for client-side storage of significant amounts of structured data, including files/blobs.

## Notes

-   Based on [Minimal-React-Todo-boilerplate](https://github.com/audiBookning/Minimal-React-Todo-boilerplate) and keeping the same oversimplified/minimalist attitude, but using the more fiddly code in the branch "little-more-complex"

-   Unfortunatelly, the more i add, the harder it is to maintain a "easy to follow" code base

-   Added offline persistence with Indexeddb

## Todos (code)

-   add tests

-   The providers should be promisified?

# Create React App Readme

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

```

```
