# Regular Expressions $\mathrm{RegEx}$

Regular expressions describe languages based on **algebra operations**. The language defined by regular expression $w$ is $L(w)$, which is exactly **regular language**.

## Regular Expression Definition (Bases)

A regular expression is defined as follows:

- **Basis1**: If $a$ is a symbol in the alphabet, then $\mathbf{a}$ is a regular expression and $L(\mathbf{a})$ represents the language $\{a\}$.
- **Basis2**: $\mathbf{\epsilon}$ is a regular expression and $L(\mathbf{\epsilon})$ represents the language $\{\epsilon\}$.
- **Basis3**: $\mathbf{\emptyset}$ is a regular expression and $L(\mathbf{\emptyset})$ represents the language $\emptyset$.

## Regular Expression Operators (Inductions)

The regular expression operators are defined as follows:
- **Induction 1 (Union)**: If $R_1$ and $R_2$ are regular expressions, then $R_1 + R_2$ is also a regular expression. $R_1 + R_2$ is the set of strings that are in $R_1$ or $R_2$. 
- **Induction 2 (Concatenation)**: If R1 and R2 are regular expressions, then $R_1 \cdot R_2$ is also a regular expression. $R_1 \cdot R_2$ is the set of strings that are the concatenation of a string in $R_1$ followed by a string in $R_2$.
- **Induction 3 (Kleene Star)**: If $R$ is a regular expression, then $R^*$ is also a regular expression. $R^*$ is the set of strings that are the concatenation of zero or more strings in $R$. 

## Precedence of Operators

The precedence of operators is as follows:
- **Kleene Star** has the highest precedence.
- **Concatenation** has the second highest precedence. The concatenation operator is implicit, so it is not necessary to write it.
- **Union** has the lowest precedence.

## Regular Expression Examples

- **Example 1**: $L((0+1)^*)$ represents the set of all binary strings.
- **Example 2**: $L((0+10)^*(1+\varepsilon))$ represents the set of all binary strings that have no two consecutive $1$s.

## Equivalence of Regular Expressions and Finite Automata

**Regular expressions and finite automata are equivalent**. A regular expression can be easily converted to a NFA by using **Thompson's construction method**. For any regular expression $R$, there exists an NFA $N(R)$ such that $L(R) = L(N(R))$. We can construct the corresponding NFA by following these rules:

- **Basic Rules**
  - If the regular expression is a symbol $a$, then it is converted to an NFA with two states.
  <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; padding-top:30px">
    <img src='/image/Thompson-a-symbol.svg.png' alt="" style="width:50%;"></img>
    <p style="font-size: 12px; color: gray;">R is only a symbol 'a'</p>
  </div>
  
  - If the regular expression $R$ is $\varepsilon$, then it is converted to an NFA with two state, linked by an $\epsilon$-transition.

  <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; padding-top:30px">
    <img src='/image/Thompson-epsilon.svg-2.png' alt="" style="width:50%;"></img>
    <p style="font-size: 12px; color: gray;">R is epsilon</p>
  </div>

  - If the regular expression is $\emptyset$, then it is converted to an NFA with two states, but without any transitions.
- **Inductive Rules**
  - If the regular expression is $s + t$, then the NFA is like a choice between the NFAs for $s$ and $t$.
  <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; padding-top:30px">
    <img src='/image/Thompson-or.svg.png' alt="" style="width:50%;"></img>
    <p style="font-size: 12px; color: gray;">R is s + t</p>
  </div>

  - If the regular expression is $s \cdot t$, then the NFA sequentially combines the NFAs for $s$ and $t$.

  <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; padding-top:30px">
    <img src='/image/Thompson-concat.svg.png' alt="" style="width:50%;"></img>
    <p style="font-size: 12px; color: gray;">R is s.t</p>
  </div>

  - If the regular expression is $s^*$, then the NFA for $s^*$ is a loop that can be taken zero or more times.
  <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; padding-top:30px">
    <img src='/image/Thompson-kleene-star.svg.png' alt="" style="width:50%;"></img>
    <p style="font-size: 12px; color: gray;">R is s*</p>
  </div>