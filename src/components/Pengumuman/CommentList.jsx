import React, { useState } from "react";
import CommentForm from "./CommentForm";
import { motion } from "framer-motion";

const CommentList = ({ comments, pengumumanId, onCommentAdded }) => {
  const [replyParentId, setReplyParentId] = useState(null);

  const handleReplyClick = (id) => {
    setReplyParentId(replyParentId === id ? null : id);
  };

  const renderComments = (parentId = null, level = 0) => {
    return comments
      .filter((comment) => comment.parent_id === parentId)
      .map((comment) => (
        <motion.div
          key={comment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`mb-4 p-4 bg-white rounded-lg shadow-md ${
            level > 0 ? "ml-10 border-l-4 border-green-700" : ""
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="font-bold text-green-800">{comment.nama}</span>
              <span className="ml-2 text-gray-500 text-sm">
                {new Date(comment.created_at).toLocaleDateString()}
              </span>
            </div>
            <button
              onClick={() => handleReplyClick(comment.id)}
              className="text-green-600 text-sm hover:underline"
            >
              Balas
            </button>
          </div>
          <p className="text-gray-700 mb-2">{comment.komentar}</p>

          {/* Tampilkan form reply jika tombol balas diklik */}
          {replyParentId === comment.id && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <CommentForm
                pengumumanId={pengumumanId}
                parentId={comment.id}
                onCommentAdded={onCommentAdded}
                onCancel={() => setReplyParentId(null)}
              />
            </motion.div>
          )}

          {/* Render balasan komentar (nested) */}
          {renderComments(comment.id, level + 1)}
        </motion.div>
      ));
  };

  return <div>{renderComments()}</div>;
};

export default CommentList;
