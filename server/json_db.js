const fs = require('fs/promises')
const path = require('path')

const DB_PATH = path.join(__dirname, 'db.json')

// ====================
// Пример db.json
// {
//   "tableName": {
//     "lastId": 0,
//     "data": []
//   }
// }
// ====================

async function readDb() {
  try {
    const db = await fs.readFile(DB_PATH, { encoding: 'utf-8' })
    return JSON.parse(db)
  } catch(e) {
    throw new Error(e.message)
  }
}

async function writeDb(data) {
  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(DB_PATH, json);
}

async function getTable(tableName, options) {
  try{
    const db = await readDb()

    if(!db[tableName])
      throw new Error(`Таблицы ${tableName} не существует`)

    if(options && options.condition) {
      const found = options.isArray ? db[tableName].data.filter(options.condition) : db[tableName].data.find(options.condition)
      return found
    } else
      return db[tableName].data
  } catch(e) {
    throw new Error(e.message)
  }
}

async function writeToTable(tableName, data) {
  try{
    const db = await readDb()

    if(!db[tableName])
      throw new Error(`Таблицы ${tableName} не существует`)

    const newIds = []
    
    if(Array.isArray(data))
      data.forEach(obj => {
        db[tableName].data.push({ id: ++db[tableName].lastId, ...obj })
        newIds.push(db[tableName].lastId)
      })
    else {
      db[tableName].data.push({ id: ++db[tableName].lastId, ...data })
      newIds.push(db[tableName].lastId)
    }
    
    await writeDb(db)
    return newIds
  } catch(e) {
    throw new Error(e.message)
  }
}

async function deleteFromTable(tableName, options) {
  try{
    const db = await readDb()

    if(!db[tableName])
      throw new Error(`Таблицы ${tableName} не существует`)
    
    const found = options && options.isArray ? db[tableName].data.filter(options.condition) : db[tableName].data.find(options.condition)

    if(options && options.isArray)
      found.forEach(f => db[tableName].data.splice(db[tableName].data.indexOf(f), 1))
    else
      db[tableName].data.splice(db[tableName].data.indexOf(found), 1)
    
    await writeDb(db)    
  } catch(e) {
    throw new Error(e.message)
  }
}

async function updateFromTable(tableName, condition, updates) {
  try{
    const db = await readDb()

    if(!db[tableName])
      throw new Error(`Таблицы ${tableName} не существует`)
    
    const found = db[tableName].data.find(condition)

    for(let key in updates) {
      found[key] = updates[key]
    }
    
    await writeDb(db) 
    return found   
  } catch(e) {
    throw new Error(e.message)
  }
}

module.exports = {
  getTable,
  writeToTable,
  deleteFromTable,
  updateFromTable
}