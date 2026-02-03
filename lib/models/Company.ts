import mongoose, { Schema, Model, models } from "mongoose";

export interface ICompany {
  name: string;
}

const CompanySchema = new Schema<ICompany>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// 👇 THIS LINE FIXES THE ERROR
const Company: Model<ICompany> =
  models.Company || mongoose.model<ICompany>("Company", CompanySchema);

export default Company;
