import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  university: 'aktu' | 'lu';
  teacherId: mongoose.Types.ObjectId;
  price: number;
  trialDays: number;
  lectureCount: number;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a course title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a course description'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    university: {
      type: String,
      enum: ['aktu', 'lu'],
      required: true,
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: 0,
    },
    trialDays: {
      type: Number,
      default: 7,
      min: 1,
    },
    lectureCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema);
