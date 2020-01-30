export const twitterHandleRX = /^[A-Za-z0-9_]{1,15}$/;
export const tweetUrlOrIdRX = /^(https?:\/\/twitter.com\/\w+\/status\/)?(\d{10,20})(\?.*)?$/;

export const convertLegacyAPIResponse = (result) => {
  const { timestamp, profile, tests } = result;

  // 'typeahead' was renamed to 'searchSuggestion';
  // finding 'serachSuggestion' in results indicates a new version response
  if (!tests || tests.hasOwnProperty('searchSuggestion')) {
    return result;
  }

  return {
    timestamp,
    profile,
    tests: {
      ...tests,
      replyDeboosting: {
        ...tests.more_replies
      },
      search: {
        found: tests.search,
        ban: !tests.search
      },
      searchSuggestion: {
        ban: !tests.typeahead
      }
    }
  };
};
