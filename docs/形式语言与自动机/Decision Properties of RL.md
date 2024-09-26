# Decison Properties of Regular Languages

## Closure Properties

A closure property of a class of languages says that given languages in the class, the operation on the languages results in a language that is also in the class. For example, the class of regular languages is closed under union, concatenation, and Kleene star operations.

## Decision Properties

A decision property of a class of languages is a property that can be decided by an algorithm that tells whether or not some property holds. It is useful, for example, in designing protocols. We usually want to know whether the protocol is finite, or whether it is possible to reach a certain state.

### The Membership Problem

Our first problem is the membership problem. Given a regular language $L$ and a string $w$, we want to know if $w$ is in $L$. Assume $L$ is represented by a DFA $A$, we can simulate the action of $A$ on $w$.

### The Emptiness Problem

Given a regular language $L$, we want to know if $L$ is empty. We can construct a DFA $A$ for $L$ and check if there is a final state reachable from the start state.

### The Finiteness Problem

Given a regular language $L$, we want to know if $L$ is finite. We can construct a DFA $A$ for $L$. Then if $A$ has $n$ states, and the language $L$ is infinite if and only if there is a string $w$ such that $|w| \ge n$ and $w$ is accepted by $A$. Additionally, if there is no string $w$ accepted by $A$ where $|w| \le 2n$, then there is no other strings accepted by $A$.

## The Pumping Lemma

For every regular $L$, there exists an integer $n$, such that for every string $w$ in $L$ where $|w| \ge n$, we can write $w$ as $xyz$ such that:
- $|xy| \le n$
- $|y| >0$
- For all $i \ge 0$, $xy^iz \in L$

We can show that the number $n$ is the number of states in one of the DFAs that accepts $L$.

### Applications
We have claimed that $\{0^k1^k|k \ge 1\}$ is not a regular language. Now we can easily show this conclusion using the pumping lemma. 

**Proof** Suppose $\{0^k1^k|k \ge 1\}$ **is** a regular language. Then we can find the target integer $n$. Let $w = 0^n1^n$. According to the **pumping lemma**, as $|w| = 2n \ge n$, we can write $w = xyz$ such that $|xy| \le n$ and $|y| > 0$. Apparently, $x$ and $y$ can **only consist of $0$s**. Then we can pump $y$ to get $xy^2z$. However, $xy^2z$ is not in the language, for the number of $0$s is greater than the number of $1$s. This contradicts the pumping lemma. Therefore, $\{0^k1^k|k \ge 1\}$ is not a regular language. $\Box$

## Equivalence between Languages

Given two regular languages $L_1$ and $L_2$, our question is that whether $L_1 = L_2$. To solve this problem, we need to introduce a new concept: **Product DFA**.

:::tip Product DFA

Given two DFAs $A_1$ and $A_2$, if the symbol sets are the same, we can construct a new DFA $A$. 
- The states of $A$ are the pairs of states of $A_1$ and $A_2$ (Cartesian product). 
- The start state of $A$ is the pair of start states of $A_1$ and $A_2$. 
- The transition function of $A$ is defined as follows: for each pair of states $(q_1, q_2)$ and each input symbol $a$, the next state of $(q_1, q_2)$ on input $a$ is $(\delta_1(q_1, a), \delta_2(q_2, a))$. 
- The final states of $A$ are the pairs of final states of $A_1$ and $A_2$.
- The symbol set of $A$ is the same as the symbol set of $A_1$ and $A_2$.
:::

Then we can construct the product DFA $A$ for $L_1$ and $L_2$. We make the final states of $A$ to be those $[q,r]$s where $q$ is a state of $A_1$ and $r$ is a state of $A_2$ and **only** one of them is a final state of the corresponding DFA. Then we can check if the language of $A$ is empty. If it is empty, then $L_1 = L_2$.

Similarly, we can check if $L_1 \subseteq L_2$. We can make the final states of $A$ to be those $[q,r]$s where $q$ **is** a final state of $A_1$ and $r$ **is not** a final state of $A_2$. If the language of $A$ is empty, then $L_1 \subseteq L_2$. This way of thinking is the same as **proof by contradiction**.

## Minimization of Efficient State

Construct a table with all pairs of states. If you find a string that distinguishes two states, then these two states are not equivalent. We can use this idea to minimize the number of states in a DFA. 

The first step is to create a table that contains all unique pairs of states in the DFA. For an automaton with states $S = \{s_1, s_2, ..., s_n\}$, we list all pairs $(p, q)$ where $p$ and $q$ are distinct states, with $p \neq q$.

- **Basis**: If one state $p$ is final and the other $q$ is not, mark the pair $[p,q]$. It is easy to see that $[p,q]$ itself is distinguishable.
- **Induction**: For a string $a$, if we have marked a pair $[p,q]$, then mark every $[r,s]$ where $\delta(r, a) = p$ and $\delta(s, a) = q$.

Finally, we can merge all the unmarked pairs to get the minimized DFA. **It can be proved that the minimized DFA is the smallest DFA that accepts the same language.**