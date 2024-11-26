# Complexity

We discussed decidability problem in the last section to classify problems by whether they are solvable or not. However, in real world, we have **limited resources** to solve problems, therefore, we need to further classify decidable problems by the amount of resources (**Time & Space**) required to solve them. In this section, we will discuss the **complexity** of problems.

## Time Complexity

The running time of a Turing Machine $M$ is a function $f$:

$$
f:\mathbb{N}\rightarrow\mathbb{N}
$$

where $f(n)$ is the **maximum** number of steps that $M$ uses on **any** input of length $n$. The **time complexity** of $M$ is the function $f$.

> [!NOTE] Worst Case Analysis
> 
> In analysis of the amount of resources, we always consider the **worst case**. The reason is that the worst case is the most important case in practice. If we can solve the worst case, we can solve all other cases.

## Time Complexity Classes

### Big O Notation

In practice, the exact number of steps is usually complicated to calculate. Therefore, we use the **Big O Notation** to simplify the analysis. 

**Definition of Big O Notation** Given function $f:\mathbb{N}\rightarrow\mathbb{N}$, we say that $f(n)$ is $O(g(n))$ if there exist constants $c>0$ and $n_0>0$ such that $f(n)\leq c\cdot g(n)$ for all $n\geq n_0$.

**Example**
- $f(n)=3n^2+2n+1$ is $O(n^2)$.
- $f(n)=2^n+n^2$ is $O(2^n)$.
- $f(n)=n! + 3^n +n^2$ is $O(n!)$.
- $f(n)=\log n + 5$ is $O(\log n)$.

We can define time complexity classes based on Big O Notation. $\text{TIME}(t(n))$ is the set of languages that can be decided by a Turing Machine in $O(t(n))$ time.

### $\text{P}$

$\text{P}$ refers to the **Polynomial Time Class**. We have

$$
\text{P}=\bigcup_{k\in\mathbb{N}}\text{TIME}(n^k)
$$

$\text{P}$ is also the set of languages that can be decided by a **single-tape** deterministic Turing machine in polynomial time.

### $\text{NP}$

$\text{NP}$ refers to the **Nondeterministic Polynomial Time Class**. The definition of NTM has shown in [previous section](./Turing%20Machine.md#non-deterministic-turing-machine). We have

$$
\text{NP}=\bigcup_{k\in\mathbb{N}}\text{NTIME}(n^k)
$$

where 

$$
\text{NTIME}(t(n))=\{L\mid L\text{ is decided by a non-deterministic TM in }O(t(n))\text{ time}\}
$$

This means that $\text{NP}$ is the set of languages that can be decided by a **non-deterministic** Turing machine in polynomial time.

Since all deterministic TMs are also non-deterministic TMs, we have $\text{P}\subseteq\text{NP}$. But whether $\text{P}=\text{NP}$ is still an **open question** of [Millennium Prize Problems](https://en.wikipedia.org/wiki/Millennium_Prize_Problems).

$\text{NP}$ is not a model of real computation, but provides a theoretical framework that captures important features of many **exhaustive search problems**. Some examples of $\text{NP}$ problems are:

- [**Hamiltonian Path Problem**](https://en.wikipedia.org/wiki/Hamiltonian_path_problem) (We will show this later.)
- [**Traveling Salesman Problem**](https://en.wikipedia.org/wiki/Travelling_salesman_problem)
- [**Clique Problem**](https://en.wikipedia.org/wiki/Clique_problem)

#### Polynomial Time Verifier

We can also define $\text{NP}$ by **polynomial time verifier**. We will show this by using the example of **Hamiltonian Path Problem**.

> [!NOTE] Hamiltonian Path Problem
>
> Given a graph $G$, the Hamiltonian Path Problem is to determine whether there is a path that starts from one vertex $s$, passes through all other vertices exactly once, and ends at another vertex $t$. We can define the language $L_{\text{HAMPATH}}$ as
> 
> $$
> L_{\text{HAMPATH}}=\{\langle G, s, t\rangle\mid G\text{ has a Hamiltonian path from }s\text{ to }t\}
> $$

This problem is apparently $\text{NP}$, for an NTM would always find the valid path. With brute-force search, we can solve the Hamiltonian Path Problem in $O(n!)$ time. The expense of time is mainly due to the **searching stage**, not the **verification stage**. Actually, the time cost of verification is only $O(n)$, which is polynomial. This will lead to one feature of $\text{NP}$: **polynomial time verification**.

A **polynomial verifier** for a language $L$ is an algorithm $R$ such that for **any** string $w$ in $L$, there exists a string $c$ such that $R$ accepts $\langle w, c\rangle$. The verifier $R$ runs in **polynomial** time, and $c$ is called the **certificate**.

The verifier $R$ for $L_{\text{HAMPATH}}$ is:

$$
R(\langle \langle G, s, t\rangle, p\rangle)= \begin{cases} \begin{array}{ll}
1 & \text{if } p \text{ is a Hamiltonian path from } s \text{ to } t \text{ in } G\\
0 & \text{otherwise}
\end{array}
\end{cases}
$$

If we have a polynomial time verifier for a language $L$, then $L$ is in $\text{NP}$.

### $\text{EXP}$

$\text{EXP}$ refers to the **Exponential Time Class**. It is defined as

$$
\text{EXP}=\bigcup_{k\in\mathbb{N}}\text{TIME}(2^{n^k})
$$

Each NTM can be simulated by a deterministic TM in exponential time. For a tree of $n^k$-time NTM having at most $b$ branches at each level, we can simulate it in $O(b^{n^k})$ time, which is also $O(2^{n^k})$ time.