import React from 'react';

const ProfileLink = ({ screenName }) =>
  <a href={`https://twitter.com/${screenName}`}>{screenName}</a>;

export default ProfileLink;
