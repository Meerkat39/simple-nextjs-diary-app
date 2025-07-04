// src/components/ContentInput.js

const ContentInput = ({ content, onChange }) => {
  return (
    <div>
      <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">内容:</label>
      <textarea 
        id="content" 
        value={content} 
        onChange={onChange} 
        rows={4}
        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      />
    </div>
  );
};

export default ContentInput;