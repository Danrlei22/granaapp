import { createSlice } from "@reduxjs/toolkit";

const phrases = [
  "Saving today investing in your tomorrow.",
  "Every penny saved is a step towards financial freedom.",
  "Invest in your dreams, one saving at a time.",
  "Financial security starts with smart saving habits.",
  "A small saving today can lead to big rewards tomorrow.",
  "Your future self will thank you for saving today.",
  "Saving is the first step towards achieving your financial goals.",
  "Every little bit counts when it comes to saving money.",
  "Saving is not just about money, it's about building a better future.",
  "The best time to start saving was yesterday. The second best time is now.",
  "Saving is a journey, not a destination.",
  "Financial freedom begins with a single step: saving.",
];

const getRandomPhrase = () =>
  phrases[Math.floor(Math.random() * phrases.length)];

const motivationalSlice = createSlice({
  name: "motivational",
  initialState: {
    phrase: getRandomPhrase(),
  },
  reducers: {
    setPhrase: (state) => {
      state.phraseCurrent = getRandomPhrase();
    },
  },
});

export const { setPhrase } = motivationalSlice.actions;
export default motivationalSlice.reducer;
