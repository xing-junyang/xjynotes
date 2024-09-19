# Finite Automata

## Introduction: What is a Finite Automaton?

Finite automaton is a **formal system** that remembers only a finite amount of information. A finite automaton has the following components:
- Information is stored in the form of **states**.
- States changes in response to **inputs**.
- Rules that tell how the states change in response to inputs are called **transitions**.

Finite automata are widely used for both **design and verification of circuits and communication protocols**. It is also used in **lexical analysis** of programming languages, **parsing** of programming languages, and **pattern matching**, which makes it a very important component of **compilers**.

::: tip A brief example: Tennis

Basic rules of tennis in a **Game**:
- One player serves the ball throughout the game.
- To win a game, a player must win at least four points and be ahead by at least two points.

We can model the game of tennis as a finite automaton. The input to the automaton is the sequence of points won by the two players, we name the input alphabet as $\{s, o\}$ representing the points won by the server and the opponent respectively. 

<div style="display: flex; align-items: center; justify-content: center; flex-direction: column; margin: 30px 30px 0px 30px">
<img src='/image/Screen Shot 2024-09-12 at 2.39.22 PM.png' alt="" style="width:80%;"></img>
<p style="font-size: 12px; color: gray;">Finite Automaton for Tennis Game</p>
</div>
:::

## Acceptance of Inputs

Given a sequence of inputs, a finite automaton can either **accept** or **reject** the input. The automaton first start in the start state and follows the transitions based on the input sequence. If the automaton reaches one of the **accepting states** after processing the input, then the input is accepted. Otherwise, the input is rejected.

The set of all inputs that are accepted by the automaton $A$ is called the **language** of the automaton, which is denoted by $L(A)$.

## Deterministic Finite Automaton (DFA)

**Preliminary Knowledge**: Alphabet, String, Language, Star-Closure, Concatenation, etc.

**DFA** is a formalism for defining languages, which is consists of the following components:
- A finite set of states $Q$.
- A finite set of input alphabet $\Sigma$.
- A transition function $\delta: Q \times \Sigma \rightarrow Q$.
- A start state $q_0 \in Q$.
- A set of accepting states (final States) $F \subseteq Q$.

Therefore, a DFA can be defined as a 5-tuple $M = \left \langle Q, \Sigma, \delta, q_0, F \right \rangle$.

### Transition Function

A total function on $Q\times E\to Q$. Let $q\in Q$ be a state and $a \in \sigma$ an alphabet, then $\delta(q, a) = p$ means if the automaton is in state $q$ and reads input $a$, then it will move to state $p$. 

Due to the total function, if there is no transition defined for a state and an input, then the automaton will get stuck and reject the input, also known as dropping into a **dead state**. Once the automaton reaches a dead state, it will never be able to reach an accepting state.

### Graphical and Transition Table Representation

DFA can be represented as a directed graph, where the states are represented as nodes and the transitions are represented as edges. The start state is denoted by an incoming arrow and the accepting states are denoted by double circles.

::: warning A... Final state?

Final state can also have transitions to some other states. That is, there can be outgoing edges from the final state. So, how to determine if a string is accepted by the DFA? 

The string is accepted by the DFA **if and only if** the automaton reaches an accepting state **and** the input is **completely** processed.

:::

Examples of Graphical Representation of DFA:

<div style="display: flex; align-items: center; justify-content: center; flex-direction: row">
<div style="width:45%;">
<img src='/image/image.png' alt="" style="width:100%; height: 20%;"></img>
<p style="font-size: 12px; color: gray;">Recognizing String Ending in 'ing'</p>
</div>
<div style="width:55%;">
<img src='/image/image-1.png' alt="" style="width:100%; height: 20%;"></img>
<p style="font-size: 12px; color: gray;">Protocol of Sending Data</p>
</div>
</div>

DFA can also be represented as a transition table, where the rows represent the **states** and the columns represent the **input alphabet**. The transition function is represented as the value in the cell corresponding to the state and input alphabet.

## Extended Transition Function

We describe the effect of a string of inputs on a DFA by extending $\delta$ to **a state and the string**. It is called  **extended transition function**  $\delta^*: Q \times \Sigma^* \rightarrow Q$.

By using the extended transition function, we can describe the 
induction on the length of the string:
- **Basis**: $\delta^*(q, \epsilon) = q$ for all $q \in Q$.
- **Induction**: $\delta^*(q, xa) = \delta(\delta^*(q, x), a)$ for all $q \in Q$, $x \in \Sigma^*$, and $a \in \Sigma$.

## Language of a DFA

The language of a DFA $A$ can be formally defined by using the extended transition function as follows:

$$
L(A) = \{w \in \Sigma^* | \delta^*(q_0, w) \in F\}
$$

### Proof of Language Equivalence

Two DFAs are said to be **equivalent** if they accept the same language. The usual way to prove the equivalence of two DFAs is to show that their languages are the subset of each other. In order to do that, we often use **mathematical induction** on the length of the string.

For example, we can prove that the DFA with the language $\{w \in \{0,1\}^*|~w~\mathrm{doesn't~have~two~consecutive~1's}\}$ is equivalent to the DFA with representation as follows:

