/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "";

/**
 * a single segment with a unique name that identifies it,
 * and the indices (with the right order) that define the segment
 */
export interface SegmentConfig {
  name: string;
  indices: number[];
}

/**
 * This message describes all the objects in a single controller.
 * They all share a single buffer with number_of_pixels pixels,
 * indexed from 0, 1, ..., number_of_pixels - 1
 */
export interface SegmentsMapConfig {
  guid: number;
  numberOfPixels: number;
  segments: SegmentConfig[];
}

const baseSegmentConfig: object = { name: "", indices: 0 };

export const SegmentConfig = {
  encode(message: SegmentConfig, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    writer.uint32(18).fork();
    for (const v of message.indices) {
      writer.uint32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SegmentConfig {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSegmentConfig } as SegmentConfig;
    message.indices = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.indices.push(reader.uint32());
            }
          } else {
            message.indices.push(reader.uint32());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SegmentConfig {
    const message = { ...baseSegmentConfig } as SegmentConfig;
    message.indices = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.indices !== undefined && object.indices !== null) {
      for (const e of object.indices) {
        message.indices.push(Number(e));
      }
    }
    return message;
  },

  toJSON(message: SegmentConfig): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.indices) {
      obj.indices = message.indices.map((e) => e);
    } else {
      obj.indices = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<SegmentConfig>): SegmentConfig {
    const message = { ...baseSegmentConfig } as SegmentConfig;
    message.indices = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.indices !== undefined && object.indices !== null) {
      for (const e of object.indices) {
        message.indices.push(e);
      }
    }
    return message;
  },
};

const baseSegmentsMapConfig: object = { guid: 0, numberOfPixels: 0 };

export const SegmentsMapConfig = {
  encode(message: SegmentsMapConfig, writer: Writer = Writer.create()): Writer {
    if (message.guid !== 0) {
      writer.uint32(13).fixed32(message.guid);
    }
    if (message.numberOfPixels !== 0) {
      writer.uint32(16).uint32(message.numberOfPixels);
    }
    for (const v of message.segments) {
      SegmentConfig.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SegmentsMapConfig {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSegmentsMapConfig } as SegmentsMapConfig;
    message.segments = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guid = reader.fixed32();
          break;
        case 2:
          message.numberOfPixels = reader.uint32();
          break;
        case 3:
          message.segments.push(SegmentConfig.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SegmentsMapConfig {
    const message = { ...baseSegmentsMapConfig } as SegmentsMapConfig;
    message.segments = [];
    if (object.guid !== undefined && object.guid !== null) {
      message.guid = Number(object.guid);
    } else {
      message.guid = 0;
    }
    if (object.numberOfPixels !== undefined && object.numberOfPixels !== null) {
      message.numberOfPixels = Number(object.numberOfPixels);
    } else {
      message.numberOfPixels = 0;
    }
    if (object.segments !== undefined && object.segments !== null) {
      for (const e of object.segments) {
        message.segments.push(SegmentConfig.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: SegmentsMapConfig): unknown {
    const obj: any = {};
    message.guid !== undefined && (obj.guid = message.guid);
    message.numberOfPixels !== undefined &&
      (obj.numberOfPixels = message.numberOfPixels);
    if (message.segments) {
      obj.segments = message.segments.map((e) =>
        e ? SegmentConfig.toJSON(e) : undefined
      );
    } else {
      obj.segments = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<SegmentsMapConfig>): SegmentsMapConfig {
    const message = { ...baseSegmentsMapConfig } as SegmentsMapConfig;
    message.segments = [];
    if (object.guid !== undefined && object.guid !== null) {
      message.guid = object.guid;
    } else {
      message.guid = 0;
    }
    if (object.numberOfPixels !== undefined && object.numberOfPixels !== null) {
      message.numberOfPixels = object.numberOfPixels;
    } else {
      message.numberOfPixels = 0;
    }
    if (object.segments !== undefined && object.segments !== null) {
      for (const e of object.segments) {
        message.segments.push(SegmentConfig.fromPartial(e));
      }
    }
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
