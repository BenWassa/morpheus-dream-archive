# Dream Structuring Prompt

## Instructions

Copy this entire prompt into ChatGPT after pasting your raw dream transcription. ChatGPT will organize it into the structure needed for the Add Entry form.

---

## The Prompt

I just had a dream. Here's my raw voice dump:

[PASTE YOUR TRANSCRIPTION HERE]

---

Please organize this dream into JSON format for the Dream Archive webapp. Important: preserve the dream's natural logic. Do not rationalize impossible elements, sudden transitions, or identity shifts.

Output valid JSON with this exact structure:

```json
{
  "originalTranscription": "The original raw dream transcription text",
  "summary": "2-3 sentences capturing the emotional arc and main experience of the dream. Focus on the feeling and atmosphere, not literal events.",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "scenes": [
    "Scene 1: A specific location or situation with 2-3 sentences describing what happened.",
    "Scene 2: Another scene description",
    "Scene 3+: Continue for 3-7 key moments"
  ],
  "fragments": ["disconnected flash or detail 1", "detail 2"]
}
```

Requirements:

- scenes: array of strings, each describing a distinct scene (3-7 scenes)
- keywords: array of 5-8 single-word or short-phrase tags (symbols, emotions, settings, characters)
- fragments: array of disconnected details that do not fit in scenes (use empty array [] if none)
- summary: 2-3 sentences on emotional arc and atmosphere
- originalTranscription: the raw dream text you were given

Example JSON:

```json
{
  "originalTranscription": "I was in my childhood kitchen but the walls were breathing. Water was rising from the floor tiles...",
  "summary": "A dream about returning to a familiar space that has become alien and unstable. The emotional core was a mix of nostalgia and dislocation, with a thread of loss running through the changing identities and disappearing spaces.",
  "keywords": ["water", "childhood home", "father", "transformation", "loss", "ocean", "disorientation", "identity"],
  "scenes": [
    "I was in my childhood kitchen, but the walls were breathing. Water was rising from the floor tiles, pooling around my ankles. Everything felt both familiar and completely wrong.",
    "My father appeared in the doorway, but he was the age I am now. He did not recognize me. He asked if I had seen his daughter.",
    "Suddenly I was outside. The house had become an island in the middle of an endless ocean. The sky was the wrong color, a deep purple I have never seen in waking life."
  ],
  "fragments": [
    "There was a red door that should not have existed",
    "My dog was there for a moment, then was not",
    "Someone was calling my name but I could not tell from where",
    "The water tasted like salt even though it was coming from the floor"
  ]
}
```

After ChatGPT responds, copy the JSON output directly into the "Paste Dream JSON from ChatGPT" field in the Add Entry form. The webapp will parse it and populate all the fields automatically. Then upload images for each scene in the form.
