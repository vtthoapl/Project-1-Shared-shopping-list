import { renderFile } from '../deps.js';
import * as singleListServices from '../services/singleListServices.js';
import * as listsServices from '../services/listsServices.js';
import * as requestUtils from '../utils/requestUtils.js';
const responseDetails = {
  headers: { 'Content-Type': 'text/html;charset=UTF-8' },
};

const viewSingleList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split('/');

  const data = {
    itemInsideList: await singleListServices.getAllNotCollectedItems(
      urlParts[2]
    ),
    collectedItems: await singleListServices.getAllCollectedItems(urlParts[2]),
    list: await listsServices.findCurrentList(urlParts[2]),
  };
  return new Response(
    await renderFile('singleList.eta', data),
    responseDetails
  );
};

const createNewItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split('/');
  const formData = await request.formData();
  const name = formData.get('name');
  await singleListServices.createItem(urlParts[2], name);
  return requestUtils.redirectTo(`/lists/${urlParts[2]}/items`);
};

const markCollectedValue = async (request) => {
  const url = new URL(request.url);
  const urlparts = url.pathname.split('/');
  await singleListServices.markCollectedValue(urlparts[4]);
  return requestUtils.redirectTo(`/lists/${urlparts[2]}`);
};

export { viewSingleList, createNewItem, markCollectedValue };
