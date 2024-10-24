# Pushdown Automata (PDA)

The PDA is an automaton equivalent to the CFG in language-defining power. Only the nondeterministic PDA defines all the CFL's. But only the deterministic version models the parser (which is **implementable**).

## Definition of PDA

Think of an $\varepsilon$-NFA with a stack. The stack can be manipulated by the automaton. 

Based on NFA, the PDA can have a choice of next moves. In each choice, the PDA can do the following (can be combined):

- Change the state.
- Pop the top of the stack.
- Push a symbol or a sequence of symbols onto the stack.

More Formally, a PDA is a 7-tuple $(Q, \Sigma, \Gamma, \delta, q_0, Z_0, F)$ where:

- $Q$ is a finite set of states.
- $\Sigma$ is the input alphabet.
- $\Gamma$ is the stack alphabet.
- $\delta$ is the transition function.
- $q_0$ is the start state, $q_0 \in Q$.
- $Z_0$ is the initial stack symbol, $Z_0 \in \Gamma$.
- $F$ is the set of final states, $F \subseteq Q$.

::: danger The acceptance of a PDA

A PDA can accept a string only if it **empties the input string** and **reaches a final state**. The stack can be empty or not, but the input string must be empty.

:::

## Transition Function

The transition function $\delta$ takes in three arguments: the current state, the current input symbol, and the current stack top. The function returns a set of pairs, where each pair contains the next state and the new stack top. Formally, 
$$
\delta: Q \times (\Sigma \cup \{\varepsilon\}) \times \Gamma \to 2^{Q \times \Gamma^*}
$$

::: tip An Example

Consider the PDA that accepts the **renowned** language $\{0^n1^n | n \geq 0\}$. The PDA is defined as follows:

- $Q = \{q_0, q_1, q_2\}$.
- $\Sigma = \{0, 1\}$.
- $\Gamma = \{Z_0, X\}$.
- $q_0$ is the start state.
- $Z_0$ is the initial stack symbol.
- $F = \{q_2\}$.

The **transition function** can be as follows:

- $\delta(q_0, 0, Z_0) = \{(q_0, XZ_0)\}$. We need to retain the $Z_0$ so we write $XZ_0$.
- $\delta(q_0, 0, X) = \{(q_0, XX)\}$. Also, double the $X$. These two rules are for pushing $X$'s onto the stack while reading $0$'s from the input.
- $\delta(q_0, 1, X) = \{(q_1, \varepsilon)\}$.
- $\delta(q_1, 1, X) = \{(q_1, \varepsilon)\}$. Pop the $X$'s. These two rules are for popping $X$'s while reading $1$'s from the input.
- $\delta(q_1, \varepsilon, Z_0) = \{(q_2, Z_0)\}$. Accept the string when **both the stack and the input are empty**.

:::

## Instantaneous Description

The instantaneous description of a PDA is triple $(q, w, \gamma)$ where:

- $q$ is the current state.
- $w$ is the remaining input string.
- $\gamma$ is the stack content.

If we have a PDA $M$ and an instantaneous description $(q, w, \gamma)$, we have its snapshot. The transition function $\delta$ tells us **how to move from one snapshot to another**.

To say one $ID_i$ can become another $ID_j$, we write $ID_i \vdash ID_j$. We can deduce that, $(q, aw, X\alpha) \vdash (p, w, \beta\alpha)$ if $(p, \beta) \in \delta(q, a, X)$. If we have a **sequence** of transitions, we write $ID_i \vdash^* ID_j$, which can be defined by mathematical induction.

::: tip The Previous Example

Using the previous example, take the input $0011$, we can describe the transitions as follows:

- $(q_0, 0011, Z_0) \vdash (q_0, 011, XZ_0)$. We push $X$ onto the stack.
- $(q_0, 011, XZ_0) \vdash (q_0, 11, XXZ_0)$. We push another $X$.
- $(q_0, 11, XXZ_0) \vdash (q_1, 1, XZ_0)$. We pop the $X$'s.
- $(q_1, 1, XZ_0) \vdash (q_1, \varepsilon, Z_0)$. We pop the $X$'s.
- $(q_1, \varepsilon, Z_0) \vdash (q_2, \varepsilon, Z_0)$. We accept the string.

Thus, $(q_0, 0011, Z_0) \vdash^* (q_2, \varepsilon, Z_0)$.

If we use the input $00111$, the PDA will be stuck **at the point $(q_2, 1, Z_0)$** (**NOT** $(q_1, 1, Z_0)$, why? ), as there is neither transition for this case, nor the state be acceptable.
:::

**Theorem 1** Given a PDA $P$, if $(q,x,\alpha) \vdash^* (p,y, \beta)$, then for all the string $\omega$ in $\Sigma^*$, $(q,x\omega,\alpha\gamma) \vdash^* (p,y\omega, \beta\gamma)$. 

::: danger The trap of converse

**The converse of this theorem is not true.** The PDA can be stuck at some point for the stack content is not **monotonically** consumed.

:::

## The Language of a PDA

The common way to define the language is based on final state. If the PDA is denoted by $P$, then the language of $P$ is defined as $L(P) = \{w | (q_0, w, Z_0) \vdash^* (q, \varepsilon, \gamma), q \in F, \gamma\in\Gamma^*\}$.

Another way to define the language is by empty stack. If $P$ is a PDA, then the language of $P$ is defined as $N(P) = \{w | (q_0, w, Z_0) \vdash^* (q, \varepsilon, \varepsilon), q \in Q\}$.

$L(P)$ means that the PDA **must reach a final state to be accepted**, while $N(P)$ means that the PDA **must empty the stack**.

The two definitions are **equivalent**. If $P$ is a PDA, there must exist one PDA $P'$, such that $L(P) = N(P')$.

::: danger Do Not Confuse...

For one PDA $P$, $L(P)$ and $N(P)$ can definitely be **different**.

:::

## Deterministic PDA

The deterministic PDA is a PDA that has only one choice at each step. The transition function is defined as $\delta: Q \times \Sigma \times \Gamma \to Q \times \Gamma^*$. **NPDA is more powerful than DPDA**. (Thinking of $\omega \omega^R$.)

**Theorem 2** If $L$ is a regular language, then there exists a DPDA $P$ such that $L(P) = L$.

**Theorem 3** If $P$ is a DPDA, then we might not have $P'$ such that $L(P) = N(P')$.

Generally, we have the following hierarchy:
- RE $\subset$ DPDA(L(P)) $\subset$ NPDA
- DPDA(N(P)) $\subset$ DPDA(L(P))
- RE and DPDA(N(P)) are incomparable.

## Converting CFG to PDA

Given a CFG $G$, we can construct a PDA $P$ such that $N(P) = L(G)$. $P$ can be defined as follows:
- One state $q$.
- Input symbols = terminal symbols of $G$.
- Stack symbols = terminal symbols of $G$ $\cup$ nonterminal symbols of $G$, i.e., all the symbols of $G$.
- Start symbol = start symbol of $G$.

Intuitively, the snapshot of $P$ represents some left-sentential form at each step. If the stack of $P$ is $\alpha$, and $P$ has so far consumed $x$ from its input, then $P$ represents left-sendential form $x\alpha$. At empty stack, the consumed input is the language generated by $G$.

The transition function $\delta$ can be defined as follows:

- $\delta(q, a, a) = \{(q, \varepsilon)\}$ for all $a \in \Sigma$.
- $\delta(q, \varepsilon, A) = \{(q, \alpha) | A \to \alpha \in G\}$ for all $A \in V$.

Therefore, the PDA $P$ can accept the language generated by the CFG $G$.