import { LayoutGrid, Sun, Aperture, Palette } from "lucide-react";

export const SKILLS = [
  { id: "composition", label: "Composition", teacher: "Margaux", Icon: LayoutGrid, color: "#578BFA", tint: "rgba(87,139,250,.16)" },
  { id: "light", label: "Light", teacher: "Sterling", Icon: Sun, color: "#F4B740", tint: "rgba(244,183,64,.16)" },
  { id: "technical", label: "Focus and exposure", teacher: "Sterling", Icon: Aperture, color: "#3CC8C8", tint: "rgba(60,200,200,.16)" },
  { id: "editing", label: "Color and editing", teacher: "Margaux", Icon: Palette, color: "#A78BFA", tint: "rgba(167,139,250,.16)" },
];
export const SKILL_BY_ID = Object.fromEntries(SKILLS.map((s) => [s.id, s]));

export const CRITICS = [
  {
    id: "sterling",
    name: "Sterling Voss",
    role: "Collector. Trained on Ansel Adams prints.",
    initials: "S",
    color: "#D4AA3A",
    tint: "rgba(212,170,58,.16)",
    skills: ["light", "technical"],
    waiting: "Evaluating the tonal range\u2026",
  },
  {
    id: "margaux",
    name: "Margaux Fontaine",
    role: "Curator. Disciple of Cartier-Bresson.",
    initials: "M",
    color: "#E26AB5",
    tint: "rgba(226,106,181,.16)",
    skills: ["composition", "editing"],
    waiting: "Consulting her monograph collection\u2026",
  },
  {
    id: "mom",
    name: "Mom",
    role: "Your biggest fan. Teaches good habits.",
    initials: "\u2764",
    color: "#27AD75",
    tint: "rgba(39,173,117,.16)",
    skills: [],
    waiting: "Looking for her reading glasses\u2026",
  },
];

export const TEMPERS = [
  { id: "gentle", label: "Gentle", host: "Soft opening. Even emerging artists need encouragement." },
  { id: "honest", label: "Honest", host: "Press preview. Honest reviews, no favors." },
  { id: "brutal", label: "Brutal", host: "Art Basel. Sterling\u2019s been polishing his monocle." },
];

export const HOST = {
  idle: "No submissions yet. My gilding is wasted on empty walls.",
  ready: "A new piece. Let\u2019s see if it\u2019s worthy of my gilding.",
  reshootReady: "A revision. The artist returns. I remain magnificent.",
  error: "The critics wandered off. Probably admiring me in the next room.",
  rateLimit: "Slow down. Even the Louvre hangs one piece at a time.",
  loading: [
    "Adjusting the gallery lighting to flatter myself.",
    "Polishing my corners. Presentation matters.",
    "Sterling is checking the tonal range. I\u2019m checking my gilding.",
    "Margaux is referencing an obscure photographer. Again.",
  ],
  byGrade: {
    A: "Finally. A piece worthy of my gilding.",
    B: "Not bad. I\u2019d display it. Near me, even.",
    C: "It\u2019ll do. Back wall, dim lighting.",
    D: "This belongs in a gift shop, not a gallery.",
    F: "I\u2019ve framed better parking tickets.",
  },
};

export const FUNDAMENTALS = [
  { id: "face_the_light", name: "Face the light", critic: "sterling", skill: "light" },
  { id: "side_light", name: "Side light", critic: "sterling", skill: "light" },
  { id: "golden_hour", name: "Golden hour", critic: "sterling", skill: "light" },
  { id: "open_shade", name: "Open shade", critic: "sterling", skill: "light" },
  { id: "tap_exposure", name: "Tap and slide exposure", critic: "sterling", skill: "technical" },
  { id: "tap_focus", name: "Tap to focus", critic: "sterling", skill: "technical" },
  { id: "hold_steady", name: "Hold it steady", critic: "sterling", skill: "technical" },
  { id: "clean_lens", name: "Clean your lens", critic: "sterling", skill: "technical" },
  { id: "rule_of_thirds", name: "Rule of thirds", critic: "margaux", skill: "composition" },
  { id: "fill_the_frame", name: "Fill the frame", critic: "margaux", skill: "composition" },
  { id: "simple_background", name: "Simple background", critic: "margaux", skill: "composition" },
  { id: "straight_horizon", name: "Straight horizon", critic: "margaux", skill: "composition" },
  { id: "change_angle", name: "Change your angle", critic: "margaux", skill: "composition" },
  { id: "leading_lines", name: "Leading lines", critic: "margaux", skill: "composition" },
  { id: "check_edges", name: "Check your edges", critic: "margaux", skill: "composition" },
  { id: "crop_it", name: "Crop with purpose", critic: "margaux", skill: "editing" },
  { id: "natural_color", name: "Natural color", critic: "margaux", skill: "editing" },
  { id: "light_touch_edits", name: "Light-touch edits", critic: "margaux", skill: "editing" },
  { id: "take_three", name: "Take three versions", critic: "mom", skill: null },
  { id: "daily_photo", name: "One photo a day", critic: "mom", skill: null },
  { id: "favorites_album", name: "Keep a favorites album", critic: "mom", skill: null },
  { id: "study_a_photo", name: "Study a photo you love", critic: "mom", skill: null },
];
export const FUND_BY_ID = Object.fromEntries(FUNDAMENTALS.map((f) => [f.id, f]));
