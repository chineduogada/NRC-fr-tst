import axios from 'axios';

class BatchProcessor {
  /**
   * Processes an array of similar items in batches
   * @param { Array } arrayToProcess an array of similar items
   */
  constructor(arrayToProcess, process) {
    this._arrayToProcess = arrayToProcess;
    this._process = process;

    this.done = false;

    this.totalBatchSize = this._arrayToProcess.length;

    this.currentBatch = 1;
  }

  /**
   * This will be run after each batch has been processed
   * If set, recieves the current state of the BatchProcessor
   * and return the same
   */
  onBatchProcess = () => null;

  /**
   * This will be run before any of the batches have been processed
   * If set, recieves the current state of the BatchProcessor
   * and return the same
   */
  onStart = () => null;

  /**
   * This will be run after all the batches have been processed
   * If set, recieves the current state of the BatchProcessor
   * and return the same
   */
  onDone = () => null;

  getState() {
    const { currentBatch, totalBatchSize } = this;
    return {
      currentBatch,
      totalBatchSize,
      done: this.done
    };
  }

  getTotalBatchSize() {
    return this.totalBatchSize;
  }

  setDoneState() {
    if (this.currentBatch === this.totalBatchSize) this.done = true;
  }

  /**
   * A generator function that runs a user defined `process` (function) on
   * each item in the `arrayToProcess`
   *
   *
   */
  async runProcess() {
    await this._process(this._arrayToProcess[this.currentBatch - 1]);
    this.onBatchProcess(this.getState());
  }

  /**
   * Starts the batch processing
   */
  async startProcessor() {
    this.onStart();

    // This delay just ensures that every preliminary to run
    // the processor is set
    setTimeout(async () => {
      while (this.currentBatch <= this.totalBatchSize) {
        await this.runProcess();
        console.log(`done with batch ${this.currentBatch}`);
        this.currentBatch += 1;
        this.setDoneState();
      }

      this.onDone(this.getState());
    }, 0);
  }
}

export default BatchProcessor;

// const items = [260799, 260798, 260797, 260796, 260795];

// const processItems = async item => {
//   const res = await axios.get(`/employees/${item}`);

//   if (res) {
//     console.log(res.data.data.ippisNo);
//   }
// };

// const batchProcessor = new BatchProcessor(items, processItems);

// batchProcessor.onBatchProcess = state => console.log(state);
// batchProcessor.onDone = () => console.log('I done finish o!');

// batchProcessor.startProcessor();
