import PouchDB from 'pouchdb-react-native'

import SQLite from 'react-native-sqlite-2'
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite'
const SQLiteAdapter = SQLiteAdapterFactory(SQLite)
PouchDB.plugin(SQLiteAdapter)
export const rdbaddress=`http://admin:admin@192.168.1.9:5984/note`
export const dbaddress='mydb.db'
export const rdb = new PouchDB(rdbaddress)
export const db = new PouchDB(dbaddress, {adapter: 'react-native-sqlite'});
