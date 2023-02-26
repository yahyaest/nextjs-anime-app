import { getCommentDate, handleLikeDislikeCounter,resizeCommentText } from "../../utils/utils";
import { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/client";
import CommentsContext from "../../store/comment-context";
import UserContext from "../../store/user-context";

import { toast } from "react-toastify";

function AnimeComments(props) {
  const { animeComments, currentUser, animeId, type } = props;

  const [animeCommentsList, setAnimeCommentsList] = useState(animeComments);
  const [newComment, setNewComment] = useState("");
  const [reply, setReply] = useState("");
  const [isReply, setIsReply] = useState([]);
  const [showReplies, setShowReplies] = useState([]);
    const [innerWidth, setInnerWidth] = useState(
      typeof window !== "undefined" ? window.innerWidth : ""
    );

  const [session, loading] = useSession();
  const commentsCtx = useContext(CommentsContext);
  const userCtx = useContext(UserContext);

    if (typeof window !== "undefined") {
      window.addEventListener("resize", function () {
        setInnerWidth(window.innerWidth);
        return window.innerWidth;
      });
    }


  const getAnimeComments = (id, comments) => {
    const animeComments = comments?.filter(
      (comment) => comment.anime._id === id
    );
    return animeComments;
  };

  const commentsList = getAnimeComments(animeId, commentsCtx.comments)
    ? getAnimeComments(animeId, commentsCtx.comments)
    : animeComments;

  useEffect(() => {
    getAnimeComments(animeId, commentsCtx.comments);
  }, [commentsCtx, innerWidth]);

  // Textarea overflow event
  if (typeof window !== "undefined") {
    var tx = document.getElementsByTagName("textarea");
    for (var i = 0; i < tx.length; i++) {
      tx[i].setAttribute(
        "style",
        "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
      );
      tx[i].addEventListener("input", OnInput, false);
    }
  }

  function OnInput(e) {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }

  //

  const onCommentChange = (e) => {
    setNewComment(e.currentTarget.value);
  };

  const onReplyChange = (e) => {
    setReply(e.currentTarget.value);
  };

  const handleSendCommentButton = async (comment) => {
    if (!session?.user)
      return toast.error("You need to log in to perform this action.", {
        toastId: "notLogged",
      });
    if (!newComment) return toast.error("The comment field is empty.");
    else {
      let commentObject = {};
      commentObject.comment = comment;
      commentObject.userId = currentUser._id;
     if(type==="anime") commentObject.animeId = animeId;      
     if(type==="manga") commentObject.mangaId = animeId;

      const comments = await commentsCtx.addNewComment(commentObject);
      setAnimeCommentsList(comments);

      // clear textarea
      if (typeof window !== "undefined") {
        const commentTextarea = document.getElementById("commentInput");
        commentTextarea.value = "";
      }
      ///  needed to refresh the state
      let array = [...isReply];
      array[1] = false;
      setIsReply(array);
    }
  };

  const handleSendReplyButton = async (comment, id, submitter, index) => {
    if (!reply) toast.error("The reply field is empty.");
    else {
      let tempComment = { ...comment };
      let replyObject = {
        submitter,
        submitter_comment: reply,
        submitter_avatar: currentUser.avatar,
      };
      let replies = [...tempComment.comment_replies];

      replies.push(replyObject);
      tempComment.comment_replies = replies;
      const comments = await commentsCtx.addNewReply(replies, id);

      setAnimeCommentsList(comments);
      // Hide reply input

      let array = [...isReply];
      array[index] = false;
      setIsReply(array);
    }
    // window.location.reload();
  };

  const handleReplyButton = (index) => {
    if (!session?.user)
      toast.error("You need to log in to perform this action.", {
        toastId: "notLogged",
      });
    else {
      let array = [...isReply];
      array[index] = true;
      setIsReply(array);
    }
  };

  const handleCancelButton = (index) => {
    if (!session?.user)
      toast.error("You need to log in to perform this action.", {
        toastId: "notLogged",
      });
    else {
      let array = [...isReply];
      array[index] = false;
      setIsReply(array);
    }
  };

  const handleShowReplies = (index) => {
    let array = [...showReplies];
    array[index] = !array[index];
    setShowReplies(array);
  };

  const handleLikeDislikeComment = async (comment, commentId, user, type) => {
    if (!session)
      toast.error("You need to log in to perform this action.", {
        toastId: "notLogged",
      });
    else {
      const updatedComment = handleLikeDislikeCounter(comment, user, type);

      const comments = await commentsCtx.updateLikeIcon(
        updatedComment,
        commentId
      );
      setAnimeCommentsList(comments);
      /// needed to refresh the state
      let array = [...isReply];
      array[1] = false;
      setIsReply(array);
    }
  };

  const handleCounterButtonColor = (list) => {
    const found = list?.findIndex(
      (element) => element._id === currentUser?._id
    );
    if (found === -1) return "like";
    else return "selectedLike";
  };

  return (
    <div className="container mb-5 mt-5">
      {/* Send Comments */}
      {userCtx.user && (
        <div className="comment-form mb-5">
          <div className="mt-3 d-flex flex-row align-items-center p-3 form-color">
            {session?.user && (
              <img
                src={`${currentUser?.avatar}`}
                alt={`${currentUser?.avatar}`}
                className="rounded-circle mx-2 skeleton"
                style={{ width: "60px" }}
              />
            )}
            <textarea
              id="commentInput"
              className="form-control"
              rows="2"
              placeholder="What are you thinking?"
              onChange={onCommentChange}
            ></textarea>
          </div>

          <button
            className="btn btn-sm btn-primary pull-right mx-5"
            type="submit"
            onClick={() => handleSendCommentButton(newComment)}
          >
            <i className="fa fa-pencil fa-fw"></i> Share
          </button>
        </div>
      )}

      {/* Anime Comments */}
      <div className="row">
        <div className="col-md-12 col-sm-12">
          {commentsList.length > 0 && (
            <h3 className=" mb-5">{`${commentsList.length} ${
              commentsList.length > 1 ? "Comments" : "Comment"
            }`}</h3>
          )}
          <div className="row">
            <div className="comments-list col-md-12 col-sm-12">
              {commentsList.map((comment, index) => (
                <div className="media mb-5" key={comment._id}>
                  <img
                    className="mx-3 rounded-circle pull-left skeleton"
                    alt={`${comment.user.avatar}`}
                    src={`${comment.user.avatar}`}
                    style={{ width: "60px" }}
                  />
                  <div className="media-body">
                    <div className="row comment-title">
                      <div className="comment-title_info col-8 d-flex">
                        <h5>{comment.user.username}</h5>
                        <span className="text-secondary mx-3">
                          {getCommentDate(comment.created_at)}
                        </span>
                      </div>
                      {userCtx.user && (
                        <div className="col-4">
                          <div className="pull-right reply">
                            <div
                              className="text-primary"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleReplyButton(index);
                              }}
                            >
                              <span>
                                <i className="fa fa-reply"></i> reply
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="row comment-content">
                      <p style={{ whiteSpace: "pre" }}>
                        {resizeCommentText(comment.comment, innerWidth)}
                      </p>
                    </div>

                    <div className="row comment-reaction">
                      <div className="col-8 d-flex mx-5 px-5">
                        <button
                          className="btn btn-link px-0"
                          style={{ textDecoration: "none", color: "grey" }}
                          disabled={userCtx.user ? false : true}
                          onClick={() =>
                            handleLikeDislikeComment(
                              comment,
                              comment._id,
                              currentUser,
                              "increment"
                            )
                          }
                        >
                          <i
                            className={`fa fa-thumbs-up mx-2 ${handleCounterButtonColor(
                              comment.like_submitter
                            )}`}
                          ></i>
                          {comment.like_counter}
                        </button>

                        <button
                          className="btn btn-link px-0"
                          style={{ textDecoration: "none", color: "grey" }}
                          disabled={userCtx.user ? false : true}
                          onClick={() =>
                            handleLikeDislikeComment(
                              comment,
                              comment._id,
                              currentUser,
                              "decrement"
                            )
                          }
                        >
                          <i
                            className={`fa fa-thumbs-down mx-2 ${handleCounterButtonColor(
                              comment.dislike_submitter
                            )}`}
                          ></i>
                          {comment.dislike_counter}
                        </button>

                        <button
                          className="btn btn-link px-0"
                          style={{ textDecoration: "none", color: "grey" }}
                          onClick={() => handleShowReplies(index)}
                        >
                          <i className="fa fa-comments mx-2 comment-logo"></i>
                          {!showReplies[index]
                            ? "Show replies"
                            : "Hide replies"}
                        </button>
                      </div>
                    </div>
                  </div>
                  {isReply[index] && (
                    <div className="reply-form">
                      <div className="reply-input mt-3 mx-5 d-flex flex-row align-items-center p-3 form-color">
                        <img
                          src={`${currentUser?.avatar}`}
                          alt={`${currentUser?.avatar}`}
                          className="rounded-circle mx-2 skeleton"
                          style={{ width: "40px", height: "40px" }}
                        />
                        <textarea
                          className="form-control"
                          placeholder="Enter your comment..."
                          onChange={onReplyChange}
                        ></textarea>
                      </div>
                      <div className="reply-buttons mx-5 px-5 mt-2 d-flex flex-row align-items-center">
                        <button
                          className="btn btn-light-green btn-rounded btn-sm mx-1 px-3"
                          onClick={() =>
                            handleSendReplyButton(
                              comment,
                              comment._id,
                              currentUser.username,
                              index
                            )
                          }
                        >
                          Send
                        </button>
                        <button
                          className="btn btn-light-green btn-rounded btn-sm mx-1 px-3 "
                          onClick={() => {
                            handleCancelButton(index);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                  {showReplies[index] &&
                  comment.comment_replies.length === 0 ? (
                    <div className="row mx-5 mt-3">
                      <p>No replies for this comment</p>
                    </div>
                  ) : (
                    ""
                  )}
                  {showReplies[index] &&
                    comment.comment_replies.map((reply, index) => (
                      <div className="media mt-4 mx-5" key={index}>
                        <a className="pr-3" href="#">
                          <img
                            className="rounded-circle pull-left skeleton"
                            alt={`${reply.submitter_avatar}`}
                            src={`${reply.submitter_avatar}`}
                            style={{ width: "40px", height: "40px" }}
                          />
                        </a>
                        <div className="media-body">
                          <div className="row">
                            <div className="col-12 d-flex">
                              <h5>{reply.submitter}</h5>
                            </div>
                          </div>
                          <div className="row comment-reply-content">
                            <p style={{ whiteSpace: "pre" }}>
                              {resizeCommentText(
                                reply.submitter_comment,
                                innerWidth
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeComments;
