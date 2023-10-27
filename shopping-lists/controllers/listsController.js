import { renderFile } from 'https://deno.land/x/eta@v2.2.0/mod.ts';
import * as listsServices from '../services/listsServices.js';
import * as singleListServices from '../services/singleListServices.js'
import * as requestUtils from '../utils/requestUtils.js';

const responseDetails = {
  headers: { 'Content-Type': 'text/html;charset=UTF-8' },
};

const deactiveList = async (request) => {
  const url = new URL(request.url);
  const urlparts = url.pathname.split('/');
  await listsServices.deactiveList(urlparts[2]);
  return requestUtils.redirectTo('/lists');
};

const addItem = async (request) => {
  const formData = await request.formData();
  const name = formData.get('name');
  await listsServices.create(name);
  return requestUtils.redirectTo('/lists');
};


const viewAllList = async () => {
  const data = {
    lists: await listsServices.findActiveShoppingLists(),
  };

  return new Response(await renderFile('lists.eta', data), responseDetails);
};

const viewMain = async () => {
  const data = {
    countShoppingList: await listsServices.countMainPage(),
    countShoppingListItems: await singleListServices.countShoppingListItems()
  };
  console.log("<<<<<", data.countShoppingList)
  
  return new Response(await renderFile('mainpage.eta', data), responseDetails);
};

export { addItem, viewAllList, viewMain, deactiveList };
