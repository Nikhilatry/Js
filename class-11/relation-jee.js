const deckMetadata = {
    title: "Set Theory -CBSE-",
    author: "PCMB Admin",
    description: "Master essential mathematical formulas and concepts."
};

/**
 * FLASHCARD DATA
 * --------------------------------------------------------------------------
 * imageQuestion: Image shown on the front
 * imageAnswer: Image shown on the back
 */
const flashcardsData = [
   {
        id: 1,
        question: "Define an Empty Relation.",
        answer: "A relation $R$ in a set $A$ is called an empty relation if no element of $A$ is related to any element of $A$, i.e., $R = \\emptyset \\subset A \\times A$.",
        tags: ["Relations", "Definitions"]
    },
    {
        id: 2,
        question: "What is a Universal Relation?",
        answer: "A relation $R$ in a set $A$ is universal if each element of $A$ is related to every element of $A$, i.e., $R = A \\times A$.",
        tags: ["Relations", "Definitions"]
    },
    {
        id: 3,
        question: "When is a relation $R$ in set $A$ called Reflexive?",
        answer: "If $(a, a) \\in R$ for every $a \\in A$.",
        tags: ["Relations", "Properties"]
    },
    {
        id: 4,
        question: "When is a relation $R$ in set $A$ called Symmetric?",
        answer: "If $(a_1, a_2) \\in R$ implies that $(a_2, a_1) \\in R$, for all $a_1, a_2 \\in A$.",
        tags: ["Relations", "Properties"]
    },
    {
        id: 5,
        question: "When is a relation $R$ in set $A$ called Transitive?",
        answer: "If $(a_1, a_2) \\in R$ and $(a_2, a_3) \\in R$ implies that $(a_1, a_3) \\in R$ for all $a_1, a_2, a_3 \\in A$.",
        tags: ["Relations", "Properties"]
    },
    {
        id: 6,
        question: "Define an Equivalence Relation.",
        answer: "A relation $R$ in a set $A$ is an equivalence relation if it is reflexive, symmetric, and transitive.",
        tags: ["Relations", "Equivalence"]
    },
    {
        id: 7,
        question: "What is an Equivalence Class $[a]$?",
        answer: "Given an equivalence relation $R$ on set $A$, the equivalence class of $a \\in A$ is the set of all elements $x \\in A$ such that $(x, a) \\in R$.",
        tags: ["Relations", "Equivalence"]
    },
    {
        id: 8,
        question: "Define an Injective (One-to-One) function.",
        answer: "A function $f: X \\to Y$ is injective if $f(x_1) = f(x_2) \\implies x_1 = x_2$ for all $x_1, x_2 \\in X$.",
        tags: ["Functions", "Types"]
    },
    {
        id: 9,
        question: "Define a Surjective (Onto) function.",
        answer: "A function $f: X \\to Y$ is surjective if every element of $Y$ is the image of some element of $X$ under $f$, i.e., Range of $f = Y$.",
        tags: ["Functions", "Types"]
    },
    {
        id: 10,
        question: "What is a Bijective function?",
        answer: "A function $f: X \\to Y$ is bijective if it is both one-to-one (injective) and onto (surjective).",
        tags: ["Functions", "Types"]
    },
    {
        id: 11,
        question: "Define the Composition of functions $g \\circ f$.",
        answer: "If $f: A \\to B$ and $g: B \\to C$, then $(g \\circ f): A \\to C$ is defined by $(g \\circ f)(x) = g(f(x))$ for all $x \\in A$.",
        tags: ["Functions", "Operations"]
    },
    {
        id: 12,
        question: "What is the condition for a function $f: X \\to Y$ to be Invertible?",
        answer: "A function $f$ is invertible if and only if $f$ is bijective (both injective and surjective).",
        tags: ["Functions", "Inverses"]
    },
    {
        id: 13,
        question: "Define a Binary Operation $*$ on set $A$.",
        answer: "A binary operation $*$ on a set $A$ is a function $*: A \\times A \\to A$. We denote $*(a, b)$ by $a * b$.",
        tags: ["Binary Operations", "Basics"]
    },
    {
        id: 14,
        question: "When is a binary operation Commutative?",
        answer: "If $a * b = b * a$ for all $a, b \\in A$.",
        tags: ["Binary Operations", "Properties"]
    },
    {
        id: 15,
        question: "When is a binary operation Associative?",
        answer: "If $(a * b) * c = a * (b * c)$ for all $a, b, c \\in A$.",
        tags: ["Binary Operations", "Properties"]
    },
    {
        id: 16,
        question: "Define the Identity Element $e$ for a binary operation.",
        answer: "An element $e \\in A$ is an identity element for $*$ if $a * e = a = e * a$ for all $a \\in A$.",
        tags: ["Binary Operations", "Identity"]
    },
    {
        id: 17,
        question: "What is an Inverse of an element $a$ w.r.t. a binary operation?",
        answer: "An element $b \\in A$ is the inverse of $a$ if $a * b = e = b * a$, where $e$ is the identity element. $b$ is usually denoted as $a^{-1}$.",
        tags: ["Binary Operations", "Inverse"]
    },
    {
        id: 18,
        question: "How many binary operations can be defined on a set with $n$ elements?",
        answer: "The total number of binary operations on a set with $n$ elements is $n^{(n^2)}$.",
        tags: ["Binary Operations", "Counting"]
    }
];
