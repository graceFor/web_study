const Koa = require('koa');

const app = new Koa();

app.listen(4000, () => {
  console.log('Listenting to port 4000');
});