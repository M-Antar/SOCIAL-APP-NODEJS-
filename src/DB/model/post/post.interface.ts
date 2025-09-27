import { ObjectId } from 'mongodb';
import { REACTION } from '../../../utils/common/enum';
import { Types } from 'mongoose';

export interface IAttachment {
  url: string;
  type: string;
} // untill make attachment module

export interface IReaction {
     reaction:REACTION;
     userId:ObjectId;
} 
export interface IPost {
  _id:ObjectId
  userId: ObjectId;
  content: string;
  reactions: IReaction[];
  attachments?: IAttachment[];
}
