import DefaultLocalPostRepository, { LocalPostRepository } from './local';
import MongoLocalPostRepository from './mongo_local';
import PostgreLocalPostRepository from './postgre_local';

let localDb: LocalPostRepository;


switch (process.env.DB_TYPE) {
  case 'postgres':
    localDb = new PostgreLocalPostRepository();
    break;
  case 'mongo':
    localDb = new MongoLocalPostRepository();
    break;
  default:
    localDb = new DefaultLocalPostRepository();
    break;
}

export default localDb;
