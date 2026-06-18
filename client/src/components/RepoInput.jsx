import React from 'react';

/**
 * RepoInput component for capturing the GitHub repository URL.
 * @param {Object} props
 * @param {string} props.value - The current URL input value.
 * @param {Function} props.onChange - Handler for input change event.
 * @param {Function} props.onSubmit - Handler for form submission.
 * @param {boolean} props.loading - Loading state flag.
 */
const RepoInput = ({ value, onChange, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit} className="search-form">
      <input
        type="url"
        placeholder="https://github.com/username/repository"
        value={value}
        onChange={onChange}
        required
        className="repo-input"
        disabled={loading}
      />
      <button type="submit" disabled={loading} className="generate-btn">
        {loading ? 'Analyzing Repo...' : 'Generate README'}
      </button>
    </form>
  );
};

export default RepoInput;