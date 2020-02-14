class BatchProcessor {
  /**
   * Processes an array of similar items in batches
   * @param { Array } arrayToProcess an array of similar items
   */
  constructor(arrayToProcess, process) {
    this._arrayToProcess = arrayToProcess;
    this._process = process;

    this.totalBatchSize = this._arrayToProcess.length;

    this.currentBatch = -1;

    this.onBatchProcess = () => null;
  }

  batches = {
    [Symbol.iterator]: () => {
      return {
        next: async () => {
          this.currentBatch++;
          if (this.currentBatch < this.totalBatchSize) {
            return {
              value: await this.runProcess(),
              done: false
            };
          }

          return { done: true };
        }
      };
    }
  };

  getState() {
    const { currentBatch, totalBatchSize } = this;
    return {
      currentBatch,
      totalBatchSize
    };
  }

  getTotalBatchSize() {
    return this.totalBatchSize;
  }

  /**
   * A generator function that runs a user defined `process` (function) on
   * each item in the `arrayToProcess`
   *
   *
   */
  async runProcess() {
    await this._process(this._arrayToProcess[this.currentBatch]);
    this.onBatchProcess(this.getState());
  }

  /**
   * Starts the batch processing
   */
  async startProcessor() {
    for await (const batch of this.batches) {
      console.log(batch);
    }
  }
}

const items = [1, 2, 3, 4, 5];

const processItems = item => {
  return new Promise(resolve => {
    setTimeout(() => resolve(item), 2000);
  });
};

const batchProcessor = new BatchProcessor(items, processItems);

batchProcessor.onBatchProcess = state => console.log(state);

const p = batchProcessor.batches;

// for (const i of p) {
//   console.log('i am' + i);
// }

(async function() {
  p[Symbol.iterator]().next();
  p[Symbol.iterator]().next();
  p[Symbol.iterator]().next();
  p[Symbol.iterator]().next();
  p[Symbol.iterator]().next();
})();

// batchProcessor.startProcessor();
