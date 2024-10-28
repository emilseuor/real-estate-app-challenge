# Welcome to the Real Estate Challenge 👋

This is an Expo app which takes a list of properties, (I tried initially using a paid api which I thought was free for getting properties for rental and por sale in US)
When I noticed the api was paid, I used AI to make me a list of 50 properties of example with title, description, address, price, latitude, longitude.

## Get started

1. Install dependencies

   ```bash
   npm i
   ```

2. Start the app

   ```bash
    npm run android
    npm run ios
    npx expo run:android
    npx expo run:ios
    npx expo start
   ```

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

## Details to know

MapView from react-native-maps needs a Google Maps API Key which requires credit card and a plan
It´s actually working, but without any API key.

It also renders a list with the properties while adding markers over the map.
