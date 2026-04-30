# Graph Report - morpheus-dream-archive  (2026-04-29)

## Corpus Check
- 18 files · ~119,716 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2099 nodes · 6221 edges · 19 communities detected
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 156 edges (avg confidence: 0.8)
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

## God Nodes (most connected - your core abstractions)
1. `QI()` - 49 edges
2. `cC()` - 49 edges
3. `He()` - 45 edges
4. `Oa()` - 36 edges
5. `E()` - 35 edges
6. `Gc()` - 35 edges
7. `je()` - 34 edges
8. `ia()` - 33 edges
9. `zc()` - 32 edges
10. `O()` - 30 edges

## Surprising Connections (you probably didn't know these)
- `readJson()` --calls--> `parse()`  [INFERRED]
  scripts/migrate-to-firebase.mjs → docs/assets/index-L-PCsbuG.js
- `b()` --calls--> `T()`  [INFERRED]
  docs/assets/workbox-window.prod.es5-vqzQaGvo.js → docs/workbox-bcd059a4.js
- `e()` --calls--> `stringify()`  [INFERRED]
  docs/workbox-bcd059a4.js → docs/assets/index-L-PCsbuG.js
- `wx()` --calls--> `h()`  [INFERRED]
  docs/assets/index-L-PCsbuG.js → docs/workbox-bcd059a4.js
- `M1()` --calls--> `h()`  [INFERRED]
  docs/assets/index-L-PCsbuG.js → docs/workbox-bcd059a4.js

## Communities

### Community 0 - "Community 0"
Cohesion: 0.02
Nodes (231): __(), _0(), A1(), af(), ag(), Ai(), An, As() (+223 more)

### Community 1 - "Community 1"
Cohesion: 0.02
Nodes (73): deleteEntries(), A(), ac(), Ak(), aw(), bg(), bl(), bn (+65 more)

### Community 2 - "Community 2"
Cohesion: 0.02
Nodes (69): aa, ab(), Ae(), ah(), b1(), bf(), bs(), BT() (+61 more)

### Community 3 - "Community 3"
Cohesion: 0.02
Nodes (36): signOutUser(), Ba(), Bc(), cC(), Cd, cn, d1(), dl (+28 more)

### Community 4 - "Community 4"
Cohesion: 0.02
Nodes (26): _2, al, bk(), check(), FT(), Hl(), inorderTraversal(), isRed() (+18 more)

### Community 5 - "Community 5"
Cohesion: 0.02
Nodes (21): bd(), Bh(), ea(), ey(), Gx(), hf(), I1(), ke() (+13 more)

### Community 6 - "Community 6"
Cohesion: 0.02
Nodes (78): getProfileImagePath(), $1(), Am(), B_(), bi(), c(), Ce(), Cp() (+70 more)

### Community 7 - "Community 7"
Cohesion: 0.03
Nodes (32): Bb(), Bp(), C1(), Dt(), h1, Hp(), I_(), jy() (+24 more)

### Community 8 - "Community 8"
Cohesion: 0.03
Nodes (23): ar(), bR(), cg(), dS(), eR(), gn(), Gp(), Gr() (+15 more)

### Community 9 - "Community 9"
Cohesion: 0.04
Nodes (24): ck, co(), d0(), fg(), fn(), gg(), hk(), Ho() (+16 more)

### Community 10 - "Community 10"
Cohesion: 0.03
Nodes (23): Ad, ay(), ed(), fb, gd(), gk, Jc(), jf() (+15 more)

### Community 11 - "Community 11"
Cohesion: 0.05
Nodes (19): dr(), z_(), a(), b, e(), i, L, m (+11 more)

### Community 12 - "Community 12"
Cohesion: 0.04
Nodes (13): Cu(), gS(), hw(), ia(), jo(), Q0, rs(), se() (+5 more)

### Community 13 - "Community 13"
Cohesion: 0.06
Nodes (13): ap(), Be, Dp(), eT(), lh(), Lo(), Me, Nl (+5 more)

### Community 14 - "Community 14"
Cohesion: 0.11
Nodes (7): j1(), JI(), Lr(), n1, Tp(), yn(), ze()

### Community 15 - "Community 15"
Cohesion: 0.1
Nodes (4): App(), Avatar(), getUserInitials(), useAuth()

### Community 16 - "Community 16"
Cohesion: 0.26
Nodes (4): DI(), Kp(), r1(), tS()

### Community 17 - "Community 17"
Cohesion: 1.0
Nodes (2): n(), r()

### Community 18 - "Community 18"
Cohesion: 1.0
Nodes (2): GlassSurface(), useDarkMode()

## Knowledge Gaps
- **Thin community `Community 17`** (3 nodes): `sw.js`, `n()`, `r()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (3 nodes): `GlassSurface()`, `useDarkMode()`, `GlassSurface.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cC()` connect `Community 3` to `Community 0`, `Community 2`, `Community 6`, `Community 7`, `Community 9`, `Community 10`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Why does `Dn` connect `Community 1` to `Community 0`, `Community 4`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `Ss()` connect `Community 9` to `Community 0`, `Community 6`, `Community 7`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Are the 34 inferred relationships involving `E()` (e.g. with `.resolve()` and `rT()`) actually correct?**
  _`E()` has 34 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._