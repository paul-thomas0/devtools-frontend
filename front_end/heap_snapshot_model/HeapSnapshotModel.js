/*
 * Copyright (C) 2014 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// @ts-nocheck
// TODO(crbug.com/1011811): Enable TypeScript compiler checks

export const HeapSnapshotProgressEvent = {
  Update: 'ProgressUpdate',
  BrokenSnapshot: 'BrokenSnapshot'
};

export const baseSystemDistance = 100000000;

/**
 * @unrestricted
 */
export class AllocationNodeCallers {
  /**
   * @param {!Array.<!SerializedAllocationNode>} nodesWithSingleCaller
   * @param {!Array.<!SerializedAllocationNode>} branchingCallers
   */
  constructor(nodesWithSingleCaller, branchingCallers) {
    /** @type {!Array.<!SerializedAllocationNode>} */
    this.nodesWithSingleCaller = nodesWithSingleCaller;
    /** @type {!Array.<!SerializedAllocationNode>} */
    this.branchingCallers = branchingCallers;
  }
}

/**
 * @unrestricted
 */
export class SerializedAllocationNode {
  /**
   * @param {number} nodeId
   * @param {string} functionName
   * @param {string} scriptName
   * @param {number} scriptId
   * @param {number} line
   * @param {number} column
   * @param {number} count
   * @param {number} size
   * @param {number} liveCount
   * @param {number} liveSize
   * @param {boolean} hasChildren
   */
  constructor(nodeId, functionName, scriptName, scriptId, line, column, count, size, liveCount, liveSize, hasChildren) {
    /** @type {number} */
    this.id = nodeId;
    /** @type {string} */
    this.name = functionName;
    /** @type {string} */
    this.scriptName = scriptName;
    /** @type {number} */
    this.scriptId = scriptId;
    /** @type {number} */
    this.line = line;
    /** @type {number} */
    this.column = column;
    /** @type {number} */
    this.count = count;
    /** @type {number} */
    this.size = size;
    /** @type {number} */
    this.liveCount = liveCount;
    /** @type {number} */
    this.liveSize = liveSize;
    /** @type {boolean} */
    this.hasChildren = hasChildren;
  }
}

/**
 * @unrestricted
 */
export class AllocationStackFrame {
  /**
   * @param {string} functionName
   * @param {string} scriptName
   * @param {number} scriptId
   * @param {number} line
   * @param {number} column
   */
  constructor(functionName, scriptName, scriptId, line, column) {
    /** @type {string} */
    this.functionName = functionName;
    /** @type {string} */
    this.scriptName = scriptName;
    /** @type {number} */
    this.scriptId = scriptId;
    /** @type {number} */
    this.line = line;
    /** @type {number} */
    this.column = column;
  }
}

/**
 * @unrestricted
 */
export class Node {
  /**
   * @param {number} id
   * @param {string} name
   * @param {number} distance
   * @param {number} nodeIndex
   * @param {number} retainedSize
   * @param {number} selfSize
   * @param {string} type
   */
  constructor(id, name, distance, nodeIndex, retainedSize, selfSize, type) {
    this.id = id;
    this.name = name;
    this.distance = distance;
    this.nodeIndex = nodeIndex;
    this.retainedSize = retainedSize;
    this.selfSize = selfSize;
    this.type = type;

    this.canBeQueried = false;
    this.detachedDOMTreeNode = false;
  }
}

/**
 * @unrestricted
 */
export class Edge {
  /**
   * @param {string} name
   * @param {!Node} node
   * @param {string} type
   * @param {number} edgeIndex
   */
  constructor(name, node, type, edgeIndex) {
    this.name = name;
    this.node = node;
    this.type = type;
    this.edgeIndex = edgeIndex;
  }
}

/**
 * @unrestricted
 */
export class Aggregate {
  constructor() {
    /** @type {number} */
    this.count;
    /** @type {number} */
    this.distance;
    /** @type {number} */
    this.self;
    /** @type {number} */
    this.maxRet;
    /** @type {number} */
    this.type;
    /** @type {string} */
    this.name;
    /** @type {!Array.<number>} */
    this.idxs;
  }
}

/**
 * @unrestricted
 */
export class AggregateForDiff {
  constructor() {
    /** @type {!Array.<number>} */
    this.indexes = [];
    /** @type {!Array.<string>} */
    this.ids = [];
    /** @type {!Array.<number>} */
    this.selfSizes = [];
  }
}

/**
 * @unrestricted
 */
export class Diff {
  constructor() {
    /** @type {number} */
    this.addedCount = 0;
    /** @type {number} */
    this.removedCount = 0;
    /** @type {number} */
    this.addedSize = 0;
    /** @type {number} */
    this.removedSize = 0;
    /** @type {!Array.<number>} */
    this.deletedIndexes = [];
    /** @type {!Array.<number>} */
    this.addedIndexes = [];
  }
}

