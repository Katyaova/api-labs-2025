import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Define the Task Schema
const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  deadline: Date,
  done: Boolean,
  priority: { type: String, enum: ["Low", "Medium", "High"], required: true },
  created_at: Date,
  updated_at: Date
});

// Date Validator
const dateValidator = (date) => {
  return date > new Date();
};

// Apply validator AFTER the schema is created
TaskSchema.path("deadline").validate(dateValidator);

// Export the Task model
export default mongoose.model('Task', TaskSchema);
