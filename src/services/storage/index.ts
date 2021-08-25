import {GIT_STORAGE_REPO, STORAGE_TYPE} from '../../config';
import {GitStorage} from './git';
import {Storage} from './storage';

export const createStorageBackend = (): Storage => {
  switch (STORAGE_TYPE) {
    case 'git':
      return new GitStorage(GIT_STORAGE_REPO!);
    default:
      throw new Error(`Storage type not supported: ${STORAGE_TYPE}`);
  }
};
