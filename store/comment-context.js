import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CommentsContext = createContext({
  comments: null,
  addNewComment: function (comment) {},
  addNewReply: function (reply) {},
  updateLikeIcon: function () {},
});

export function CommentsContextProvider(props) {
  const [commentsList, setCommentsList] = useState();

  useEffect(() => {
    async function fetchData() {
      const comments = await axios.get("/api/comments");
      setCommentsList(comments.data);
    }
    fetchData();
  }, []);

  async function addNewCommentHandler(comment) {
    let comments = commentsList;
    toast.info("Pending...", { toastId: "updateIcon", autoClose:10000 });

    await axios
      .post("/api/comments", comment)
      .then((res) => {
        comments.push(res.data);
        toast.dismiss("updateIcon");
      })
      .catch((err) => toast.error(err.response.data.message));
    setCommentsList(comments);
    return comments;
  }

  async function addNewReplyHandler(replies, id) {
    let comments = commentsList;
    toast.info("Pending...", { toastId: "updateIcon", autoClose:10000 });

    await axios
      .patch(`/api/comments/${id}`, { comment_replies: replies })
      .then((res) => {
        const index = comments.findIndex((comment) => comment._id === id);
        const updatedComment = res.data.$set.comment_replies;
        comments[index].comment_replies = updatedComment;
        toast.dismiss("updateIcon");
      })
      .catch((err) => toast.error(err.response?.data.message));

    setCommentsList(comments);
    return comments;
  }

  async function updateLikeIconHandler(comment, id) {
    let comments = commentsList;
    toast.info("Pending...", { toastId: "updateIcon", autoClose:10000});
    await axios
      .patch(`/api/comments/${id}`, {
        like_counter: comment.like_counter,
        dislike_counter: comment.dislike_counter,
        like_submitter: comment.like_submitter,
        dislike_submitter: comment.dislike_submitter,
      })
      .then((res) => {
        const index = comments.findIndex((comment) => comment._id === id);
        const like_counter = res.data.$set.like_counter
          ? res.data.$set.like_counter
          : comment.like_counter;
        const dislike_counter = res.data.$set.dislike_counter
          ? res.data.$set.dislike_counter
          : comment.dislike_counter;
        const like_submitter = res.data.$set.like_submitter
          ? res.data.$set.like_submitter
          : comment.like_submitter;
        const dislike_submitter = res.data.$set.dislike_submitter
          ? res.data.$set.dislike_submitter
          : comment.dislike_submitter;

        comments[index].like_counter = like_counter;
        comments[index].dislike_counter = dislike_counter;
        comments[index].like_submitter = like_submitter;
        comments[index].dislike_submitter = dislike_submitter;

        toast.dismiss("updateIcon");
      })
      .catch((err) => toast.error(err.response?.data.message));

    setCommentsList(comments);
    return comments;
  }

  const context = {
    comments: commentsList,
    addNewComment: addNewCommentHandler,
    addNewReply: addNewReplyHandler,
    updateLikeIcon: updateLikeIconHandler,
  };

  return (
    <CommentsContext.Provider value={context}>
      {props.children}
    </CommentsContext.Provider>
  );
}

export default CommentsContext;
