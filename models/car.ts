import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
   carName: {
     type: String,
     required: [true, "please provide carName"],
     unique: true,
   },
   Year: {
     type: String,
     required: [true, "please provide year of manufacturing"],
   },
   Price: {
     type: String,
     required: [true, "please provide price of car"],
   }
});

const Car = mongoose.models.Car || mongoose.model("Car", carSchema);
export default Car;
