import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  getCurrentProfile,
  saveProfileDetails
} from '../../redux/actions/profileActions';
import Loader from '../utility/Loader';

const options = [
  { value: 'Thriller', label: 'Thriller' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Mystery', label: 'Mystery' },
  { value: 'Romance', label: 'Romance' },
  { value: 'Fantasy', label: 'Fantasy' },
  { value: 'Adventure', label: 'Adventure' }
];

class CreateProfile extends Component {
  componentDidMount() {
    axios
      .get('/api/profile')
      .then(res => {
        let handle;
        let quote = '';
        let selectedOption = null;
        if (res.data.handle) handle = res.data.handle;
        if (res.data.favouriteQuote) quote = res.data.favouriteQuote;
        if (res.data.favouriteCats) {
          selectedOption = res.data.favouriteCats.map(item => {
            let retval = { value: item, label: item };
            return retval;
          });
        }

        this.setState({ handle, profile: {}, quote, selectedOption });
      })
      .catch(err => {
        console.log(err);
      });
  }
  state = {
    profile: null,
    selectedOption: null,
    handle: ' ',
    quote: ' '
  };

  saveprofile = e => {
    e.preventDefault();
    let cat = [];
    this.state.selectedOption.map(item => {
      cat.push(item.value);
    });
    const profile = {
      handle: this.state.handle,
      quote: this.state.quote,
      genres: cat
    };
    console.log(profile.quote);
    this.props.saveProfileDetails(profile, this.props.history);
  };

  handleChange = selectedOption => {
    console.log(selectedOption);
    this.setState({ selectedOption });
  };

  updateitems = e => {
    //console.log(e.target.value);
    this.setState({ [e.target.id]: e.target.value });
  };

  updatequote = e => {
    this.setState({ quote: e.target.value });
  };

  render() {
    const { selectedOption } = this.state;

    let profileContent;
    // if (this.state.profile === null) {
    //   profileContent = <Loader />;
    // } else {
    profileContent = (
      <form action="">
        <div className="input-field col s6">
          <input
            onChange={this.updateitems}
            value={this.state.handle}
            name="handle"
            id="handle"
            type="text"
          />
          <label className="active" htmlFor="handle">
            Handle
          </label>
        </div>

        <div className="input-field col s6">
          <textarea
            onChange={this.updatequote}
            name="quote"
            value={this.state.quote}
            id="quote"
            className="materialize-textarea"
          />
          <label className="active" htmlFor="quote">
            Favourite Quote
          </label>
        </div>

        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          isMulti={true}
          placeholder="Select favourite Genres"
        />
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
          onClick={this.saveprofile}
        >
          Submit
        </button>
      </form>
    );

    return (
      <div className="authContainer">
        <div className="title">
          <h1>Tell Us More</h1>
        </div>
        {profileContent}
      </div>
    );
  }
}

const mapState = state => {
  return {
    profile: state.profile,
    auth: state.auth
  };
};

const mapDispatch = {
  getCurrentProfile,
  saveProfileDetails
};
export default connect(
  mapState,
  mapDispatch
)(CreateProfile);
