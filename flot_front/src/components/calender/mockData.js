export const myData = {
  profile: { id: "me", name: "나" },
  schedules: [
    {
      id: "my_1",
      title: "시데레우스 자첫 아주 기나긴 제목 테스트",
      date: "2026-06-16",
      time: "20:00",
      genre: "뮤지컬",
      isPending: false,
      actors: "강찬, 이한솔",
      place: "플러스씨어터",
      seat: "OP석 3열",
      price: "66,000원",
      shop: "인터파크",
      memo: "드디어 자첫!",
    },
    {
      id: "my_2",
      title: "브카라 종공 회차 가고 싶다",
      date: "2026-06-21",
      time: "18:00",
      genre: "뮤지컬",
      isPending: true,
      actors: "미정",
      place: "링크아트센터",
      seat: "",
      price: "",
      shop: "",
      memo: "",
    },
  ],
};

export const favoriteActors = [
  {
    id: "actor1",
    name: "강찬",
    castings: [
      {
        id: "a1_1",
        showName: "시데레우스",
        place: "플러스씨어터",
        date: "2026-06-09",
        time: "20:00",
        event: "무대인사 주간",
        actors: "강찬, 이한솔, 신주협",
      },
      {
        id: "a1_2",
        showName: "시데레우스",
        place: "플러스씨어터",
        date: "2026-06-10",
        time: "20:00",
        event: "무대인사 주간",
        actors: "강찬, 박좌헌, 홍성원",
      },
      {
        id: "a1_3",
        showName: "시데레우스",
        place: "플러스씨어터",
        date: "2026-06-11",
        time: "20:00",
        event: "무대인사 주간",
        actors: "강찬, 이한솔, 홍성원",
      },
      {
        id: "a1_4",
        showName: "시데레우스",
        place: "플러스씨어터",
        date: "2026-06-12",
        time: "20:00",
        event: "무대인사 주간",
        actors: "강찬, 박좌헌, 신주협",
      },
    ],
  },
  {
    id: "actor2",
    name: "이한솔",
    castings: [
      {
        id: "a2_1",
        showName: "브라더스 까라마조프",
        place: "링크아트센터",
        date: "2026-06-16",
        time: "20:00",
        event: "커튼콜 위크",
        actors: "이한솔, 안재영, 김지온",
      },
    ],
  },
];

export const favoriteShows = [
  {
    id: "show1",
    name: "시데레우스",
    entireSchedules: [
      {
        id: "s1_1",
        showName: "시데레우스",
        place: "플러스씨어터",
        date: "2026-06-09",
        time: "19:30",
        event: "스페셜 커튼콜",
        actors: "강찬, 이한솔, 신주협",
      },
      {
        id: "s1_2",
        showName: "시데레우스",
        place: "플러스씨어터",
        date: "2026-06-10",
        time: "15:00",
        event: "스페셜 커튼콜, 당일할인",
        actors: "조모세, 신주협, 배나라",
      },
      {
        id: "s1_2_2",
        showName: "시데레우스",
        place: "플러스씨어터",
        date: "2026-06-10",
        time: "19:30",
        event: "스페셜 커튼콜, 당일할인, 엽서 증정",
        actors: "김뮤덕, 이연극",
      },
      {
        id: "s1_3",
        showName: "시데레우스",
        place: "플러스씨어터",
        date: "2026-06-11",
        time: "19:30",
        event: "스페셜 커튼콜",
        actors: "강찬, 박좌헌, 홍성원",
      },
      {
        id: "s1_4",
        showName: "시데레우스",
        place: "플러스씨어터",
        date: "2026-06-12",
        time: "15:00",
        event: "스페셜 커튼콜",
        actors: "조모세, 박좌헌, 배나라",
      },
      {
        id: "s1_5",
        showName: "시데레우스",
        place: "플러스씨어터",
        date: "2026-06-13",
        time: "14:00",
        event: "싱어롱 위크",
        actors: "강찬, 이한솔, 배나라",
      },
    ],
  },
];

export const myFriends = [
  {
    id: "friend1",
    name: "김뮤덕",
    schedules: [
      {
        id: "f1_1",
        title: "시데레우스 관극",
        date: "2026-06-17",
        time: "20:00",
        genre: "뮤지컬",
        isPending: false,
        actors: "조모세 회차",
        place: "플러스씨어터",
      },
    ],
  },
  {
    id: "friend2",
    name: "이연극",
    schedules: [
      {
        id: "f2_1",
        title: "등등곡 자첫",
        date: "2026-06-24",
        time: "20:00",
        genre: "뮤지컬",
        isPending: false,
        actors: "신주협 회차",
        place: "TOM 1관",
      },
    ],
  },
  {
    id: "friend3",
    name: "박동연",
    schedules: [
      {
        id: "f3_1",
        title: "재심",
        date: "2026-06-24",
        time: "20:00",
        genre: "연극",
        isPending: false,
        actors: "배우진",
        place: "아트원",
      },
    ],
  },
  {
    id: "friend4",
    name: "최스릘",
    schedules: [
      {
        id: "f4_1",
        title: "고스트",
        date: "2026-06-24",
        time: "20:00",
        genre: "뮤지컬",
        isPending: false,
        actors: "주원",
        place: "디큐브",
      },
    ],
  },
  {
    id: "friend5",
    name: "정오페라",
    schedules: [
      {
        id: "f5_1",
        title: "오페라의 유령",
        date: "2026-06-24",
        time: "20:00",
        genre: "뮤지컬",
        isPending: false,
        actors: "조승우",
        place: "샤롯데",
      },
    ],
  },
];

const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = hash * 31 + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
};

export const getPersonColor = (id) => {
  if (id === "me") return { bg: "#475569", color: "#ffffff" };
  if (id === "actor1") return { bg: "#7c5a9e", color: "#ffffff" };
  if (id === "actor2") return { bg: "#5275a1", color: "#ffffff" };
  if (id === "actor3") return { bg: "#a6526d", color: "#ffffff" };
  if (id === "actor4") return { bg: "#4d724d", color: "#ffffff" };

  const hash = hashCode(id);
  const hueShift = (hash * 137) % 360;
  return { bg: `hsl(${hueShift}, 45%, 50%)`, color: "#ffffff" };
};
