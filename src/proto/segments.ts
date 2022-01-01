/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kivsee.proto";

export interface Pixel {
  index: number;
  relPos: number;
}

/**
 * a single segment with a unique name that identifies it,
 * and the pixels that define the segment.
 */
export interface Segment {
  name: string;
  pixels: Pixel[];
}

/**
 * This message describes all the segments in a single controller.
 * They all share a single buffer with number_of_pixels pixels,
 * indexed from 0, 1, ..., number_of_pixels - 1
 */
export interface ThingSegments {
  guid: number;
  numberOfPixels: number;
  segments: Segment[];
}

const basePixel: object = { index: 0, relPos: 0 };

export const Pixel = {
  encode(message: Pixel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== 0) {
      writer.uint32(8).uint32(message.index);
    }
    if (message.relPos !== 0) {
      writer.uint32(21).float(message.relPos);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Pixel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePixel } as Pixel;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.uint32();
          break;
        case 2:
          message.relPos = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Pixel {
    const message = { ...basePixel } as Pixel;
    if (object.index !== undefined && object.index !== null) {
      message.index = Number(object.index);
    } else {
      message.index = 0;
    }
    if (object.relPos !== undefined && object.relPos !== null) {
      message.relPos = Number(object.relPos);
    } else {
      message.relPos = 0;
    }
    return message;
  },

  toJSON(message: Pixel): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.relPos !== undefined && (obj.relPos = message.relPos);
    return obj;
  },

  fromPartial(object: DeepPartial<Pixel>): Pixel {
    const message = { ...basePixel } as Pixel;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = 0;
    }
    if (object.relPos !== undefined && object.relPos !== null) {
      message.relPos = object.relPos;
    } else {
      message.relPos = 0;
    }
    return message;
  },
};

const baseSegment: object = { name: "" };

export const Segment = {
  encode(
    message: Segment,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.pixels) {
      Pixel.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Segment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSegment } as Segment;
    message.pixels = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.pixels.push(Pixel.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Segment {
    const message = { ...baseSegment } as Segment;
    message.pixels = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.pixels !== undefined && object.pixels !== null) {
      for (const e of object.pixels) {
        message.pixels.push(Pixel.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: Segment): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.pixels) {
      obj.pixels = message.pixels.map((e) => (e ? Pixel.toJSON(e) : undefined));
    } else {
      obj.pixels = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Segment>): Segment {
    const message = { ...baseSegment } as Segment;
    message.pixels = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.pixels !== undefined && object.pixels !== null) {
      for (const e of object.pixels) {
        message.pixels.push(Pixel.fromPartial(e));
      }
    }
    return message;
  },
};

const baseThingSegments: object = { guid: 0, numberOfPixels: 0 };

export const ThingSegments = {
  encode(
    message: ThingSegments,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guid !== 0) {
      writer.uint32(13).fixed32(message.guid);
    }
    if (message.numberOfPixels !== 0) {
      writer.uint32(16).uint32(message.numberOfPixels);
    }
    for (const v of message.segments) {
      Segment.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ThingSegments {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseThingSegments } as ThingSegments;
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
          message.segments.push(Segment.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ThingSegments {
    const message = { ...baseThingSegments } as ThingSegments;
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
        message.segments.push(Segment.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: ThingSegments): unknown {
    const obj: any = {};
    message.guid !== undefined && (obj.guid = message.guid);
    message.numberOfPixels !== undefined &&
      (obj.numberOfPixels = message.numberOfPixels);
    if (message.segments) {
      obj.segments = message.segments.map((e) =>
        e ? Segment.toJSON(e) : undefined
      );
    } else {
      obj.segments = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ThingSegments>): ThingSegments {
    const message = { ...baseThingSegments } as ThingSegments;
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
        message.segments.push(Segment.fromPartial(e));
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
