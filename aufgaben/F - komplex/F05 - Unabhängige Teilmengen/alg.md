# Recursive algorithm to find a largest independent subset

Let $G$ be a finite graph.

(0) If $G$ has no vertex, return the empty subset.

(1) For all isolated vertices $v_1,v_2,\dotsc$ (i.e. $\deg(v_i)=0$), we have to include them. Compute a largest independent subset $T$ in the graph $G - \{v_1,v_2,\dotsc\}$ without these isolated vertices, and return $T +  \{v_1,v_2,\dotsc\}$.

(2) If there is a vertex $v$ of degree $1$, there is a largest independent subset containing $v$: If $T$ is a largest independent subset not containing $v$, then $T$ contains some neighbor of $v$ (otherwise, $T$ would not be maximal), say $w$. Then $T - \{w\}$ is a largest independent subset of $G - \{w\}$, and $(T - \{w\}) \cup \{v\}$ is a largest independent subset of $G$.

So we will definitely return here a subset containing $v$. Specifically, we compute a largest independent subset $T$ of $G - \{v\} - N(v)$, where $N(v)$ is the set of neighbors of $v$, and return $T + \{v\}$.

(3) If there is a vertex $v$ of degree $\geq 3$, then it is not clear if we need to include $v$ or not. So we consider both cases:

(a) We do not include $v$ in our subset. Thus, compute a largest independent subset $S_1$ of $G - \{v\}$. This is still an independent subset of $G$.

(b) We include $v$ in our subset. Then, as in (2), we compute a largest independent subset $S'_2$ in $G - \{v\} - N(v)$, so that $S_2 = S'_2 + \{v\}$ is an independent subset of $G$.

If $S_2$ is larger than $S_1$, then return $S_2$. Otherwise, return $S_1$.

(4) Otherwise, all vertices have degree $2$. Then $G$ is a disjoint union of non-trivial cycles, which are the connected components of the graph. A largest independent subset of a cycle is given by taking every second element. A largest independent subset of $G$ is the union of these sets.
