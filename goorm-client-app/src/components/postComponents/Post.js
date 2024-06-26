import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Post.css";

export default function Post({ id, title, writer, postBody, postData, setPostData }) {

  // 수정 기능 구현을 위한 state
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedWriter, setEditedWriter] = useState(writer);
  const [editedPostBody, setEditedPostBody] = useState(postBody);

  const handleTitleEditChange = (e) => {
    setEditedTitle(e.target.value);
  }

  const handleWriterEditChange = (e) => {
    setEditedWriter(e.target.value);
  }

  const handlePostBodyEditChange = (e) => {
    setEditedPostBody(e.target.value);
  }

  const handleSubmit = () => {
    let newPostData = postData.map((data) => {
      if (data.id === id) {
        data.title = editedTitle;
        data.writer = editedWriter;
        data.postBody = editedPostBody;
      }
      return data;
    });

    // setPostData 함수를 올바르게 호출합니다.
    if (typeof setPostData === 'function') {
      setPostData(newPostData);
      localStorage.setItem("postData", JSON.stringify(newPostData));
    } else {
      console.error("setPostData is not a function");
      console.error('바보에러!');
    }

    setIsEditing(false);
  }

  // 삭제 기능 구현

  const handleDeleteClick = (id) => {
    let newPostData = postData.filter((data) => data.id !== id);
    setPostData(newPostData);
    localStorage.setItem("postData", JSON.stringify(newPostData));
  };


  
  if (isEditing) {
    return (
      <div className="post-edit-box card">
        <form onSubmit={handleSubmit}>
          <div className="card-header edit-card-header">
            <input
              id="post-edit-title"
              value={editedTitle}
              onChange={handleTitleEditChange}
              autoFocus
            />
            <input
              id="post-edit-writer"
              value={editedWriter}
              onChange={handleWriterEditChange}
              autoFocus
            />
          </div>
          <div className="card-body edit-card-body">
            <textarea
            id="post-edit-postBody"
            value={editedPostBody}
            onChange={handlePostBodyEditChange}
            whiteSpace="pre-line"
            autoFocus
            rows="3"
            type="text"
          />
          </div>
        </form>
        <div className="post-edit-btn-container">
          <button
            onClick={() => setIsEditing(false)}
            type="button"
            id="post-edit-cancel-btn"
          >x</button>
          <button 
            onClick={handleSubmit} 
            type="submit"
            id="post-edit-save-btn"
          >save</button>
        </div>
      </div>
    )
  } else {
    // 게시글 내용의 글자 수가 100자 이상일 경우, 100자까지만 보여주고 "..."을 추가하여 출력
    const limitedPostBody = postBody.length > 100 ? postBody.slice(0, 200) + "..." : postBody;

    return (
      <div id="post-container">
        <div className="card">
          <div className="card-header read-card-header">
            <span id="writer-span">작성자 : {writer}</span> 
            <div id="inpost-btn-container">
              <div id="post-delete">
                <button id='post-delete-btn' onClick={() => handleDeleteClick(id)}>x</button>
              </div>
              <div id="post-edit">
                <button id='post-edit-btn' onClick={() => setIsEditing(true)}>수정하기</button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{limitedPostBody}</p>
            <Link to={`/home/board/post/${id}`} className="btn btn-primary">자세히 읽기</Link>
          </div>
        </div>
      </div>
    )
  }
}
