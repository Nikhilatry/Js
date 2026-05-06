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
        tags: ["Math", "Relations"]
    },
    {
        id: 2,
        question: "What is a Universal Relation?",
        answer: "A relation $R$ in a set $A$ is universal if each element of $A$ is related to every element of $A$, i.e., $R = A \\times A$.",
        tags: ["Math", "Relations"]
    },
    {
        id: 3,
        question: "Define the Identity Relation $I_A$.",
        answer: "The relation $I_A = \\{(a, a) : a \\in A\\}$ is called the identity relation on set $A$.",
        tags: ["Math", "Relations"]
    },
    {
        id: 4,
        question: "What are the three conditions for an Equivalence Relation?",
        answer: "1. **Reflexive:** $(a, a) \\in R$ $\\forall a \\in A$.\n2. **Symmetric:** $(a, b) \\in R \\implies (b, a) \\in R$.\n3. **Transitive:** $(a, b) \\in R$ and $(b, c) \\in R \\implies (a, c) \\in R$.",
        tags: ["Math", "Relations"]
    },
    {
        id: 5,
        question: "What is an Equivalence Class $[a]$?",
        answer: "Given an equivalence relation $R$ on set $A$, the equivalence class of an element $a \\in A$ is the subset of $A$ containing all elements $x$ related to $a$: $[a] = \\{x \\in A : (x, a) \\in R\\}$.",
        tags: ["Math", "Relations", "Advanced"]
    },
    {
        id: 6,
        question: "State the property of partitions created by Equivalence Relations.",
        answer: "An equivalence relation $R$ on a set $A$ partitions $A$ into disjoint equivalence classes whose union is $A$. Any two equivalence classes are either identical or disjoint.",
        tags: ["Math", "Relations"]
    },
    {
        id: 7,
        question: "What is an Injective (One-to-One) function?",
        answer: "A function $f: X \\to Y$ is injective if $f(x_1) = f(x_2) \\implies x_1 = x_2$ for all $x_1, x_2 \\in X$.",
        tags: ["Math", "Functions"]
    },
    {
        id: 8,
        question: "What is a Surjective (Onto) function?",
        answer: "A function $f: X \\to Y$ is surjective if the Range of $f$ equals the Co-domain $Y$. (Every $y \\in Y$ has a pre-image in $X$).",
        tags: ["Math", "Functions"]
    },
    {
        id: 9,
        question: "Define a Bijective function.",
        answer: "A function $f: X \\to Y$ is bijective if it is both injective and surjective.",
        tags: ["Math", "Functions"]
    },
    {
        id: 10,
        question: "How do you calculate the total number of functions from set $A$ to $B$?",
        answer: "If $n(A) = p$ and $n(B) = q$, the total number of functions is $q^p$.",
        tags: ["Math", "Functions", "Combinatorics"]
    },
    {
        id: 11,
        question: "Define the Composition of Functions $(g \\circ f)$.",
        answer: "If $f: A \\to B$ and $g: B \\to C$, then $(g \\circ f)(x) = g(f(x))$. Note: Domain of $g \\circ f$ is Domain of $f$.",
        tags: ["Math", "Functions"]
    },
    {
        id: 12,
        question: "Is function composition commutative?",
        answer: "Generally, no. $g \\circ f \\neq f \\circ g$ in most cases.",
        tags: ["Math", "Functions"]
    },
    {
        id: 13,
        question: "State the condition for the existence of $f^{-1}$.",
        answer: "A function $f: X \\to Y$ is invertible if and only if $f$ is bijective.",
        tags: ["Math", "Functions"]
    },
    {
        id: 14,
        question: "What is a Binary Operation?",
        answer: "A binary operation $*$ on a set $A$ is a function $*: A \\times A \\to A$.",
        tags: ["Math", "Binary Operations"]
    },
    {
        id: 15,
        question: "Define the Identity Element $e$ for a binary operation $*$.",
        answer: "An element $e \\in A$ is an identity element if $a * e = a = e * a$ for all $a \\in A$.",
        tags: ["Math", "Binary Operations"]
    },
    {
        id: 16,
        question: "What is an Invertible Element in a binary operation?",
        answer: "An element $a \\in A$ is invertible if there exists $b \\in A$ such that $a * b = e = b * a$. Here $b$ is the inverse of $a$.",
        tags: ["Math", "Binary Operations"]
    },
    {
        id: 17,
        question: "When is a binary operation Commutative?",
        answer: "$a * b = b * a$ for all $a, b \\in A$.",
        tags: ["Math", "Binary Operations"]
    },
    {
        id: 18,
        question: "When is a binary operation Associative?",
        answer: "$(a * b) * c = a * (b * c)$ for all $a, b, c \\in A$.",
        tags: ["Math", "Binary Operations"]
    },
    {
        id: 19,
        question: "What is the number of binary operations on a set with $n$ elements?",
        answer: "The number of binary operations is $n^{n^2}$.",
        tags: ["Math", "Binary Operations"]
    },
    {
        id: 20,
        question: "Can an operation have more than one identity element?",
        answer: "No, if an identity element exists for a binary operation, it is unique.",
        tags: ["Math", "Binary Operations"]
    }
];
