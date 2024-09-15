//Middleware functions take in the Request object, the Response object, and the next function to execute for this route.
const requestParseMiddleware = (_req: any, _res: any, next: any) => {
    // this will look the http method (GET, POST, etc) and the current timestamp.
    
    // calling the next function will continue with the route, without it all your requests will hang.
    next();
  };
  
  export default requestParseMiddleware;