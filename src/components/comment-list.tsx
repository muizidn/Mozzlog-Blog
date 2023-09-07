import React from 'react';

import Comment, { CommentProps } from './comment';

interface CommentListProps {
  comments: CommentProps[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="space-y-2">
      {comments.length > 0 && (
        <p>
          These comments can help you with more information. Thank you all! 🤠
        </p>
      )}
      <div>
        {comments.map((comment, index) => (
          <Comment key={index} {...comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
