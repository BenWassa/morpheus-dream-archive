# Graph Report - morpheus-dream-archive  (2026-04-29)

## Corpus Check
- 18 files · ~118,578 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2085 nodes · 6185 edges · 20 communities detected
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 99 edges (avg confidence: 0.8)
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

## God Nodes (most connected - your core abstractions)
1. `aC()` - 50 edges
2. `jI()` - 48 edges
3. `e()` - 43 edges
4. `He()` - 42 edges
5. `Fc()` - 34 edges
6. `uI()` - 33 edges
7. `Qe` - 32 edges
8. `tn` - 30 edges
9. `r()` - 29 edges
10. `Ua()` - 29 edges

## Surprising Connections (you probably didn't know these)
- `parse()` --calls--> `readJson()`  [INFERRED]
  docs/assets/index-DJW7RopM.js → scripts/migrate-to-firebase.mjs
- `e()` --calls--> `stringify()`  [INFERRED]
  docs/workbox-bcd059a4.js → docs/assets/index-DJW7RopM.js
- `i()` --calls--> `f()`  [INFERRED]
  docs/assets/index-DJW7RopM.js → docs/workbox-bcd059a4.js
- `A1()` --calls--> `f()`  [INFERRED]
  docs/assets/index-DJW7RopM.js → docs/workbox-bcd059a4.js
- `O()` --calls--> `d()`  [INFERRED]
  docs/assets/index-DJW7RopM.js → docs/workbox-bcd059a4.js

## Communities

### Community 0 - "Community 0"
Cohesion: 0.01
Nodes (260): __(), _0(), a0(), af(), ag(), ah(), aI(), ak() (+252 more)

### Community 1 - "Community 1"
Cohesion: 0.02
Nodes (80): a2(), aa(), Ae(), aw(), Ax(), b2(), Bp(), bw() (+72 more)

### Community 2 - "Community 2"
Cohesion: 0.02
Nodes (29): bf, dw(), e2, ea(), Fa(), fT(), gA(), gy() (+21 more)

### Community 3 - "Community 3"
Cohesion: 0.02
Nodes (57): _2(), am(), An, ap, bn(), Cp(), cw(), cy (+49 more)

### Community 4 - "Community 4"
Cohesion: 0.02
Nodes (38): signOutUser(), aC(), Bd(), dC, De(), En, Eu(), G1() (+30 more)

### Community 5 - "Community 5"
Cohesion: 0.02
Nodes (23): eb(), ed(), fb(), Gf(), Ic(), iy(), j_(), kf() (+15 more)

### Community 6 - "Community 6"
Cohesion: 0.03
Nodes (52): A1(), As(), bg(), Ce(), cS(), D_(), d0(), dx (+44 more)

### Community 7 - "Community 7"
Cohesion: 0.02
Nodes (22): deleteEntries(), Ba(), bl(), Dn, Do(), DT(), et(), ew() (+14 more)

### Community 8 - "Community 8"
Cohesion: 0.03
Nodes (18): al, check(), Cl(), cT(), Ex(), ey(), fd(), Gc() (+10 more)

### Community 9 - "Community 9"
Cohesion: 0.04
Nodes (12): Cd(), dl, inorderTraversal(), LC(), pf(), Qe, qo(), reverseTraversal() (+4 more)

### Community 10 - "Community 10"
Cohesion: 0.04
Nodes (18): Ad(), dy, ek(), I2(), nc(), ni(), nk, ny() (+10 more)

### Community 11 - "Community 11"
Cohesion: 0.06
Nodes (18): a(), b, d(), e(), i, L, m, n() (+10 more)

### Community 12 - "Community 12"
Cohesion: 0.04
Nodes (14): _1(), be(), BS(), cx, dI(), eS(), ge, hx (+6 more)

### Community 13 - "Community 13"
Cohesion: 0.05
Nodes (18): A(), aT(), color(), ib, kE(), key(), le(), left() (+10 more)

### Community 14 - "Community 14"
Cohesion: 0.05
Nodes (11): cn, cr(), dd(), jS(), oc(), pr(), Qr(), sc (+3 more)

### Community 15 - "Community 15"
Cohesion: 0.06
Nodes (10): ar(), fn(), gn(), io(), Lx(), o1(), ox(), rr() (+2 more)

### Community 16 - "Community 16"
Cohesion: 0.06
Nodes (10): gx(), jx, Md(), oh(), ow(), pE(), RT(), Ur() (+2 more)

### Community 17 - "Community 17"
Cohesion: 0.11
Nodes (5): App(), getUserInitials(), Header(), ProfileModal(), useAuth()

### Community 18 - "Community 18"
Cohesion: 1.0
Nodes (2): n(), r()

### Community 19 - "Community 19"
Cohesion: 1.0
Nodes (2): GlassSurface(), useDarkMode()

## Knowledge Gaps
- **Thin community `Community 18`** (3 nodes): `sw.js`, `n()`, `r()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (3 nodes): `GlassSurface()`, `useDarkMode()`, `GlassSurface.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cT()` connect `Community 8` to `Community 0`, `Community 1`, `Community 2`, `Community 9`, `Community 14`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `Ua()` connect `Community 2` to `Community 0`, `Community 1`, `Community 4`, `Community 5`, `Community 6`, `Community 7`, `Community 8`, `Community 11`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `fb()` connect `Community 5` to `Community 0`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.01 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._