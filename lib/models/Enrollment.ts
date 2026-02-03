import mongoose, { Schema, Document } from 'mongoose';

export interface IEnrollment extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  trialStartDate: Date;
  trialEndDate: Date;
  isPaid: boolean;
  progress: number;
  status: 'active' | 'expired' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const enrollmentSchema = new Schema<IEnrollment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    trialStartDate: {
      type: Date,
      default: Date.now,
    },
    trialEndDate: {
      type: Date,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'completed'],
      default: 'active',
    },
  },
  { timestamps: true }
);

// Compound index for unique enrollment per user per course
enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.models.Enrollment || mongoose.model<IEnrollment>('Enrollment', enrollmentSchema);
