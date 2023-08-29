import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(()=>console.log("DB connection successful"))
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
