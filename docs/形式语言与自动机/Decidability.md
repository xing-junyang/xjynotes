# Decidability

Decidability is a property of languages. A language is **decidable** if there exists an **[algorithm](Turing%20Machine.md#recursive-and-recursively-enumerable-languages)** that can determine whether a given string is in the language or not.

## Inclusion Chain

We have the following inclusion chain of language classes:

$$
\text{RL} \subset \text{CFL} \subset \text{Decidable} \subset \text{RE} \subset \text{All Languages}
$$

where $\text{RL}$ is the class of regular languages, $\text{CFL}$ is the class of context-free languages, $\text{RE}$ is the class of recursively enumerable languages.

We will show the inclusion and decidability in the following sections.

::: tip Do we have non-RE languages?

It seems that the inclusion chain implies that not all languages are recursively enumerable. Indeed, and we will show that there are non-RE languages by constructing one.

**Lemma1**: The set of all Turing machines $\text{TM}$ is countable.

**Lemma2**: The set of all languages $\text{L}$ is uncountable.

**Theorem**: There are languages that are not recursively enumerable, for the function $\mathcal{L}: \{\text{TM}\} \to \{\text{L}\}$ **cannot be onto**.

//TODO
:::