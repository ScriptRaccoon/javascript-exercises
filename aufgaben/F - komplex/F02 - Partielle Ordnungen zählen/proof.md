**Lemma.** Let $X$ be a set. Let $p$ be an additional element. Then there is a bijection between the set of partial orders on $X + \lbrace p \rbrace$ and the triples $(\leq,A,B)$, where $\leq$ is a partial order on $X$ and $A,B \subseteq X$ are subsets with the following properties:

1. $A$ and $B$ are disjoint.
2. $A$ is an initial segment with respect to $\leq$: For $a \in A$ and $x \leq a$ we also have $x \in A$.
3. $B$ is a final segment with respect to $\leq$: For $b \in B$ and $b \leq x$ we also have $x \in B$.
4. For all $a \in A$ and $b \in B$ we have $a \leq b$.

**Proof.** Let $\leq'$ be a partial order on $X + \lbrace p \rbrace$. Let $\leq$ be its restriction to $X \times X$. Define $A := \lbrace x \in X : x \leq' p \rbrace$ and $B := \lbrace x \in X : p \leq' x \rbrace$. These clearly satisfy the properties listed above. Conversely, let a triple $(\leq,A,B)$ be given. Define $\leq'$ as follows: For $x,y \in X$, let $x \leq' y$ if and only if $x \leq y$. Let $p \leq' x$ if and only if $x \in B$. Let $x \leq' p$ if and only if $x \in A$. Finally, let $p \leq' p$. It is easy to check that $\leq'$ is transitive, reflexive, and antisymmetric. Moreover, these assignments are clearly inverses of each other. $\square$

**Corollary.** There is a recursive algorithm to enumerate all partial orders on $\lbrace 0,\dotsc,n-1 \rbrace$ for $n \geq 0$.

One must enumerate all partial orders on $\lbrace 0,\dotsc,n-2 \rbrace$, determine for each of these their pairs of subsets $A,B$ as above, and from each pair construct a partial order on $\lbrace 1,\dotsc,n-1 \rbrace$.