<div style="display: flex; align-items: center; justify-content: center; flex-direction: column; margin: 10px">
<img src='/image/image-2.png' alt="" style="width:50%;"></img>
<p style="font-size: 12px; color: gray;">Another DFA's Graphical Representation</p>
</div>

## Regular Languages

A language $L$ is said to be **regular** if it is accepted by a DFA. The DFA **must** accept **only** the strings in $L$, no others. 

**Some languages are not regular.** For example, the language $\{0^n1^n|n \geq 0\}$ is not regular.
(Use contradiction and $\mathrm{PHP}$ to prove it.) The finiteness of states in a DFA is the reason why some languages are not regular.

Let us look at some examples of regular languages:

- The language $\{0, 1\}^*$, which accepts all strings of 0's and 1's.
- $\{w \in \{0,1\}^*| w, \mathrm{viewed~as~a~binary~number,~is~divisible~by~23}\}$.

::: tip Example: A regular Language

Let us consider the language of binary strings that are divisible by $23$, which is described by the following regular expression:
$$\{w \in \{0,1\}^*| w, \mathrm{viewed~as~a~binary~number,~is~divisible~by~23}\}$$

We are going to construct a DFA that recognizes this language. The DFA will have $23$ states, one for each possible remainder when a binary number is divided by $23$. The states will be named $q_0, q_1, q_2, \ldots, q_{22}$, where $q_i$ is the state corresponding to the remainder $i$.

The start state will be $q_0$, since the empty string corresponds to the number $0$, which is divisible by $23$. The accepting state will also be $q_0$. The transitions will be determined by the binary digits of the input string. For example, if the current state is $q_i$ and the next digit is $0$, the next state will be $q_{2i 
~\mathrm{mod}~23 }$. If the next digit is $1$, the next state will be $q_{2i+1 
~\mathrm{mod}~23}$. 

Since we can construct a DFA that recognizes this language, the language is **regular**. This example demonstrates that not all regular languages are simple or easy to describe, but they can still be recognized by a DFA.

:::

## Nondeterministic Finite Automata (NFA)

A **nondeterministic finite automaton (NFA)** is a finite automaton that can be in **several states at once**. The NFA can have **multiple** transitions from a state on the same input symbol. The NFA accepts a string if there is **at least** one path that leads to an accepting state.

Just as DFAs, NFAs can be described by a [5-tuple](#deterministic-finite-automaton-dfa) $(Q, \Sigma, \delta, q_0, F)$. The only difference is that the transition function $\delta$ is defined as $\delta: Q \times \Sigma \rightarrow 2^Q$, where $2^Q$ is the power set of $Q$. In other words, $\delta(q,a)$ is a set of states.

Apperently, the extended transition function $\delta^*$ is also different from that of DFAs. 

### Extended Transition Function

The extended transition function $\delta^*: Q \times \Sigma^* \rightarrow 2^Q$ is defined as follows:

- **Basis**: $\delta^*(q, \epsilon) = \{q\}$ for all $q \in Q$.
- **Induction**: $\delta^*(q, xa) = \bigcup_{p \in \delta^*(q, x)} \delta(p, a)$ for all $q \in Q$, $x \in \Sigma^*$, and $a \in \Sigma$.

Therefore, we can say the string $w$ is **accepted** by an NFA $A$ iff $\delta^*(q_0, w) \cap F \neq \emptyset$.

### NFA with $\varepsilon$-transitions

An NFA can also have $\varepsilon$-transitions, which are transitions that can be taken without consuming any input. This kind of NFA is called $\varepsilon-\mathrm{NFA}$. The $\varepsilon$-transitions are represented by $\varepsilon$ in the transition function $\delta$.

<div style="display: flex; align-items: center; justify-content: center; flex-direction: column; margin: 0px">
<img src='/image/NFAexample.svg' alt="" style="width:50%; padding-top:20px;"></img>
<p style="font-size: 12px; color: gray;">An example of epsilon-transitions</p>
</div>

Next, we will introduce the concept of $\varepsilon-closure$. $\varepsilon-closure(q)$ is the set of states that can be reached from state $q$ by taking only $\varepsilon$-transitions.

If we include $\varepsilon$-transitions in the transition function, the extended transition function would have a slightly different definition:

- **basis**: $\delta^*(q, \epsilon) = \{q\} \cup \varepsilon-closure(q)$ for all $q \in Q$.
- **Induction**: $\delta^*(q, xa) = \bigcup_{p \in \delta^*(q, x)} \left ( \delta(p, a) \cup \delta^*(\varepsilon-closure(p), a) \right )$ for all $q \in Q$, $x \in \Sigma^*$, and $a \in \Sigma$.

## Equivalence of NFAs and DFAs

**A DFA can be converted to an NFA that accepts the same language and vice versa.** $\varepsilon-\mathrm{NFA}$ is also equivalent normal NFA. These equivalences can all be proved by **subset construction**.

NFA are easier to design and often have exponentially fewer states than a DFA. Though, **only DFA can be implemented!**