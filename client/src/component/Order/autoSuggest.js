const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : languages.filter(
        lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestionValue = suggestion => suggestion.company;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <div>{suggestion.company}</div>;
