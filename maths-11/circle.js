const deckMetadata = {
    title: "Circle -JEE-",
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
        question: "What is the General Equation of a circle and its properties?",
        answer: "Equation: $x^2 + y^2 + 2gx + 2fy + c = 0$\n- Center: $(-g, -f)$\n- Radius: $\\sqrt{g^2 + f^2 - c}$\n- For a real circle: $g^2 + f^2 - c \\geq 0$",
        tags: ["Circles", "Basics"]
    },
    {
        id: 2,
        question: "What are the Intercepts made by a circle on the X and Y axes?",
        answer: "X-intercept: $2\\sqrt{g^2 - c}$\nY-intercept: $2\\sqrt{f^2 - c}$\n- If $g^2=c$, it touches the x-axis.\n- If $f^2=c$, it touches the y-axis.",
        tags: ["Circles", "JEE"]
    },
    {
        id: 3,
        question: "State the Diametric Form of a circle.",
        answer: "For diameter endpoints $(x_1, y_1)$ and $(x_2, y_2)$:\n$$(x - x_1)(x - x_2) + (y - y_1)(y - y_2) = 0$$",
        tags: ["Circles", "Formulas"]
    },
    {
        id: 4,
        question: "What are the Parametric Equations of a circle?",
        answer: "Standard $(x^2+y^2=r^2)$: $x=r\\cos\\theta, y=r\\sin\\theta$\nGeneral $(x-h)^2+(y-k)^2=r^2$:\n$x = h + r\\cos\\theta, y = k + r\\sin\\theta$",
        tags: ["Circles", "Parametric"]
    },
    {
        id: 5,
        question: "How do you determine the position of a point $(x_1, y_1)$ w.r.t. a circle $S=0$?",
        answer: "Calculate $S_1 = x_1^2 + y_1^2 + 2gx_1 + 2fy_1 + c$\n- $S_1 > 0$: Outside\n- $S_1 = 0$: On the circle\n- $S_1 < 0$: Inside",
        tags: ["Circles", "Position"]
    },
    {
        id: 6,
        question: "What is the condition for a line $y=mx+c$ to touch the circle $x^2+y^2=a^2$?",
        answer: "Condition of Tangency: $c^2 = a^2(1+m^2)$\nPoints of contact: $\\left(\\pm \\frac{am}{\\sqrt{1+m^2}}, \\mp \\frac{a}{\\sqrt{1+m^2}}\\right)$",
        tags: ["Circles", "Tangency"]
    },
    {
        id: 7,
        question: "Equation of Tangent in Slope Form.",
        answer: "For $x^2+y^2=a^2$:\n$$y = mx \\pm a\\sqrt{1+m^2}$$",
        tags: ["Circles", "Tangents"]
    },
    {
        id: 8,
        question: "Equation of Tangent in Point Form ($T=0$).",
        answer: "At point $(x_1, y_1)$ on the circle $x^2+y^2+2gx+2fy+c=0$:\n$$xx_1 + yy_1 + g(x+x_1) + f(y+y_1) + c = 0$$",
        tags: ["Circles", "Tangents"]
    },
    {
        id: 9,
        question: "What is the property of a Normal to a circle?",
        answer: "A normal to a circle always passes through the center $(-g, -f)$.\nEquation at $(x_1, y_1)$: $\\frac{x - x_1}{x_1 + g} = \\frac{y - y_1}{y_1 + f}$",
        tags: ["Circles", "Normals"]
    },
    {
        id: 10,
        question: "Length of Tangent and Power of a Point.",
        answer: "Length $L = \\sqrt{S_1}$\nPower of point $P = S_1 = (CP^2 - R^2)$ where $C$ is center and $R$ is radius.",
        tags: ["Circles", "Power"]
    },
    {
        id: 11,
        question: "Equation of Chord of Contact from external point $(x_1, y_1)$.",
        answer: "The line joining points of tangency is given by:\n$$T = 0$$",
        tags: ["Circles", "Chords"]
    },
    {
        id: 12,
        question: "Equation of Chord bisected at a given point $(x_1, y_1)$.",
        answer: "$$T = S_1$$",
        tags: ["Circles", "Chords"]
    },
    {
        id: 13,
        question: "Define Director Circle.",
        answer: "The locus of intersection of perpendicular tangents.\nFor $x^2+y^2=a^2$, it is $x^2+y^2=2a^2$ (a concentric circle with radius $\\sqrt{2}a$).",
        tags: ["Circles", "Locus"]
    },
    {
        id: 14,
        question: "Condition for two circles to touch each other.",
        answer: "1. **Externally:** $C_1C_2 = r_1 + r_2$ (3 common tangents)\n2. **Internally:** $C_1C_2 = |r_1 - r_2|$ (1 common tangent)",
        tags: ["Circles", "Multiple Circles"]
    },
    {
        id: 15,
        question: "Condition for Orthogonality of two circles.",
        answer: "Two circles intersect at $90^\\circ$ if:\n$$2g_1g_2 + 2f_1f_2 = c_1 + c_2$$",
        tags: ["Circles", "Orthogonality"]
    },
    {
        id: 16,
        question: "What is the Radical Axis?",
        answer: "The locus of points from which tangents to two circles are of equal length.\nEquation: $S_1 - S_2 = 0$. It is always perpendicular to the line joining the centers.",
        tags: ["Circles", "Radical Axis"]
    },
    {
        id: 17,
        question: "Equation of Family of Circles.",
        answer: "1. Through intersection of $S=0, L=0$: $S + \\lambda L = 0$\n2. Through intersection of $S_1=0, S_2=0$: $S_1 + \\lambda(S_1 - S_2) = 0$\n3. Touching line $L=0$ at point $(x_1, y_1)$: $(x-x_1)^2 + (y-y_1)^2 + \\lambda L = 0$",
        tags: ["Circles", "Family"]
    }
];
