# BAMBU Frontend Engineer Test

## Getting Started

To get started, first install all the necessary dependencies.
```
> npm install
```


#### Generate a production build
build source also included as a default (so you can browse the project without installing the dependencies).
```
> npm run build
```
This will generate a compressed file build under 'build/'.
<br />
Highly suggested to use [http-server](https://www.npmjs.com/package/http-server) to run on local machine

```
> npm install http-server -g
> cd build/
> http-server 
```
Open a browser pointing to [http://localhost:8080/](http://localhost:8080/)


#### Development Server
```
> npm  run start
```