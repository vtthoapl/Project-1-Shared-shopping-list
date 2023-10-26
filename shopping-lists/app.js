import { configure, serve } from './deps.js';
import * as listController from './controllers/listsController.js';
import * as singleListController from './controllers/singleListController.js';
import * as requestUtils from './utils/requestUtils.js';

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);
  //*match[0-9]
  /*   if(url.pathname.match('lists/[0-9]+') && request.method === "GET"){
    return await singleListController.viewAllSingleList(request)
  }
  else */
  if (
    url.pathname.match('/lists/[0-9]+/items/[0-9]+/collect') &&
    request.method === 'POST'
  ) {
    return await singleListController.markCollectedValue(request);
  } else if (
    url.pathname.match('/lists/[0-9]+/items') &&
    request.method === 'POST'
  ) {
    return await singleListController.createNewItem(request);
  } else if (url.pathname.match('lists/[0-9]+') && request.method === 'GET') {
    return await singleListController.viewSingleList(request);
  } else if (
    url.pathname.match('lists/[0-9]+/deactivate') &&
    request.method === 'POST'
  ) {
    return await listController.deactiveList(request);
  } else if (url.pathname === '/lists' && request.method === 'GET') {
    return await listController.viewAllList(request);
  } else if (url.pathname === '/lists' && request.method === 'POST') {
    return await listController.addItem(request);
  } else if (url.pathname === '/' && request.method === 'GET') {
    return listController.viewMain();
  } else {
    return new Response('Not found', { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });
