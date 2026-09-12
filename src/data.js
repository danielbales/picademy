import { LayoutGrid, Sun, Aperture, Palette } from "lucide-react";

export const SKILLS = [
  { id: "composition", label: "Composition", teacher: "Brayden", Icon: LayoutGrid, color: "#578BFA", tint: "rgba(87,139,250,.16)" },
  { id: "light", label: "Light", teacher: "Hank", Icon: Sun, color: "#F4B740", tint: "rgba(244,183,64,.16)" },
  { id: "technical", label: "Focus and exposure", teacher: "Hank", Icon: Aperture, color: "#3CC8C8", tint: "rgba(60,200,200,.16)" },
  { id: "editing", label: "Color and editing", teacher: "Brayden", Icon: Palette, color: "#A78BFA", tint: "rgba(167,139,250,.16)" },
];
export const SKILL_BY_ID = Object.fromEntries(SKILLS.map((s) => [s.id, s]));

export const CRITICS = [
  {
    id: "hank",
    name: "Hank Rourke",
    role: "Film photographer. Teaches light and focus.",
    initials: "H",
    color: "#F4B740",
    tint: "rgba(244,183,64,.16)",
    skills: ["light", "technical"],
    waiting: "Muttering about Kodachrome\u2026",
  },
  {
    id: "brayden",
    name: "Brayden Skye",
    role: "Lifestyle creator. Teaches composition and editing.",
    initials: "B",
    color: "#E26AB5",
    tint: "rgba(226,106,181,.16)",
    skills: ["composition", "editing"],
    waiting: "Checking what\u2019s trending\u2026",
  },
  {
    id: "mom",
    name: "Mom",
    role: "Your biggest fan. Teaches good habits.",
    initials: "M",
    color: "#27AD75",
    tint: "rgba(39,173,117,.16)",
    skills: [],
    waiting: "Looking for her reading glasses\u2026",
  },
];

export const TEMPERS = [
  { id: "gentle", label: "Gentle", host: "Beginner mode. Even I had an awkward phase, darling. It was brief." },
  { id: "honest", label: "Honest", host: "Honest mode. I adore honesty. Especially about other people." },
  { id: "brutal", label: "Brutal", host: "Brutal mode. Hank\u2019s been waiting for this. So have I." },
];

export const HOST = {
  idle: "No photos yet, darling. The stage is set. Where\u2019s the star?",
  ready: "Ooh, a fresh one. I checked the edges. Tragically, I\u2019m not in it.",
  reshootReady: "Round two, darling. Show Hank you did the steps.",
  error: "The panel didn\u2019t answer. Honestly, they\u2019re probably intimidated by me.",
  rateLimit: "You\u2019re grading too fast, darling. Give the panel a moment.",
  loading: [
    "Fluffing my wool for the big reveal.",
    "Checking the edges of your frame. Professional habit.",
    "Hank asked me to wait outside. Again.",
    "Rehearsing my reaction. Both versions.",
  ],
  byGrade: {
    A: "Stunning, darling. Almost as photogenic as me.",
    B: "Very nice. It\u2019s missing one thing, and that thing is me.",
    C: "Perfectly fine. And darling, fine is not a compliment.",
    D: "Oh dear. I\u2019ve photobombed better photos than this.",
    F: "I\u2019m not saying I would have saved it. I\u2019m implying it.",
  },
};

export const FUNDAMENTALS = [
  { id: "face_the_light", name: "Face the light", critic: "hank", skill: "light" },
  { id: "side_light", name: "Side light", critic: "hank", skill: "light" },
  { id: "golden_hour", name: "Golden hour", critic: "hank", skill: "light" },
  { id: "open_shade", name: "Open shade", critic: "hank", skill: "light" },
  { id: "tap_exposure", name: "Tap and slide exposure", critic: "hank", skill: "technical" },
  { id: "tap_focus", name: "Tap to focus", critic: "hank", skill: "technical" },
  { id: "hold_steady", name: "Hold it steady", critic: "hank", skill: "technical" },
  { id: "clean_lens", name: "Clean your lens", critic: "hank", skill: "technical" },
  { id: "rule_of_thirds", name: "Rule of thirds", critic: "brayden", skill: "composition" },
  { id: "fill_the_frame", name: "Fill the frame", critic: "brayden", skill: "composition" },
  { id: "simple_background", name: "Simple background", critic: "brayden", skill: "composition" },
  { id: "straight_horizon", name: "Straight horizon", critic: "brayden", skill: "composition" },
  { id: "change_angle", name: "Change your angle", critic: "brayden", skill: "composition" },
  { id: "leading_lines", name: "Leading lines", critic: "brayden", skill: "composition" },
  { id: "check_edges", name: "Check your edges", critic: "brayden", skill: "composition" },
  { id: "crop_it", name: "Crop with purpose", critic: "brayden", skill: "editing" },
  { id: "natural_color", name: "Natural color", critic: "brayden", skill: "editing" },
  { id: "light_touch_edits", name: "Light-touch edits", critic: "brayden", skill: "editing" },
  { id: "take_three", name: "Take three versions", critic: "mom", skill: null },
  { id: "daily_photo", name: "One photo a day", critic: "mom", skill: null },
  { id: "favorites_album", name: "Keep a favorites album", critic: "mom", skill: null },
  { id: "study_a_photo", name: "Study a photo you love", critic: "mom", skill: null },
];
export const FUND_BY_ID = Object.fromEntries(FUNDAMENTALS.map((f) => [f.id, f]));
