import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { toast } from 'react-toastify';
import nameMapper from '../../helpers/nameMapper';
import autobind from '../../helpers/autobind';
import Loader from '../../components/Loader/Loader';
import httpService from '../../services/httpService';
import Section from '../../hoc/Section/Section';
import TableView from '../../components/TableView/TableView';
import SideDraw from '../../components/SideDraw/SideDraw';
import Form from '../../components/Form/Form';
import objectKeyEliminator from '../../helpers/obJectKeyEliminator';

class StaticModel extends Form {
  constructor(props) {
    super(props);

    // *** These keys must be implemented *** //
    /**
     * @property The form data definition. This will be attatched to
     * the local state as `state.formData`.
     */
    this.formData = {};
    this.schema = {};
    /**
     * @property The name of the  static model. Ex. 'Departments'
     */
    this.name = '';
    /**
     * @property The url path to the API resource for the static model. Ex. '/departments'
     */
    this.resourcePath = '';
    /**
     * @property An array of keys of the API resource  for the model that must
     * not be added to the the form when a table row in clicked in the UI
     */
    this.keysToIgnoreOnRowClick = [];
    /**
     * @property The React table columns definitions
     */
    this.columns = [];

    this.state = {
      pageSize: 20,
      currentPage: 1,
      openSideDraw: false,
      formData: this.formData,
      rowToPreview: null,
      isDeleteting: false,
      errors: {},
    };

    this.initialFormState = { ...this.state.formData };

    autobind(
      this,
      'openSideDraw',
      'closeSideDraw',
      'handleRowClick',
      'addDataObject',
      'handleUpdate',
      'handleDelete'
    );
  }

  /**
   * Opens the side draw and resets the `rowToPreview` local state to null
   */
  openSideDraw(e) {
    this.setState({ openSideDraw: true, rowToPreview: null });
  }

  /**
   * Closes the side draw and resets the `rowToPreview` local state to null
   */
  closeSideDraw(e) {
    this.setState({ openSideDraw: false, rowToPreview: null });
  }

  /**
   * Handles double-click events on the row
   */
  handleRowClick(event) {
    if (event.detail > 1) {
      const rowToPreview = this.props.data.filter(
        (row) => row.id === event.currentTarget.id * 1
      )[0];

      this.setState({
        rowToPreview,
        openSideDraw: true,
        formData: objectKeyEliminator(rowToPreview, [
          'id',
          'status',
          'createdAt',
          'updatedAt',
          ...this.keysToIgnoreOnRowClick,
        ]),
      });
    }
  }

  /**
   * Resets the form to it's initial state
   */
  resetFormData() {
    this.setState({ formData: this.initialFormState });
  }

  /**
   * Gets actual values of the options for the row the user has updated the user has updated
   * This must be implemented where the rows of the dataset depend on external options. Hence,
   * those options must be filtered for the one the user selects in the form.
   *
   * MUST BE OVERWRITTEN BY  ANY CHILD CLASSES THAT NEEDS TO MAP MORE OPTIONS OTHER THAN
   * THE `status` OPTION.
   */

  getOptionValues() {
    const { statusId } = this.state.formData;
    return {
      status: this.props.status.filter(
        (option) => option.id === statusId * 1
      )[0],
    };
  }

  /**
   * Adds the newly created data object to the list of data objects initially returned from the server.
   * This first attaches the actual values of each option in the form that created the new row
   * @param { Array<object> } data - The dataset from which a row was deleted
   * @param { object } row - the new created row
   */
  updateStoreWithNewRow(data, row) {
    const rowWithOptionValues = {
      ...row,
      ...this.getOptionValues(),
    };
    this.updateStore([rowWithOptionValues, ...data]);
  }

  /**
   * Updates the redux store with the updated row
   * @param { object } data - The dataset from which a row was updated.
   * @param { object } row - The affected (updated) row in the dataset.
   * @param { FormData } formData - The form data in the state (it contains the values the user just updated).
   *
   * @returns { void }
   */
  updateStoreWithUpdatedRow(data, row, formData) {
    // create a copy of the dataset
    const dataCopy = [...data];
    // obtain the id of the affected row
    const id = row['id'];
    // map every option to the current value the user may have selected and join them with the from data
    const rowWithItsOptionValues = { ...formData, ...this.getOptionValues() };
    console.log(rowWithItsOptionValues, formData);
    // obtain the index of the row the user just updated
    const rowIndex = dataCopy.findIndex((row) => row.id === id);
    // updating the copy of the dataset with the updated row
    dataCopy[rowIndex] = { ...rowWithItsOptionValues, id };
    // update the store
    console.log(dataCopy);
    this.updateStore(dataCopy);
  }

