import { ThingSegments } from '../../proto/segments';
import { Storage } from './storage';
import fs from 'fs';
import path from 'path';
import pino from 'pino';

const logger = pino({ name: 'storage' });

export class GitStorage implements Storage {
  constructor(private repo: string) {
    if (!repo) {
      throw new Error('git repo directory is empty');
    }

    logger.info('created storage of type git', { repo });
  }

  async upsert(name: string, segmentsMap: ThingSegments) {
    return new Promise<void>((resolve, reject) => {
      fs.writeFile(
        this.thingNameToFileName(name),
        JSON.stringify(segmentsMap, null, 4),
        {},
        err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  async read(thingName: string): Promise<ThingSegments> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.thingNameToFileName(thingName), (err, data) => {
        if (err) {
          reject(err);
        } else {
          const segmentsMap = JSON.parse(data.toString()) as ThingSegments;
          resolve(segmentsMap);
        }
      });
    });
  }

  async getAllThingNames(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(this.repo, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files.map(fileName => path.parse(fileName).name));
        }
      });
    });
  }

  private thingNameToFileName(thingName: string) {
    return path.join(this.repo, `/${thingName}.json`);
  }
}
