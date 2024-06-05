db.comments.insertMany([
  {
    _id: ObjectId("6106a48a1075ad4de87833f3"),
    like_counter: 1,
    dislike_counter: 2,
    comment_replies: [
      {
        submitter: "sanji",
        submitter_comment: "definitely 🎃🎃🎃",
        submitter_avatar:
          "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604785/nextjs_anime_app/users/sanji_krw7nk.jpg",
      },
    ],
    like_submitter: [
      {
        _id: "60ff08967f67ed1030dbd791",
        username: "sanji",
        email: "sanji@gmail.com",
      },
    ],
    dislike_submitter: [
      {
        _id: "6101ca53dc34c716b8f6d5f9",
        username: "zoro",
        email: "zoro@gmail.com",
      },
      {
        _id: "6102a4926e56974068bb2135",
        username: "luffy",
        email: "luffy@gmail.com",
      },
    ],
    user: {
      _id: ObjectId("6105db28cd5def4bf0fcbf07"),
      username: "kaneki",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604803/nextjs_anime_app/users/tokyo-ghoul_iemspt.jpg",
    },
    anime: {
      _id: ObjectId("60fa1854051e32231317b3d0"),
      title: "Kiseijuu: Sei no Kakuritsu",
    },
    comment: "nice",
    created_at: {
      $date: "2021-08-01T13:41:30.351Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("6106a4c51075ad4de87833f7"),
    like_counter: 2,
    dislike_counter: 1,
    comment_replies: [
      {
        submitter: "luffy",
        submitter_comment: "kaizoku",
        submitter_avatar:
          "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604800/nextjs_anime_app/users/luffy_qohjot.jpg",
      },
      {
        submitter: "zoro",
        submitter_comment: "sake",
        submitter_avatar:
          "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604806/nextjs_anime_app/users/zoro_kfkurd.jpg",
      },
      {
        submitter: "sanji",
        submitter_comment: "east blue",
        submitter_avatar:
          "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604785/nextjs_anime_app/users/sanji_krw7nk.jpg",
      },
    ],
    like_submitter: [
      {
        _id: "6101ca53dc34c716b8f6d5f9",
        username: "zoro",
        email: "zoro@gmail.com",
      },
      {
        _id: "6102a4926e56974068bb2135",
        username: "luffy",
        email: "luffy@gmail.com",
      },
    ],
    dislike_submitter: [
      {
        _id: "60ff08967f67ed1030dbd791",
        username: "sanji",
        email: "sanji@gmail.com",
      },
    ],
    user: {
      _id: ObjectId("6105ce7414048164185c23c8"),
      username: "gintoki",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604752/nextjs_anime_app/users/gintama_qn1inu.jpg",
    },
    anime: {
      _id: ObjectId("60fa1854051e32231317b3d0"),
      title: "Kiseijuu: Sei no Kakuritsu",
    },
    comment: "zura",
    created_at: {
      $date: "2021-08-01T13:42:29.098Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("610726aa776bf15dd458e93d"),
    like_counter: 2,
    dislike_counter: 0,
    comment_replies: [
      {
        submitter: "zoro",
        submitter_comment: "Agreed.\nI'm currently rewatching it.",
        submitter_avatar:
          "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604806/nextjs_anime_app/users/zoro_kfkurd.jpg",
      },
      {
        submitter: "gintoki",
        submitter_comment:
          "There is also live action movie but it's not worth it.",
        submitter_avatar:
          "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604752/nextjs_anime_app/users/gintama_qn1inu.jpg",
      },
    ],
    like_submitter: [
      {
        _id: "6102a4926e56974068bb2135",
        username: "luffy",
        email: "luffy@gmail.com",
      },
      {
        _id: "60ff08967f67ed1030dbd791",
        username: "sanji",
        email: "sanji@gmail.com",
      },
    ],
    dislike_submitter: [],
    user: {
      _id: ObjectId("60ff08967f67ed1030dbd791"),
      username: "sanji",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604785/nextjs_anime_app/users/sanji_krw7nk.jpg",
    },
    anime: {
      _id: ObjectId("60fa1854051e32231317b3d0"),
      title: "Kiseijuu: Sei no Kakuritsu",
    },
    comment: "Good Anime.\nMadhouse masterpiece.",
    created_at: {
      $date: "2021-08-01T22:56:42.899Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("61093b2870d1c842707bfab5"),
    like_counter: 0,
    dislike_counter: 2,
    comment_replies: [
      {
        submitter: "zoro",
        submitter_comment: "Watch also death note\nand re zero",
        submitter_avatar:
          "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604806/nextjs_anime_app/users/zoro_kfkurd.jpg",
      },
      {
        submitter: "luffy",
        submitter_comment: "There is also parasyte",
        submitter_avatar:
          "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604800/nextjs_anime_app/users/luffy_qohjot.jpg",
      },
    ],
    like_submitter: [],
    dislike_submitter: [
      {
        _id: "6101ca53dc34c716b8f6d5f9",
        username: "zoro",
        email: "zoro@gmail.com",
      },
      {
        _id: "6102a4926e56974068bb2135",
        username: "luffy",
        email: "luffy@gmail.com",
      },
    ],
    user: {
      _id: ObjectId("6101ca53dc34c716b8f6d5f9"),
      username: "zoro",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604806/nextjs_anime_app/users/zoro_kfkurd.jpg",
    },
    anime: {
      _id: ObjectId("60fc5a8877ae2f7be04a29b2"),
      title: "Mirai Nikki (TV)",
    },
    comment: "Best anime",
    created_at: {
      $date: "2021-08-03T12:48:40.947Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("6109da613357ed5adc067df2"),
    like_counter: 0,
    dislike_counter: 0,
    comment_replies: [],
    like_submitter: [],
    dislike_submitter: [],
    user: {
      _id: ObjectId("6102a4926e56974068bb2135"),
      username: "luffy",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604800/nextjs_anime_app/users/luffy_qohjot.jpg",
    },
    anime: {
      _id: ObjectId("60fc5a8877ae2f7be04a29b2"),
      title: "Mirai Nikki (TV)",
    },
    comment:
      "Watched Death Note,\nWatched Future Diary,\nWaiting for a Death Diary now 😈",
    created_at: {
      $date: "2021-08-04T00:08:01.143Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("6109dbe43357ed5adc067e0e"),
    like_counter: 2,
    dislike_counter: 0,
    comment_replies: [
      {
        submitter: "sanji",
        submitter_comment: "Can't wait for season 2",
        submitter_avatar:
          "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604785/nextjs_anime_app/users/sanji_krw7nk.jpg",
      },
      {
        submitter: "satoru gojo",
        submitter_comment: "Glad to hear that",
        submitter_avatar:
          "https://res.cloudinary.com/daxqo5wpg/image/upload/v1677432976/nextjs_anime_app/users/qjjkxod4ijb4ggqmjqbt.jpg",
      },
    ],
    like_submitter: [
      {
        _id: "6102a4926e56974068bb2135",
        username: "luffy",
        email: "luffy@gmail.com",
      },
      {
        _id: "60ff08967f67ed1030dbd791",
        username: "sanji",
        email: "sanji@gmail.com",
      },
    ],
    dislike_submitter: [],
    user: {
      _id: ObjectId("6102a4926e56974068bb2135"),
      username: "luffy",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604800/nextjs_anime_app/users/luffy_qohjot.jpg",
    },
    anime: {
      _id: ObjectId("6102a9084621dc4ecd982fa5"),
      title: "Jujutsu Kaisen",
    },
    comment:
      "By far one of my favorites in a long time. The production was amazing and the characters are fantastic. \nPlus, Gojo is top Tier Husbando.\n",
    created_at: {
      $date: "2021-08-04T00:14:28.951Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("610efbeb71e31c46888aa708"),
    like_counter: 0,
    dislike_counter: 0,
    comment_replies: [],
    like_submitter: [],
    dislike_submitter: [],
    user: {
      _id: ObjectId("60ff08967f67ed1030dbd791"),
      username: "sanji",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604785/nextjs_anime_app/users/sanji_krw7nk.jpg",
    },
    anime: {
      _id: ObjectId("610e79511a0a0d15887505f4"),
      title: "Attack on Titan: No Regrets",
    },
    comment: "levi everytime:↙️⏬↙️↘️◀️↖️⏺↕️↪️➡️➡️⏺↖️⤴️⏬↔️⏬↘️⏹",
    created_at: {
      $date: "2021-08-07T21:32:27.719Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("610f1c9671e31c46888aa862"),
    like_counter: 0,
    dislike_counter: 0,
    comment_replies: [],
    like_submitter: [],
    dislike_submitter: [],
    user: {
      _id: ObjectId("6102a4926e56974068bb2135"),
      username: "luffy",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604800/nextjs_anime_app/users/luffy_qohjot.jpg",
    },
    anime: {
      _id: ObjectId("610f0d963b29a1044c119a89"),
      title: "Yu☆Gi☆Oh! Duel Monsters",
    },
    comment:
      "People dont realize this but Yugioh is actually STILL the LARGEST playing card game in the world. \nOn the global scale it dwarfs magic the gathering and its WAAAAAAAAY more complex now with master rule 5. \nI took a 10 year break, came back to it and its still just as fun as I remember. ",
    created_at: {
      $date: "2021-08-07T23:51:50.956Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("61125c1381de7a17e8336d1c"),
    like_counter: 1,
    dislike_counter: 0,
    comment_replies: [
      {
        submitter: "sanji",
        submitter_comment: "I hope",
        submitter_avatar:
          "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604785/nextjs_anime_app/users/sanji_krw7nk.jpg",
      },
    ],
    like_submitter: [
      {
        _id: "60ff08967f67ed1030dbd791",
        username: "sanji",
        email: "sanji@gmail.com",
      },
    ],
    dislike_submitter: [],
    user: {
      _id: ObjectId("6105cf4f14048164185c23d1"),
      username: "eren",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604752/nextjs_anime_app/users/aot_ryfi51.jpg",
    },
    anime: {
      _id: ObjectId("610e76a51a0a0d15887505f0"),
      title: "D.Gray-man",
    },
    comment: "Will D Gray Man return?",
    created_at: {
      $date: "2021-08-10T10:59:31.575Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("611264aa81de7a17e8336d90"),
    like_counter: 1,
    dislike_counter: 0,
    comment_replies: [
      {
        submitter: "sanji",
        submitter_comment: "Agreed",
        submitter_avatar:
          "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604785/nextjs_anime_app/users/sanji_krw7nk.jpg",
      },
    ],
    like_submitter: [
      {
        _id: "60ff08967f67ed1030dbd791",
        username: "sanji",
        email: "sanji@gmail.com",
      },
    ],
    dislike_submitter: [],
    user: {
      _id: ObjectId("6105db28cd5def4bf0fcbf07"),
      username: "kaneki",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604803/nextjs_anime_app/users/tokyo-ghoul_iemspt.jpg",
    },
    anime: {
      _id: ObjectId("6111c1c84c3b6723a5e8f64b"),
      title: "Slam Dunk",
    },
    comment: "This bring back my childhood memories.",
    created_at: {
      $date: "2021-08-10T11:36:10.486Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("61126de881de7a17e8336f54"),
    like_counter: 0,
    dislike_counter: 0,
    comment_replies: [],
    like_submitter: [],
    dislike_submitter: [],
    user: {
      _id: ObjectId("60ff08967f67ed1030dbd791"),
      username: "sanji",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604785/nextjs_anime_app/users/sanji_krw7nk.jpg",
    },
    anime: {
      _id: ObjectId("6111c7374c3b6723a5e8f64d"),
      title: "Hunter x Hunter",
    },
    comment: "When the next chapter will be released ?",
    created_at: {
      $date: "2021-08-10T12:15:36.788Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("61126e3b81de7a17e8336f84"),
    like_counter: 0,
    dislike_counter: 1,
    comment_replies: [
      {
        submitter: "zoro",
        submitter_comment: "me too",
        submitter_avatar:
          "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604806/nextjs_anime_app/users/zoro_kfkurd.jpg",
      },
    ],
    like_submitter: [],
    dislike_submitter: [
      {
        _id: "60ff08967f67ed1030dbd791",
        username: "sanji",
        email: "sanji@gmail.com",
      },
    ],
    user: {
      _id: ObjectId("60ff08967f67ed1030dbd791"),
      username: "sanji",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604785/nextjs_anime_app/users/sanji_krw7nk.jpg",
    },
    anime: {
      _id: ObjectId("610c7f9621f115140a8d9ec5"),
      title: "Attack on Titan",
    },
    comment: "Can't wait for final season ?",
    created_at: {
      $date: "2021-08-10T12:16:59.024Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("611ecbea3ed85352a438fbd0"),
    like_counter: 1,
    dislike_counter: 0,
    comment_replies: [
      {
        submitter: "zoro",
        submitter_comment: "Me too",
        submitter_avatar:
          "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604806/nextjs_anime_app/users/zoro_kfkurd.jpg",
      },
      {
        submitter: "gintoki",
        submitter_comment:
          "The movie is out. Gintama the final is out on movie theatre. No streaming nor torrent is yet availble 🧐🥺😭\n\n",
        submitter_avatar:
          "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604752/nextjs_anime_app/users/gintama_qn1inu.jpg",
      },
      {
        submitter: "sanji",
        submitter_comment: "Thanks",
        submitter_avatar:
          "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604785/nextjs_anime_app/users/sanji_krw7nk.jpg",
      },
    ],
    like_submitter: [
      {
        _id: "6101ca53dc34c716b8f6d5f9",
        username: "zoro",
        email: "zoro@gmail.com",
      },
    ],
    dislike_submitter: [],
    user: {
      _id: ObjectId("60ff08967f67ed1030dbd791"),
      username: "sanji",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604785/nextjs_anime_app/users/sanji_krw7nk.jpg",
    },
    anime: {
      _id: ObjectId("6111c2584c3b6723a5e8f64c"),
      title: "Gintama",
    },
    comment: "Need to watch the final movie 🍿🎞🖥🎥🎬📽",
    created_at: {
      $date: "2021-08-19T21:23:54.213Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("611ee6af3ed85352a438ff84"),
    like_counter: 2,
    dislike_counter: 0,
    comment_replies: [
      {
        submitter: "gintoki",
        submitter_comment: "Thanks bro",
        submitter_avatar:
          "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604752/nextjs_anime_app/users/gintama_qn1inu.jpg",
      },
    ],
    like_submitter: [
      {
        _id: "6105ce7414048164185c23c8",
        username: "gintoki",
        email: "gintoki@gmail.com",
      },
      {
        _id: "60ff08967f67ed1030dbd791",
        username: "sanji",
        email: "sanji@gmail.com",
      },
    ],
    dislike_submitter: [],
    user: {
      _id: ObjectId("6105ce7414048164185c23c8"),
      username: "gintoki",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604752/nextjs_anime_app/users/gintama_qn1inu.jpg",
    },
    anime: {
      _id: ObjectId("6111c2584c3b6723a5e8f64c"),
      title: "Gintama",
    },
    comment:
      "The movie is out. Gintama the final is out on movie theatre. No streaming nor torrent is yet availble 🧐🥺😭",
    created_at: {
      $date: "2021-08-19T23:18:07.896Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("612419eb52214c58ec6f850f"),
    like_counter: 1,
    dislike_counter: 0,
    comment_replies: [],
    like_submitter: [
      {
        _id: "617da2494058c600098cfa52",
        username: "allen",
        email: "allen@gmail.com",
      },
    ],
    dislike_submitter: [],
    user: {
      _id: ObjectId("60ff08967f67ed1030dbd791"),
      username: "sanji",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604785/nextjs_anime_app/users/sanji_krw7nk.jpg",
    },
    anime: {
      _id: ObjectId("60fa1854051e32231317b3d0"),
      title: "Kiseijuu: Sei no Kakuritsu",
    },
    comment:
      "I liked the anime but hated the fact that they didn't explain the origin of the parasites.",
    created_at: {
      $date: "2021-08-23T21:58:03.350Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("61241d8452214c58ec6f8697"),
    like_counter: 0,
    dislike_counter: 0,
    comment_replies: [],
    like_submitter: [],
    dislike_submitter: [],
    user: {
      _id: ObjectId("60ff08967f67ed1030dbd791"),
      username: "sanji",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604785/nextjs_anime_app/users/sanji_krw7nk.jpg",
    },
    anime: {
      _id: ObjectId("61124ea3929603a18b0a2392"),
      title: "JoJo's Bizarre Adventure Part 8: JoJolion",
    },
    comment:
      "god i love this part so much, i think it has more subtext and deep explorations of its respective themes than any other part. \nwhen people say it is directionless it confuses me because laying out clearly from the start where the story is going g=completely goes against the entire point of a mystery, \nthe act of reading each month and going deeper into the rabbit hole and uncovering more and more of the secrets that Morioh holds is what makes the story work best. \nit truly is a wonder...",
    created_at: {
      $date: "2021-08-23T22:13:24.608Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("6126ad329b575959f04198e1"),
    like_counter: 1,
    dislike_counter: 0,
    comment_replies: [],
    like_submitter: [
      {
        _id: "60ff08967f67ed1030dbd791",
        username: "sanji",
        email: "sanji@gmail.com",
      },
    ],
    dislike_submitter: [],
    user: {
      _id: ObjectId("60ff08967f67ed1030dbd791"),
      username: "sanji",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604785/nextjs_anime_app/users/sanji_krw7nk.jpg",
    },
    anime: {
      _id: ObjectId("6126acc9c1c6a6429c9692d5"),
      title: "Death Note",
    },
    comment: "One off all time best manga. Plus the anime is badass.",
    created_at: {
      $date: "2021-08-25T20:50:58.068Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("614e3b04b586713e8c9f397e"),
    like_counter: 1,
    dislike_counter: 0,
    comment_replies: [],
    like_submitter: [
      {
        _id: "60ff08967f67ed1030dbd791",
        username: "sanji",
        email: "sanji@gmail.com",
      },
    ],
    dislike_submitter: [],
    user: {
      _id: ObjectId("60ff08967f67ed1030dbd791"),
      username: "sanji",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604785/nextjs_anime_app/users/sanji_krw7nk.jpg",
    },
    anime: {
      _id: ObjectId("6111c7804c3b6723a5e8f64e"),
      title: "Bleach",
    },
    comment: "When the anime will be back ?",
    created_at: {
      $date: "2021-09-24T20:54:28.181Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("61759e158e1a77000958918d"),
    like_counter: 0,
    dislike_counter: 0,
    comment_replies: [],
    like_submitter: [],
    dislike_submitter: [],
    user: {
      _id: ObjectId("61759ced7543fc0007a8be04"),
      username: "rem",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635097836/nextjs_anime_app/users/zg3scyhna9p9q9j9liir.jpg",
    },
    anime: {
      _id: ObjectId("610c7fd721f115140a8d9ec6"),
      title: "Re:Zero kara Hajimeru Isekai Seikatsu",
    },
    comment: "Subaruuuu!!!",
    created_at: {
      $date: "2021-10-24T17:55:33.009Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("617da2fa7e0b1f00082037e0"),
    like_counter: 1,
    dislike_counter: 0,
    comment_replies: [],
    like_submitter: [
      {
        _id: "617da2494058c600098cfa52",
        username: "allen",
        email: "allen@gmail.com",
      },
    ],
    dislike_submitter: [],
    user: {
      _id: ObjectId("617da2494058c600098cfa52"),
      username: "allen",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635623496/p7hrav9rcx6gw3uzgi3k.jpg",
    },
    anime: {
      _id: ObjectId("6150e439d7bacad20a2b46c4"),
      title: "D.Gray-man",
    },
    comment: "When the next chapter will be released ?",
    created_at: {
      $date: "2021-10-30T19:54:34.619Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("63fa87f582a6a2001268b35b"),
    like_counter: 0,
    dislike_counter: 1,
    comment_replies: [],
    like_submitter: [],
    dislike_submitter: [
      {
        _id: "60ff08967f67ed1030dbd791",
        username: "sanji",
        email: "sanji@gmail.com",
      },
    ],
    user: {
      _id: ObjectId("60ff08967f67ed1030dbd791"),
      username: "sanji",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604785/nextjs_anime_app/users/sanji_krw7nk.jpg",
    },
    anime: {
      _id: ObjectId("610c7ffa21f115140a8d9ec7"),
      title: "Bleach",
    },
    comment: "!!!",
    created_at: {
      $date: "2023-02-25T22:13:09.461Z",
    },
    __v: 0,
  },
  {
    _id: ObjectId("63fb613f9992f6001275cb1b"),
    like_counter: 1,
    dislike_counter: 0,
    comment_replies: [
      {
        submitter: "sanji",
        submitter_comment: "and opening",
        submitter_avatar:
          "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604785/nextjs_anime_app/users/sanji_krw7nk.jpg",
      },
    ],
    like_submitter: [
      {
        _id: "60ff08967f67ed1030dbd791",
        username: "sanji",
        email: "sanji@gmail.com",
      },
    ],
    dislike_submitter: [],
    user: {
      _id: ObjectId("60ff08967f67ed1030dbd791"),
      username: "sanji",
      avatar:
        "https://res.cloudinary.com/daxqo5wpg/image/upload/v1635604785/nextjs_anime_app/users/sanji_krw7nk.jpg",
    },
    anime: {
      _id: ObjectId("61ccdfbd5b5ac2cc82cdbbb5"),
      title: "91 Days",
    },
    comment: "Great anime",
    created_at: {
      $date: "2023-02-26T13:40:15.011Z",
    },
    __v: 0,
  },
]);
