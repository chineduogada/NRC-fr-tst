import React from 'react';
import { toast } from 'react-toastify';
import httpService from '../../services/httpService';
import Form from '../../components/Form/Form';
import Schema from './JoiSchema';
import BatchProcessor from '../../helpers/batchProcessor';
import Loader from '../../components/Loader/Loader';
import LightBox from '../../components/LightBox/LightBox';

export default class ImportForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        resource: '',
        file: ''
      },

      batchState: {
        currentBatch: 0
      },

      showLightBox: false,

      errors: {}
    };

    this.runInBatch = this.runInBatch.bind(this);
    this.onBatchProcess = this.onBatchProcess.bind(this);
  }

  schema = Schema;

  async runInBatch(file) {
    const formData = new FormData();
    formData.append('resource', this.state.formData.resource);
    formData.append('file', file);

    const res = await httpService.post('/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    this.stopProcessing();
    if (res) {
      toast.success('Import successful');
    }
  }

  onBatchProcess(batchState = {}) {
    this.setState({ batchState });
  }

  async doSubmit(event) {
    const files = this.file.files;
    const batchProcessor = new BatchProcessor(files, this.runInBatch);
    const totalBatchSize = batchProcessor.getTotalBatchSize();
    batchProcessor.onBatchProcess = this.onBatchProcess;
    batchProcessor.onStart = () => this.setState({ showLightBox: true });
    batchProcessor.onDone = () =>
      setTimeout(() => this.setState({ showLightBox: false }), 1000);

    this.setState({
      batchState: { ...this.state.batchState, currentBatch: 0, totalBatchSize }
    });

    batchProcessor.startProcessor();
  }

  render() {
    const { batchState, showLightBox } = this.state;
    console.log(batchState);
    return (
      <form ref={form => (this.Form = form)} onSubmit={this.handleSubmit}>
        {showLightBox ? (
          <LightBox>
            <Loader
              message={`Completed ${batchState.currentBatch}/${batchState.totalBatchSize}`}
            />
          </LightBox>
        ) : null}
        {this.renderSelect(
          'select resource',
          'resource',
          this.props.resourceOptions || [],
          this.props.getSelectedResource
        )}
        {this.renderInput('file', 'file', null, null, 'file')}
        {this.renderButton('import')}
      </form>
    );
  }
}
