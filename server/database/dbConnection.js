const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

class DatabaseConnection {
    constructor(dbUri) {
        this.dbUri = dbUri;
    }

    connect() {
        mongoose.connect(this.dbUri).then((conn) => {
            console.log(`Database Connected ${conn.connection.host}`);
        });
    }
}

module.exports = DatabaseConnection;
