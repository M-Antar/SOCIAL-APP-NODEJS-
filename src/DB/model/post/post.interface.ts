import { ObjectId } from 'mongodb';
import { REACTION } from '../../../utils/common/enum';

export interface IAttachment {
  url: string;
  type: string;
} // untill make attachment module

export interface IReaction {
     reaction:REACTION;
     userId:ObjectId;
} 
export interface IPost {
  userId: ObjectId;
  content: string;
  reactions: IReaction[];
  attachments?: IAttachment[];
}
