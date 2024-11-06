# Module Federation with Vite

## Source App: Mars
Create a project and install Module Federation plugin:
```sh
npm create vite mars 
cd mars
npm install @originjs/vite-plugin-federation -D
```

Update scripts in package.json to make app run on a static port:
```json
"scripts": {
    "dev": "vite --port 5001 --strictPort",
    "build": "tsc -b && vite build",
    "preview": "vite preview --port 5001 --strictPort",
    "serve": "vite preview --port 5001 --strictPort"
}
```

Add spec for federation plugin in Vite config file:
```js
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mars", // app name
      filename: "marsEntry.js", // manifest name 
      exposes: { "./Button": "./src/Button", }, // which components to expose 
      shared: ["react", "react-dom"] // libraries used in exposed components
    })
  ],
})
```
**Note:** manifest is basically a static asset that contains all definitions of exposed components.

Build and run the app:
```sh
npm run build
npm run serve
```

Go to http://localhost:5001/ to make sure your components are working fine. If they are,
navigate to http://localhost:5001/assets/marsEntry.js and check if your federation's manifest is available.

## Consumer App: Earth
Now it's time to setup another app. Repeat the first step but for different project:
```sh
npm create vite earth 
cd earth
npm install @originjs/vite-plugin-federation -D
```

Add spec for federation in Vite config file:
```js
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "earth", // app name
      remotes: {
        mars: "http://localhost:5001/assets/marsEntry.js", // url to manifest 
      },
      shared: ["react", "react-dom"]
    })
  ],
})
```
**Note:** the key in remotes may be called as heck as you want. So for example you can use "shared" instead of "mars" and etc. 
You will use this key to import remote component into the code of current app.


Create file module.d.ts and declate module for component:
```js
declare module 'mars/Button'
```

Import component and use it in code:
```js
const Button = lazy(() => import("mars/Button"))

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <h1>Beloved Earth</h1>
        <Button />
        <button onClick={() => setCount((count) => count + 1)}>
          Population is {count}
        </button>
      </div>
   
  )
}
```

Build and run:
```sh
npm run build
npm run preview
```

## Tips
### Lazy loading
When using default export:
```js
const Button = lazy(() => import("mars/Button"));
```

In case of base export:
```js
const Button = lazy(() =>
  import('mars/Button')
    .then(({ Button }) => ({ default: Button })),
);
```