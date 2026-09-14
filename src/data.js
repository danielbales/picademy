import { LayoutGrid, Sun, Aperture, Palette } from "lucide-react";

export const SKILLS = [
  { id: "composition", label: "Composition", teacher: "Harper", Icon: LayoutGrid, color: "#578BFA", tint: "rgba(87,139,250,.16)" },
  { id: "light", label: "Light", teacher: "Curren", Icon: Sun, color: "#F4B740", tint: "rgba(244,183,64,.16)" },
  { id: "technical", label: "Focus and exposure", teacher: "Kai", Icon: Aperture, color: "#3CC8C8", tint: "rgba(60,200,200,.16)" },
  { id: "editing", label: "Color and editing", teacher: "Kai", Icon: Palette, color: "#A78BFA", tint: "rgba(167,139,250,.16)" },
];
export const SKILL_BY_ID = Object.fromEntries(SKILLS.map((s) => [s.id, s]));

export const CRITICS = [
  {
    id: "curren",
    name: "Curren",
    role: "The lion with the golden eye. Judge of light.",
    initials: "C",
    color: "#D4AA3A",
    tint: "rgba(212,170,58,.16)",
    skills: ["light"],
    focus: "Light",
    waiting: "Basking in the light like a true king\u2026",
  },
  {
    id: "harper",
    name: "Harper",
    role: "The cheetah who spots every angle. Judge of composition.",
    initials: "H",
    color: "#E26AB5",
    tint: "rgba(226,106,181,.16)",
    skills: ["composition"],
    focus: "Composition",
    waiting: "Scanning the frame with laser focus\u2026",
  },
  {
    id: "kai",
    name: "Kai",
    role: "The octopus who catches every detail. Judge of focus and color.",
    initials: "K",
    color: "#7B68EE",
    tint: "rgba(123,104,238,.16)",
    skills: ["technical", "editing"],
    focus: "Focus and color",
    waiting: "Wrapping eight arms around the details\u2026",
  },
  {
    id: "mom",
    name: "Mom",
    role: "Your biggest fan. Teaches good habits.",
    initials: "\u2764",
    color: "#27AD75",
    tint: "rgba(39,173,117,.16)",
    skills: [],
    focus: "Bias \u2764\uFE0F",
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
  reshootReady: "Round two! Let\u2019s see if you nailed it this time.",
  error: "The Judges wandered off. Probably chasing a laser pointer.",
  rateLimit: "Slow down! Even I need to catch my breath between photos.",
  loading: [
    "Curren is tilting his head at the exposure like it owes him money.",
    "Harper just sprinted across the frame to check your leading lines.",
    "Mom is zooming in on every face to make sure everyone looks happy.",
    "Curren is holding your photo up to actual sunlight for comparison.",
    "Harper spotted a horizon line 0.3 degrees off and won\u2019t let it go.",
    "Mom is already texting her book club about your photo.",
    "The Judges are arguing. Harper knocked Curren\u2019s notes off the table.",
    "Curren is squinting. That\u2019s either deep thought or the lighting.",
    "Mom just asked if she can frame this one. She asks every time.",
    "Harper is pacing. She does this when the composition is interesting.",
    "Kai has three arms on the white balance and two on the focus ring.",
    "Kai is changing color. That means the editing is either great or terrible.",
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
  // Curren — Light
  { id: "face_the_light", name: "Face the light", critic: "curren", skill: "light" },
  { id: "side_light", name: "Side light", critic: "curren", skill: "light" },
  { id: "golden_hour", name: "Golden hour", critic: "curren", skill: "light" },
  { id: "open_shade", name: "Open shade", critic: "curren", skill: "light" },
  { id: "backlight", name: "Use backlighting", critic: "curren", skill: "light" },
  { id: "window_light", name: "Window light", critic: "curren", skill: "light" },
  { id: "bounce_light", name: "Bounce the light", critic: "curren", skill: "light" },
  { id: "avoid_mixed_light", name: "Watch mixed lighting", critic: "curren", skill: "light" },
  { id: "flash_off", name: "Turn off the flash", critic: "curren", skill: "light" },
  // Kai — Technical
  { id: "tap_exposure", name: "Tap and slide exposure", critic: "kai", skill: "technical" },
  { id: "tap_focus", name: "Tap to focus", critic: "kai", skill: "technical" },
  { id: "hold_steady", name: "Hold it steady", critic: "kai", skill: "technical" },
  { id: "clean_lens", name: "Clean your lens", critic: "kai", skill: "technical" },
  { id: "portrait_mode", name: "Try portrait mode", critic: "kai", skill: "technical" },
  { id: "burst_mode", name: "Use burst mode", critic: "kai", skill: "technical" },
  { id: "night_mode", name: "Use night mode", critic: "kai", skill: "technical" },
  { id: "lock_exposure", name: "Lock focus and exposure", critic: "kai", skill: "technical" },
  { id: "timer_mode", name: "Use the timer", critic: "kai", skill: "technical" },
  // Harper — Composition
  { id: "rule_of_thirds", name: "Rule of thirds", critic: "harper", skill: "composition" },
  { id: "fill_the_frame", name: "Fill the frame", critic: "harper", skill: "composition" },
  { id: "simple_background", name: "Simple background", critic: "harper", skill: "composition" },
  { id: "straight_horizon", name: "Straight horizon", critic: "harper", skill: "composition" },
  { id: "change_angle", name: "Change your angle", critic: "harper", skill: "composition" },
  { id: "leading_lines", name: "Leading lines", critic: "harper", skill: "composition" },
  { id: "check_edges", name: "Check your edges", critic: "harper", skill: "composition" },
  { id: "negative_space", name: "Use negative space", critic: "harper", skill: "composition" },
  { id: "symmetry", name: "Find symmetry", critic: "harper", skill: "composition" },
  { id: "patterns", name: "Look for patterns", critic: "harper", skill: "composition" },
  { id: "frame_in_frame", name: "Frame within a frame", critic: "harper", skill: "composition" },
  { id: "foreground_interest", name: "Add foreground interest", critic: "harper", skill: "composition" },
  { id: "depth_layers", name: "Create depth layers", critic: "harper", skill: "composition" },
  // Kai — Editing
  { id: "crop_it", name: "Crop with purpose", critic: "kai", skill: "editing" },
  { id: "natural_color", name: "Natural color", critic: "kai", skill: "editing" },
  { id: "light_touch_edits", name: "Light-touch edits", critic: "kai", skill: "editing" },
  { id: "recover_highlights", name: "Recover highlights", critic: "kai", skill: "editing" },
  { id: "lift_shadows", name: "Lift shadows", critic: "kai", skill: "editing" },
  { id: "try_bw", name: "Try black and white", critic: "kai", skill: "editing" },
  { id: "fix_perspective", name: "Fix perspective", critic: "kai", skill: "editing" },
  { id: "warmth_adjust", name: "Adjust warmth", critic: "kai", skill: "editing" },
  // Mom — Habits
  { id: "take_three", name: "Take three versions", critic: "mom", skill: null },
  { id: "daily_photo", name: "One photo a day", critic: "mom", skill: null },
  { id: "favorites_album", name: "Keep a favorites album", critic: "mom", skill: null },
  { id: "study_a_photo", name: "Study a photo you love", critic: "mom", skill: null },
  { id: "shoot_both", name: "Shoot both ways", critic: "mom", skill: null },
  { id: "wait_to_delete", name: "Wait before deleting", critic: "mom", skill: null },
  { id: "photo_story", name: "Tell a 3-photo story", critic: "mom", skill: null },
  { id: "share_and_ask", name: "Share and ask", critic: "mom", skill: null },
];
export const FUND_BY_ID = Object.fromEntries(FUNDAMENTALS.map((f) => [f.id, f]));
