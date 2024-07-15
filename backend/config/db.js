import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://vikash:vikash123@cluster0.jj9pa6n.mongodb.net/YumYard"
    )
    .then(() => {
      console.log("db connected");
    });
};
