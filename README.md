# WAE exercise 1
*Web application engineering and content managment, sommer semester 2021, group 3, exercise 1*

## Technologie Stack

### Frontend: Next.js
We chose Next.js as our frontend, a React framework with a wide range of features such as hybrid static & server rendering or smart bundling & route pre-fetching. Another reason why we chose Next.js is the fact that a large number of companies already build their frontend on this framework. We have extended our project with TailwindCSS to make the design of our frontend easier.

### Backend: Next.js
With Next.js it is also possible to set up a custom API in the same project with different endpoints. It is possible to use those APIs with a REST architecture or even with GraphQL. For us, it is easier if the backend and the frontend are in the same project, so everyone can participate in the exercises.

### Database: mongoDB
The main reason why we used the NoSql database mongoDB is that we wanted to gather more knowledge with it. Another reason why we chose mongoDB is that it is highly recommended for rapid prototyping of web applications.

## Functionality
After the Docker container has been successfully launched with our image, it is possible to open the web application via the path: http://localhost:3000/. The first page will always be the login screen, which contains only one button to start the login process. This button will redirect the user to the specified OpenID Connect Provider for the authentication. By calling the OpenID Connect Provider, we pass various settings such as a client-specific nonce, our client ID, and the path to which the provider should redirect after successful or invalid authentication. In this case, the user will land on our dashboard component, where we pick up the token and client-specific nonce and send a request to our /api/login endpoint, which uses the recommended library to validate the received token and nonce on our OpenID Connect provider. If the token is valid, the endpoint returns to the client with status code 200 and the user information, which is then set in the client. If the token is not valid, the endpoint returns with status code 401 and the client redirects the user to an error page , from which they can return to the login page. On the dashboard component there is a button that allows to log out from the web application and revoke all existing tokens. 

## Docker

### Docker Image 
* [waecm-2021-group-03-bsp-1](https://hub.docker.com/r/waecm2021group03/waecm-2021-group-03-bsp-1)


```
sha256:f5b964f8d92cce42ea27bcc57af728bad5da33c50feaac8c6dc179f83c7ecdfc
```

### Docker Run
The Docker image requires port 3000, and the following command shows how to run the container.

```
$ docker run -p 3000:3000 waecm2021group03/waecm-2021-group-03-bsp-1
```

## ESLint 
We used ESLint in our project, use the following command in the root folder of the project to detect all files. Otherwise it is possible to use VSCode with the corresponding plugin.

```
$ eslint "./**" --fix
```

## Development

In this repository, both frontend and backend are combined into a single NextJS project. In the beginning a quick look into the [docs](https://nextjs.org) may be useful.

To start developing make sure you complete the following steps.

1. Install [NodeJS](https://nodejs.org/) and make sure the commands `npm` and `node` work globally
2. Within this project install dependencies with the command: `npm install`
3. Run the development server with the command `npm run dev`


### Info
OpenID Connect Information Endpoint: https://waecm-sso.inso.tuwien.ac.at/auth/realms/waecm/.well-known/openid-configuration

## Twitter Development Account
Benutzer: @WaecmGroup3

Passwort: QBE>3[">aG}@A56fUi^#
