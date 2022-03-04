import { Storage } from './storage';
import { writeFile, readFile, readdir } from 'fs/promises';
import path from 'path';
import pino from 'pino';
import { Thing } from '../../types';

const logger = pino({ name: 'storage' });

export class GitStorage implements Storage {
  constructor(private repo: string) {
    if (!repo) {
      throw new Error('git repo directory is empty');
    }

    logger.info('created storage of type git', { repo });
  }

  async upsert(name: string, thing: Thing) {
    await writeFile(
      this.thingNameToFileName(name),
      JSON.stringify(thing, null, 4)
    );
  }

  async read(thingName: string): Promise<Thing> {
    return JSON.parse(
      await readFile(this.thingNameToFileName(thingName), { encoding: 'utf8' })
    );
  }

  async getAllThingNames(): Promise<string[]> {
    return (await readdir(this.repo)).map(
      fileName => path.parse(fileName).name
    );
  }

  private thingNameToFileName(thingName: string) {
    return path.join(this.repo, `/${thingName}.json`);
  }
}
