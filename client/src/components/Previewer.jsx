import React from 'react';

/**
 * Renders a preview of the generated README content.
 * @param {Object} props - The component props.
 * @param {string} props.readme - The Markdown content of the README.
 */
const Previewer = ({ readme }) => {
  if (!readme) {
    return null; // Don't render anything if there's no README to display
  }

  return (
    <div className="preview-container">
      <pre className="markdown-body">
        <code>{readme}</code>
      </pre>
    </div>
  );
};

export default Previewer;