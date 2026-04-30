# Graph Report - morpheus-dream-archive  (2026-04-29)

## Corpus Check
- 18 files · ~579,951 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2103 nodes · 6271 edges · 19 communities detected
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 141 edges (avg confidence: 0.8)
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
1. `aC()` - 50 edges
2. `jI()` - 48 edges
3. `e()` - 43 edges
4. `He()` - 42 edges
5. `uI()` - 34 edges
6. `Fc()` - 34 edges
7. `Qe` - 32 edges
8. `tn` - 30 edges
9. `Ua()` - 29 edges
10. `xA()` - 29 edges

## Surprising Connections (you probably didn't know these)
- `parse()` --calls--> `readJson()`  [INFERRED]
  docs/assets/index-DJW7RopM.js → scripts/migrate-to-firebase.mjs
- `h()` --calls--> `cS()`  [INFERRED]
  docs/workbox-3bcf8611.js → docs/assets/index-DJW7RopM.js
- `h()` --calls--> `O()`  [INFERRED]
  docs/workbox-3bcf8611.js → docs/assets/index-DJW7RopM.js
- `h()` --calls--> `_h()`  [INFERRED]
  docs/workbox-3bcf8611.js → docs/assets/index-DJW7RopM.js
- `h()` --calls--> `A1()`  [INFERRED]
  docs/workbox-3bcf8611.js → docs/assets/index-DJW7RopM.js

## Communities

### Community 0 - "Community 0"
Cohesion: 0.02
Nodes (214): __(), a0(), A1(), af(), ag(), aI(), ak(), Ax() (+206 more)

### Community 1 - "Community 1"
Cohesion: 0.02
Nodes (55): signOutUser(), aC(), am(), ap, Bd(), Cp(), cy, dC (+47 more)

### Community 2 - "Community 2"
Cohesion: 0.03
Nodes (67): b0(), b2(), by(), ca, ck(), d0(), d2(), ei() (+59 more)

### Community 3 - "Community 3"
Cohesion: 0.02
Nodes (32): A(), bf, dw(), e2, ea(), F_(), fw(), gA() (+24 more)

### Community 4 - "Community 4"
Cohesion: 0.02
Nodes (65): _2(), a2(), aa(), Ae(), bw(), c2(), color(), cw() (+57 more)

### Community 5 - "Community 5"
Cohesion: 0.02
Nodes (37): An, aw(), Ba(), bl(), bx(), cr(), Do(), DT() (+29 more)

### Community 6 - "Community 6"
Cohesion: 0.02
Nodes (24): al, check(), Cl(), cT(), Da(), DS(), ey(), fT() (+16 more)

### Community 7 - "Community 7"
Cohesion: 0.03
Nodes (41): Ce(), D_(), dx, fe(), fx, Fy(), _h(), ha (+33 more)

### Community 8 - "Community 8"
Cohesion: 0.03
Nodes (20): ah(), Cd(), dy, e(), Hy(), i1(), inorderTraversal(), l_() (+12 more)

### Community 9 - "Community 9"
Cohesion: 0.03
Nodes (19): eb(), ed(), fb(), fd(), i(), Ia(), j_(), lT() (+11 more)

### Community 10 - "Community 10"
Cohesion: 0.03
Nodes (44): deleteEntries(), _0(), As(), aT(), bg(), cI(), cS(), Dn (+36 more)

### Community 11 - "Community 11"
Cohesion: 0.04
Nodes (28): Ad(), bb(), bR(), cb, cn, db(), dd(), Dp() (+20 more)

### Community 12 - "Community 12"
Cohesion: 0.04
Nodes (15): App(), getUserInitials(), Header(), ProfileModal(), gd(), Gp(), H1(), ip (+7 more)

### Community 13 - "Community 13"
Cohesion: 0.05
Nodes (11): av(), be(), dI(), eS(), ie(), le(), m1(), parse() (+3 more)

### Community 14 - "Community 14"
Cohesion: 0.05
Nodes (11): ar(), Ex(), fn(), gn(), io(), Lx(), ox(), rr() (+3 more)

### Community 15 - "Community 15"
Cohesion: 0.05
Nodes (11): _1(), BS(), cx, hx, ky, px, Sh(), UC() (+3 more)

### Community 16 - "Community 16"
Cohesion: 0.06
Nodes (10): dg(), iy(), Jh(), l0(), pg(), Rl(), ry, sT() (+2 more)

### Community 17 - "Community 17"
Cohesion: 1.0
Nodes (2): a(), i()

### Community 18 - "Community 18"
Cohesion: 1.0
Nodes (2): GlassSurface(), useDarkMode()

## Knowledge Gaps
- **Thin community `Community 17`** (3 nodes): `sw.js`, `a()`, `i()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (3 nodes): `GlassSurface()`, `useDarkMode()`, `GlassSurface.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `aC()` connect `Community 1` to `Community 0`, `Community 2`, `Community 12`, `Community 13`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `un` connect `Community 5` to `Community 0`, `Community 2`, `Community 3`, `Community 4`, `Community 8`, `Community 9`, `Community 14`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `pr()` connect `Community 5` to `Community 0`, `Community 2`, `Community 3`, `Community 8`, `Community 10`, `Community 15`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.03 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._