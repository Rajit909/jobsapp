const { default: mongoose } = require("mongoose");

const connectToDB = () => {
    const connectionURL = process.env.MONGODB_URL;

    mongoose
    .connect(connectionURL)
    .then(() => console.log("DB connection successful!"))
    .catch((error) => console.log(error));

}

export default connectToDB