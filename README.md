# Real Cost - E-commerce Shopping Assistant

![Logo](https://i.ibb.co/SRPW6nY/logo-w-bg.png)

## The official website is [realcost.shop](https://realcost.shop)

| Table contents                                                         |
| ---------------------------------------------------------------------- |
| [Tech stack](https://github.com/leephan2k1/real-cost#tech-stack)       |
| [Inspiration](https://github.com/leephan2k1/real-cost#inspiration)     |
| [Screenshots](https://github.com/leephan2k1/real-cost#screenshots)     |
| [Project Setup](https://github.com/leephan2k1/real-cost#project-setup) |

## Tech stack

-   NextJS x ReactJS
-   Jotai
-   Next-auth
-   TailwindCSS x HeadlessUI x Ariakit
-   MongoDb

[Go to table of contents](https://github.com/leephan2k1/real-cost#the-official-website-is-realcostshop) 🔼

## Inspiration

-   The website layout is inspired by my previous comic project [Kyotomanga.live](https://kyotomanga.live)
-   Processes and user experience inspired by [BeeCost](https://beecost.vn) and [Lichsugia](https://lichsugia.com)
-   The UI Components is strongly inspired by [Sulton Handaya](https://dribbble.com/sultonhand) member of Pelorous Studio team on Dribble

[Go to table of contents](https://github.com/leephan2k1/real-cost#the-official-website-is-realcostshop) 🔼

## Screenshots

### Home Page

![home-page](https://i.ibb.co/ZMrV5m0/home-page.png)

[Go to table of contents](https://github.com/leephan2k1/real-cost#the-official-website-is-realcostshop) 🔼

### Login Page:

![login-page](https://i.ibb.co/HrHwNGY/screencapture-localhost-3000-login-2022-10-21-20-57-50.png)

[Go to table of contents](https://github.com/leephan2k1/real-cost#the-official-website-is-realcostshop) 🔼

### Product Details Page

![product details](https://i.ibb.co/7yyV4Qp/details-page.png)

[Go to table of contents](https://github.com/leephan2k1/real-cost#the-official-website-is-realcostshop) 🔼

### Search Page

![search-page](https://i.ibb.co/gPbt92r/search-page.png)

[Go to table of contents](https://github.com/leephan2k1/real-cost#the-official-website-is-realcostshop) 🔼

### Search Page (mobile screens)

![search-page-mobile](https://i.ibb.co/Fw7DQfG/screencapture-localhost-3000-2022-10-20-10-24-11-1.png)

[Go to table of contents](https://github.com/leephan2k1/real-cost#the-official-website-is-realcostshop) 🔼

### Flash-sale Page

![Flash-sale page](https://i.ibb.co/8051nyy/flash-sale-page.png)

[Go to table of contents](https://github.com/leephan2k1/real-cost#the-official-website-is-realcostshop) 🔼

### Notifications

![notifications](https://i.ibb.co/kKFLKCN/notifications.png)

[Go to table of contents](https://github.com/leephan2k1/real-cost#the-official-website-is-realcostshop) 🔼

### Browse Page

![browse-page](https://i.ibb.co/6DkJrHd/browse-page.png)

[Go to table of contents](https://github.com/leephan2k1/real-cost#the-official-website-is-realcostshop) 🔼

### Favorites Page

![favorites page](https://i.ibb.co/2q2Kv2b/favorite-page.png)

[Go to table of contents](https://github.com/leephan2k1/real-cost#the-official-website-is-realcostshop) 🔼

### Set Notify Conditions

![ntf-conditions](https://i.ibb.co/wKHzKpt/set-notify.png)

[Go to table of contents](https://github.com/leephan2k1/real-cost#the-official-website-is-realcostshop) 🔼

## Project Setup

1. Clone this project:

```
git clone git@github.com:leephan2k1/real-cost.git
```

2. Install all dependencies

```
yarn i
```

_But I highly recommend using this package of utilities to avoid mistaking node modules package manager: [antfu/ni](https://github.com/antfu/ni)_

If you already have it installed, just type the following extremely short command:

```
ni
```

3. Environment variables setting

```
# see: https://github.com/leephan2k1/e-commerce-tracking-server
NEXT_PUBLIC_BASE_URL=<your-backend-endpoint>

# This key serves webPush notify, it must match the key on the server.
# On the server type: npx web-push generate-vapid-keys then store 2 keys to .env and export a public vapid key to client.
NEXT_PUBLIC_VAPID_KEY=<your-public-vapid-key>

# Note: Because i use next-auth You must provide callback uri for facebook and google has the following form: your-domain.com/api/auth/callback/<provider> .Otherwise the authentication won't work!

# Google Oauth2 (See: https://console.cloud.google.com/)
GOOGLE_ID=<your-google-auth-id>
GOOGLE_SECRET=<your-google-auth-secret>

# Facebook Oauth (See: https://developers.facebook.com/apps)
FACEBOOK_CLIENT_ID=<your-facebook-client-id>
FACEBOOK_CLIENT_SECRET=<your-facebook-secret>

# Mongodb: (See: https://www.mongodb.com/atlas/database)
MONGODB_URI=<your-mongodb-uri-endpoint>

# Random Secret (Easy generate: https://generate-secret.vercel.app/32)
JWT_SECRET=<your-jwt-secret>

BC_URL=https://beecost.vn
BC_BASE_API=https://apiv3.beecost.vn

```

[Go to table of contents](https://github.com/leephan2k1/real-cost#the-official-website-is-realcostshop) 🔼

# Happy coding!

![fun-doge](https://i.ibb.co/9rTSpLM/21f58444ba137e4d2702.jpg)
