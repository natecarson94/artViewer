import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      username: '',
      website: '',
      location: '',
      occupation: '',
      interests: '',
      bio: '',
      twitter: '',
      facebook: '',
      youtube: '',
      instagram: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      username: this.state.username,
      website: this.state.website,
      location: this.state.location,
      occupation: this.state.occupation,
      interests: this.state.interests,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    // Select options for occupation
    const options = [
      { label: '* Select Occupation', value: 0 },
      { label: 'Traditional Artist', value: 'Traditional Artist' },
      { label: 'Digital Artist', value: 'Digital Artist' },
      { label: 'Hobbiest', value: 'Hobbiest' },
      { label: 'Art Student', value: 'Art Student' },
      { label: 'Photographer', value: 'Photographer' },
      { label: 'Animator', value: 'Animator' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <div className="create-profile-wrapper container">
        <h1>Create Your Profile</h1>
        <h4>
          Let's get some information to make your profile stand out
        </h4>
        <p className="d-block pb-3">* = required fields</p>
          <form  className="create-profile-form" onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="* Profile Username"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
              error={errors.username}
              info="A unique username for your profile URL. Your full name, company name, nickname"
            />
            <SelectListGroup
              placeholder="Occupation"
              name="occupation"
              value={this.state.occupation}
              onChange={this.onChange}
              options={options}
              error={errors.occupation}
              info="Give us an idea of where you are at in your career"
            />
            <TextFieldGroup
              placeholder="Website"
              name="website"
              value={this.state.website}
              onChange={this.onChange}
              error={errors.website}
              info="Could be your own website or a company one"
            />
            <TextFieldGroup
              placeholder="Location"
              name="location"
              value={this.state.location}
              onChange={this.onChange}
              error={errors.location}
              info="City or city & state suggested (eg. Boston, MA)"
            />
            <TextFieldGroup
              placeholder="* Interests"
              name="interests"
              value={this.state.interests}
              onChange={this.onChange}
              error={errors.interests}
              info="Please use comma separated values (eg.
                movies,music,tv shows,artists"
            />
            <TextAreaFieldGroup
              placeholder="Short Bio"
              name="bio"
              value={this.state.bio}
              onChange={this.onChange}
              error={errors.bio}
              info="Tell us a little about yourself"
            />
            <div className="mb-3">
              <button
                type="button"
                onClick={() => {
                  this.setState(prevState => ({
                    displaySocialInputs: !prevState.displaySocialInputs
                  }));
                }}
                className="btn btn-light"
              >
                Add Social Network Links
              </button>
              <span className="text-muted">Optional</span>
            </div>
            {socialInputs}
            <input
              type="submit"
              value="Submit"
              className="button-style btn btn-block mt-4"
            />
          </form>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