/**
 * @unrestricted
 */
export class DiffForClass {
  constructor() {
    /** @type {number} */
    this.addedCount;
    /** @type {number} */
    this.removedCount;
    /** @type {number} */
    this.addedSize;
    /** @type {number} */
    this.removedSize;
    /** @type {!Array.<number>} */
    this.deletedIndexes;
    /** @type {!Array.<number>} */
    this.addedIndexes;

    /** @type {number} */
    this.countDelta;
    /** @type {number} */
    this.sizeDelta;
  }
}

/**
 * @unrestricted
 */
export class ComparatorConfig {
  constructor() {
    /** @type {string} */
    this.fieldName1;
    /** @type {boolean} */
    this.ascending1;
    /** @type {string} */
    this.fieldName2;
    /** @type {boolean} */
    this.ascending2;
  }
}

/**
 * @unrestricted
 */
export class WorkerCommand {
  constructor() {
    /** @type {number} */
    this.callId;
    /** @type {string} */
    this.disposition;
    /** @type {number} */
    this.objectId;
    /** @type {number} */
    this.newObjectId;
    /** @type {string} */
    this.methodName;
    /** @type {!Array.<*>} */
    this.methodArguments;
    /** @type {string} */
    this.source;
  }
}

/**
 * @unrestricted
 */
export class ItemsRange {
  /**
   * @param {number} startPosition
   * @param {number} endPosition
   * @param {number} totalLength
   * @param {!Array.<*>} items
   */
  constructor(startPosition, endPosition, totalLength, items) {
    /** @type {number} */
    this.startPosition = startPosition;
    /** @type {number} */
    this.endPosition = endPosition;
    /** @type {number} */
    this.totalLength = totalLength;
    /** @type {!Array.<*>} */
    this.items = items;
  }
}

/**
 * @unrestricted
 */
export class StaticData {
  /**
   * @param {number} nodeCount
   * @param {number} rootNodeIndex
   * @param {number} totalSize
   * @param {number} maxJSObjectId
   */
  constructor(nodeCount, rootNodeIndex, totalSize, maxJSObjectId) {
    /** @type {number} */
    this.nodeCount = nodeCount;
    /** @type {number} */
    this.rootNodeIndex = rootNodeIndex;
    /** @type {number} */
    this.totalSize = totalSize;
    /** @type {number} */
    this.maxJSObjectId = maxJSObjectId;
  }
}

/**
 * @unrestricted
 */
export class Statistics {
  constructor() {
    /** @type {number} */
    this.total;
    /** @type {number} */
    this.v8heap;
    /** @type {number} */
    this.native;
    /** @type {number} */
    this.code;
    /** @type {number} */
    this.jsArrays;
    /** @type {number} */
    this.strings;
    /** @type {number} */
    this.system;
  }
}

/**
 * @unrestricted
 */
export class NodeFilter {
  /**
   * @param {number=} minNodeId
   * @param {number=} maxNodeId
   */
  constructor(minNodeId, maxNodeId) {
    /** @type {number|undefined} */
    this.minNodeId = minNodeId;
    /** @type {number|undefined} */
    this.maxNodeId = maxNodeId;
    /** @type {number|undefined} */
    this.allocationNodeId;
  }

  /**
   * @param {!NodeFilter} o
   * @return {boolean}
   */
  equals(o) {
    return this.minNodeId === o.minNodeId && this.maxNodeId === o.maxNodeId &&
        this.allocationNodeId === o.allocationNodeId;
  }
}

/**
 * @unrestricted
 */
export class SearchConfig {
  /**
   * @param {string} query
   * @param {boolean} caseSensitive
   * @param {boolean} isRegex
   * @param {boolean} shouldJump
   * @param {boolean} jumpBackward
   */
  constructor(query, caseSensitive, isRegex, shouldJump, jumpBackward) {
    this.query = query;
    this.caseSensitive = caseSensitive;
    this.isRegex = isRegex;
    this.shouldJump = shouldJump;
    this.jumpBackward = jumpBackward;
  }
}

/**
 * @unrestricted
 */
export class Samples {
  /**
   * @param {!Array.<number>} timestamps
   * @param {!Array.<number>} lastAssignedIds
   * @param {!Array.<number>} sizes
   */
  constructor(timestamps, lastAssignedIds, sizes) {
    this.timestamps = timestamps;
    this.lastAssignedIds = lastAssignedIds;
    this.sizes = sizes;
  }
}

/**
 * @unrestricted
 */
export class Location {
  /**
   * @param {number} scriptId
   * @param {number} lineNumber
   * @param {number} columnNumber
   */
  constructor(scriptId, lineNumber, columnNumber) {
    this.scriptId = scriptId;
    this.lineNumber = lineNumber;
    this.columnNumber = columnNumber;
  }
}
