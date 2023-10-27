import { sql } from "../database/database.js";

const  deactiveList = async(id) => {
    await sql`UPDATE shopping_lists SET active = false WHERE id = ${id}`
}

const findCurrentList = async(itemId) => {
    const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${itemId} `
    if(rows && rows.length > 0) {
        return rows[0]
    }
    return false
}

const create = async (name) =>{
    await sql`INSERT INTO shopping_lists (name) VALUES (${name})`
}

const findActiveShoppingLists = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = true`
}

/* Statistic for main page */
const  countShoppingList = async() => {
    const rows = await sql`SELECT COUNT (*) FROM shopping_lists `
    if(rows && rows.length > 0) {
        return +rows[0].count
        /* //? mac dinh la .count neu muon lay value ben trong object */
    }
    return false
} 
export { create, findCurrentList, findActiveShoppingLists, deactiveList, countShoppingList}