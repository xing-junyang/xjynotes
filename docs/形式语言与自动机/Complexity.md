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

Since all deterministic TMs are also non-deterministic TMs, we have $\text{P}\subseteq\text{NP}$. But whether $\text{P}=\text{NP}$ is still an **open question** of [Millennium Prize Problems](https://en.wikipedia.org/wiki/Millennium_Prize_Problems).

> [!NOTE] Poly-time Verifier
> 
> 
>

### $\text{EXP}$

$\text{EXP}$ refers to the **Exponential Time Class**. It is defined as

$$
\text{EXP}=\bigcup_{k\in\mathbb{N}}\text{TIME}(2^{n^k})
$$

Each NTM can be simulated by a deterministic TM in exponential time. For a tree of $n^k$-time NTM having at most $b$ branches at each level, we can simulate it in $O(b^{n^k})$ time, which is also $O(2^{n^k})$ time.