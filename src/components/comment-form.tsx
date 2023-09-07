import React, { useState } from 'react';

export interface CommentFormProps {
  onComment: (name: string, comment: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onComment }) => {
  const [githubProfile, setGithubUrl] = useState('');
  const [comment, setComment] = useState('');

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGithubUrl(event.target.value);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    if (githubProfile && comment) {
        onComment(githubProfile, comment);
        setComment('')
    }
  };

  return (
    <div className="mb-6">
      <div className="mb-4 space-y-2">
        <label
          htmlFor="githubProfile"
          className="block text-sm font-medium text-gray-700 dark:text-white"
        >
          Your Github Profile URL (Please enter yours 🧑‍💻):
        </label>
        <input
          type="text"
          id="githubProfile"
          value={githubProfile}
          onChange={handleUserNameChange}
          className="focus:ring-primary-200 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          placeholder="https://github.com/muizidn"
          required
        />
      </div>
      <div className="mb-4 space-y-2">
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700 dark:text-white"
        >
          Your Comment (Every comment is important and highly appreciated 🎉):
        </label>
        <textarea
          id="comment"
          rows={6}
          value={comment}
          onChange={handleCommentChange}
          className="focus:ring-primary-200 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          placeholder="Write a comment..."
          required
        ></textarea>
      </div>
      <button
        className="group relative m-1 inline-flex cursor-pointer items-center justify-center rounded border-b-4 border-l-2 border-purple-700 bg-gradient-to-tr from-purple-600 to-purple-500 px-3.5 py-2 text-white shadow-lg active:border-purple-600 active:shadow-none"
        onClick={handleSubmit}
      >
        <span className="relative">Post my Comment</span>
      </button>
    </div>
  );
};

export default CommentForm;
