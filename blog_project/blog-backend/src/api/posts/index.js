import Router from 'koa-router';
import * as postCtrl from './posts.Ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const posts = new Router();

posts.get('/', postCtrl.list);
posts.post('/', checkLoggedIn, postCtrl.write);

const post = new Router(); // /api/posts/:id
post.get('/', postCtrl.read);
post.delete('/', checkLoggedIn, postCtrl.checkOwnPost, postCtrl.remove);
post.patch('/', checkLoggedIn, postCtrl.checkOwnPost, postCtrl.update);

posts.use('/:id', postCtrl.getPostById, post.routes());
export default posts;

// import Router from 'koa-router';
// import * as postCtrl from './posts.Ctrl';

// const posts = new Router();

// posts.get('/', postCtrl.list);
// posts.post('/', postCtrl.write);
// posts.get('/:id',postCtrl.checkObjectId, postCtrl.read);
// posts.delete('/:id',postCtrl.checkObjectId, postCtrl.remove);
// posts.patch('/:id', postCtrl.checkObjectId, postCtrl.update);

// export default posts;
