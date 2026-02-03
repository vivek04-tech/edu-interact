import mongoose, { Schema, models, model } from "mongoose";

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Company =
  models.Company || model("Company", CompanySchema);

export default Company;
