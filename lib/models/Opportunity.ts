import mongoose, { Schema, Document } from 'mongoose';

export interface IOpportunity extends Document {
  type: 'project' | 'internship' | 'placement';
  title: string;
  description: string;
  companyId: mongoose.Types.ObjectId;
  university: 'aktu' | 'lu' | 'all';
  stipend?: number;
  duration?: string;
  applicationDeadline: Date;
  status: 'open' | 'closed' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const opportunitySchema = new Schema<IOpportunity>(
  {
    type: {
      type: String,
      enum: ['project', 'internship', 'placement'],
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    university: {
      type: String,
      enum: ['aktu', 'lu', 'all'],
      default: 'all',
    },
    stipend: {
      type: Number,
      default: null,
    },
    duration: {
      type: String,
      default: null,
    },
    applicationDeadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'closed', 'archived'],
      default: 'open',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Opportunity || mongoose.model<IOpportunity>('Opportunity', opportunitySchema);
