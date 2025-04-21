// const  baseURL='http://127.0.0.1:8000'
const  baseURL='http://127.0.0.1:8081'
// const  baseURL='http://145.223.27.25:8081'
export const environment = {
  production: true,
  baseLogin: baseURL+ '/login/',
  baseLogout: baseURL+ '/logout/',
  basetokenRefresh: baseURL+ '/token/refresh/',
  baseRegister: baseURL+ '/registro/',
  baseUsers: baseURL+ '/users/',
  baseHealthy: baseURL+ '/health/',
  baseHabits:  baseURL+'/habits/',
  baseRepots:  baseURL+'/reports/',
};



