# Graph Report - morpheus-dream-archive  (2026-04-29)

## Corpus Check
- 18 files · ~119,012 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2102 nodes · 6184 edges · 21 communities detected
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 95 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]

## God Nodes (most connected - your core abstractions)
1. `ac()` - 53 edges
2. `He()` - 49 edges
3. `zI()` - 45 edges
4. `e()` - 37 edges
5. `Gc()` - 36 edges
6. `r()` - 30 edges
7. `uI()` - 30 edges
8. `zc()` - 30 edges
9. `s()` - 29 edges
10. `tn` - 29 edges

## Surprising Connections (you probably didn't know these)
- `readJson()` --calls--> `parse()`  [INFERRED]
  scripts/migrate-to-firebase.mjs → docs/assets/index-e-GPUTWW.js
- `e()` --calls--> `stringify()`  [INFERRED]
  docs/workbox-bcd059a4.js → docs/assets/index-e-GPUTWW.js
- `dx()` --calls--> `h()`  [INFERRED]
  docs/assets/index-e-GPUTWW.js → docs/workbox-bcd059a4.js
- `R1()` --calls--> `h()`  [INFERRED]
  docs/assets/index-e-GPUTWW.js → docs/workbox-bcd059a4.js
- `R1()` --calls--> `f()`  [INFERRED]
  docs/assets/index-e-GPUTWW.js → docs/workbox-bcd059a4.js

## Communities

### Community 0 - "Community 0"
Cohesion: 0.01
Nodes (220): __(), a1(), ab, af(), ag(), aI(), Ak(), av() (+212 more)

### Community 1 - "Community 1"
Cohesion: 0.02
Nodes (31): Bg, bT(), ea(), F_(), ft, g2(), gk(), Go() (+23 more)

### Community 2 - "Community 2"
Cohesion: 0.02
Nodes (90): _0(), A(), aa(), Ae(), ah(), Ba(), bk(), bw() (+82 more)

### Community 3 - "Community 3"
Cohesion: 0.02
Nodes (39): signOutUser(), ac(), ap, Cd, cp, dc(), Dp(), En (+31 more)

### Community 4 - "Community 4"
Cohesion: 0.02
Nodes (33): deleteEntries(), Cl(), cT(), Dn, Do(), Ek(), eR(), et() (+25 more)

### Community 5 - "Community 5"
Cohesion: 0.03
Nodes (60): Ce(), D(), dk, e(), fk, fy, _h(), hb() (+52 more)

### Community 6 - "Community 6"
Cohesion: 0.03
Nodes (50): _2, a0(), As(), aT(), b2(), Bc(), bl(), C_() (+42 more)

### Community 7 - "Community 7"
Cohesion: 0.02
Nodes (22): bb(), bv(), cw(), dS(), Fr(), Fw, Gx(), Ih() (+14 more)

### Community 8 - "Community 8"
Cohesion: 0.04
Nodes (41): _1(), Am(), An, b1(), Bp(), bx(), Da(), dT() (+33 more)

### Community 9 - "Community 9"
Cohesion: 0.03
Nodes (26): ar(), aw(), bd(), bR(), C1(), cn, cr(), De() (+18 more)

### Community 10 - "Community 10"
Cohesion: 0.03
Nodes (17): Ay(), CC(), ck, el(), hk, hy, Jc(), ky (+9 more)

### Community 11 - "Community 11"
Cohesion: 0.04
Nodes (17): al, check(), dI(), eS(), Gs(), hC(), inorderTraversal(), isRed() (+9 more)

### Community 12 - "Community 12"
Cohesion: 0.06
Nodes (18): a(), b, d(), e(), i, L, m, n() (+10 more)

### Community 13 - "Community 13"
Cohesion: 0.05
Nodes (22): a2(), bn, d2, e1(), f1(), Hl(), ip, jf() (+14 more)

### Community 14 - "Community 14"
Cohesion: 0.1
Nodes (4): Ad, Be, Ia(), q0()

### Community 15 - "Community 15"
Cohesion: 0.11
Nodes (5): App(), getUserInitials(), Header(), ProfileModal(), useAuth()

### Community 16 - "Community 16"
Cohesion: 0.21
Nodes (2): h2, z2

### Community 17 - "Community 17"
Cohesion: 0.22
Nodes (2): JI(), K0()

### Community 18 - "Community 18"
Cohesion: 0.33
Nodes (6): downloadUrlFor(), getBucket(), migrate(), readJson(), readLocalEnv(), uploadSceneImage()

### Community 19 - "Community 19"
Cohesion: 1.0
Nodes (2): n(), r()

### Community 20 - "Community 20"
Cohesion: 1.0
Nodes (2): GlassSurface(), useDarkMode()

## Knowledge Gaps
- **Thin community `Community 16`** (12 nodes): `h2`, `.addEntry()`, `.assertNotApplied()`, `.constructor()`, `.getEntries()`, `.getEntry()`, `.getFieldMask()`, `z2`, `.constructor()`, `.Er()`, `.getAllFromCache()`, `.getFromCache()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (9 nodes): `JI()`, `.constructor()`, `.delete()`, `.get()`, `.has()`, `.isEmpty()`, `.set()`, `.size()`, `K0()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (3 nodes): `sw.js`, `n()`, `r()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (3 nodes): `GlassSurface()`, `useDarkMode()`, `GlassSurface.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ac()` connect `Community 3` to `Community 0`, `Community 1`, `Community 2`, `Community 4`, `Community 6`, `Community 7`, `Community 13`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Why does `cT()` connect `Community 4` to `Community 0`, `Community 1`, `Community 14`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `Wa()` connect `Community 7` to `Community 0`, `Community 8`, `Community 2`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.01 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._