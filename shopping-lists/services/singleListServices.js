import { sql } from "../database/database.js";

const createItem = async(listId, name) => {
   await sql`INSERT INTO shopping_list_items (shopping_list_id, name)
    VALUES (${listId}, ${name})`
}

const getAllNotCollectedItems = async(itemId) => {
    const rows = await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${itemId} AND collected = FALSE ORDER BY name ASC`
    if(rows && rows.length > 0) {
        return rows
        //!SUPER important to remember when "return rows" --> result is = array 
        //!when "return rows[0]" --> result is = object
    }
    return false
}
const getAllCollectedItems = async(itemId) => {
    const rows = await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${itemId} AND collected = TRUE ORDER BY name ASC`
    if(rows && rows.length > 0) {
        return rows
        //!SUPER important to remember when "return rows" --> result is = array 
        //!when "return rows[0]" --> result is = object
    }
    return false
}

const markCollectedValue = async(id) => {
    return await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${id}`
}
//Counting for statistic
const countShoppingListItems = async() => {
    const rows = await sql`SELECT COUNT(*) FROM shopping_list_items`
    if (rows && rows.length > 0) {
        return +rows[0].count
        //?  COUNT(*) is default as rows[0].count if want to take the value from rows[0]
    }
    return false
}

export {createItem, getAllNotCollectedItems, markCollectedValue, getAllCollectedItems, countShoppingListItems}