export function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

export function resizeCommentText(comment, screenWidth) {
  let lineSize = 0;

  if (screenWidth < 1501) lineSize = 25;
  if (screenWidth < 1351) lineSize = 20;
  if (screenWidth < 1201) lineSize = 15;
  if (screenWidth < 993) lineSize = 12;
  if (screenWidth < 767) lineSize = 9;
  if (screenWidth < 577) lineSize = 6;

  if (lineSize > 0) {
    const commentWord = comment.replace("\n","").split(" ");
    const commentParts = commentWord.length / lineSize;
    let resizedComment = "";
    for (let i = 0; i < commentParts; i++) {
      let part = "";
      for (let j = 0; j < lineSize; j++) {
        if (commentWord[i * lineSize + j]) {
          part = part + commentWord[i * lineSize + j] + " ";
        }
      }

      resizedComment = resizedComment + part + "\n";
    }

    return resizedComment;
  }

  return comment;
}

export function getCommentDate(commentDate) {
  // time Passed in milliseconds
  const passdTime = Date.now() - Date.parse(commentDate);
  const secondes = Math.trunc(passdTime / 1000); // secondes
  const minutes = Math.trunc(passdTime / (1000 * 60)); // minutes
  const hours = Math.trunc(passdTime / (1000 * 3600)); // hours
  const days = Math.trunc(passdTime / (1000 * 3600 * 24)); // days
  const weeks = Math.trunc(passdTime / (1000 * 3600 * 24 * 7)); // weeks
  const months = Math.trunc(passdTime / (1000 * 3600 * 24 * 30)); // months
  const years = Math.trunc(passdTime / (1000 * 3600 * 24 * 365)); // years

  if (secondes < 60) return "Now";
  if (minutes < 2) return `${minutes} minute ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 2) return `${hours} hour ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days < 2) return `${days} day ago`;
  if (days < 8) return `${days} days ago`;
  if (weeks < 2) return `${weeks} week ago`;
  if (weeks < 4) return `${weeks} weeks ago`;
  if (months < 2) return `${months} month ago`;
  if (months < 12) return `${months} months ago`;
  if (years < 2) return `${years} year ago`;
  return `${years} years ago`;
}

export function handleLikeDislikeCounter(comment, user, type) {
  // Copy from comment Object with spread operator
  let tempComment = { ...comment };

  let submitter_like_list = [...tempComment.like_submitter];
  let submitter_dislike_list = [...tempComment.dislike_submitter];

  // get like and dislike submitter index
  const likeIndex = submitter_like_list.findIndex(
    (element) => element._id === user._id
  );
  const dislikeIndex = submitter_dislike_list.findIndex(
    (element) => element._id === user._id
  );
  // Logic for increment/decrement like/dislike counter
  if (type === "increment") {
    if (likeIndex === -1) {
      submitter_like_list.push({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
      tempComment.like_counter++;

      if (dislikeIndex !== -1) {
        submitter_dislike_list.splice(dislikeIndex, 1);
        tempComment.dislike_counter--;
        // if (tempComment.dislike_counter === 0) {
        //   window.location.reload();
        // }
      }
    } else {
      submitter_like_list.splice(likeIndex, 1);
      tempComment.like_counter--;
      // if (tempComment.like_counter === 0) {
      //   window.location.reload();
      // }
    }
  }
  if (type === "decrement") {
    if (dislikeIndex === -1) {
      submitter_dislike_list.push({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
      tempComment.dislike_counter++;

      if (likeIndex !== -1) {
        submitter_like_list.splice(likeIndex, 1);
        tempComment.like_counter--;
        // if (tempComment.like_counter === 0) {
        //   window.location.reload();
        // }
      }
    } else {
      submitter_dislike_list.splice(dislikeIndex, 1);
      tempComment.dislike_counter--;
      // if (tempComment.dislike_counter === 0) {
      //   window.location.reload();
      // }
    }
  }

  // Execution part
  tempComment.like_submitter = submitter_like_list;
  tempComment.dislike_submitter = submitter_dislike_list;

  return tempComment;

  // window.location.reload();
}
