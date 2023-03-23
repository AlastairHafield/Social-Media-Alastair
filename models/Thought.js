//require Schema, model, and ObjectId from mongoose
const { Schema, model } = require("mongoose");

//reaction schema
const reactionSchema = new Schema(
  {
    //set custom id to avoid confusion with parent comment _id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // use getter method to format timestamp on query
      get: (createdAtDate) =>
        moment(createdAtDate).format("MMM DD, YYYY [at] hh:mm a"),
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//schema for thought
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // use getter method to format timestamp on query
      get: (createdAtDate) =>
        moment(createdAtDate).format("MMM DD, YYYY [at] hh:mm a"),
    },
    username: {
      type: String,
      required: true,
    },
    // use reactionSchema to validate data for a reply
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//create virtual for total count of reactions on retrieval
thoughtSchema.virtual(`reactionCount`).get(function () {
  return this.reactions.length;
});

//create the Thought model using the thoughtSchema
const Thought = model("Thought", thoughtSchema);

//export the Thought model
module.exports = Thought;
