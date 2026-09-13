import { LayoutGrid, Sun, Aperture, Palette } from "lucide-react";

export const SKILLS = [
  { id: "composition", label: "Composition", teacher: "Harper", Icon: LayoutGrid, color: "#578BFA", tint: "rgba(87,139,250,.16)" },
  { id: "light", label: "Light", teacher: "Curren", Icon: Sun, color: "#F4B740", tint: "rgba(244,183,64,.16)" },
  { id: "technical", label: "Focus and exposure", teacher: "Curren", Icon: Aperture, color: "#3CC8C8", tint: "rgba(60,200,200,.16)" },
  { id: "editing", label: "Color and editing", teacher: "Harper", Icon: Palette, color: "#A78BFA", tint: "rgba(167,139,250,.16)" },
];
export const SKILL_BY_ID = Object.fromEntries(SKILLS.map((s) => [s.id, s]));

export const CRITICS = [
  {
    id: "curren",
    name: "Curren",
    role: "The lion with the golden eye. Judge of light and focus.",
    initials: "C",
    color: "#D4AA3A",
    tint: "rgba(212,170,58,.16)",
    skills: ["light", "technical"],
    waiting: "Basking in the light like a true king\u2026",
  },
  {
    id: "harper",
    name: "Harper",
    role: "The dolphin who sees every angle. Judge of composition and color.",
    initials: "H",
    color: "#E26AB5",
    tint: "rgba(226,106,181,.16)",
    skills: ["composition", "editing"],
    waiting: "Diving deep into the composition\u2026",
  },
  {
    id: "mom",
    name: "Mom",
    role: "Your biggest fan. Teaches good habits.",
    initials: "\u2764",
    color: "#27AD75",
    tint: "rgba(39,173,117,.16)",
    skills: [],
    waiting: "Putting on her reading glasses\u2026",
  },
];

export const TEMPERS = [
  { id: "gentle", label: "Gentle", host: "Easy mode. Even baby birds need encouragement." },
  { id: "honest", label: "Honest", host: "Honest reviews, no sugar-coating." },
  { id: "brutal", label: "Brutal", host: "Brutal mode. Curren\u2019s sharpening his claws." },

];

export const HOST = {
  idle: "Upload a photo. The Judges will score it, roast it, and tell you exactly how to make your next one better.",
  ready: "Ooh, a new photo! Let\u2019s see what the Judges think.",
  reshootReady: "A reshoot! Let\u2019s see if you nailed it this time.",
  error: "The Judges wandered off. Probably chasing a laser pointer.",
  rateLimit: "Slow down! Even I need to catch my breath between photos.",
  loading: [
    "Curren is studying the light\u2026 like a perfect sunbeam.",
    "Harper\u2019s rotating her head 180\u00b0 for a better look.",
    "Mom is looking for the \u2018like\u2019 button.",
    "The Judges are deliberating\u2026 snacks may be involved.",
  ],
  byGrade: {
    A: "Now THAT\u2019s a photo! *squawk*",
    B: "Not bad at all! Getting really good.",
    C: "It\u2019ll do. Let\u2019s try another one!",
    D: "We\u2019ve all been there. Try the tips!",
    F: "Hey, every pro started somewhere. Keep shooting!",
  },
};

export const FUNDAMENTALS = [
  { id: "face_the_light", name: "Face the light", critic: "curren", skill: "light" },
  { id: "side_light", name: "Side light", critic: "curren", skill: "light" },
  { id: "golden_hour", name: "Golden hour", critic: "curren", skill: "light" },
  { id: "open_shade", name: "Open shade", critic: "curren", skill: "light" },
  { id: "tap_exposure", name: "Tap and slide exposure", critic: "curren", skill: "technical" },
  { id: "tap_focus", name: "Tap to focus", critic: "curren", skill: "technical" },
  { id: "hold_steady", name: "Hold it steady", critic: "curren", skill: "technical" },
  { id: "clean_lens", name: "Clean your lens", critic: "curren", skill: "technical" },
  { id: "rule_of_thirds", name: "Rule of thirds", critic: "harper", skill: "composition" },
  { id: "fill_the_frame", name: "Fill the frame", critic: "harper", skill: "composition" },
  { id: "simple_background", name: "Simple background", critic: "harper", skill: "composition" },
  { id: "straight_horizon", name: "Straight horizon", critic: "harper", skill: "composition" },
  { id: "change_angle", name: "Change your angle", critic: "harper", skill: "composition" },
  { id: "leading_lines", name: "Leading lines", critic: "harper", skill: "composition" },
  { id: "check_edges", name: "Check your edges", critic: "harper", skill: "composition" },
  { id: "crop_it", name: "Crop with purpose", critic: "harper", skill: "editing" },
  { id: "natural_color", name: "Natural color", critic: "harper", skill: "editing" },
  { id: "light_touch_edits", name: "Light-touch edits", critic: "harper", skill: "editing" },
  { id: "take_three", name: "Take three versions", critic: "mom", skill: null },
  { id: "daily_photo", name: "One photo a day", critic: "mom", skill: null },
  { id: "favorites_album", name: "Keep a favorites album", critic: "mom", skill: null },
  { id: "study_a_photo", name: "Study a photo you love", critic: "mom", skill: null },
];
export const FUND_BY_ID = Object.fromEntries(FUNDAMENTALS.map((f) => [f.id, f]));
