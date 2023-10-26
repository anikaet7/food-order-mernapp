const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/food"

const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log(err);
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("gofood")
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("food category")
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;

                    }
                })

            });
        }

    }

    )
}






module.exports = mongoDB;
