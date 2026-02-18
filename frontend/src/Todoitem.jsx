import './App.css'
import { useState } from 'react'

function TodoItem({ todo, toggleDone, deleteTodo, addNewComment }) {
  const [newComment, setNewComment] = useState("");
  const comments = todo.comments || [];
  const commentCount = comments.length;

  return (
    <li>
      <span className={todo.done ? "done" : ""}>
        {todo.title}
      </span>

      <button type="button" onClick={() => toggleDone?.(todo.id)}>
        Toggle
      </button>

      <button type="button" onClick={() => deleteTodo?.(todo.id)}>
        ❌
      </button>

      <p>{commentCount} comments</p>

      {commentCount === 0 && (
        <p>No comments</p>
      )}

      {commentCount > 0 && (
        <>
          <b>Comments:</b>
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>{comment.message}</li>
            ))}
          </ul>

          <div className="new-comment-forms">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />

            <button
              type="button"
              onClick={() => {
                addNewComment?.(todo.id, newComment);
                setNewComment("");
              }}
            >
              Add Comment
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default TodoItem

