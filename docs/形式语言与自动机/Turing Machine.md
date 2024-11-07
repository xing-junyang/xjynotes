# Turing Machine

The purpose of the theory of Turing machines is to prove that whether a certain specific language have algorithmic solution or not. We will introduce the concept of Turing machines and their properties.

## Definition of Turing Machine

We first have a look at the picture of a Turing machine.

<div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
  <img src='/image/Screen Shot 2024-11-07 at 2.37.48 PM.png' alt="" style="width:65%;"></img>
  <p style="font-size: 12px; color: gray;">A Turing Machine</p>
</div>

We have **a tape** and **a head** that can move left or right on the tape. The tape, which is divided into cells, is infinite in both directions. The head itself has a finite number of states, which can change based on the current state and the symbol it reads on the tape. The head can also write symbols on the tape based on its state.

A Turing machine can be formally defined as a 7-tuple $(Q, \Sigma, \Gamma, \delta, q_0, q_{\text{accept}}, q_{\text{reject}})$:

- $Q$ is a finite set of states.
- $\Sigma$ is the input alphabet, which does not contain the blank symbol $\sqcup$.
- $\Gamma$ is the tape alphabet, which contains $\Sigma$ and the blank symbol $\sqcup$.
- $\delta: Q \times \Gamma \to Q \times \Gamma \times \{L, R, H\}$ is the transition function.
- $q_0 \in Q$ is the start state.
- $q_{\text{accept}} \in Q$ is the accept state.
- $q_{\text{reject}} \in Q$ is the reject state.

::: warning Why Turing Machine?

Why not we just use C program or Python program? The answer is that you can, but it is easier to prove things with Turing machines. The Turing machine is a theoretical model of computation, which is simple and powerful. What's more, it is **equivalent** to any other model of computation and its memory is free of charge!

::: 

### Transition Function

The transition function $\delta$ is defined as $\delta: Q \times \Gamma \to Q \times \Gamma \times \{L, R, H\}$. It means that the Turing machine can change its state, write a symbol on the tape, and move the head to **left**($L$) cell or **right**($R$) cell. The head can also **hold still**($H$).

For example, if the Turing machine is in state $q$ and reads symbol $a$ on the tape, then it can change to state $q'$, write symbol $b$ on the tape, and move the head to the right cell. The transition can be denoted as $\delta(q, a) = (q', b, R)$.

### Instantaneous Description

We can also take a photo of the Turing machine at a certain moment, which is called the **instantaneous description**. It is denoted as $uqv$, where $u$ is the left part of the tape, $v$ is the right part of the tape, and $q$ is the current state. The head is pointing to the first symbol of $v$. The actual tape is $uv$, with infinite $\sqcup$ on both sides.

Then we can have the following transition:

- If $\delta(q, X) = (q', Y, R)$, then $\alpha qX \beta \vdash \alpha Yq' \beta$.
- If $\delta(q, X) = (q', Y, L)$, then $\alpha ZqX \beta \vdash \alpha q'ZY \beta$. (Of course, $qX \beta \vdash  q'\sqcup Y \beta$)

We can also define $\vdash^*$ as multiple transitions in a row.

## Language of a Turing Machine

A Turing machine $M$ can **accept a language by final state**, which is denoted as $L(M) = \{w \mid q_0 w \vdash^* \alpha q_{\text{accept}} \beta\}$. Or, it can **accept a language by halting**, which is denoted as $H(M) = \{w \mid q_0 w \vdash^* I\}$, where $I$ is an instantaneous description that cannot be further transitioned.

::: tip Do we have to eat the whole string?

We don't need to consume the whole input string in a Turing machine to accept it. The Turing machine can accept the string by halting or reaching final state at any moment. This is different from the PDA, which must consume the whole string to accept it.

:::

::: tip Equivalence of Acceptance

We can prove that each $L(M)$ has a corresponding $H(M')$.

**Proof** 

( *From $L(M)$ to $H(M')$* ) For each final state of $M$, remove any moves, then the result $M'$ must halt at that point. On the other hand, we have to prevent $M'$ from accidentally halting at other points. We can add a new state $q_{\text{inf}}$ to make any turing machine that reaches $q_{\text{inf}}$ to loop endlessly (e.g., adding a transition function $\delta(q_{\text{inf}}, X) = (q_{\text{inf}}, X, R)$ for any $X$). If a non-accepting state reaches no state, then we add one transition to $q_{\text{inf}}$.

( *From $H(M)$ to $L(M')$* ) We introduce a new state $f$, the only accepting state in $M'$. $f$ has no transitions. If $\delta(q, X)$ is undefined for any $q$ and $X$, then we add a transition $\delta(q, X) = (f, X, R)$.

:::

## Recursive and Recursively Enumerable Languages

The Turing machine can accept languages in two ways: by final state or by halting. And we now know the two language are equivalent. Thus, we define this set of languages as **recursively enumerable languages**. This term has a long history and don't be confused by the name. Almost all languages we can think of are recursively enumerable.

## Turing Machine Programming

We know that recursively enumerable languages are powerful, so is the Turing machine. Generally, unlike former DFA or PDA, Turing machine is **not used to recognize languages**, but to **compute functions**, which is related to **programming**.

Let's have a look at the following example:

**Example 1** Construct a Turing Machine to recognize the language $L = \{a^nb^n \mid n \geq 0\}$.

**Solution 1** We can construct a Turing machine as follows:

<div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
  <img src='/image/Screen Shot 2024-11-07 at 3.53.43 PM.png' alt="" style="width:65%;"></img>
  <p style="font-size: 12px; color: gray;">The graph of solution 1</p>
</div>

The transitions are shown on the graph above. Note that the sign $a/b,~R$ on each transition means that the machine reads $a$ and writes $b$ on the tape, then moves the head to the right cell.  

**Example 2** Construct a Turing Machine to shift each input symbol one cell to the right, while the leftmost symbol is replaced by $\sqcup$.

**Solution 2** We can construct a Turing machine as follows:

<div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
  <img src='/image/Screen Shot 2024-11-07 at 4.32.20 PM.png' alt="" style="width:65%;"></img>
  <p style="font-size: 12px; color: gray;">The graph of solution 2</p>
</div>

**Example 3** Construct a Turing Machine to shift its words cyclically to the right.

**Solution 3** We can construct a Turing machine as follows:

<div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
  <img src='/image/Screen Shot 2024-11-07 at 4.38.01 PM.png' alt="" style="width:65%;"></img>
  <p style="font-size: 12px; color: gray;">The graph of solution 2</p>
</div>

Note that the upper-left corner of the graph is the same as the graph in solution 2, and the lower-right corner is to write the last symbol to the first cell. We can perceive this idea of constructing turing machine as **structured programming**.

**Example 4 (Decider)** Let $L = \{b a^i b\mid i\ge 0\}$, construct a Turing Machine to **decide** $L$. You have to give the result on the tape in order to **decide**.

**Solution 4** Trivially, we can construct a Turing machine without decider as follows:

<div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
  <img src='/image/Screen Shot 2024-11-07 at 4.47.09 PM.png' alt="" style="width:65%;"></img>
  <p style="font-size: 12px; color: gray;">A prototype of solution 4</p>
</div>

Then, we can add a decider to the Turing machine as shown below:

<div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
  <img src='/image/Screen Shot 2024-11-07 at 4.49.55 PM.png' alt="" style="width:65%;"></img>
  <p style="font-size: 12px; color: gray;">The graph of solution 4</p>
</div>

The decider makes its way to the leftmost cell, modifying all the cells to blank symbols along the way, then subsequently writes $y$ or $n$ on the tape to decide whether the input string is in the language.