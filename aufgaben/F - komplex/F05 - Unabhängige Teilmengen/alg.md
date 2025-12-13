# Recursive algorithm to find a largest independent subset

Let $G$ be a finite graph.

(0) If $G$ has no vertex, return the empty subset.

(1) For all isolated vertices $v_1,v_2,\dotsc$ (i.e. $\deg(v_i)=0$), we have to include them. Compute a largest independent subset $T$ in the graph $G - \lbrace v_1,v_2,\dotsc \rbrace$ without these isolated vertices, and return $T +  \lbrace v_1,v_2,\dotsc \rbrace$.

(2) If there is a vertex $v$ of degree $1$, there is a largest independent subset containing $v$: If $T$ is a largest independent subset not containing $v$, then $T$ contains the neighbor $w$ of $v$ (otherwise, $T$ would not be maximal). Then $T - \lbrace w \rbrace$ is a largest independent subset of $G - \lbrace w \rbrace$, and $(T - \lbrace w \rbrace) \cup \lbrace v \rbrace$ is a largest independent subset of $G$.

So we will definitely return here a subset containing $v$. Specifically, we compute a largest independent subset $T$ of $G - \lbrace v \rbrace - N(v)$, where $N(v)$ is the set of neighbors of $v$, and return $T + \lbrace v \rbrace$.

(3) If there is a vertex $v$ of degree $\geq 3$, then it is not clear if we need to include $v$ or not. So we consider both cases:

(a) We do not include $v$ in our subset. Thus, compute a largest independent subset $S_1$ of $G - \lbrace v \rbrace$. This is still an independent subset of $G$.

(b) We include $v$ in our subset. Then, as in (2), we compute a largest independent subset $S'_2$ in $G - \lbrace v \rbrace - N(v)$, so that $S_2 = S'_2 + \lbrace v \rbrace$ is an independent subset of $G$.

If $S_2$ is larger than $S_1$, then return $S_2$. Otherwise, return $S_1$.

(4) Otherwise, all vertices have degree $2$. Then $G$ is a disjoint union of non-trivial cycles, which are the connected components of $G$. A largest independent subset of a cycle is given by taking every second element. A largest independent subset of $G$ is the union of these sets.
