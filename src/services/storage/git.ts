import { SegmentsMapConfig } from '../../proto/segments';
import { Storage } from './storage';
import fs from 'fs';
import path from 'path';

export class GitStorage implements Storage {

    constructor(private repo: string) {
        if(!repo) {
            throw new Error('git repo directory is empty');
        }
    }

    async upsert(name: string, segmentsMap: SegmentsMapConfig) {
        return new Promise<void>( (resolve, reject) => {
            fs.writeFile(this.thingNameToFileName(name), JSON.stringify(segmentsMap, null, 4), {}, (err) => {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        })
    }

    async read(thingName: string): Promise<SegmentsMapConfig> {
        return new Promise( (resolve, reject) => {
            fs.readFile(this.thingNameToFileName(thingName), (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    const segmentsMap = JSON.parse(data.toString()) as SegmentsMapConfig;
                    resolve(segmentsMap);
                }
            })
        });
    }

    async getAllThingNames(): Promise<string[]> {
        return new Promise( (resolve, reject) => {
            fs.readdir(this.repo, (err, files) => {
                if(err) {
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
