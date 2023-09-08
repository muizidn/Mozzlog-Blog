import DefaultLocalCommentRepository, { LocalCommentRepository } from './local';
import MongoLocalCommentRepository from './mongo_local';
import PostgreLocalCommentRepository from './postgre_local';

let localDb: LocalCommentRepository;


switch (process.env.DB_TYPE) {
  case 'postgres':
    localDb = new PostgreLocalCommentRepository();
    break;
  case 'mongo':
    localDb = new MongoLocalCommentRepository();
    break;
  default:
    localDb = new DefaultLocalCommentRepository();
    break;
}

export default localDb;
