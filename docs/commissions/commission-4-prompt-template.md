# Commission 4: Prompt Template

# Dream Structuring Prompt Template

## Instructions
Copy this entire prompt into ChatGPT after pasting your raw dream transcription. ChatGPT will organize it into the structure needed for the Add Entry form.

---

## The Prompt

I just had a dream. Here's my raw voice dump:

[PASTE YOUR TRANSCRIPTION HERE]

---

Please organize this dream into JSON format for the Dream Archive webapp. **Important**: Preserve the dream's natural logic—don't rationalize impossible elements, sudden transitions, or identity shifts. Dreams don't follow waking logic, and that's what makes them worth preserving.

**Output valid JSON with this exact structure:**

{
  "originalTranscription": "The original raw dream transcription text",
  "summary": "2-3 sentences capturing the emotional arc and main experience of the dream. Focus on the feeling and atmosphere, not literal events.",
  "keywords": ["keyword1", "keyword2", "keyword3", "etc"],
  "scenes": [
    "Scene 1: A specific location or situation with 2-3 sentences describing what happened. Preserve 'suddenly I was...' transitions, identity fluidity, and spatial contradictions.",
    "Scene 2: Another scene description...",
    "Scene 3+: Continue for 3-7 key moments"
  ],
  "fragments": ["disconnected flash or detail 1", "detail 2", "etc"]
}

**Requirements:**
- scenes: Array of strings, each describing a distinct scene (3-7 scenes)
- keywords: Array of 5-8 single-word or short-phrase tags (symbols, emotions, settings, characters)
- fragments: Array of disconnected details that don't fit in scenes (use empty array [] if none)
- summary: 2-3 sentences on emotional arc and atmosphere
- originalTranscription: The raw dream text you were given

**Example JSON:**
{
  "originalTranscription": "I was in my childhood kitchen but the walls were breathing. Water was rising from the floor tiles...",
  "summary": "A dream about returning to a familiar space that has become alien and unstable. The emotional core was a mix of nostalgia and dislocation, with a thread of loss running through the changing identities and disappearing spaces.",
  "keywords": ["water", "childhood home", "father", "transformation", "loss", "ocean", "disorientation", "identity"],
  "scenes": [
    "I was in my childhood kitchen, but the walls were breathing. Water was rising from the floor tiles, pooling around my ankles. Everything felt both familiar and completely wrong.",
    "My father appeared in the doorway, but he was the age I am now. He didn't recognize me. He asked if I'd seen his daughter.",
    "Suddenly I was outside. The house had become an island in the middle of an endless ocean. The sky was the wrong color—a deep purple I've never seen in waking life."
  ],
  "fragments": ["There was a red door that shouldn't have existed", "My dog was there for a moment, then wasn't", "Someone was calling my name but I couldn't tell from where", "The water tasted like salt even though it was coming from the floor"]
}

---

## Example Output Format

### Scene Breakdown
1. I was in my childhood kitchen, but the walls were breathing. Water was rising from the floor tiles, pooling around my ankles. Everything felt both familiar and completely wrong.

2. My father appeared in the doorway, but he was the age I am now. He didn't recognize me. He asked if I'd seen his daughter.

3. Suddenly I was outside. The house had become an island in the middle of an endless ocean. The sky was the wrong color—a deep purple I've never seen in waking life.

### Core Summary
A dream about returning to a familiar space that has become alien and unstable. The emotional core was a mix of nostalgia and dislocation, with a thread of loss running through the changing identities and disappearing spaces.

### Visual Moments
Scene 1: Childhood kitchen flooding with dark water, walls subtly distorting, warm dim light through windows, atmosphere of creeping wrongness

Scene 2: Middle-aged man in doorway backlit by strange light, expression of confusion and searching, dreamlike soft focus

Scene 3: Small house on tiny island surrounded by vast purple-sky ocean, impossible perspective, sense of isolation and awe

### Keywords
water, childhood home, father, transformation, loss, ocean, disorientation, identity

### Fragments
- There was a red door that shouldn't have existed
- My dog was there for a moment, then wasn't
- Someone was calling my name but I couldn't tell from where
- The water tasted like salt even though it was coming from the floor

---

## After ChatGPT Responds

Copy the JSON output directly into the "Paste Dream JSON from ChatGPT" field in the Add Entry form. The webapp will parse it and populate all the fields automatically.

Then upload images for each scene in the form.