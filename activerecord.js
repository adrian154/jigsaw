
// ActiveRecordClassFactory: produces active record classes
// db: database backing
// table: name of table
// model: object (keys are property names on class, values are column names)
const ActiveRecordClassFactory = function(db, table, model) {

    // Validate model
    if(model.hasOwnProperty("id") || model.hasOwnProperty("recordIsDeleted")) {
        throw new Error("Model has illegal property names.");
    }

    let result = class {

        // you really should not use this constructor!
        // if you do, there's a 99% chance something bad will happen
        constructor(id) {
            this.id = id;
            this.recordIsDeleted = false;
            this.fetch();
        }

        // retrieve fields from database
        fetch() {
            
            if(this.recordIsDeleted) {
                throw new Error("Cannot fetch deleted record.");
            }

            let data = db.prepare(`SELECT * FROM ${table} WHERE rowid = @id`).get({
                id: this.id
            });

            for(let [propertyName, columnName] of Object.entries(model)) {
                if(!data.hasOwnProperty(columnName)) {
                    throw new Error(`Result set from database is missing column ${columnName}`);
                }
                this[propertyName] = data[columnName];
            }

        }

        // write changes back to database
        save() {
            
            if(this.recordIsDeleted) {
                throw new Error("Cannot save deleted record.");
            }

            console.log(`UPDATE ${table} SET ${Object.values(model).map(columnName => `${columnName} = ?`).join(",")} WHERE rowid = ?`);
            console.log(Object.keys(model).map(propertyName => this[propertyName]).concat(this.id));

            db.prepare(`UPDATE ${table} SET ${Object.values(model).map(columnName => `${columnName} = ?`).join(",")} WHERE rowid = ?`).run(
                Object.keys(model).map(propertyName => this[propertyName]).concat(this.id)
            );

        }

        // delete record from database
        delete() {
            
            if(this.recordIsDeleted) {
                throw new Error("Cannot delete deleted record.");
            }

            db.prepare(`DELETE FROM ${table} WHERE rowid = @rowid`).run({
                rowid: this.id
            });

            this.recordIsDeleted = true;

        }

        // make new record
        static create(data) {

            // set up properties and save to db
            db.prepare(`INSERT INTO ${table} (${Object.keys(data).map(propertyName => {
                if(!model.hasOwnProperty(propertyName)) {
                    throw new Error(`Unknown property "${propertyName}" encountered while creating new record`);
                }
                return model[propertyName];
            }).join(",")}) VALUES (${
                Object.keys(data).map(propertyName => "@" + propertyName).join(",")
            })`).run(data);

        }

        // get user where
        static getOneWhere(SQLCondition, bindParams) {
            let res = db.prepare(`SELECT rowid FROM ${table} WHERE ${SQLCondition}`).get(bindParams);
            if(typeof res === "object") return new result(res.rowid);
        }

        // get users where
        static getAllWhere(SQLCondition, bindParams) {
            db.prepare(`SELECT rowid FROM ${table} WHERE ${SQLCondition}`).all(bindParams).map(res => new result(res.rowid));
        }

    };

    return result;

};

module.exports = ActiveRecordClassFactory;