  /**
   *  Updates the table row each time an existing data object is deleted
   * @param { Array<object> } data - The dataset from which a row was deleted
   * @param { object } row - The affected (deleted) row
   */
  removeTableRow(data, row) {
    const oldState = [...data];
    let rowIndex = oldState.findIndex((r) => r.id === row.id);

    oldState.splice(rowIndex, 1);

    this.updateStore(oldState);
  }

  /**
   * Updates the redux store with an updated version of a state.
   * THIS MUST BE IMPLEMENTED BY EVERY CHILD CLASS
   * @param { Array<object> } data - The updated dataset
   *
   * @example ```this.props.setOptions({ <the-static-model-key-in-the-redux-store>: data });```
   */
  updateStore(data) {
    throw Error(`updateStore method must be implemented for a static model.`);
  }

  /**
   *  Handles the addition of a new row to our dataset
   * @param { Function } stopProcessing - A callback that indicated the form has finished processing
   */
  async addDataObject(stopProcessing) {
    const res = await httpService.post(this.resourcePath, this.state.formData);

    stopProcessing();

    if (res) {
      toast.success('New row successfully added!');
      this.updateStoreWithNewRow(
        this.props.data,
        objectKeyEliminator(res.data.data, ['createdAt', 'updatedAt'])
      );
      this.Form.reset();
      this.resetFormData();
      this.closeSideDraw();
    }
  }

  /**
   *  Handles the update of a row in our dataset
   * @param { Function } stopProcessing - A callback that indicated the form has finished processing
   */
  async handleUpdate(stopProcessing) {
    const res = await httpService.patch(
      `${this.resourcePath}/${this.state.rowToPreview.id}`,
      this.state.formData
    );

    stopProcessing();

    if (res) {
      toast.success('Row successfully updated!');
      this.updateStoreWithUpdatedRow(
        this.props.data,
        this.state.rowToPreview,
        this.state.formData
      );
      this.closeSideDraw();
      this.resetFormData();
    }
  }

  /**
   *  Handles the removal of a row in our dataset
   */
  async handleDelete(event) {
    if (!this.state.isDeleteting) {
      this.setState({ isDeleteting: true });

      const res = await httpService.delete(
        `${this.resourcePath}/${this.state.rowToPreview.id}`
      );

      if (res) {
        toast.success('Row successfully deleted!');
        this.removeTableRow(this.props.data, this.state.rowToPreview);
        this.updateForm.reset();
        this.resetFormData();
        this.closeSideDraw();
        this.setState({ isDeleteting: false });
      }
    }
  }

  async doSubmit(event, stopProcessing) {
    if (this.state.rowToPreview) {
      return this.handleUpdate(stopProcessing);
    }

    this.addDataObject(stopProcessing);
  }

  renderUpdateForm() {
    return null;
  }

  renderCreateForm() {
    return null;
  }

  render() {
    const { data } = this.props;

    return (
      <React.Fragment>
        {data ? (
          <Section>
            <TableView
              title={
                <span>
                  <Link
                    style={{ marginRight: '0.5em' }}
                    className="link secondary"
                    to="/settings/static-models"
                  >
                    <IoMdArrowRoundBack className="icon" />
                  </Link>
                  <span>{this.name}</span>
                </span>
              }
              message="Double click a row to preview"
              columns={this.columns}
              data={data}
              clickHandler={this.handleRowClick}
              addNewButtonHandler={this.openSideDraw}
            ></TableView>

            <SideDraw
              title={this.name}
              openDraw={this.state.openSideDraw}
              onClose={this.closeSideDraw}
            >
              {this.state.rowToPreview
                ? this.renderUpdateForm()
                : this.renderCreateForm()}
            </SideDraw>
          </Section>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

/**
 * THIS IS HOW THE CHILDREN OF THIS CLASS SHOULD CONNECT TO REDUX.
 *
 * **** This is only a sample that uses the Training Types  static model ****
 */
// const mapStateToProps = (state) => {
//   return {
//     status: state.options.status,
//     data: state.options.trainingType,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return { setOptions: (payload) => dispatch(setOptions(payload)) };
// };

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(TrainingTypes)
// );

export default StaticModel;
