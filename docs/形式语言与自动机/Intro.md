# Formal Languages and Automata (Intro)

## Why Formal Languages and Automata?

- A study of **abstract** models of computers and computation.
- Highly used in computer-related **career**. (e.g., $\mathrm{RegEx}$, network protocols, electronic circuits, etc. )

## How to do that?

- **Context-free grammars** are used to describe the syntax of essentially every programming language.
- **Automata theory** gives you the tools to developing solutions to real problems.

::: tip Limit of Computation

Software developing is often confronted with the problem of **complexity**. Formal languages and automata theory can help you to understand the **limits** of computation. Here are two important concepts:

- *Undecidable* things – no program whatever can do it.
- *Intractable* things – there are programs, but no fast programs.

:::

## Preliminaries

### Elementary Mathematical Knowledge

- **Basic set theory**: union, intersection, difference, complement, $\mathrm{DeMorgan's}$ Laws, subsets, set cardinality (the size of set), $\mathrm{Cartesian}$ product, power set (the set of all subsets), etc. (Refer to [Set Theory](../数理逻辑/集合.md) in **mathematical logic**.)
- **Relations**: reflexive, symmetric, transitive, equivalence relations, functions, partial orders, total order, linear order, etc. (Refer to [Relations](../数理逻辑/集合.md#关系与函数) in **mathematical logic**.)
- **Complexity**: $\mathrm{O}$ and $\Omega$ notations, etc.
- **Graph theory**: directed and undirected graphs, reachability, trees, etc.
- **proof techniques**: proof by induction, proof by contradiction, etc.

### Languages

A **language** is a set of **strings**. A **string** is a sequence of **symbols**. **Symbols** are defined over an **alphabet**. **Alphabet** is a set of symbols, often denoted by $\Sigma$. For example, $\Sigma = \{0, 1\}$ is the binary alphabet.

We have the following string operations:

- **Concatenation**: $w_1w_2$ is the concatenation of strings $w_1$ and $w_2$.
- **Power**: $w^n$ is the concatenation of $n$ copies of string $w$. E.g., $(abc)^3 = abcabcabc$.
- **Reversal**: $w^R$ is the reversal of string $w$. E.g., $(abc)^R = cba$.
- **Get Length**: $|w|$ is the length of string $w$. Obviously, we have
  $$|w_1w_2| = |w_1| + |w_2|$$

We need to define the **empty string** $\lambda (\varepsilon)$, which is the string with length 0. It shows up in many places in formal languages. Note that: 1. when we concate strings with empty string, we don't actually generate new string. 2. when we calculate the power of a string, we regard $w^0 = \lambda$.

Substring of a string is a subsequence of consecutive characters in that string. For example, "abc" is a substring of "abcde". From this definition, we can easily define the **prefix** and **suffix** of a string. For example, "ab" is a prefix of "abcde", and "de" is a suffix of "abcde".

::: tip Question

**Given the equation $011x=x011$, find $x$.**

**Solution:**
- If $x=\lambda$, then ok.
- If $|x|=1$, then no solution.
- If $|x|=2$, then no solution.
- If $|x|>3$, then $x=011y$. Hence, $011x=011y011$. So, $x=y011$. Therefore, $011y=y011$.
- $\Box$
:::

We have the following operations on Alphabets:

- **$*$-operation**: $\Sigma^*$ is the set of all strings over $\Sigma$, including the empty string $\lambda$.
- **$+$-operation**: $\Sigma^+$ is the set of all strings over $\Sigma$ except the empty string $\lambda$.

Language is a set of strings, is any subset of $\Sigma^*$.

We have the following operations on Languages:

- **Usual set operations**: union, intersection, difference, complement, etc.
- **Concatenation**: $L_1L_2 = \{w_1w_2 \mid w_1 \in L_1, w_2 \in L_2\}$. Like concatenation in symbols, we write $L^n$ to denote the concatenation of $n$ copies of $L$.
::: warning Note that...
Suppose that $L = \{a^n b^n|n>0 \}$,
then the $L^2$ is **NOT** $\{a^nb^na^nb^n|n>0 \}$, but $\{a^nb^na^mb^m|n,m>0 \}$.
:::
- **Star-Closure**: $L^* = \bigcup_{i=0}^{\infty}L^i$. It is the set of all strings that can be formed by concatenating zero or more strings from $L$, or may say, the "**dictionary**" of $L$.