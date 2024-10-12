import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = Schema({
  videoFile: { require: true, type: String},
  thumbnail: { require: true, type: String },
  owner:{
    type: Schema.Types.ObjectId,
    ref:"User"
  },
  title: { require: true, type: String, unique:true,trim:true},
  description: { require: true, type: String },
  duration: {type: Number },
  views:{type:Number,default:0},
  isPublished:{type:Boolean,default:true}
},
{
    timestamps: true,
}
);


videoSchema.plugin(mongooseAggregatePaginate);
export const Viedo= mongoose.model('Viedo',videoSchema);
