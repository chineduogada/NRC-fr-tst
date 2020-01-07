import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { isUserSignedIn } from '../../services/Credentials';
import Section from '../../hoc/Section/Section';
import InputField from '../../components/InputField/InputField';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import classes from './NewPost.module.css';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.isEditingPost = props.location.pathname.endsWith('edit');

    const pathnameDestructure = this.props.location.pathname.split('/');
    this.postId = pathnameDestructure[2] * 1; // a trick to convert string to number

    this.state = {
      activeTab: 'article',
      prevActiveTab: null,
      activeTabControl: null,

      // This holds the details (fetched from api by id) of the post we want to edit
      postToEdit: {},

      redirect: false
    };
  }

  /**
   * This holds the form field values. Values from form fields are registered on blur.
   * Values are registered using the HTML element's 'id' as key and it's 'value' as the value
   */

  fieldValues = {};

  shouldComponentUpdate() {
    return this.state.activeTab !== this.state.prevActiveTab;
  }

  async componentDidMount() {
    if (this.isEditingPost) {
      const endpoint = `/articles/${this.postId}`;
      const res = await axios.get(endpoint);

      const { data } = res.data;

      this.setState({ postToEdit: data });
    }
  }

  switchActiveForm = event => {
    if (this.state.activeTab !== event.target.id) {
      const oldState = { ...this.state };

      // Usually the default tab will be the first child of the tab element
      const { firstElementChild } = event.target.parentElement;
      if (firstElementChild.classList.contains(classes.Active)) {
        firstElementChild.classList.remove(classes.Active);
      }

      if (oldState.activeTabControl) {
        oldState.activeTabControl.classList.remove(classes.Active);
      }

      event.target.classList.add(classes.Active);

      this.setState({
        activeTab: event.target.id,
        prevActiveTab: oldState.activeTab,
        activeTabControl: event.target
      });

      // remember to clean up the stored field values each time the user switches to a new type of form
      this.cleanStoredFieldValues();
    }
  };

  getActiveForm() {
    let field = null;
    if (this.state.activeTab === 'article') {
      field = (
        <Aux>
          <InputField
            blurred={this.setFieldValue}
            type="select"
            id="category"
            name="category"
            options={[
              { name: this.state.postToEdit.category || 'Select category' },
              { name: 'Finance' },
              { name: 'Communication' },
              { name: 'Research' },
              { name: 'Analytics' }
            ]}
          />
          <InputField
            blurred={this.setFieldValue}
            type="textarea"
            id="article"
            name="article"
            value={this.state.postToEdit.article}
          />
        </Aux>
      );
    } else {
      field = (
        <InputField
          blurred={this.setFieldValue}
          type="file"
          id="image"
          name="choose a gif file"
        />
      );
    }

    return field;
  }

  /**
   * Cleans up the 'this.fieldValue object as the form is switched between
   * the article form and the gif form.
   */
  cleanStoredFieldValues() {
    if (this.state.activeTab === 'gif' && this.fieldValues.article) {
      delete this.fieldValues.article;
    }

    if (this.state.activeTab === 'article' && this.fieldValues.gif) {
      delete this.fieldValues.gif;
    }
  }

  /**
   * This obtains the each field value on blur
   * @param { InputElement } target an InputElement object that triggered the event
   */
  setFieldValue = ({ target }) => {
    const { id, value, files, type } = target;

    // first check if i's a file upload
    if (type === 'file') {
      this.fieldValues[id] = files[0];
      return;
    }

    this.fieldValues[id] = value;
  };

  /**
   * This validates the imput fields and submits the form
   */
  submitPostHandler = async e => {
    e.preventDefault();

    /**
     * First, we want to check  if the user is trying to update a post
     * then make the update by calling `this.updatePostHandler()`
     */
    if (this.isEditingPost) {
      await this.updatePostHandler();
      return;
    }

    /**
     * Well, if the user is trying to create a new post insteadt,
     * then create the post by calling `this.createPostHandler()`
     */
    await this.createPostHandler();
  };

  createPostHandler = async () => {
    const resource = this.state.activeTab === 'gif' ? 'gifs' : 'articles';

    try {
      let res;

      if (resource === 'gifs') {
        const headers = {
          'Content-Type': 'multipart/form-data'
        };

        const fd = new FormData(); // fd = Form Data
        fd.append('image', this.fieldValues.image);
        fd.append('title', this.fieldValues.title);

        res = await axios.post(`/${resource}`, fd, { headers });
      } else {
        res = await axios.post(`/${resource}`, this.fieldValues);
      }

      console.log(res);

      // Set Redirect state to 'true'
      this.setState({ redirect: true });
    } catch ({ response }) {
      // const { status, error } = response.data;
      console.log(response);
    }
  };

  updatePostHandler = async () => {
    const updatedPostToEdit = this.state.postToEdit;

    // Update the `this.state.postToEdit` object using the above copy
    Object.keys(this.fieldValues).forEach(field => {
      if (updatedPostToEdit[field] !== this.fieldValues[field]) {
        updatedPostToEdit[field] = this.fieldValues[field];
      }
    });

    console.log(updatedPostToEdit);

    try {
      const res = await axios.patch(
        `/articles/${this.postId}`,
        updatedPostToEdit
      );

      console.log(res);

      // Set Redirect state to 'true'
      this.setState({ redirect: true });
    } catch ({ response }) {
      // const { status, error } = response.data;
      console.log(response);
    }
  };

  /**
   * This redirects to the hompage once a post is successfully created/updated
   */
  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  }

  render() {
    return (
      <Layout>
        {/* Redirect back to home route if the user is not signed in */}
        {isUserSignedIn() ? null : <Redirect to="/" />}

        <Section title={this.isEditingPost ? 'Update Article' : 'Employees'}>
          {/* Conditinally redirect the user */}
          {this.renderRedirect()}

          {/* Show the loader first if the user is trying to edit a post */}
          {!Object.keys(this.state.postToEdit).length && this.isEditingPost ? (
            <Loader />
          ) : (
            <div className={classes.Tab}>
              <Section>
                <div className={classes.Search}>
                  <form>
                    <InputField
                      blurred={this.setFieldValue}
                      type="text"
                      id="title"
                      placeholder="Filter result"
                      value={this.state.postToEdit.title}
                    />
                    <Button
                      className="btn"
                      type="submit"
                      onClick={this.submitPostHandler}
                      value="Post"
                    >
                      Search
                    </Button>
                  </form>
                </div>
              </Section>
              <Section>
                Let thine heart be not troubled for data shall be displayed!
              </Section>
            </div>
          )}
        </Section>
      </Layout>
    );
  }
}

export default withRouter(NewPost);
