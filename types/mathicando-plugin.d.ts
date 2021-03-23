/// <reference no-default-lib="true"/>
/// <reference lib="ESNext"/>

/*
  Copyright (c) 2016-2021 Math I Can Do Solutions Incorporated or its licensors.
  Copyright (c) 2016-2021 Christopher G. Jennings.
  All rights reserved. Permission granted to use or redistribute without modification.

  Build: 17477 (March 21, 2021, 4:52 PM EST)
*/

/**
 * When loaded as an ES6 or Node.js module, the exported `createApi` function returns a Promise that resolves to the `micd` namespace root once the API is loaded and initialized. When loaded directly by `<script>` tag, the `micd` module is available as an object in the loading page's global (`window`) scope. The principal classes that make up the MICD API are all found directly under this namespace. For example, a new math editor can be created using `let editor = new micd.Editor()`.
 */
declare namespace micd {
  /**
   * Supports desktop app plugins.
   * 
   * *App exists only for plugins running in the desktop app. It is **undefined** when using the browser API.*
   */
  class App {
    /** The version of the desktop app that the plugin is running in. */
    static version: string;
    /** Provides access to a simple key store. */
    static storage: App.PluginStorage;
    /** Provides access to the clipboard. */
    static clipboard: App.PluginClipboardAccess;
    /** Contains properties that describe the host platform. */
    static platform: App.PlatformInfo;
    /**
     * Register a custom palette. Custom palettes can be added to the side panels through the panel customization dialog. Custom palette buttons can be defined, but `onUse` and `onAdd` must be set to strings whose content is script code that defines the body of the respective listener function. See [[PaletteButtonTemplate]].
     * 
     * @param label The text that the palette will display as its name. Any existing custom palette with the same name will be replaced.
     * @param rows The button rows that make up the palette. Passing null will remove any previously registered custom palette with the same name.
     */
    static registerPalette(label: string, rows: micd.shell.PaletteRowTemplate[] | null): void;
    /** Displays the panel customization dialog. */
    static openPanelCustomizer(): void;
  }
  module App {
    /**
     * Allows plug-ins to store and recall string values. Stored values persist between app runs. They can be accessed by other plugins or by the same plugin running in other editor windows.
     */
    interface PluginStorage {
      /**
       * Returns the value of the specified key, or the default value if the key is not present.
       * 
       * @param key The name of the desired metadata property.
       * @param defaultValue An optional default returned if the key is not present.
       * @returns The value of the key, if present; otherwise the default value, or `undefined` if no default was specified.
       */
      get(key: string, defaultValue?: string): string | null;
      /**
       * Sets the value of the specified key. Setting a key to `undefined` or `null` has the same effect as removing the key.
       * 
       * @param key The name of the desired metadata property.
       * @param value The value to associate with the key.
       */
      set(key: string, defaultValue?: string): void;
      /**
       * Removes the specified key, if it is present.
       * 
       * @param key The name of the key.
       */
      remove(key: string): void;
      /**
       * Returns a new array containing a copy of all of the defined keys. The order of the keys in the array is not guaranteed.
       * 
       * @returns A (possibly empty) array of the key names of all currently stored values.
       */
      keys(): string[];
    }

    /** Convenient clipboard access. */
    interface PluginClipboardAccess {
      /**
       * Copies plain text to the clipboard.
       * @param text The text to copy.
       */
      copyText(text: string): void;
      /**
       * Copies an image supplied to the clipboard.
       * @param pngDataUrl The data URL of an image, in the PNG image format, to copy.
       */
      copyImage(pngDataUrl: string): void;
    }

    /** Properties that describe the type of device that the app is running on. */
    interface PlatformInfo {
      /** True if the editor app is running on a Linux device. */
      isLinux: boolean;
      /** True if the editor app is running on a MacOS device. */
      isMacOs: boolean;
      /** True if the editor app is running on a Windows device. */
      isWindow: boolean;
    }
  }

  /**
   * The names of the subset of math editor commands that insert math objects without any additional special behaviours.
   *
   * @see [[EditorCommand]]
   */
  const enum MathObject {
    /** The variable math object *Identifier*. */
    identifier = "identifier",
    /** The arithmetic math object *Plus*, which inserts the + operator. */
    plus = "plus",
    /** The arithmetic math object *Minus*, which inserts the − operator. */
    minus = "minus",
    /** The arithmetic math object *Times dot*, which inserts the ⋅ operator. */
    timesDot = "timesDot",
    /** The arithmetic math object *Times cross*, which inserts the ⨯ operator. */
    timesCross = "timesCross",
    /** The arithmetic math object *Divided by*, which inserts the ÷ operator. */
    dividedBy = "dividedBy",
    /** The arithmetic math object *Fraction*. */
    fraction = "fraction",
    /** The arithmetic math object *To the power*. */
    toThePower = "toThePower",
    /** The arithmetic math object *Subscript index*. */
    subscriptIndex = "subscriptIndex",
    /** The arithmetic math object *Plus or minus*, which inserts the ± operator. */
    plusOrMinus = "plusOrMinus",
    /** The arithmetic math object *Minus or plus*, which inserts the ∓ operator. */
    minusOrPlus = "minusOrPlus",
    /** The arithmetic math object *Square root*. */
    squareRoot = "squareRoot",
    /** The arithmetic math object *Cube root*. */
    cubeRoot = "cubeRoot",
    /** The arithmetic math object *Root*. */
    root = "root",
    /** The arithmetic math object *Percent*, which inserts the % operator. */
    percent = "percent",
    /** The arithmetic math object *Ratio*, which inserts the : operator. */
    ratio = "ratio",
    /** The arithmetic math object *Divides*, which inserts the ∣ operator. */
    divides = "divides",
    /** The arithmetic math object *Does not divide*, which inserts the ∤ operator. */
    doesNotDivide = "doesNotDivide",
    /** The arithmetic math object *Remainder after division*, which inserts the mod operator. */
    remainderAfterDivision = "remainderAfterDivision",
    /** The arithmetic math object *Congruent modulo*. */
    congruentModulo = "congruentModulo",
    /** The arithmetic math object *Not congruent modulo*. */
    notCongruentModulo = "notCongruentModulo",
    /** The relation math object *Equal to*, which inserts the = operator. */
    equalTo = "equalTo",
    /** The relation math object *Not equal to*, which inserts the ≠ operator. */
    notEqualTo = "notEqualTo",
    /** The relation math object *Approximately equal to*, which inserts the ≈ operator. */
    approximatelyEqualTo = "approximatelyEqualTo",
    /** The relation math object *Defined to be equal to*, which inserts the ≝ operator. */
    definedToBeEqualTo = "definedToBeEqualTo",
    /** The relation math object *Questioned equal to*, which inserts the ≟ operator. */
    questionedEqualTo = "questionedEqualTo",
    /** The relation math object *Identical to*, which inserts the ≡ operator. */
    identicalTo = "identicalTo",
    /** The relation math object *Not identical to*, which inserts the ≢ operator. */
    notIdenticalTo = "notIdenticalTo",
    /** The relation math object *Proportional to*, which inserts the ∝ operator. */
    proportionalTo = "proportionalTo",
    /** The relation math object *Corresponds to*, which inserts the ≙ operator. */
    correspondsTo = "correspondsTo",
    /** The relation math object *Less than*, which inserts the < operator. */
    lessThan = "lessThan",
    /** The relation math object *Greater than*, which inserts the > operator. */
    greaterThan = "greaterThan",
    /** The relation math object *Less than or equal to*, which inserts the ≤ operator. */
    lessThanOrEqualTo = "lessThanOrEqualTo",
    /** The relation math object *Greater than or equal to*, which inserts the ≥ operator. */
    greaterThanOrEqualTo = "greaterThanOrEqualTo",
    /** The relation math object *Not less than*, which inserts the ≮ operator. */
    notLessThan = "notLessThan",
    /** The relation math object *Not greater than*, which inserts the ≯ operator. */
    notGreaterThan = "notGreaterThan",
    /** The relation math object *Not less than or equal to*, which inserts the ≰ operator. */
    notLessThanOrEqualTo = "notLessThanOrEqualTo",
    /** The relation math object *Not greater than or equal to*, which inserts the ≱ operator. */
    notGreaterThanOrEqualTo = "notGreaterThanOrEqualTo",
    /** The relation math object *Much less than*, which inserts the ≪ operator. */
    muchLessThan = "muchLessThan",
    /** The relation math object *Much greater than*, which inserts the ≫ operator. */
    muchGreaterThan = "muchGreaterThan",
    /** The relation math object *Less than or approximately*, which inserts the ⪅ operator. */
    lessThanOrApproximately = "lessThanOrApproximately",
    /** The relation math object *Greater than or approximately*, which inserts the ⪆ operator. */
    greaterThanOrApproximately = "greaterThanOrApproximately",
    /** The relation math object *Precedes*, which inserts the ≺ operator. */
    precedes = "precedes",
    /** The relation math object *Succeeds*, which inserts the ≻ operator. */
    succeeds = "succeeds",
    /** The relation math object *Precedes or equal to*, which inserts the ≼ operator. */
    precedesOrEqualTo = "precedesOrEqualTo",
    /** The relation math object *Succeeds or equal to*, which inserts the ≽ operator. */
    succeedsOrEqualTo = "succeedsOrEqualTo",
    /** The relation math object *Does not precede*, which inserts the ⊀ operator. */
    doesNotPrecede = "doesNotPrecede",
    /** The relation math object *Does not succeed*, which inserts the ⊁ operator. */
    doesNotSucceed = "doesNotSucceed",
    /** The relation math object *Does not precede or equal*, which inserts the ⋠ operator. */
    doesNotPrecedeOrEqual = "doesNotPrecedeOrEqual",
    /** The relation math object *Does not succeed or equal*, which inserts the ⋡ operator. */
    doesNotSucceedOrEqual = "doesNotSucceedOrEqual",
    /** The bracket math object *Parentheses*, which inserts (…) brackets. */
    parentheses = "parentheses",
    /** The bracket math object *Brackets*, which inserts […] brackets. */
    brackets = "brackets",
    /** The bracket math object *Angle brackets*, which inserts ⟨…⟩ brackets. */
    angleBrackets = "angleBrackets",
    /** The bracket math object *Absolute value*, which inserts |…| brackets. */
    absoluteValue = "absoluteValue",
    /** The bracket math object *Floor*, which inserts ⌊…⌋ brackets. */
    floor = "floor",
    /** The bracket math object *Ceiling*, which inserts ⌈…⌉ brackets. */
    ceiling = "ceiling",
    /** The unit math object *Unit*. */
    unit = "unit",
    /** The unit math object *Degrees*. */
    degrees = "degrees",
    /** The unit math object *Arcminutes*. */
    arcminutes = "arcminutes",
    /** The unit math object *Arcseconds*. */
    arcseconds = "arcseconds",
    /** The unit math object *Degrees celsius*. */
    degreesCelsius = "degreesCelsius",
    /** The unit math object *Degrees fahrenheit*. */
    degreesFahrenheit = "degreesFahrenheit",
    /** The unit math object *Dollars*. */
    dollars = "dollars",
    /** The unit math object *Pounds sterling*. */
    poundsSterling = "poundsSterling",
    /** The unit math object *Euros*. */
    euros = "euros",
    /** The logic math object *Boolean true*. */
    booleanTrue = "booleanTrue",
    /** The logic math object *Boolean false*. */
    booleanFalse = "booleanFalse",
    /** The logic math object *Tautology*, which inserts the ⊤ operator. */
    tautology = "tautology",
    /** The logic math object *Contradiction*, which inserts the ⊥ operator. */
    contradiction = "contradiction",
    /** The logic math object *Conjunction*, which inserts the ∧ operator. */
    conjunction = "conjunction",
    /** The logic math object *Disjunction*, which inserts the ∨ operator. */
    disjunction = "disjunction",
    /** The logic math object *Exclusive disjunction*, which inserts the ⊻ operator. */
    exclusiveDisjunction = "exclusiveDisjunction",
    /** The logic math object *Negation*, which inserts the ¬ operator. */
    negation = "negation",
    /** The logic math object *Implies*, which inserts the ⇒ operator. */
    implies = "implies",
    /** The logic math object *Equivalent to*, which inserts the ⇔ operator. */
    equivalentTo = "equivalentTo",
    /** The logic math object *For all*, which inserts the ∀ operator. */
    forAll = "forAll",
    /** The logic math object *There exists*, which inserts the ∃ operator. */
    thereExists = "thereExists",
    /** The logic math object *There exists one*, which inserts the ∃¹ operator. */
    thereExistsOne = "thereExistsOne",
    /** The logic math object *Necessarily*, which inserts the ◻ operator. */
    necessarily = "necessarily",
    /** The logic math object *Possibly*, which inserts the ◊ operator. */
    possibly = "possibly",
    /** The logic math object *Provable*, which inserts the ⊢ operator. */
    provable = "provable",
    /** The logic math object *Entails*, which inserts the ⊨ operator. */
    entails = "entails",
    /** The logic math object *Therefore*, which inserts the ∴ operator. */
    therefore = "therefore",
    /** The logic math object *Because*, which inserts the ∵ operator. */
    because = "because",
    /** The logic math object *End of proof*, which inserts the ■ operator. */
    endOfProof = "endOfProof",
    /** The logic math object *n‐ary conjunction*, which inserts a big ⋀ operator. */
    naryConjunction = "naryConjunction",
    /** The logic math object *n‐ary disjunction*, which inserts a big ⋁ operator. */
    naryDisjunction = "naryDisjunction",
    /** The set math object *Set literal*, which inserts {…} brackets. */
    setLiteral = "setLiteral",
    /** The set math object *Set builder*. */
    setBuilder = "setBuilder",
    /** The set math object *Empty set*, which inserts the ∅ operator. */
    emptySet = "emptySet",
    /** The set math object *Power set*. */
    powerSet = "powerSet",
    /** The set math object *Separator*, which inserts the , operator. */
    separator = "separator",
    /** The set math object *Ellipsis*, which inserts the ⋯ operator. */
    ellipsis = "ellipsis",
    /** The set math object *Element of*, which inserts the ∈ operator. */
    elementOf = "elementOf",
    /** The set math object *Not an element of*, which inserts the ∉ operator. */
    notAnElementOf = "notAnElementOf",
    /** The set math object *Union*, which inserts the ∪ operator. */
    union = "union",
    /** The set math object *Intersection*, which inserts the ∩ operator. */
    intersection = "intersection",
    /** The set math object *Set difference*, which inserts the ∖ operator. */
    setDifference = "setDifference",
    /** The set math object *Symmetric difference*, which inserts the ⊖ operator. */
    symmetricDifference = "symmetricDifference",
    /** The set math object *Contains*, which inserts the ∋ operator. */
    contains = "contains",
    /** The set math object *Does not contain*, which inserts the ∌ operator. */
    doesNotContain = "doesNotContain",
    /** The set math object *Subset*, which inserts the ⊆ operator. */
    subset = "subset",
    /** The set math object *Not a subset*, which inserts the ⊈ operator. */
    notASubset = "notASubset",
    /** The set math object *Strict subset*, which inserts the ⊂ operator. */
    strictSubset = "strictSubset",
    /** The set math object *Not a strict subset*, which inserts the ⊄ operator. */
    notAStrictSubset = "notAStrictSubset",
    /** The set math object *Superset*, which inserts the ⊇ operator. */
    superset = "superset",
    /** The set math object *Not a superset*, which inserts the ⊉ operator. */
    notASuperset = "notASuperset",
    /** The set math object *Strict superset*, which inserts the ⊃ operator. */
    strictSuperset = "strictSuperset",
    /** The set math object *Not a strict superset*, which inserts the ⊅ operator. */
    notAStrictSuperset = "notAStrictSuperset",
    /** The set math object *Universal set*. */
    universalSet = "universalSet",
    /** The set math object *Natural numbers*. */
    naturalNumbers = "naturalNumbers",
    /** The set math object *Integer numbers*. */
    integerNumbers = "integerNumbers",
    /** The set math object *Rational numbers*. */
    rationalNumbers = "rationalNumbers",
    /** The set math object *Real numbers*. */
    realNumbers = "realNumbers",
    /** The set math object *Complex numbers*. */
    complexNumbers = "complexNumbers",
    /** The set math object *Prime numbers*. */
    primeNumbers = "primeNumbers",
    /** The set math object *Aleph number*. */
    alephNumber = "alephNumber",
    /** The set math object *Beth number*. */
    bethNumber = "bethNumber",
    /** The set math object *Closed interval*, which inserts an […, …] interval. */
    closedInterval = "closedInterval",
    /** The set math object *Left half open interval*, which inserts an (…, …] interval. */
    leftHalfOpenInterval = "leftHalfOpenInterval",
    /** The set math object *Right half open interval*, which inserts an […, …) interval. */
    rightHalfOpenInterval = "rightHalfOpenInterval",
    /** The set math object *Open interval*, which inserts an (…, …) interval. */
    openInterval = "openInterval",
    /** The set math object *n‐ary intersection*, which inserts a big ⋂ operator. */
    naryIntersection = "naryIntersection",
    /** The set math object *n‐ary union*, which inserts a big ⋃ operator. */
    naryUnion = "naryUnion",
    /** The geometry math object *Pi*. */
    pi = "pi",
    /** The geometry math object *Parallel to*, which inserts the ∥ operator. */
    parallelTo = "parallelTo",
    /** The geometry math object *Not parallel to*, which inserts the ∦ operator. */
    notParallelTo = "notParallelTo",
    /** The geometry math object *Perpendicular to*, which inserts the ⟂ operator. */
    perpendicularTo = "perpendicularTo",
    /** The geometry math object *Congruent to*, which inserts the ≅ operator. */
    congruentTo = "congruentTo",
    /** The geometry math object *Similar to*, which inserts the ∼ operator. */
    similarTo = "similarTo",
    /** The geometry math object *Angle*, which inserts the ∠ operator. */
    angle = "angle",
    /** The geometry math object *Measured angle*, which inserts the ∡ operator. */
    measuredAngle = "measuredAngle",
    /** The geometry math object *Spherical angle*, which inserts the ∢ operator. */
    sphericalAngle = "sphericalAngle",
    /** The geometry math object *Line from points*. */
    lineFromPoints = "lineFromPoints",
    /** The geometry math object *Line segment from points*. */
    lineSegmentFromPoints = "lineSegmentFromPoints",
    /** The geometry math object *Ray from points*. */
    rayFromPoints = "rayFromPoints",
    /** The geometry math object *Arc from points*. */
    arcFromPoints = "arcFromPoints",
    /** The geometry math object *Distance function*. */
    distanceFunction = "distanceFunction",
    /** The geometry math object *Measure function*. */
    measureFunction = "measureFunction",
    /** The geometry math object *Triangle*, which inserts the △ operator. */
    triangle = "triangle",
    /** The geometry math object *Square*, which inserts the □ operator. */
    square = "square",
    /** The geometry math object *Circle*, which inserts the ○ operator. */
    circle = "circle",
    /** The function math object *Function*. */
    function = "function",
    /** The function math object *Composite function*, which inserts the ∘ operator. */
    compositeFunction = "compositeFunction",
    /** The function math object *Inverse*. */
    inverse = "inverse",
    /** The function math object *Maps to*, which inserts the ↦ operator. */
    mapsTo = "mapsTo",
    /** The function math object *Piecewise function*. */
    piecewiseFunction = "piecewiseFunction",
    /** The function math object *Evaluate function*. */
    evaluateFunction = "evaluateFunction",
    /** The function math object *Greatest common divisor*. */
    greatestCommonDivisor = "greatestCommonDivisor",
    /** The function math object *Least common multiple*. */
    leastCommonMultiple = "leastCommonMultiple",
    /** The function math object *Minimum of*. */
    minimumOf = "minimumOf",
    /** The function math object *Maximum of*. */
    maximumOf = "maximumOf",
    /** The function math object *Integer part of*. */
    integerPartOf = "integerPartOf",
    /** The function math object *Fractional part of*. */
    fractionalPartOf = "fractionalPartOf",
    /** The function math object *Round*. */
    round = "round",
    /** The function math object *Signum*. */
    signum = "signum",
    /** The function math object *Random number*. */
    randomNumber = "randomNumber",
    /** The function math object *Logarithm*. */
    logarithm = "logarithm",
    /** The function math object *Decimal logarithm*. */
    decimalLogarithm = "decimalLogarithm",
    /** The function math object *Binary logarithm*. */
    binaryLogarithm = "binaryLogarithm",
    /** The function math object *Natural logarithm*. */
    naturalLogarithm = "naturalLogarithm",
    /** The function math object *Summation*, which inserts a big ∑ operator. */
    summation = "summation",
    /** The function math object *Product*, which inserts a big ∏ operator. */
    product = "product",
    /** The function math object *Coproduct*, which inserts a big ∐ operator. */
    coproduct = "coproduct",
    /** The combinatoric math object *Factorial*, which inserts the ! operator. */
    factorial = "factorial",
    /** The combinatoric math object *Rising factorial*. */
    risingFactorial = "risingFactorial",
    /** The combinatoric math object *Falling factorial*. */
    fallingFactorial = "fallingFactorial",
    /** The combinatoric math object *Binomial coefficient*. */
    binomialCoefficient = "binomialCoefficient",
    /** The combinatoric math object *Permutations*. */
    permutations = "permutations",
    /** The combinatoric math object *Permutations with repetitions*. */
    permutationsWithRepetitions = "permutationsWithRepetitions",
    /** The combinatoric math object *Combinations*. */
    combinations = "combinations",
    /** The combinatoric math object *Combinations with repetitions*. */
    combinationsWithRepetitions = "combinationsWithRepetitions",
    /** The combinatoric math object *Probability*. */
    probability = "probability",
    /** The combinatoric math object *Conditional probability*. */
    conditionalProbability = "conditionalProbability",
    /** The trigonometry math object *Sine*. */
    sine = "sine",
    /** The trigonometry math object *Cosine*. */
    cosine = "cosine",
    /** The trigonometry math object *Tangent*. */
    tangent = "tangent",
    /** The trigonometry math object *Cotangent*. */
    cotangent = "cotangent",
    /** The trigonometry math object *Secant*. */
    secant = "secant",
    /** The trigonometry math object *Cosecant*. */
    cosecant = "cosecant",
    /** The trigonometry math object *Arcsine*. */
    arcsine = "arcsine",
    /** The trigonometry math object *Arccosine*. */
    arccosine = "arccosine",
    /** The trigonometry math object *Arctangent*. */
    arctangent = "arctangent",
    /** The trigonometry math object *Arccotangent*. */
    arccotangent = "arccotangent",
    /** The trigonometry math object *Arcsecant*. */
    arcsecant = "arcsecant",
    /** The trigonometry math object *Arccosecant*. */
    arccosecant = "arccosecant",
    /** The trigonometry math object *Hyperbolic sine*. */
    hyperbolicSine = "hyperbolicSine",
    /** The trigonometry math object *Hyperbolic cosine*. */
    hyperbolicCosine = "hyperbolicCosine",
    /** The trigonometry math object *Hyperbolic tangent*. */
    hyperbolicTangent = "hyperbolicTangent",
    /** The trigonometry math object *Hyperbolic cotangent*. */
    hyperbolicCotangent = "hyperbolicCotangent",
    /** The trigonometry math object *Hyperbolic secant*. */
    hyperbolicSecant = "hyperbolicSecant",
    /** The trigonometry math object *Hyperbolic cosecant*. */
    hyperbolicCosecant = "hyperbolicCosecant",
    /** The trigonometry math object *Area hyperbolic sine*. */
    areaHyperbolicSine = "areaHyperbolicSine",
    /** The trigonometry math object *Area hyperbolic cosine*. */
    areaHyperbolicCosine = "areaHyperbolicCosine",
    /** The trigonometry math object *Area hyperbolic tangent*. */
    areaHyperbolicTangent = "areaHyperbolicTangent",
    /** The trigonometry math object *Area hyperbolic cotangent*. */
    areaHyperbolicCotangent = "areaHyperbolicCotangent",
    /** The trigonometry math object *Area hyperbolic secant*. */
    areaHyperbolicSecant = "areaHyperbolicSecant",
    /** The trigonometry math object *Area hyperbolic cosecant*. */
    areaHyperbolicCosecant = "areaHyperbolicCosecant",
    /** The complex number math object *Imaginary unit*. */
    imaginaryUnit = "imaginaryUnit",
    /** The complex number math object *Complex conjugate*. */
    complexConjugate = "complexConjugate",
    /** The complex number math object *Real part*. */
    realPart = "realPart",
    /** The complex number math object *Imaginary part*. */
    imaginaryPart = "imaginaryPart",
    /** The complex number math object *Argument of*. */
    argumentOf = "argumentOf",
    /** The matrix math object *Matrix*. */
    matrix = "matrix",
    /** The matrix math object *Determinant matrix*. */
    determinantMatrix = "determinantMatrix",
    /** The matrix math object *Transpose*. */
    transpose = "transpose",
    /** The matrix math object *Matrix element*. */
    matrixElement = "matrixElement",
    /** The matrix math object *Determinant*. */
    determinant = "determinant",
    /** The matrix math object *Rank*. */
    rank = "rank",
    /** The matrix math object *Trace*. */
    trace = "trace",
    /** The matrix math object *Hermitian conjugate*. */
    hermitianConjugate = "hermitianConjugate",
    /** The matrix math object *Vertical ellipsis*, which inserts the ⋮ operator. */
    verticalEllipsis = "verticalEllipsis",
    /** The matrix math object *Diagonal ellipsis*, which inserts the ⋱ operator. */
    diagonalEllipsis = "diagonalEllipsis",
    /** The calculus math object *Natural logarithm base*. */
    naturalLogarithmBase = "naturalLogarithmBase",
    /** The calculus math object *Infinity*. */
    infinity = "infinity",
    /** The calculus math object *Tends to*, which inserts the →​ operator. */
    tendsTo = "tendsTo",
    /** The calculus math object *Limit*. */
    limit = "limit",
    /** The calculus math object *Change in*. */
    changeIn = "changeIn",
    /** The calculus math object *Lagrange 1st derivative*. */
    Lagrange1stDerivative = "Lagrange1stDerivative",
    /** The calculus math object *Lagrange 2nd derivative*. */
    Lagrange2ndDerivative = "Lagrange2ndDerivative",
    /** The calculus math object *Lagrange 3rd derivative*. */
    Lagrange3rdDerivative = "Lagrange3rdDerivative",
    /** The calculus math object *Newton 1st derivative*. */
    Newton1stDerivative = "Newton1stDerivative",
    /** The calculus math object *Newton 2nd derivative*. */
    Newton2ndDerivative = "Newton2ndDerivative",
    /** The calculus math object *Leibniz 1st derivative*. */
    Leibniz1stDerivative = "Leibniz1stDerivative",
    /** The calculus math object *Leibniz 2nd derivative*. */
    Leibniz2ndDerivative = "Leibniz2ndDerivative",
    /** The calculus math object *Leibniz nth derivative*. */
    LeibnizNthDerivative = "LeibnizNthDerivative",
    /** The calculus math object *Integral*. */
    integral = "integral",
    /** The calculus math object *Double integral*. */
    doubleIntegral = "doubleIntegral",
    /** The calculus math object *Triple integral*. */
    tripleIntegral = "tripleIntegral",
    /** The calculus math object *Contour integral*. */
    contourIntegral = "contourIntegral",
    /** The calculus math object *Partial 1st derivative*. */
    partial1stDerivative = "partial1stDerivative",
    /** The calculus math object *Partial 2nd derivative*. */
    partial2ndDerivative = "partial2ndDerivative",
    /** The calculus math object *Partial 2nd derivative cross*. */
    partial2ndDerivativeCross = "partial2ndDerivativeCross",
    /** The calculus math object *Partial nth derivative*. */
    partialNthDerivative = "partialNthDerivative",
    /** The calculus math object *Del operator*, which inserts the ∇ operator. */
    delOperator = "delOperator",
    /** The calculus math object *Laplacian operator*, which inserts the ∇² operator. */
    LaplacianOperator = "LaplacianOperator",
    /** The calculus math object *Wave operator*, which inserts the ⧠ operator. */
    waveOperator = "waveOperator",
    /** The calculus math object *Gradient of*. */
    gradientOf = "gradientOf",
    /** The calculus math object *Divergence of*. */
    divergenceOf = "divergenceOf",
    /** The calculus math object *Rotation of*. */
    rotationOf = "rotationOf",
    /** The calculus math object *Convolution*, which inserts the ∗ operator. */
    convolution = "convolution",
    /** The calculus math object *Fourier transform*. */
    FourierTransform = "FourierTransform",
    /** The calculus math object *Laplace transform*. */
    LaplaceTransform = "LaplaceTransform",
    /** The computing math object *String literal*. */
    stringLiteral = "stringLiteral",
    /** The computing math object *Is assigned*, which inserts the := operator. */
    isAssigned = "isAssigned",
    /** The computing math object *Asymptotically equal to*, which inserts the ≃ operator. */
    asymptoticallyEqualTo = "asymptoticallyEqualTo",
    /** The computing math object *Not asymptotically equal to*, which inserts the ≄ operator. */
    notAsymptoticallyEqualTo = "notAsymptoticallyEqualTo",
    /** The computing math object *Big O*. */
    big_O = "big_O",
    /** The computing math object *Big Theta*. */
    big_Theta = "big_Theta",
    /** The computing math object *Big Omega*. */
    big_Omega = "big_Omega",
    /** The computing math object *Small o*. */
    smallO = "smallO",
    /** The computing math object *Small omega*. */
    smallOmega = "smallOmega",
    /** The computing math object *Lambda abstraction*. */
    lambdaAbstraction = "lambdaAbstraction",
    /** The computing math object *Noncapturing substitution*. */
    noncapturingSubstitution = "noncapturingSubstitution",
    /** The computing math object *Relational selection*. */
    relationalSelection = "relationalSelection",
    /** The computing math object *Relational projection*. */
    relationalProjection = "relationalProjection",
    /** The computing math object *Relational renaming*. */
    relationalRenaming = "relationalRenaming",
    /** The computing math object *Relational join*, which inserts the ⋈ operator. */
    relationalJoin = "relationalJoin",
    /** The education math object *Fill in the blank box*. */
    fillInTheBlankBox = "fillInTheBlankBox",
    /** The education math object *Spoiler box*. */
    spoilerBox = "spoilerBox",
    /** The education math object *Data table*. */
    dataTable = "dataTable",
    /** The education math object *Equation addition*. */
    equationAddition = "equationAddition",
    /** The education math object *Equation steps*. */
    equationSteps = "equationSteps",
    /** The education math object *Grid*. */
    grid = "grid",
    /** The education math object *Number line*. */
    numberLine = "numberLine",
    /** The education math object *Coordinate plane*. */
    coordinatePlane = "coordinatePlane",
    /** The group theory math object *Direct sum*, which inserts the ⊕ operator. */
    directSum = "directSum",
    /** The group theory math object *Direct product*, which inserts the ⊗ operator. */
    directProduct = "directProduct",
    /** The group theory math object *Semidirect product*, which inserts the ⋊ operator. */
    semidirectProduct = "semidirectProduct",
    /** The group theory math object *Wreath product*, which inserts the ≀ operator. */
    wreathProduct = "wreathProduct",
    /** The group theory math object *Normal subgroup*, which inserts the ⊲ operator. */
    normalSubgroup = "normalSubgroup",
    /** The group theory math object *Normal subgroup or equal*, which inserts the ⊴ operator. */
    normalSubgroupOrEqual = "normalSubgroupOrEqual",
    /** The group theory math object *Not a normal subgroup*, which inserts the ⋪ operator. */
    notANormalSubgroup = "notANormalSubgroup",
    /** The group theory math object *Generic operator*, which inserts the ⋆ operator. */
    genericOperator = "genericOperator",
    /** The group theory math object *Generic operator 2*, which inserts the ∙ operator. */
    genericOperator2 = "genericOperator2",
    /** The annotation math object *Brace over*. */
    braceOver = "braceOver",
    /** The annotation math object *Brace under*. */
    braceUnder = "braceUnder",
    /** The style math object *Small*, which scales content by 67%. */
    small = "small",
    /** The style math object *Big*, which scales content by 133%. */
    big = "big",
    /** The style math object *Brown*, which decorates content with colour #3e2723. */
    brown = "brown",
    /** The style math object *Orange*, which decorates content with colour #e65100. */
    orange = "orange",
    /** The style math object *Yellow*, which decorates content with colour #ffd600. */
    yellow = "yellow",
    /** The style math object *Lime*, which decorates content with colour #827717. */
    lime = "lime",
    /** The style math object *Green*, which decorates content with colour #33691e. */
    green = "green",
    /** The style math object *Teal*, which decorates content with colour #006064. */
    teal = "teal",
    /** The style math object *Blue*, which decorates content with colour #01579b. */
    blue = "blue",
    /** The style math object *Indigo*, which decorates content with colour #1a237e. */
    indigo = "indigo",
    /** The style math object *Purple*, which decorates content with colour #4a148c. */
    purple = "purple",
    /** The style math object *Red*, which decorates content with colour #b71c1c. */
    red = "red",
    /** The style math object *Pink*, which decorates content with colour #e91e63. */
    pink = "pink",
    /** The style math object *Black*, which decorates content with colour #000000. */
    black = "black",
    /** The style math object *Dark grey*, which decorates content with colour #616161. */
    darkGrey = "darkGrey",
    /** The style math object *Grey*, which decorates content with colour #9e9e9e. */
    grey = "grey",
    /** The style math object *Light grey*, which decorates content with colour #e0e0e0. */
    lightGrey = "lightGrey",
    /** The style math object *White*, which decorates content with colour #ffffff. */
    white = "white",
    /** The hidden math object *Slash divides*, which inserts the / operator. */
    slashDivides = "slashDivides",
    /** The hidden math object *Text annotation*. */
    textAnnotation = "textAnnotation",
    /** The hidden math object *Zero vector*. */
    zeroVector = "zeroVector",
    /** The hidden math object *Planck constant*. */
    PlanckConstant = "PlanckConstant",
    /** The hidden math object *Reduced Planck constant*. */
    reduced_PlanckConstant = "reduced_PlanckConstant",
  }
  /**
   * The names of the subset of math editor commands that insert chemistry objects without any additional special behaviours.
   *
   * @see [[EditorCommand]]
   */
  const enum ChemistryObject {
    /** The chemistry math object *Yields*, which inserts the → operator. */
    yields = "yields",
    /** The chemistry math object *Does not yield*, which inserts the ↛ operator. */
    doesNotYield = "doesNotYield",
    /** The chemistry math object *Equilibrium*, which inserts the ⇌ operator. */
    equilibrium = "equilibrium",
    /** The chemistry math object *Yields both directions*, which inserts the ⇄ operator. */
    yieldsBothDirections = "yieldsBothDirections",
    /** The chemistry math object *Yields net backward*, which inserts the ← operator. */
    yieldsNetBackward = "yieldsNetBackward",
    /** The chemistry math object *Yields with heat*, which inserts the → operator with △ above. */
    yieldsWithHeat = "yieldsWithHeat",
    /** The chemistry math object *Yields with light*, which inserts the → operator with hν above. */
    yieldsWithLight = "yieldsWithLight",
    /** The chemistry math object *Yields with catalyst*. */
    yieldsWithCatalyst = "yieldsWithCatalyst",
    /** The chemistry math object *Caged atom*, which inserts the @ operator. */
    cagedAtom = "cagedAtom",
    /** The chemistry math object *Solid state*. */
    solidState = "solidState",
    /** The chemistry math object *Liquid state*. */
    liquidState = "liquidState",
    /** The chemistry math object *Gaseous state*. */
    gaseousState = "gaseousState",
    /** The chemistry math object *Aqueous state*. */
    aqueousState = "aqueousState",
    /** The chemistry math object *Crystalline state*. */
    crystallineState = "crystallineState",
    /** The chemistry math object *Precipitate produced*. */
    precipitateProduced = "precipitateProduced",
    /** The chemistry math object *Gas produced*. */
    gasProduced = "gasProduced",
    /** The chemistry math object *Electron*. */
    electron = "electron",
    /** The chemistry math object *Positron*. */
    positron = "positron",
    /** The chemistry math object *Proton*. */
    proton = "proton",
    /** The chemistry math object *Antiproton*. */
    antiproton = "antiproton",
    /** The chemistry math object *Neutron*. */
    neutron = "neutron",
    /** The chemistry math object *Antineutron*. */
    antineutron = "antineutron",
    /** The chemistry math object *Neutrino*. */
    neutrino = "neutrino",
    /** The chemistry math object *Antineutrino*. */
    antineutrino = "antineutrino",
    /** The chemistry math object *Muon*. */
    muon = "muon",
    /** The chemistry math object *Antimuon*. */
    antimuon = "antimuon",
    /** The chemistry math object *Muon neutrino*. */
    muonNeutrino = "muonNeutrino",
    /** The chemistry math object *Muon antineutrino*. */
    muonAntineutrino = "muonAntineutrino",
    /** The chemistry math object *Tauon*. */
    tauon = "tauon",
    /** The chemistry math object *Antitauon*. */
    antitauon = "antitauon",
    /** The chemistry math object *Tau neutrino*. */
    tauNeutrino = "tauNeutrino",
    /** The chemistry math object *Tau antineutrino*. */
    tauAntineutrino = "tauAntineutrino",
    /** The chemistry math object *Deuterium*. */
    deuterium = "deuterium",
    /** The chemistry math object *Tritium*. */
    tritium = "tritium",
    /** The chemistry math object *Thoron*. */
    thoron = "thoron",
    /** The chemistry math object *Hydrogen*, which inserts **H**, the symbol for the element with atomic number 1. */
    hydrogen = "hydrogen",
    /** The chemistry math object *Helium*, which inserts **He**, the symbol for the element with atomic number 2. */
    helium = "helium",
    /** The chemistry math object *Lithium*, which inserts **Li**, the symbol for the element with atomic number 3. */
    lithium = "lithium",
    /** The chemistry math object *Beryllium*, which inserts **Be**, the symbol for the element with atomic number 4. */
    beryllium = "beryllium",
    /** The chemistry math object *Boron*, which inserts **B**, the symbol for the element with atomic number 5. */
    boron = "boron",
    /** The chemistry math object *Carbon*, which inserts **C**, the symbol for the element with atomic number 6. */
    carbon = "carbon",
    /** The chemistry math object *Nitrogen*, which inserts **N**, the symbol for the element with atomic number 7. */
    nitrogen = "nitrogen",
    /** The chemistry math object *Oxygen*, which inserts **O**, the symbol for the element with atomic number 8. */
    oxygen = "oxygen",
    /** The chemistry math object *Fluorine*, which inserts **F**, the symbol for the element with atomic number 9. */
    fluorine = "fluorine",
    /** The chemistry math object *Neon*, which inserts **Ne**, the symbol for the element with atomic number 10. */
    neon = "neon",
    /** The chemistry math object *Sodium*, which inserts **Na**, the symbol for the element with atomic number 11. */
    sodium = "sodium",
    /** The chemistry math object *Magnesium*, which inserts **Mg**, the symbol for the element with atomic number 12. */
    magnesium = "magnesium",
    /** The chemistry math object *Aluminium*, which inserts **Al**, the symbol for the element with atomic number 13. */
    aluminium = "aluminium",
    /** The chemistry math object *Silicon*, which inserts **Si**, the symbol for the element with atomic number 14. */
    silicon = "silicon",
    /** The chemistry math object *Phosphorus*, which inserts **P**, the symbol for the element with atomic number 15. */
    phosphorus = "phosphorus",
    /** The chemistry math object *Sulfur*, which inserts **S**, the symbol for the element with atomic number 16. */
    sulfur = "sulfur",
    /** The chemistry math object *Chlorine*, which inserts **Cl**, the symbol for the element with atomic number 17. */
    chlorine = "chlorine",
    /** The chemistry math object *Argon*, which inserts **Ar**, the symbol for the element with atomic number 18. */
    argon = "argon",
    /** The chemistry math object *Potassium*, which inserts **K**, the symbol for the element with atomic number 19. */
    potassium = "potassium",
    /** The chemistry math object *Calcium*, which inserts **Ca**, the symbol for the element with atomic number 20. */
    calcium = "calcium",
    /** The chemistry math object *Scandium*, which inserts **Sc**, the symbol for the element with atomic number 21. */
    scandium = "scandium",
    /** The chemistry math object *Titanium*, which inserts **Ti**, the symbol for the element with atomic number 22. */
    titanium = "titanium",
    /** The chemistry math object *Vanadium*, which inserts **V**, the symbol for the element with atomic number 23. */
    vanadium = "vanadium",
    /** The chemistry math object *Chromium*, which inserts **Cr**, the symbol for the element with atomic number 24. */
    chromium = "chromium",
    /** The chemistry math object *Manganese*, which inserts **Mn**, the symbol for the element with atomic number 25. */
    manganese = "manganese",
    /** The chemistry math object *Iron*, which inserts **Fe**, the symbol for the element with atomic number 26. */
    iron = "iron",
    /** The chemistry math object *Cobalt*, which inserts **Co**, the symbol for the element with atomic number 27. */
    cobalt = "cobalt",
    /** The chemistry math object *Nickel*, which inserts **Ni**, the symbol for the element with atomic number 28. */
    nickel = "nickel",
    /** The chemistry math object *Copper*, which inserts **Cu**, the symbol for the element with atomic number 29. */
    copper = "copper",
    /** The chemistry math object *Zinc*, which inserts **Zn**, the symbol for the element with atomic number 30. */
    zinc = "zinc",
    /** The chemistry math object *Gallium*, which inserts **Ga**, the symbol for the element with atomic number 31. */
    gallium = "gallium",
    /** The chemistry math object *Germanium*, which inserts **Ge**, the symbol for the element with atomic number 32. */
    germanium = "germanium",
    /** The chemistry math object *Arsenic*, which inserts **As**, the symbol for the element with atomic number 33. */
    arsenic = "arsenic",
    /** The chemistry math object *Selenium*, which inserts **Se**, the symbol for the element with atomic number 34. */
    selenium = "selenium",
    /** The chemistry math object *Bromine*, which inserts **Br**, the symbol for the element with atomic number 35. */
    bromine = "bromine",
    /** The chemistry math object *Krypton*, which inserts **Kr**, the symbol for the element with atomic number 36. */
    krypton = "krypton",
    /** The chemistry math object *Rubidium*, which inserts **Rb**, the symbol for the element with atomic number 37. */
    rubidium = "rubidium",
    /** The chemistry math object *Strontium*, which inserts **Sr**, the symbol for the element with atomic number 38. */
    strontium = "strontium",
    /** The chemistry math object *Yttrium*, which inserts **Y**, the symbol for the element with atomic number 39. */
    yttrium = "yttrium",
    /** The chemistry math object *Zirconium*, which inserts **Zr**, the symbol for the element with atomic number 40. */
    zirconium = "zirconium",
    /** The chemistry math object *Niobium*, which inserts **Nb**, the symbol for the element with atomic number 41. */
    niobium = "niobium",
    /** The chemistry math object *Molybdenum*, which inserts **Mo**, the symbol for the element with atomic number 42. */
    molybdenum = "molybdenum",
    /** The chemistry math object *Technetium*, which inserts **Tc**, the symbol for the element with atomic number 43. */
    technetium = "technetium",
    /** The chemistry math object *Ruthenium*, which inserts **Ru**, the symbol for the element with atomic number 44. */
    ruthenium = "ruthenium",
    /** The chemistry math object *Rhodium*, which inserts **Rh**, the symbol for the element with atomic number 45. */
    rhodium = "rhodium",
    /** The chemistry math object *Palladium*, which inserts **Pd**, the symbol for the element with atomic number 46. */
    palladium = "palladium",
    /** The chemistry math object *Silver*, which inserts **Ag**, the symbol for the element with atomic number 47. */
    silver = "silver",
    /** The chemistry math object *Cadmium*, which inserts **Cd**, the symbol for the element with atomic number 48. */
    cadmium = "cadmium",
    /** The chemistry math object *Indium*, which inserts **In**, the symbol for the element with atomic number 49. */
    indium = "indium",
    /** The chemistry math object *Tin*, which inserts **Sn**, the symbol for the element with atomic number 50. */
    tin = "tin",
    /** The chemistry math object *Antimony*, which inserts **Sb**, the symbol for the element with atomic number 51. */
    antimony = "antimony",
    /** The chemistry math object *Tellurium*, which inserts **Te**, the symbol for the element with atomic number 52. */
    tellurium = "tellurium",
    /** The chemistry math object *Iodine*, which inserts **I**, the symbol for the element with atomic number 53. */
    iodine = "iodine",
    /** The chemistry math object *Xenon*, which inserts **Xe**, the symbol for the element with atomic number 54. */
    xenon = "xenon",
    /** The chemistry math object *Cesium*, which inserts **Cs**, the symbol for the element with atomic number 55. */
    cesium = "cesium",
    /** The chemistry math object *Barium*, which inserts **Ba**, the symbol for the element with atomic number 56. */
    barium = "barium",
    /** The chemistry math object *Lanthanum*, which inserts **La**, the symbol for the element with atomic number 57. */
    lanthanum = "lanthanum",
    /** The chemistry math object *Cerium*, which inserts **Ce**, the symbol for the element with atomic number 58. */
    cerium = "cerium",
    /** The chemistry math object *Praseodymium*, which inserts **Pr**, the symbol for the element with atomic number 59. */
    praseodymium = "praseodymium",
    /** The chemistry math object *Neodymium*, which inserts **Nd**, the symbol for the element with atomic number 60. */
    neodymium = "neodymium",
    /** The chemistry math object *Promethium*, which inserts **Pm**, the symbol for the element with atomic number 61. */
    promethium = "promethium",
    /** The chemistry math object *Samarium*, which inserts **Sm**, the symbol for the element with atomic number 62. */
    samarium = "samarium",
    /** The chemistry math object *Europium*, which inserts **Eu**, the symbol for the element with atomic number 63. */
    europium = "europium",
    /** The chemistry math object *Gadolinium*, which inserts **Gd**, the symbol for the element with atomic number 64. */
    gadolinium = "gadolinium",
    /** The chemistry math object *Terbium*, which inserts **Tb**, the symbol for the element with atomic number 65. */
    terbium = "terbium",
    /** The chemistry math object *Dysprosium*, which inserts **Dy**, the symbol for the element with atomic number 66. */
    dysprosium = "dysprosium",
    /** The chemistry math object *Holmium*, which inserts **Ho**, the symbol for the element with atomic number 67. */
    holmium = "holmium",
    /** The chemistry math object *Erbium*, which inserts **Er**, the symbol for the element with atomic number 68. */
    erbium = "erbium",
    /** The chemistry math object *Thulium*, which inserts **Tm**, the symbol for the element with atomic number 69. */
    thulium = "thulium",
    /** The chemistry math object *Ytterbium*, which inserts **Yb**, the symbol for the element with atomic number 70. */
    ytterbium = "ytterbium",
    /** The chemistry math object *Lutetium*, which inserts **Lu**, the symbol for the element with atomic number 71. */
    lutetium = "lutetium",
    /** The chemistry math object *Hafnium*, which inserts **Hf**, the symbol for the element with atomic number 72. */
    hafnium = "hafnium",
    /** The chemistry math object *Tantalum*, which inserts **Ta**, the symbol for the element with atomic number 73. */
    tantalum = "tantalum",
    /** The chemistry math object *Tungsten*, which inserts **W**, the symbol for the element with atomic number 74. */
    tungsten = "tungsten",
    /** The chemistry math object *Rhenium*, which inserts **Re**, the symbol for the element with atomic number 75. */
    rhenium = "rhenium",
    /** The chemistry math object *Osmium*, which inserts **Os**, the symbol for the element with atomic number 76. */
    osmium = "osmium",
    /** The chemistry math object *Iridium*, which inserts **Ir**, the symbol for the element with atomic number 77. */
    iridium = "iridium",
    /** The chemistry math object *Platinum*, which inserts **Pt**, the symbol for the element with atomic number 78. */
    platinum = "platinum",
    /** The chemistry math object *Gold*, which inserts **Au**, the symbol for the element with atomic number 79. */
    gold = "gold",
    /** The chemistry math object *Mercury*, which inserts **Hg**, the symbol for the element with atomic number 80. */
    mercury = "mercury",
    /** The chemistry math object *Thallium*, which inserts **Tl**, the symbol for the element with atomic number 81. */
    thallium = "thallium",
    /** The chemistry math object *Lead*, which inserts **Pb**, the symbol for the element with atomic number 82. */
    lead = "lead",
    /** The chemistry math object *Bismuth*, which inserts **Bi**, the symbol for the element with atomic number 83. */
    bismuth = "bismuth",
    /** The chemistry math object *Polonium*, which inserts **Po**, the symbol for the element with atomic number 84. */
    polonium = "polonium",
    /** The chemistry math object *Astatine*, which inserts **At**, the symbol for the element with atomic number 85. */
    astatine = "astatine",
    /** The chemistry math object *Radon*, which inserts **Rn**, the symbol for the element with atomic number 86. */
    radon = "radon",
    /** The chemistry math object *Francium*, which inserts **Fr**, the symbol for the element with atomic number 87. */
    francium = "francium",
    /** The chemistry math object *Radium*, which inserts **Ra**, the symbol for the element with atomic number 88. */
    radium = "radium",
    /** The chemistry math object *Actinium*, which inserts **Ac**, the symbol for the element with atomic number 89. */
    actinium = "actinium",
    /** The chemistry math object *Thorium*, which inserts **Th**, the symbol for the element with atomic number 90. */
    thorium = "thorium",
    /** The chemistry math object *Protactinium*, which inserts **Pa**, the symbol for the element with atomic number 91. */
    protactinium = "protactinium",
    /** The chemistry math object *Uranium*, which inserts **U**, the symbol for the element with atomic number 92. */
    uranium = "uranium",
    /** The chemistry math object *Neptunium*, which inserts **Np**, the symbol for the element with atomic number 93. */
    neptunium = "neptunium",
    /** The chemistry math object *Plutonium*, which inserts **Pu**, the symbol for the element with atomic number 94. */
    plutonium = "plutonium",
    /** The chemistry math object *Americium*, which inserts **Am**, the symbol for the element with atomic number 95. */
    americium = "americium",
    /** The chemistry math object *Curium*, which inserts **Cm**, the symbol for the element with atomic number 96. */
    curium = "curium",
    /** The chemistry math object *Berkelium*, which inserts **Bk**, the symbol for the element with atomic number 97. */
    berkelium = "berkelium",
    /** The chemistry math object *Californium*, which inserts **Cf**, the symbol for the element with atomic number 98. */
    californium = "californium",
    /** The chemistry math object *Einsteinium*, which inserts **Es**, the symbol for the element with atomic number 99. */
    einsteinium = "einsteinium",
    /** The chemistry math object *Fermium*, which inserts **Fm**, the symbol for the element with atomic number 100. */
    fermium = "fermium",
    /** The chemistry math object *Mendelevium*, which inserts **Md**, the symbol for the element with atomic number 101. */
    mendelevium = "mendelevium",
    /** The chemistry math object *Nobelium*, which inserts **No**, the symbol for the element with atomic number 102. */
    nobelium = "nobelium",
    /** The chemistry math object *Lawrencium*, which inserts **Lr**, the symbol for the element with atomic number 103. */
    lawrencium = "lawrencium",
    /** The chemistry math object *Rutherfordium*, which inserts **Rf**, the symbol for the element with atomic number 104. */
    rutherfordium = "rutherfordium",
    /** The chemistry math object *Dubnium*, which inserts **Db**, the symbol for the element with atomic number 105. */
    dubnium = "dubnium",
    /** The chemistry math object *Seaborgium*, which inserts **Sg**, the symbol for the element with atomic number 106. */
    seaborgium = "seaborgium",
    /** The chemistry math object *Bohrium*, which inserts **Bh**, the symbol for the element with atomic number 107. */
    bohrium = "bohrium",
    /** The chemistry math object *Hassium*, which inserts **Hs**, the symbol for the element with atomic number 108. */
    hassium = "hassium",
    /** The chemistry math object *Meitnerium*, which inserts **Mt**, the symbol for the element with atomic number 109. */
    meitnerium = "meitnerium",
    /** The chemistry math object *Darmstadtium*, which inserts **Ds**, the symbol for the element with atomic number 110. */
    darmstadtium = "darmstadtium",
    /** The chemistry math object *Roentgenium*, which inserts **Rg**, the symbol for the element with atomic number 111. */
    roentgenium = "roentgenium",
    /** The chemistry math object *Copernicium*, which inserts **Cn**, the symbol for the element with atomic number 112. */
    copernicium = "copernicium",
    /** The chemistry math object *Nihonium*, which inserts **Nh**, the symbol for the element with atomic number 113. */
    nihonium = "nihonium",
    /** The chemistry math object *Flerovium*, which inserts **Fl**, the symbol for the element with atomic number 114. */
    flerovium = "flerovium",
    /** The chemistry math object *Moscovium*, which inserts **Mc**, the symbol for the element with atomic number 115. */
    moscovium = "moscovium",
    /** The chemistry math object *Livermorium*, which inserts **Lv**, the symbol for the element with atomic number 116. */
    livermorium = "livermorium",
    /** The chemistry math object *Tennessine*, which inserts **Ts**, the symbol for the element with atomic number 117. */
    tennessine = "tennessine",
    /** The chemistry math object *Oganesson*, which inserts **Og**, the symbol for the element with atomic number 118. */
    oganesson = "oganesson",
    /** The chemistry math object *Ununennium*, which inserts **Uue**, the symbol for the element with atomic number 119. */
    ununennium = "ununennium",
  }
  /**
   * The names of *all* built-in editor commands. This is a superset of [[MathObject]] and [[ChemistryObject]] which also includes general editing commands.
   */
  const enum EditorCommand {
    /** The movement editor command *Move up*. */
    moveUp = "moveUp",
    /** The movement editor command *Move down*. */
    moveDown = "moveDown",
    /** The movement editor command *Move left*. */
    moveLeft = "moveLeft",
    /** The movement editor command *Move right*. */
    moveRight = "moveRight",
    /** The movement editor command *Move left fast*. */
    moveLeftFast = "moveLeftFast",
    /** The movement editor command *Move right fast*. */
    moveRightFast = "moveRightFast",
    /** The movement editor command *Move to field start*. */
    moveToFieldStart = "moveToFieldStart",
    /** The movement editor command *Move to field end*. */
    moveToFieldEnd = "moveToFieldEnd",
    /** The movement editor command *Move to line start*. */
    moveToLineStart = "moveToLineStart",
    /** The movement editor command *Move to line end*. */
    moveToLineEnd = "moveToLineEnd",
    /** The movement editor command *Move to document start*. */
    moveToDocumentStart = "moveToDocumentStart",
    /** The movement editor command *Move to document end*. */
    moveToDocumentEnd = "moveToDocumentEnd",
    /** The movement editor command *Forward enter*. */
    forwardEnter = "forwardEnter",
    /** The movement editor command *Backward enter*. */
    backwardEnter = "backwardEnter",
    /** The movement editor command *Move line up*. */
    moveLineUp = "moveLineUp",
    /** The movement editor command *Move line down*. */
    moveLineDown = "moveLineDown",
    /** The movement editor command *Move left in field*. */
    moveLeftInField = "moveLeftInField",
    /** The movement editor command *Move right in field*. */
    moveRightInField = "moveRightInField",
    /** The movement editor command *Leave parentheses*. */
    leaveParentheses = "leaveParentheses",
    /** The movement editor command *Leave brackets*. */
    leaveBrackets = "leaveBrackets",
    /** The movement editor command *Leave braces*. */
    leaveBraces = "leaveBraces",
    /** The selection editor command *Select left*. */
    selectLeft = "selectLeft",
    /** The selection editor command *Select right*. */
    selectRight = "selectRight",
    /** The selection editor command *Select left fast*. */
    selectLeftFast = "selectLeftFast",
    /** The selection editor command *Select right fast*. */
    selectRightFast = "selectRightFast",
    /** The selection editor command *Select to field start*. */
    selectToFieldStart = "selectToFieldStart",
    /** The selection editor command *Select to field end*. */
    selectToFieldEnd = "selectToFieldEnd",
    /** The selection editor command *Select more*. */
    selectMore = "selectMore",
    /** The selection editor command *Select less*. */
    selectLess = "selectLess",
    /** The selection editor command *Select line*. */
    selectLine = "selectLine",
    /** The selection editor command *Select number*. */
    selectNumber = "selectNumber",
    /** The editing editor command *Expand abbreviation*. */
    expandAbbreviation = "expandAbbreviation",
    /** The editing editor command *Show abbreviation completions*. */
    showAbbreviationCompletions = "showAbbreviationCompletions",
    /** The editing editor command *Duplicate line*. */
    duplicateLine = "duplicateLine",
    /** The editing editor command *Unwrap*. */
    unwrap = "unwrap",
    /** The editing editor command *Unwrap and select*. */
    unwrapAndSelect = "unwrapAndSelect",
    /** The editing editor command *Take reciprocal*. */
    takeReciprocal = "takeReciprocal",
    /** The editing editor command *Pull in from left*. */
    pullInFromLeft = "pullInFromLeft",
    /** The editing editor command *Pull in from right*. */
    pullInFromRight = "pullInFromRight",
    /** The editing editor command *Push out to left*. */
    pushOutToLeft = "pushOutToLeft",
    /** The editing editor command *Push out to right*. */
    pushOutToRight = "pushOutToRight",
    /** The editing editor command *Forward delete*. */
    forwardDelete = "forwardDelete",
    /** The editing editor command *Line joining forward delete*. */
    lineJoiningForwardDelete = "lineJoiningForwardDelete",
    /** The editing editor command *Backward delete*. */
    backwardDelete = "backwardDelete",
    /** The editing editor command *Line joining backward delete*. */
    lineJoiningBackwardDelete = "lineJoiningBackwardDelete",
    /** The editing editor command *Join lines*. */
    joinLines = "joinLines",
    /** The editing editor command *Split line*. */
    splitLine = "splitLine",
    /** The editing editor command *Split text*. */
    splitText = "splitText",
    /** The editing editor command *Undo*. */
    undo = "undo",
    /** The editing editor command *Redo*. */
    redo = "redo",
    /** The editing editor command *Cut*. */
    cut = "cut",
    /** The editing editor command *Copy*. */
    copy = "copy",
    /** The editing editor command *Paste*. */
    paste = "paste",
    /** The variable math object *Identifier*. */
    identifier = "identifier",
    /** The variable editor command *Change type to scalar*, which changes the data type of the variable or identifier under the caret. */
    changeTypeToScalar = "changeTypeToScalar",
    /** The variable editor command *Change type to set*, which changes the data type of the variable or identifier under the caret. */
    changeTypeToSet = "changeTypeToSet",
    /** The variable editor command *Change type to point*, which changes the data type of the variable or identifier under the caret. */
    changeTypeToPoint = "changeTypeToPoint",
    /** The variable editor command *Change type to vector*, which changes the data type of the variable or identifier under the caret. */
    changeTypeToVector = "changeTypeToVector",
    /** The variable editor command *Change type to tensor*, which changes the data type of the variable or identifier under the caret. */
    changeTypeToTensor = "changeTypeToTensor",
    /** The variable editor command *Change type to matrix*, which changes the data type of the variable or identifier under the caret. */
    changeTypeToMatrix = "changeTypeToMatrix",
    /** The variable editor command *Change type to string*, which changes the data type of the variable or identifier under the caret. */
    changeTypeToString = "changeTypeToString",
    /** The variable editor command *Remove accent*. */
    removeAccent = "removeAccent",
    /** The variable editor command *Change accent to acute*, which changes the accent of the variable under the caret to *x́*. */
    changeAccentToAcute = "changeAccentToAcute",
    /** The variable editor command *Change accent to bar*, which changes the accent of the variable under the caret to *x̄*. */
    changeAccentToBar = "changeAccentToBar",
    /** The variable editor command *Change accent to breve*, which changes the accent of the variable under the caret to *x̆*. */
    changeAccentToBreve = "changeAccentToBreve",
    /** The variable editor command *Change accent to check*, which changes the accent of the variable under the caret to *x̌*. */
    changeAccentToCheck = "changeAccentToCheck",
    /** The variable editor command *Change accent to dot*, which changes the accent of the variable under the caret to *ẋ*. */
    changeAccentToDot = "changeAccentToDot",
    /** The variable editor command *Change accent to dots*, which changes the accent of the variable under the caret to *ẍ*. */
    changeAccentToDots = "changeAccentToDots",
    /** The variable editor command *Change accent to grave*, which changes the accent of the variable under the caret to *x̀*. */
    changeAccentToGrave = "changeAccentToGrave",
    /** The variable editor command *Change accent to hat*, which changes the accent of the variable under the caret to *x̂*. */
    changeAccentToHat = "changeAccentToHat",
    /** The variable editor command *Change accent to tilde*, which changes the accent of the variable under the caret to *x̃*. */
    changeAccentToTilde = "changeAccentToTilde",
    /** The arithmetic math object *Plus*, which inserts the + operator. */
    plus = "plus",
    /** The arithmetic math object *Minus*, which inserts the − operator. */
    minus = "minus",
    /** The arithmetic math object *Times dot*, which inserts the ⋅ operator. */
    timesDot = "timesDot",
    /** The arithmetic math object *Times cross*, which inserts the ⨯ operator. */
    timesCross = "timesCross",
    /** The arithmetic math object *Divided by*, which inserts the ÷ operator. */
    dividedBy = "dividedBy",
    /** The arithmetic math object *Fraction*. */
    fraction = "fraction",
    /** The arithmetic editor command *Natural fraction*. */
    naturalFraction = "naturalFraction",
    /** The arithmetic math object *To the power*. */
    toThePower = "toThePower",
    /** The arithmetic math object *Subscript index*. */
    subscriptIndex = "subscriptIndex",
    /** The arithmetic math object *Plus or minus*, which inserts the ± operator. */
    plusOrMinus = "plusOrMinus",
    /** The arithmetic math object *Minus or plus*, which inserts the ∓ operator. */
    minusOrPlus = "minusOrPlus",
    /** The arithmetic math object *Square root*. */
    squareRoot = "squareRoot",
    /** The arithmetic math object *Cube root*. */
    cubeRoot = "cubeRoot",
    /** The arithmetic math object *Root*. */
    root = "root",
    /** The arithmetic math object *Percent*, which inserts the % operator. */
    percent = "percent",
    /** The arithmetic math object *Ratio*, which inserts the : operator. */
    ratio = "ratio",
    /** The arithmetic math object *Divides*, which inserts the ∣ operator. */
    divides = "divides",
    /** The arithmetic math object *Does not divide*, which inserts the ∤ operator. */
    doesNotDivide = "doesNotDivide",
    /** The arithmetic math object *Remainder after division*, which inserts the mod operator. */
    remainderAfterDivision = "remainderAfterDivision",
    /** The arithmetic math object *Congruent modulo*. */
    congruentModulo = "congruentModulo",
    /** The arithmetic math object *Not congruent modulo*. */
    notCongruentModulo = "notCongruentModulo",
    /** The relation math object *Equal to*, which inserts the = operator. */
    equalTo = "equalTo",
    /** The relation math object *Not equal to*, which inserts the ≠ operator. */
    notEqualTo = "notEqualTo",
    /** The relation math object *Approximately equal to*, which inserts the ≈ operator. */
    approximatelyEqualTo = "approximatelyEqualTo",
    /** The relation math object *Defined to be equal to*, which inserts the ≝ operator. */
    definedToBeEqualTo = "definedToBeEqualTo",
    /** The relation math object *Questioned equal to*, which inserts the ≟ operator. */
    questionedEqualTo = "questionedEqualTo",
    /** The relation math object *Identical to*, which inserts the ≡ operator. */
    identicalTo = "identicalTo",
    /** The relation math object *Not identical to*, which inserts the ≢ operator. */
    notIdenticalTo = "notIdenticalTo",
    /** The relation math object *Proportional to*, which inserts the ∝ operator. */
    proportionalTo = "proportionalTo",
    /** The relation math object *Corresponds to*, which inserts the ≙ operator. */
    correspondsTo = "correspondsTo",
    /** The relation math object *Less than*, which inserts the < operator. */
    lessThan = "lessThan",
    /** The relation math object *Greater than*, which inserts the > operator. */
    greaterThan = "greaterThan",
    /** The relation math object *Less than or equal to*, which inserts the ≤ operator. */
    lessThanOrEqualTo = "lessThanOrEqualTo",
    /** The relation math object *Greater than or equal to*, which inserts the ≥ operator. */
    greaterThanOrEqualTo = "greaterThanOrEqualTo",
    /** The relation math object *Not less than*, which inserts the ≮ operator. */
    notLessThan = "notLessThan",
    /** The relation math object *Not greater than*, which inserts the ≯ operator. */
    notGreaterThan = "notGreaterThan",
    /** The relation math object *Not less than or equal to*, which inserts the ≰ operator. */
    notLessThanOrEqualTo = "notLessThanOrEqualTo",
    /** The relation math object *Not greater than or equal to*, which inserts the ≱ operator. */
    notGreaterThanOrEqualTo = "notGreaterThanOrEqualTo",
    /** The relation math object *Much less than*, which inserts the ≪ operator. */
    muchLessThan = "muchLessThan",
    /** The relation math object *Much greater than*, which inserts the ≫ operator. */
    muchGreaterThan = "muchGreaterThan",
    /** The relation math object *Less than or approximately*, which inserts the ⪅ operator. */
    lessThanOrApproximately = "lessThanOrApproximately",
    /** The relation math object *Greater than or approximately*, which inserts the ⪆ operator. */
    greaterThanOrApproximately = "greaterThanOrApproximately",
    /** The relation math object *Precedes*, which inserts the ≺ operator. */
    precedes = "precedes",
    /** The relation math object *Succeeds*, which inserts the ≻ operator. */
    succeeds = "succeeds",
    /** The relation math object *Precedes or equal to*, which inserts the ≼ operator. */
    precedesOrEqualTo = "precedesOrEqualTo",
    /** The relation math object *Succeeds or equal to*, which inserts the ≽ operator. */
    succeedsOrEqualTo = "succeedsOrEqualTo",
    /** The relation math object *Does not precede*, which inserts the ⊀ operator. */
    doesNotPrecede = "doesNotPrecede",
    /** The relation math object *Does not succeed*, which inserts the ⊁ operator. */
    doesNotSucceed = "doesNotSucceed",
    /** The relation math object *Does not precede or equal*, which inserts the ⋠ operator. */
    doesNotPrecedeOrEqual = "doesNotPrecedeOrEqual",
    /** The relation math object *Does not succeed or equal*, which inserts the ⋡ operator. */
    doesNotSucceedOrEqual = "doesNotSucceedOrEqual",
    /** The bracket math object *Parentheses*, which inserts (…) brackets. */
    parentheses = "parentheses",
    /** The bracket math object *Brackets*, which inserts […] brackets. */
    brackets = "brackets",
    /** The bracket math object *Angle brackets*, which inserts ⟨…⟩ brackets. */
    angleBrackets = "angleBrackets",
    /** The bracket math object *Absolute value*, which inserts |…| brackets. */
    absoluteValue = "absoluteValue",
    /** The bracket math object *Floor*, which inserts ⌊…⌋ brackets. */
    floor = "floor",
    /** The bracket math object *Ceiling*, which inserts ⌈…⌉ brackets. */
    ceiling = "ceiling",
    /** The unit math object *Unit*. */
    unit = "unit",
    /** The unit math object *Degrees*. */
    degrees = "degrees",
    /** The unit math object *Arcminutes*. */
    arcminutes = "arcminutes",
    /** The unit math object *Arcseconds*. */
    arcseconds = "arcseconds",
    /** The unit math object *Degrees celsius*. */
    degreesCelsius = "degreesCelsius",
    /** The unit math object *Degrees fahrenheit*. */
    degreesFahrenheit = "degreesFahrenheit",
    /** The unit math object *Dollars*. */
    dollars = "dollars",
    /** The unit math object *Pounds sterling*. */
    poundsSterling = "poundsSterling",
    /** The unit math object *Euros*. */
    euros = "euros",
    /** The logic math object *Boolean true*. */
    booleanTrue = "booleanTrue",
    /** The logic math object *Boolean false*. */
    booleanFalse = "booleanFalse",
    /** The logic math object *Tautology*, which inserts the ⊤ operator. */
    tautology = "tautology",
    /** The logic math object *Contradiction*, which inserts the ⊥ operator. */
    contradiction = "contradiction",
    /** The logic math object *Conjunction*, which inserts the ∧ operator. */
    conjunction = "conjunction",
    /** The logic math object *Disjunction*, which inserts the ∨ operator. */
    disjunction = "disjunction",
    /** The logic math object *Exclusive disjunction*, which inserts the ⊻ operator. */
    exclusiveDisjunction = "exclusiveDisjunction",
    /** The logic math object *Negation*, which inserts the ¬ operator. */
    negation = "negation",
    /** The logic math object *Implies*, which inserts the ⇒ operator. */
    implies = "implies",
    /** The logic math object *Equivalent to*, which inserts the ⇔ operator. */
    equivalentTo = "equivalentTo",
    /** The logic math object *For all*, which inserts the ∀ operator. */
    forAll = "forAll",
    /** The logic math object *There exists*, which inserts the ∃ operator. */
    thereExists = "thereExists",
    /** The logic math object *There exists one*, which inserts the ∃¹ operator. */
    thereExistsOne = "thereExistsOne",
    /** The logic math object *Necessarily*, which inserts the ◻ operator. */
    necessarily = "necessarily",
    /** The logic math object *Possibly*, which inserts the ◊ operator. */
    possibly = "possibly",
    /** The logic math object *Provable*, which inserts the ⊢ operator. */
    provable = "provable",
    /** The logic math object *Entails*, which inserts the ⊨ operator. */
    entails = "entails",
    /** The logic math object *Therefore*, which inserts the ∴ operator. */
    therefore = "therefore",
    /** The logic math object *Because*, which inserts the ∵ operator. */
    because = "because",
    /** The logic math object *End of proof*, which inserts the ■ operator. */
    endOfProof = "endOfProof",
    /** The logic math object *n‐ary conjunction*, which inserts a big ⋀ operator. */
    naryConjunction = "naryConjunction",
    /** The logic math object *n‐ary disjunction*, which inserts a big ⋁ operator. */
    naryDisjunction = "naryDisjunction",
    /** The set math object *Set literal*, which inserts {…} brackets. */
    setLiteral = "setLiteral",
    /** The set math object *Set builder*. */
    setBuilder = "setBuilder",
    /** The set math object *Empty set*, which inserts the ∅ operator. */
    emptySet = "emptySet",
    /** The set math object *Power set*. */
    powerSet = "powerSet",
    /** The set math object *Separator*, which inserts the , operator. */
    separator = "separator",
    /** The set math object *Ellipsis*, which inserts the ⋯ operator. */
    ellipsis = "ellipsis",
    /** The set math object *Element of*, which inserts the ∈ operator. */
    elementOf = "elementOf",
    /** The set math object *Not an element of*, which inserts the ∉ operator. */
    notAnElementOf = "notAnElementOf",
    /** The set math object *Union*, which inserts the ∪ operator. */
    union = "union",
    /** The set math object *Intersection*, which inserts the ∩ operator. */
    intersection = "intersection",
    /** The set math object *Set difference*, which inserts the ∖ operator. */
    setDifference = "setDifference",
    /** The set math object *Symmetric difference*, which inserts the ⊖ operator. */
    symmetricDifference = "symmetricDifference",
    /** The set math object *Contains*, which inserts the ∋ operator. */
    contains = "contains",
    /** The set math object *Does not contain*, which inserts the ∌ operator. */
    doesNotContain = "doesNotContain",
    /** The set math object *Subset*, which inserts the ⊆ operator. */
    subset = "subset",
    /** The set math object *Not a subset*, which inserts the ⊈ operator. */
    notASubset = "notASubset",
    /** The set math object *Strict subset*, which inserts the ⊂ operator. */
    strictSubset = "strictSubset",
    /** The set math object *Not a strict subset*, which inserts the ⊄ operator. */
    notAStrictSubset = "notAStrictSubset",
    /** The set math object *Superset*, which inserts the ⊇ operator. */
    superset = "superset",
    /** The set math object *Not a superset*, which inserts the ⊉ operator. */
    notASuperset = "notASuperset",
    /** The set math object *Strict superset*, which inserts the ⊃ operator. */
    strictSuperset = "strictSuperset",
    /** The set math object *Not a strict superset*, which inserts the ⊅ operator. */
    notAStrictSuperset = "notAStrictSuperset",
    /** The set math object *Universal set*. */
    universalSet = "universalSet",
    /** The set math object *Natural numbers*. */
    naturalNumbers = "naturalNumbers",
    /** The set math object *Integer numbers*. */
    integerNumbers = "integerNumbers",
    /** The set math object *Rational numbers*. */
    rationalNumbers = "rationalNumbers",
    /** The set math object *Real numbers*. */
    realNumbers = "realNumbers",
    /** The set math object *Complex numbers*. */
    complexNumbers = "complexNumbers",
    /** The set math object *Prime numbers*. */
    primeNumbers = "primeNumbers",
    /** The set math object *Aleph number*. */
    alephNumber = "alephNumber",
    /** The set math object *Beth number*. */
    bethNumber = "bethNumber",
    /** The set math object *Closed interval*, which inserts an […, …] interval. */
    closedInterval = "closedInterval",
    /** The set math object *Left half open interval*, which inserts an (…, …] interval. */
    leftHalfOpenInterval = "leftHalfOpenInterval",
    /** The set math object *Right half open interval*, which inserts an […, …) interval. */
    rightHalfOpenInterval = "rightHalfOpenInterval",
    /** The set math object *Open interval*, which inserts an (…, …) interval. */
    openInterval = "openInterval",
    /** The set math object *n‐ary intersection*, which inserts a big ⋂ operator. */
    naryIntersection = "naryIntersection",
    /** The set math object *n‐ary union*, which inserts a big ⋃ operator. */
    naryUnion = "naryUnion",
    /** The geometry math object *Pi*. */
    pi = "pi",
    /** The geometry math object *Parallel to*, which inserts the ∥ operator. */
    parallelTo = "parallelTo",
    /** The geometry math object *Not parallel to*, which inserts the ∦ operator. */
    notParallelTo = "notParallelTo",
    /** The geometry math object *Perpendicular to*, which inserts the ⟂ operator. */
    perpendicularTo = "perpendicularTo",
    /** The geometry math object *Congruent to*, which inserts the ≅ operator. */
    congruentTo = "congruentTo",
    /** The geometry math object *Similar to*, which inserts the ∼ operator. */
    similarTo = "similarTo",
    /** The geometry math object *Angle*, which inserts the ∠ operator. */
    angle = "angle",
    /** The geometry math object *Measured angle*, which inserts the ∡ operator. */
    measuredAngle = "measuredAngle",
    /** The geometry math object *Spherical angle*, which inserts the ∢ operator. */
    sphericalAngle = "sphericalAngle",
    /** The geometry math object *Line from points*. */
    lineFromPoints = "lineFromPoints",
    /** The geometry math object *Line segment from points*. */
    lineSegmentFromPoints = "lineSegmentFromPoints",
    /** The geometry math object *Ray from points*. */
    rayFromPoints = "rayFromPoints",
    /** The geometry math object *Arc from points*. */
    arcFromPoints = "arcFromPoints",
    /** The geometry math object *Distance function*. */
    distanceFunction = "distanceFunction",
    /** The geometry math object *Measure function*. */
    measureFunction = "measureFunction",
    /** The geometry math object *Triangle*, which inserts the △ operator. */
    triangle = "triangle",
    /** The geometry math object *Square*, which inserts the □ operator. */
    square = "square",
    /** The geometry math object *Circle*, which inserts the ○ operator. */
    circle = "circle",
    /** The function math object *Function*. */
    function = "function",
    /** The function math object *Composite function*, which inserts the ∘ operator. */
    compositeFunction = "compositeFunction",
    /** The function math object *Inverse*. */
    inverse = "inverse",
    /** The function math object *Maps to*, which inserts the ↦ operator. */
    mapsTo = "mapsTo",
    /** The function math object *Piecewise function*. */
    piecewiseFunction = "piecewiseFunction",
    /** The function math object *Evaluate function*. */
    evaluateFunction = "evaluateFunction",
    /** The function math object *Greatest common divisor*. */
    greatestCommonDivisor = "greatestCommonDivisor",
    /** The function math object *Least common multiple*. */
    leastCommonMultiple = "leastCommonMultiple",
    /** The function math object *Minimum of*. */
    minimumOf = "minimumOf",
    /** The function math object *Maximum of*. */
    maximumOf = "maximumOf",
    /** The function math object *Integer part of*. */
    integerPartOf = "integerPartOf",
    /** The function math object *Fractional part of*. */
    fractionalPartOf = "fractionalPartOf",
    /** The function math object *Round*. */
    round = "round",
    /** The function math object *Signum*. */
    signum = "signum",
    /** The function math object *Random number*. */
    randomNumber = "randomNumber",
    /** The function math object *Logarithm*. */
    logarithm = "logarithm",
    /** The function math object *Decimal logarithm*. */
    decimalLogarithm = "decimalLogarithm",
    /** The function math object *Binary logarithm*. */
    binaryLogarithm = "binaryLogarithm",
    /** The function math object *Natural logarithm*. */
    naturalLogarithm = "naturalLogarithm",
    /** The function math object *Summation*, which inserts a big ∑ operator. */
    summation = "summation",
    /** The function math object *Product*, which inserts a big ∏ operator. */
    product = "product",
    /** The function math object *Coproduct*, which inserts a big ∐ operator. */
    coproduct = "coproduct",
    /** The combinatoric math object *Factorial*, which inserts the ! operator. */
    factorial = "factorial",
    /** The combinatoric math object *Rising factorial*. */
    risingFactorial = "risingFactorial",
    /** The combinatoric math object *Falling factorial*. */
    fallingFactorial = "fallingFactorial",
    /** The combinatoric math object *Binomial coefficient*. */
    binomialCoefficient = "binomialCoefficient",
    /** The combinatoric math object *Permutations*. */
    permutations = "permutations",
    /** The combinatoric math object *Permutations with repetitions*. */
    permutationsWithRepetitions = "permutationsWithRepetitions",
    /** The combinatoric math object *Combinations*. */
    combinations = "combinations",
    /** The combinatoric math object *Combinations with repetitions*. */
    combinationsWithRepetitions = "combinationsWithRepetitions",
    /** The combinatoric math object *Probability*. */
    probability = "probability",
    /** The combinatoric math object *Conditional probability*. */
    conditionalProbability = "conditionalProbability",
    /** The trigonometry math object *Sine*. */
    sine = "sine",
    /** The trigonometry math object *Cosine*. */
    cosine = "cosine",
    /** The trigonometry math object *Tangent*. */
    tangent = "tangent",
    /** The trigonometry math object *Cotangent*. */
    cotangent = "cotangent",
    /** The trigonometry math object *Secant*. */
    secant = "secant",
    /** The trigonometry math object *Cosecant*. */
    cosecant = "cosecant",
    /** The trigonometry math object *Arcsine*. */
    arcsine = "arcsine",
    /** The trigonometry math object *Arccosine*. */
    arccosine = "arccosine",
    /** The trigonometry math object *Arctangent*. */
    arctangent = "arctangent",
    /** The trigonometry math object *Arccotangent*. */
    arccotangent = "arccotangent",
    /** The trigonometry math object *Arcsecant*. */
    arcsecant = "arcsecant",
    /** The trigonometry math object *Arccosecant*. */
    arccosecant = "arccosecant",
    /** The trigonometry math object *Hyperbolic sine*. */
    hyperbolicSine = "hyperbolicSine",
    /** The trigonometry math object *Hyperbolic cosine*. */
    hyperbolicCosine = "hyperbolicCosine",
    /** The trigonometry math object *Hyperbolic tangent*. */
    hyperbolicTangent = "hyperbolicTangent",
    /** The trigonometry math object *Hyperbolic cotangent*. */
    hyperbolicCotangent = "hyperbolicCotangent",
    /** The trigonometry math object *Hyperbolic secant*. */
    hyperbolicSecant = "hyperbolicSecant",
    /** The trigonometry math object *Hyperbolic cosecant*. */
    hyperbolicCosecant = "hyperbolicCosecant",
    /** The trigonometry math object *Area hyperbolic sine*. */
    areaHyperbolicSine = "areaHyperbolicSine",
    /** The trigonometry math object *Area hyperbolic cosine*. */
    areaHyperbolicCosine = "areaHyperbolicCosine",
    /** The trigonometry math object *Area hyperbolic tangent*. */
    areaHyperbolicTangent = "areaHyperbolicTangent",
    /** The trigonometry math object *Area hyperbolic cotangent*. */
    areaHyperbolicCotangent = "areaHyperbolicCotangent",
    /** The trigonometry math object *Area hyperbolic secant*. */
    areaHyperbolicSecant = "areaHyperbolicSecant",
    /** The trigonometry math object *Area hyperbolic cosecant*. */
    areaHyperbolicCosecant = "areaHyperbolicCosecant",
    /** The complex number math object *Imaginary unit*. */
    imaginaryUnit = "imaginaryUnit",
    /** The complex number math object *Complex conjugate*. */
    complexConjugate = "complexConjugate",
    /** The complex number math object *Real part*. */
    realPart = "realPart",
    /** The complex number math object *Imaginary part*. */
    imaginaryPart = "imaginaryPart",
    /** The complex number math object *Argument of*. */
    argumentOf = "argumentOf",
    /** The matrix math object *Matrix*. */
    matrix = "matrix",
    /** The matrix math object *Determinant matrix*. */
    determinantMatrix = "determinantMatrix",
    /** The matrix math object *Transpose*. */
    transpose = "transpose",
    /** The matrix math object *Matrix element*. */
    matrixElement = "matrixElement",
    /** The matrix math object *Determinant*. */
    determinant = "determinant",
    /** The matrix math object *Rank*. */
    rank = "rank",
    /** The matrix math object *Trace*. */
    trace = "trace",
    /** The matrix math object *Hermitian conjugate*. */
    hermitianConjugate = "hermitianConjugate",
    /** The matrix math object *Vertical ellipsis*, which inserts the ⋮ operator. */
    verticalEllipsis = "verticalEllipsis",
    /** The matrix math object *Diagonal ellipsis*, which inserts the ⋱ operator. */
    diagonalEllipsis = "diagonalEllipsis",
    /** The calculus math object *Natural logarithm base*. */
    naturalLogarithmBase = "naturalLogarithmBase",
    /** The calculus math object *Infinity*. */
    infinity = "infinity",
    /** The calculus math object *Tends to*, which inserts the →​ operator. */
    tendsTo = "tendsTo",
    /** The calculus math object *Limit*. */
    limit = "limit",
    /** The calculus math object *Change in*. */
    changeIn = "changeIn",
    /** The calculus math object *Lagrange 1st derivative*. */
    Lagrange1stDerivative = "Lagrange1stDerivative",
    /** The calculus math object *Lagrange 2nd derivative*. */
    Lagrange2ndDerivative = "Lagrange2ndDerivative",
    /** The calculus math object *Lagrange 3rd derivative*. */
    Lagrange3rdDerivative = "Lagrange3rdDerivative",
    /** The calculus math object *Newton 1st derivative*. */
    Newton1stDerivative = "Newton1stDerivative",
    /** The calculus math object *Newton 2nd derivative*. */
    Newton2ndDerivative = "Newton2ndDerivative",
    /** The calculus math object *Leibniz 1st derivative*. */
    Leibniz1stDerivative = "Leibniz1stDerivative",
    /** The calculus math object *Leibniz 2nd derivative*. */
    Leibniz2ndDerivative = "Leibniz2ndDerivative",
    /** The calculus math object *Leibniz nth derivative*. */
    LeibnizNthDerivative = "LeibnizNthDerivative",
    /** The calculus math object *Integral*. */
    integral = "integral",
    /** The calculus math object *Double integral*. */
    doubleIntegral = "doubleIntegral",
    /** The calculus math object *Triple integral*. */
    tripleIntegral = "tripleIntegral",
    /** The calculus math object *Contour integral*. */
    contourIntegral = "contourIntegral",
    /** The calculus math object *Partial 1st derivative*. */
    partial1stDerivative = "partial1stDerivative",
    /** The calculus math object *Partial 2nd derivative*. */
    partial2ndDerivative = "partial2ndDerivative",
    /** The calculus math object *Partial 2nd derivative cross*. */
    partial2ndDerivativeCross = "partial2ndDerivativeCross",
    /** The calculus math object *Partial nth derivative*. */
    partialNthDerivative = "partialNthDerivative",
    /** The calculus math object *Del operator*, which inserts the ∇ operator. */
    delOperator = "delOperator",
    /** The calculus math object *Laplacian operator*, which inserts the ∇² operator. */
    LaplacianOperator = "LaplacianOperator",
    /** The calculus math object *Wave operator*, which inserts the ⧠ operator. */
    waveOperator = "waveOperator",
    /** The calculus math object *Gradient of*. */
    gradientOf = "gradientOf",
    /** The calculus math object *Divergence of*. */
    divergenceOf = "divergenceOf",
    /** The calculus math object *Rotation of*. */
    rotationOf = "rotationOf",
    /** The calculus math object *Convolution*, which inserts the ∗ operator. */
    convolution = "convolution",
    /** The calculus math object *Fourier transform*. */
    FourierTransform = "FourierTransform",
    /** The calculus math object *Laplace transform*. */
    LaplaceTransform = "LaplaceTransform",
    /** The computing math object *String literal*. */
    stringLiteral = "stringLiteral",
    /** The computing math object *Is assigned*, which inserts the := operator. */
    isAssigned = "isAssigned",
    /** The computing math object *Asymptotically equal to*, which inserts the ≃ operator. */
    asymptoticallyEqualTo = "asymptoticallyEqualTo",
    /** The computing math object *Not asymptotically equal to*, which inserts the ≄ operator. */
    notAsymptoticallyEqualTo = "notAsymptoticallyEqualTo",
    /** The computing math object *Big O*. */
    big_O = "big_O",
    /** The computing math object *Big Theta*. */
    big_Theta = "big_Theta",
    /** The computing math object *Big Omega*. */
    big_Omega = "big_Omega",
    /** The computing math object *Small o*. */
    smallO = "smallO",
    /** The computing math object *Small omega*. */
    smallOmega = "smallOmega",
    /** The computing math object *Lambda abstraction*. */
    lambdaAbstraction = "lambdaAbstraction",
    /** The computing math object *Noncapturing substitution*. */
    noncapturingSubstitution = "noncapturingSubstitution",
    /** The computing math object *Relational selection*. */
    relationalSelection = "relationalSelection",
    /** The computing math object *Relational projection*. */
    relationalProjection = "relationalProjection",
    /** The computing math object *Relational renaming*. */
    relationalRenaming = "relationalRenaming",
    /** The computing math object *Relational join*, which inserts the ⋈ operator. */
    relationalJoin = "relationalJoin",
    /** The education math object *Fill in the blank box*. */
    fillInTheBlankBox = "fillInTheBlankBox",
    /** The education math object *Spoiler box*. */
    spoilerBox = "spoilerBox",
    /** The education math object *Data table*. */
    dataTable = "dataTable",
    /** The education math object *Equation addition*. */
    equationAddition = "equationAddition",
    /** The education math object *Equation steps*. */
    equationSteps = "equationSteps",
    /** The education math object *Grid*. */
    grid = "grid",
    /** The education math object *Number line*. */
    numberLine = "numberLine",
    /** The education math object *Coordinate plane*. */
    coordinatePlane = "coordinatePlane",
    /** The group theory math object *Direct sum*, which inserts the ⊕ operator. */
    directSum = "directSum",
    /** The group theory math object *Direct product*, which inserts the ⊗ operator. */
    directProduct = "directProduct",
    /** The group theory math object *Semidirect product*, which inserts the ⋊ operator. */
    semidirectProduct = "semidirectProduct",
    /** The group theory math object *Wreath product*, which inserts the ≀ operator. */
    wreathProduct = "wreathProduct",
    /** The group theory math object *Normal subgroup*, which inserts the ⊲ operator. */
    normalSubgroup = "normalSubgroup",
    /** The group theory math object *Normal subgroup or equal*, which inserts the ⊴ operator. */
    normalSubgroupOrEqual = "normalSubgroupOrEqual",
    /** The group theory math object *Not a normal subgroup*, which inserts the ⋪ operator. */
    notANormalSubgroup = "notANormalSubgroup",
    /** The group theory math object *Generic operator*, which inserts the ⋆ operator. */
    genericOperator = "genericOperator",
    /** The group theory math object *Generic operator 2*, which inserts the ∙ operator. */
    genericOperator2 = "genericOperator2",
    /** The chemistry editor command *Change to isotope*. */
    changeToIsotope = "changeToIsotope",
    /** The chemistry editor command *Change to element*. */
    changeToElement = "changeToElement",
    /** The chemistry math object *Yields*, which inserts the → operator. */
    yields = "yields",
    /** The chemistry math object *Does not yield*, which inserts the ↛ operator. */
    doesNotYield = "doesNotYield",
    /** The chemistry math object *Equilibrium*, which inserts the ⇌ operator. */
    equilibrium = "equilibrium",
    /** The chemistry math object *Yields both directions*, which inserts the ⇄ operator. */
    yieldsBothDirections = "yieldsBothDirections",
    /** The chemistry math object *Yields net backward*, which inserts the ← operator. */
    yieldsNetBackward = "yieldsNetBackward",
    /** The chemistry math object *Yields with heat*, which inserts the → operator with △ above. */
    yieldsWithHeat = "yieldsWithHeat",
    /** The chemistry math object *Yields with light*, which inserts the → operator with hν above. */
    yieldsWithLight = "yieldsWithLight",
    /** The chemistry math object *Yields with catalyst*. */
    yieldsWithCatalyst = "yieldsWithCatalyst",
    /** The chemistry math object *Caged atom*, which inserts the @ operator. */
    cagedAtom = "cagedAtom",
    /** The chemistry math object *Solid state*. */
    solidState = "solidState",
    /** The chemistry math object *Liquid state*. */
    liquidState = "liquidState",
    /** The chemistry math object *Gaseous state*. */
    gaseousState = "gaseousState",
    /** The chemistry math object *Aqueous state*. */
    aqueousState = "aqueousState",
    /** The chemistry math object *Crystalline state*. */
    crystallineState = "crystallineState",
    /** The chemistry math object *Precipitate produced*. */
    precipitateProduced = "precipitateProduced",
    /** The chemistry math object *Gas produced*. */
    gasProduced = "gasProduced",
    /** The chemistry math object *Electron*. */
    electron = "electron",
    /** The chemistry math object *Positron*. */
    positron = "positron",
    /** The chemistry math object *Proton*. */
    proton = "proton",
    /** The chemistry math object *Antiproton*. */
    antiproton = "antiproton",
    /** The chemistry math object *Neutron*. */
    neutron = "neutron",
    /** The chemistry math object *Antineutron*. */
    antineutron = "antineutron",
    /** The chemistry math object *Neutrino*. */
    neutrino = "neutrino",
    /** The chemistry math object *Antineutrino*. */
    antineutrino = "antineutrino",
    /** The chemistry math object *Muon*. */
    muon = "muon",
    /** The chemistry math object *Antimuon*. */
    antimuon = "antimuon",
    /** The chemistry math object *Muon neutrino*. */
    muonNeutrino = "muonNeutrino",
    /** The chemistry math object *Muon antineutrino*. */
    muonAntineutrino = "muonAntineutrino",
    /** The chemistry math object *Tauon*. */
    tauon = "tauon",
    /** The chemistry math object *Antitauon*. */
    antitauon = "antitauon",
    /** The chemistry math object *Tau neutrino*. */
    tauNeutrino = "tauNeutrino",
    /** The chemistry math object *Tau antineutrino*. */
    tauAntineutrino = "tauAntineutrino",
    /** The chemistry math object *Deuterium*. */
    deuterium = "deuterium",
    /** The chemistry math object *Tritium*. */
    tritium = "tritium",
    /** The chemistry math object *Thoron*. */
    thoron = "thoron",
    /** The chemistry math object *Hydrogen*, which inserts **H**, the symbol for the element with atomic number 1. */
    hydrogen = "hydrogen",
    /** The chemistry math object *Helium*, which inserts **He**, the symbol for the element with atomic number 2. */
    helium = "helium",
    /** The chemistry math object *Lithium*, which inserts **Li**, the symbol for the element with atomic number 3. */
    lithium = "lithium",
    /** The chemistry math object *Beryllium*, which inserts **Be**, the symbol for the element with atomic number 4. */
    beryllium = "beryllium",
    /** The chemistry math object *Boron*, which inserts **B**, the symbol for the element with atomic number 5. */
    boron = "boron",
    /** The chemistry math object *Carbon*, which inserts **C**, the symbol for the element with atomic number 6. */
    carbon = "carbon",
    /** The chemistry math object *Nitrogen*, which inserts **N**, the symbol for the element with atomic number 7. */
    nitrogen = "nitrogen",
    /** The chemistry math object *Oxygen*, which inserts **O**, the symbol for the element with atomic number 8. */
    oxygen = "oxygen",
    /** The chemistry math object *Fluorine*, which inserts **F**, the symbol for the element with atomic number 9. */
    fluorine = "fluorine",
    /** The chemistry math object *Neon*, which inserts **Ne**, the symbol for the element with atomic number 10. */
    neon = "neon",
    /** The chemistry math object *Sodium*, which inserts **Na**, the symbol for the element with atomic number 11. */
    sodium = "sodium",
    /** The chemistry math object *Magnesium*, which inserts **Mg**, the symbol for the element with atomic number 12. */
    magnesium = "magnesium",
    /** The chemistry math object *Aluminium*, which inserts **Al**, the symbol for the element with atomic number 13. */
    aluminium = "aluminium",
    /** The chemistry math object *Silicon*, which inserts **Si**, the symbol for the element with atomic number 14. */
    silicon = "silicon",
    /** The chemistry math object *Phosphorus*, which inserts **P**, the symbol for the element with atomic number 15. */
    phosphorus = "phosphorus",
    /** The chemistry math object *Sulfur*, which inserts **S**, the symbol for the element with atomic number 16. */
    sulfur = "sulfur",
    /** The chemistry math object *Chlorine*, which inserts **Cl**, the symbol for the element with atomic number 17. */
    chlorine = "chlorine",
    /** The chemistry math object *Argon*, which inserts **Ar**, the symbol for the element with atomic number 18. */
    argon = "argon",
    /** The chemistry math object *Potassium*, which inserts **K**, the symbol for the element with atomic number 19. */
    potassium = "potassium",
    /** The chemistry math object *Calcium*, which inserts **Ca**, the symbol for the element with atomic number 20. */
    calcium = "calcium",
    /** The chemistry math object *Scandium*, which inserts **Sc**, the symbol for the element with atomic number 21. */
    scandium = "scandium",
    /** The chemistry math object *Titanium*, which inserts **Ti**, the symbol for the element with atomic number 22. */
    titanium = "titanium",
    /** The chemistry math object *Vanadium*, which inserts **V**, the symbol for the element with atomic number 23. */
    vanadium = "vanadium",
    /** The chemistry math object *Chromium*, which inserts **Cr**, the symbol for the element with atomic number 24. */
    chromium = "chromium",
    /** The chemistry math object *Manganese*, which inserts **Mn**, the symbol for the element with atomic number 25. */
    manganese = "manganese",
    /** The chemistry math object *Iron*, which inserts **Fe**, the symbol for the element with atomic number 26. */
    iron = "iron",
    /** The chemistry math object *Cobalt*, which inserts **Co**, the symbol for the element with atomic number 27. */
    cobalt = "cobalt",
    /** The chemistry math object *Nickel*, which inserts **Ni**, the symbol for the element with atomic number 28. */
    nickel = "nickel",
    /** The chemistry math object *Copper*, which inserts **Cu**, the symbol for the element with atomic number 29. */
    copper = "copper",
    /** The chemistry math object *Zinc*, which inserts **Zn**, the symbol for the element with atomic number 30. */
    zinc = "zinc",
    /** The chemistry math object *Gallium*, which inserts **Ga**, the symbol for the element with atomic number 31. */
    gallium = "gallium",
    /** The chemistry math object *Germanium*, which inserts **Ge**, the symbol for the element with atomic number 32. */
    germanium = "germanium",
    /** The chemistry math object *Arsenic*, which inserts **As**, the symbol for the element with atomic number 33. */
    arsenic = "arsenic",
    /** The chemistry math object *Selenium*, which inserts **Se**, the symbol for the element with atomic number 34. */
    selenium = "selenium",
    /** The chemistry math object *Bromine*, which inserts **Br**, the symbol for the element with atomic number 35. */
    bromine = "bromine",
    /** The chemistry math object *Krypton*, which inserts **Kr**, the symbol for the element with atomic number 36. */
    krypton = "krypton",
    /** The chemistry math object *Rubidium*, which inserts **Rb**, the symbol for the element with atomic number 37. */
    rubidium = "rubidium",
    /** The chemistry math object *Strontium*, which inserts **Sr**, the symbol for the element with atomic number 38. */
    strontium = "strontium",
    /** The chemistry math object *Yttrium*, which inserts **Y**, the symbol for the element with atomic number 39. */
    yttrium = "yttrium",
    /** The chemistry math object *Zirconium*, which inserts **Zr**, the symbol for the element with atomic number 40. */
    zirconium = "zirconium",
    /** The chemistry math object *Niobium*, which inserts **Nb**, the symbol for the element with atomic number 41. */
    niobium = "niobium",
    /** The chemistry math object *Molybdenum*, which inserts **Mo**, the symbol for the element with atomic number 42. */
    molybdenum = "molybdenum",
    /** The chemistry math object *Technetium*, which inserts **Tc**, the symbol for the element with atomic number 43. */
    technetium = "technetium",
    /** The chemistry math object *Ruthenium*, which inserts **Ru**, the symbol for the element with atomic number 44. */
    ruthenium = "ruthenium",
    /** The chemistry math object *Rhodium*, which inserts **Rh**, the symbol for the element with atomic number 45. */
    rhodium = "rhodium",
    /** The chemistry math object *Palladium*, which inserts **Pd**, the symbol for the element with atomic number 46. */
    palladium = "palladium",
    /** The chemistry math object *Silver*, which inserts **Ag**, the symbol for the element with atomic number 47. */
    silver = "silver",
    /** The chemistry math object *Cadmium*, which inserts **Cd**, the symbol for the element with atomic number 48. */
    cadmium = "cadmium",
    /** The chemistry math object *Indium*, which inserts **In**, the symbol for the element with atomic number 49. */
    indium = "indium",
    /** The chemistry math object *Tin*, which inserts **Sn**, the symbol for the element with atomic number 50. */
    tin = "tin",
    /** The chemistry math object *Antimony*, which inserts **Sb**, the symbol for the element with atomic number 51. */
    antimony = "antimony",
    /** The chemistry math object *Tellurium*, which inserts **Te**, the symbol for the element with atomic number 52. */
    tellurium = "tellurium",
    /** The chemistry math object *Iodine*, which inserts **I**, the symbol for the element with atomic number 53. */
    iodine = "iodine",
    /** The chemistry math object *Xenon*, which inserts **Xe**, the symbol for the element with atomic number 54. */
    xenon = "xenon",
    /** The chemistry math object *Cesium*, which inserts **Cs**, the symbol for the element with atomic number 55. */
    cesium = "cesium",
    /** The chemistry math object *Barium*, which inserts **Ba**, the symbol for the element with atomic number 56. */
    barium = "barium",
    /** The chemistry math object *Lanthanum*, which inserts **La**, the symbol for the element with atomic number 57. */
    lanthanum = "lanthanum",
    /** The chemistry math object *Cerium*, which inserts **Ce**, the symbol for the element with atomic number 58. */
    cerium = "cerium",
    /** The chemistry math object *Praseodymium*, which inserts **Pr**, the symbol for the element with atomic number 59. */
    praseodymium = "praseodymium",
    /** The chemistry math object *Neodymium*, which inserts **Nd**, the symbol for the element with atomic number 60. */
    neodymium = "neodymium",
    /** The chemistry math object *Promethium*, which inserts **Pm**, the symbol for the element with atomic number 61. */
    promethium = "promethium",
    /** The chemistry math object *Samarium*, which inserts **Sm**, the symbol for the element with atomic number 62. */
    samarium = "samarium",
    /** The chemistry math object *Europium*, which inserts **Eu**, the symbol for the element with atomic number 63. */
    europium = "europium",
    /** The chemistry math object *Gadolinium*, which inserts **Gd**, the symbol for the element with atomic number 64. */
    gadolinium = "gadolinium",
    /** The chemistry math object *Terbium*, which inserts **Tb**, the symbol for the element with atomic number 65. */
    terbium = "terbium",
    /** The chemistry math object *Dysprosium*, which inserts **Dy**, the symbol for the element with atomic number 66. */
    dysprosium = "dysprosium",
    /** The chemistry math object *Holmium*, which inserts **Ho**, the symbol for the element with atomic number 67. */
    holmium = "holmium",
    /** The chemistry math object *Erbium*, which inserts **Er**, the symbol for the element with atomic number 68. */
    erbium = "erbium",
    /** The chemistry math object *Thulium*, which inserts **Tm**, the symbol for the element with atomic number 69. */
    thulium = "thulium",
    /** The chemistry math object *Ytterbium*, which inserts **Yb**, the symbol for the element with atomic number 70. */
    ytterbium = "ytterbium",
    /** The chemistry math object *Lutetium*, which inserts **Lu**, the symbol for the element with atomic number 71. */
    lutetium = "lutetium",
    /** The chemistry math object *Hafnium*, which inserts **Hf**, the symbol for the element with atomic number 72. */
    hafnium = "hafnium",
    /** The chemistry math object *Tantalum*, which inserts **Ta**, the symbol for the element with atomic number 73. */
    tantalum = "tantalum",
    /** The chemistry math object *Tungsten*, which inserts **W**, the symbol for the element with atomic number 74. */
    tungsten = "tungsten",
    /** The chemistry math object *Rhenium*, which inserts **Re**, the symbol for the element with atomic number 75. */
    rhenium = "rhenium",
    /** The chemistry math object *Osmium*, which inserts **Os**, the symbol for the element with atomic number 76. */
    osmium = "osmium",
    /** The chemistry math object *Iridium*, which inserts **Ir**, the symbol for the element with atomic number 77. */
    iridium = "iridium",
    /** The chemistry math object *Platinum*, which inserts **Pt**, the symbol for the element with atomic number 78. */
    platinum = "platinum",
    /** The chemistry math object *Gold*, which inserts **Au**, the symbol for the element with atomic number 79. */
    gold = "gold",
    /** The chemistry math object *Mercury*, which inserts **Hg**, the symbol for the element with atomic number 80. */
    mercury = "mercury",
    /** The chemistry math object *Thallium*, which inserts **Tl**, the symbol for the element with atomic number 81. */
    thallium = "thallium",
    /** The chemistry math object *Lead*, which inserts **Pb**, the symbol for the element with atomic number 82. */
    lead = "lead",
    /** The chemistry math object *Bismuth*, which inserts **Bi**, the symbol for the element with atomic number 83. */
    bismuth = "bismuth",
    /** The chemistry math object *Polonium*, which inserts **Po**, the symbol for the element with atomic number 84. */
    polonium = "polonium",
    /** The chemistry math object *Astatine*, which inserts **At**, the symbol for the element with atomic number 85. */
    astatine = "astatine",
    /** The chemistry math object *Radon*, which inserts **Rn**, the symbol for the element with atomic number 86. */
    radon = "radon",
    /** The chemistry math object *Francium*, which inserts **Fr**, the symbol for the element with atomic number 87. */
    francium = "francium",
    /** The chemistry math object *Radium*, which inserts **Ra**, the symbol for the element with atomic number 88. */
    radium = "radium",
    /** The chemistry math object *Actinium*, which inserts **Ac**, the symbol for the element with atomic number 89. */
    actinium = "actinium",
    /** The chemistry math object *Thorium*, which inserts **Th**, the symbol for the element with atomic number 90. */
    thorium = "thorium",
    /** The chemistry math object *Protactinium*, which inserts **Pa**, the symbol for the element with atomic number 91. */
    protactinium = "protactinium",
    /** The chemistry math object *Uranium*, which inserts **U**, the symbol for the element with atomic number 92. */
    uranium = "uranium",
    /** The chemistry math object *Neptunium*, which inserts **Np**, the symbol for the element with atomic number 93. */
    neptunium = "neptunium",
    /** The chemistry math object *Plutonium*, which inserts **Pu**, the symbol for the element with atomic number 94. */
    plutonium = "plutonium",
    /** The chemistry math object *Americium*, which inserts **Am**, the symbol for the element with atomic number 95. */
    americium = "americium",
    /** The chemistry math object *Curium*, which inserts **Cm**, the symbol for the element with atomic number 96. */
    curium = "curium",
    /** The chemistry math object *Berkelium*, which inserts **Bk**, the symbol for the element with atomic number 97. */
    berkelium = "berkelium",
    /** The chemistry math object *Californium*, which inserts **Cf**, the symbol for the element with atomic number 98. */
    californium = "californium",
    /** The chemistry math object *Einsteinium*, which inserts **Es**, the symbol for the element with atomic number 99. */
    einsteinium = "einsteinium",
    /** The chemistry math object *Fermium*, which inserts **Fm**, the symbol for the element with atomic number 100. */
    fermium = "fermium",
    /** The chemistry math object *Mendelevium*, which inserts **Md**, the symbol for the element with atomic number 101. */
    mendelevium = "mendelevium",
    /** The chemistry math object *Nobelium*, which inserts **No**, the symbol for the element with atomic number 102. */
    nobelium = "nobelium",
    /** The chemistry math object *Lawrencium*, which inserts **Lr**, the symbol for the element with atomic number 103. */
    lawrencium = "lawrencium",
    /** The chemistry math object *Rutherfordium*, which inserts **Rf**, the symbol for the element with atomic number 104. */
    rutherfordium = "rutherfordium",
    /** The chemistry math object *Dubnium*, which inserts **Db**, the symbol for the element with atomic number 105. */
    dubnium = "dubnium",
    /** The chemistry math object *Seaborgium*, which inserts **Sg**, the symbol for the element with atomic number 106. */
    seaborgium = "seaborgium",
    /** The chemistry math object *Bohrium*, which inserts **Bh**, the symbol for the element with atomic number 107. */
    bohrium = "bohrium",
    /** The chemistry math object *Hassium*, which inserts **Hs**, the symbol for the element with atomic number 108. */
    hassium = "hassium",
    /** The chemistry math object *Meitnerium*, which inserts **Mt**, the symbol for the element with atomic number 109. */
    meitnerium = "meitnerium",
    /** The chemistry math object *Darmstadtium*, which inserts **Ds**, the symbol for the element with atomic number 110. */
    darmstadtium = "darmstadtium",
    /** The chemistry math object *Roentgenium*, which inserts **Rg**, the symbol for the element with atomic number 111. */
    roentgenium = "roentgenium",
    /** The chemistry math object *Copernicium*, which inserts **Cn**, the symbol for the element with atomic number 112. */
    copernicium = "copernicium",
    /** The chemistry math object *Nihonium*, which inserts **Nh**, the symbol for the element with atomic number 113. */
    nihonium = "nihonium",
    /** The chemistry math object *Flerovium*, which inserts **Fl**, the symbol for the element with atomic number 114. */
    flerovium = "flerovium",
    /** The chemistry math object *Moscovium*, which inserts **Mc**, the symbol for the element with atomic number 115. */
    moscovium = "moscovium",
    /** The chemistry math object *Livermorium*, which inserts **Lv**, the symbol for the element with atomic number 116. */
    livermorium = "livermorium",
    /** The chemistry math object *Tennessine*, which inserts **Ts**, the symbol for the element with atomic number 117. */
    tennessine = "tennessine",
    /** The chemistry math object *Oganesson*, which inserts **Og**, the symbol for the element with atomic number 118. */
    oganesson = "oganesson",
    /** The chemistry math object *Ununennium*, which inserts **Uue**, the symbol for the element with atomic number 119. */
    ununennium = "ununennium",
    /** The annotation editor command *Text*. */
    text = "text",
    /** The annotation math object *Brace over*. */
    braceOver = "braceOver",
    /** The annotation math object *Brace under*. */
    braceUnder = "braceUnder",
    /** The style math object *Small*, which scales content by 67%. */
    small = "small",
    /** The style math object *Big*, which scales content by 133%. */
    big = "big",
    /** The style math object *Brown*, which decorates content with colour #3e2723. */
    brown = "brown",
    /** The style math object *Orange*, which decorates content with colour #e65100. */
    orange = "orange",
    /** The style math object *Yellow*, which decorates content with colour #ffd600. */
    yellow = "yellow",
    /** The style math object *Lime*, which decorates content with colour #827717. */
    lime = "lime",
    /** The style math object *Green*, which decorates content with colour #33691e. */
    green = "green",
    /** The style math object *Teal*, which decorates content with colour #006064. */
    teal = "teal",
    /** The style math object *Blue*, which decorates content with colour #01579b. */
    blue = "blue",
    /** The style math object *Indigo*, which decorates content with colour #1a237e. */
    indigo = "indigo",
    /** The style math object *Purple*, which decorates content with colour #4a148c. */
    purple = "purple",
    /** The style math object *Red*, which decorates content with colour #b71c1c. */
    red = "red",
    /** The style math object *Pink*, which decorates content with colour #e91e63. */
    pink = "pink",
    /** The style math object *Black*, which decorates content with colour #000000. */
    black = "black",
    /** The style math object *Dark grey*, which decorates content with colour #616161. */
    darkGrey = "darkGrey",
    /** The style math object *Grey*, which decorates content with colour #9e9e9e. */
    grey = "grey",
    /** The style math object *Light grey*, which decorates content with colour #e0e0e0. */
    lightGrey = "lightGrey",
    /** The style math object *White*, which decorates content with colour #ffffff. */
    white = "white",
    /** The memory cell editor command *Copy to cell 1*. */
    copyToCell1 = "copyToCell1",
    /** The memory cell editor command *Paste from cell 1*. */
    pasteFromCell1 = "pasteFromCell1",
    /** The memory cell editor command *Copy to cell 2*. */
    copyToCell2 = "copyToCell2",
    /** The memory cell editor command *Paste from cell 2*. */
    pasteFromCell2 = "pasteFromCell2",
    /** The memory cell editor command *Copy to cell 3*. */
    copyToCell3 = "copyToCell3",
    /** The memory cell editor command *Paste from cell 3*. */
    pasteFromCell3 = "pasteFromCell3",
    /** The memory cell editor command *Copy to cell 4*. */
    copyToCell4 = "copyToCell4",
    /** The memory cell editor command *Paste from cell 4*. */
    pasteFromCell4 = "pasteFromCell4",
    /** The memory cell editor command *Copy to cell 5*. */
    copyToCell5 = "copyToCell5",
    /** The memory cell editor command *Paste from cell 5*. */
    pasteFromCell5 = "pasteFromCell5",
    /** The memory cell editor command *Copy to cell 6*. */
    copyToCell6 = "copyToCell6",
    /** The memory cell editor command *Paste from cell 6*. */
    pasteFromCell6 = "pasteFromCell6",
    /** The memory cell editor command *Copy to cell 7*. */
    copyToCell7 = "copyToCell7",
    /** The memory cell editor command *Paste from cell 7*. */
    pasteFromCell7 = "pasteFromCell7",
    /** The memory cell editor command *Copy to cell 8*. */
    copyToCell8 = "copyToCell8",
    /** The memory cell editor command *Paste from cell 8*. */
    pasteFromCell8 = "pasteFromCell8",
    /** The memory cell editor command *Copy to cell 9*. */
    copyToCell9 = "copyToCell9",
    /** The memory cell editor command *Paste from cell 9*. */
    pasteFromCell9 = "pasteFromCell9",
    /** The memory cell editor command *Copy to cell 10*. */
    copyToCell10 = "copyToCell10",
    /** The memory cell editor command *Paste from cell 10*. */
    pasteFromCell10 = "pasteFromCell10",
    /** The hidden editor command *No op*, which is always *applicable* but has no effect. */
    noOp = "noOp",
    /** The hidden editor command *Impossible op*, which is never *applicable*. */
    impossibleOp = "impossibleOp",
    /** The hidden editor command *Delete selection*. */
    deleteSelection = "deleteSelection",
    /** The hidden editor command *Calculate*. */
    calculate = "calculate",
    /** The hidden editor command *Calculate on new line*. */
    calculateOnNewLine = "calculateOnNewLine",
    /** The hidden editor command *Print*. */
    print = "print",
    /** The hidden math object *Slash divides*, which inserts the / operator. */
    slashDivides = "slashDivides",
    /** The hidden math object *Text annotation*. */
    textAnnotation = "textAnnotation",
    /** The hidden math object *Zero vector*. */
    zeroVector = "zeroVector",
    /** The hidden math object *Planck constant*. */
    PlanckConstant = "PlanckConstant",
    /** The hidden math object *Reduced Planck constant*. */
    reduced_PlanckConstant = "reduced_PlanckConstant",
  }
  /**
   * Enumeration of recognized keystroke gestures. Note that some gestures may not be available on some platforms as the system or browser may intercept them. The preferred way to specify gestures that produce a printable character is to use a string consisting of that character. 
   * @see [[gestureMap]]
   */
  const enum Keystroke {
    /** The keystroke gesture `F1`. */
    F1 = "F1",
    /** The keystroke gesture `F2`. */
    F2 = "F2",
    /** The keystroke gesture `F3`. */
    F3 = "F3",
    /** The keystroke gesture `F4`. */
    F4 = "F4",
    /** The keystroke gesture `F5`. */
    F5 = "F5",
    /** The keystroke gesture `F6`. */
    F6 = "F6",
    /** The keystroke gesture `F7`. */
    F7 = "F7",
    /** The keystroke gesture `F8`. */
    F8 = "F8",
    /** The keystroke gesture `F9`. */
    F9 = "F9",
    /** The keystroke gesture `F10`. */
    F10 = "F10",
    /** The keystroke gesture `F11`. */
    F11 = "F11",
    /** The keystroke gesture `F12`. */
    F12 = "F12",
    /** The keystroke gesture `Escape`. */
    Escape = "Escape",
    /** The keystroke gesture `Insert`. */
    Insert = "Insert",
    /** The keystroke gesture `Delete`. */
    Delete = "Delete",
    /** The keystroke gesture `Backspace`. */
    Backspace = "Backspace",
    /** The keystroke gesture `Home`. */
    Home = "Home",
    /** The keystroke gesture `End`. */
    End = "End",
    /** The keystroke gesture `Page Up`. */
    PageUp = "PageUp",
    /** The keystroke gesture `Page Down`. */
    PageDown = "PageDown",
    /** The keystroke gesture `Up`. */
    ArrowUp = "ArrowUp",
    /** The keystroke gesture `Down`. */
    ArrowDown = "ArrowDown",
    /** The keystroke gesture `Left`. */
    ArrowLeft = "ArrowLeft",
    /** The keystroke gesture `Right`. */
    ArrowRight = "ArrowRight",
    /** The keystroke gesture `Enter`. */
    Enter = "Enter",
    /** The keystroke gesture `Menu Key`. */
    MenuKey = "MenuKey",
    /** The keystroke gesture `Shift` + `F1`. */
    ShiftF1 = "Shift F1",
    /** The keystroke gesture `Shift` + `F2`. */
    ShiftF2 = "Shift F2",
    /** The keystroke gesture `Shift` + `F3`. */
    ShiftF3 = "Shift F3",
    /** The keystroke gesture `Shift` + `F4`. */
    ShiftF4 = "Shift F4",
    /** The keystroke gesture `Shift` + `F5`. */
    ShiftF5 = "Shift F5",
    /** The keystroke gesture `Shift` + `F6`. */
    ShiftF6 = "Shift F6",
    /** The keystroke gesture `Shift` + `F7`. */
    ShiftF7 = "Shift F7",
    /** The keystroke gesture `Shift` + `F8`. */
    ShiftF8 = "Shift F8",
    /** The keystroke gesture `Shift` + `F9`. */
    ShiftF9 = "Shift F9",
    /** The keystroke gesture `Shift` + `F10`. */
    ShiftF10 = "Shift F10",
    /** The keystroke gesture `Shift` + `F11`. */
    ShiftF11 = "Shift F11",
    /** The keystroke gesture `Shift` + `F12`. */
    ShiftF12 = "Shift F12",
    /** The keystroke gesture `Shift` + `Escape`. */
    ShiftEscape = "Shift Escape",
    /** The keystroke gesture `Shift` + `Insert`. */
    ShiftInsert = "Shift Insert",
    /** The keystroke gesture `Shift` + `Delete`. */
    ShiftDelete = "Shift Delete",
    /** The keystroke gesture `Shift` + `Backspace`. */
    ShiftBackspace = "Shift Backspace",
    /** The keystroke gesture `Shift` + `Home`. */
    ShiftHome = "Shift Home",
    /** The keystroke gesture `Shift` + `End`. */
    ShiftEnd = "Shift End",
    /** The keystroke gesture `Shift` + `Page Up`. */
    ShiftPageUp = "Shift PageUp",
    /** The keystroke gesture `Shift` + `Page Down`. */
    ShiftPageDown = "Shift PageDown",
    /** The keystroke gesture `Shift` + `Up`. */
    ShiftArrowUp = "Shift ArrowUp",
    /** The keystroke gesture `Shift` + `Down`. */
    ShiftArrowDown = "Shift ArrowDown",
    /** The keystroke gesture `Shift` + `Left`. */
    ShiftArrowLeft = "Shift ArrowLeft",
    /** The keystroke gesture `Shift` + `Right`. */
    ShiftArrowRight = "Shift ArrowRight",
    /** The keystroke gesture `Shift` + `Enter`. */
    ShiftEnter = "Shift Enter",
    /** The keystroke gesture `Shift` + `Menu Key`. */
    ShiftMenuKey = "Shift MenuKey",
    /** The keystroke gesture `Ctrl` + `A`. (`Command` + `A` on Apple devices.) */
    CtrlA = "Ctrl A",
    /** The keystroke gesture `Ctrl` + `B`. (`Command` + `B` on Apple devices.) */
    CtrlB = "Ctrl B",
    /** The keystroke gesture `Ctrl` + `C`. (`Command` + `C` on Apple devices.) */
    CtrlC = "Ctrl C",
    /** The keystroke gesture `Ctrl` + `D`. (`Command` + `D` on Apple devices.) */
    CtrlD = "Ctrl D",
    /** The keystroke gesture `Ctrl` + `E`. (`Command` + `E` on Apple devices.) */
    CtrlE = "Ctrl E",
    /** The keystroke gesture `Ctrl` + `F`. (`Command` + `F` on Apple devices.) */
    CtrlF = "Ctrl F",
    /** The keystroke gesture `Ctrl` + `G`. (`Command` + `G` on Apple devices.) */
    CtrlG = "Ctrl G",
    /** The keystroke gesture `Ctrl` + `H`. (`Command` + `H` on Apple devices.) */
    CtrlH = "Ctrl H",
    /** The keystroke gesture `Ctrl` + `I`. (`Command` + `I` on Apple devices.) */
    CtrlI = "Ctrl I",
    /** The keystroke gesture `Ctrl` + `J`. (`Command` + `J` on Apple devices.) */
    CtrlJ = "Ctrl J",
    /** The keystroke gesture `Ctrl` + `K`. (`Command` + `K` on Apple devices.) */
    CtrlK = "Ctrl K",
    /** The keystroke gesture `Ctrl` + `L`. (`Command` + `L` on Apple devices.) */
    CtrlL = "Ctrl L",
    /** The keystroke gesture `Ctrl` + `M`. (`Command` + `M` on Apple devices.) */
    CtrlM = "Ctrl M",
    /** The keystroke gesture `Ctrl` + `N`. (`Command` + `N` on Apple devices.) */
    CtrlN = "Ctrl N",
    /** The keystroke gesture `Ctrl` + `O`. (`Command` + `O` on Apple devices.) */
    CtrlO = "Ctrl O",
    /** The keystroke gesture `Ctrl` + `P`. (`Command` + `P` on Apple devices.) */
    CtrlP = "Ctrl P",
    /** The keystroke gesture `Ctrl` + `Q`. (`Command` + `Q` on Apple devices.) */
    CtrlQ = "Ctrl Q",
    /** The keystroke gesture `Ctrl` + `R`. (`Command` + `R` on Apple devices.) */
    CtrlR = "Ctrl R",
    /** The keystroke gesture `Ctrl` + `S`. (`Command` + `S` on Apple devices.) */
    CtrlS = "Ctrl S",
    /** The keystroke gesture `Ctrl` + `T`. (`Command` + `T` on Apple devices.) */
    CtrlT = "Ctrl T",
    /** The keystroke gesture `Ctrl` + `U`. (`Command` + `U` on Apple devices.) */
    CtrlU = "Ctrl U",
    /** The keystroke gesture `Ctrl` + `V`. (`Command` + `V` on Apple devices.) */
    CtrlV = "Ctrl V",
    /** The keystroke gesture `Ctrl` + `W`. (`Command` + `W` on Apple devices.) */
    CtrlW = "Ctrl W",
    /** The keystroke gesture `Ctrl` + `X`. (`Command` + `X` on Apple devices.) */
    CtrlX = "Ctrl X",
    /** The keystroke gesture `Ctrl` + `Y`. (`Command` + `Y` on Apple devices.) */
    CtrlY = "Ctrl Y",
    /** The keystroke gesture `Ctrl` + `Z`. (`Command` + `Z` on Apple devices.) */
    CtrlZ = "Ctrl Z",
    /** The keystroke gesture `Ctrl` + `0`. (`Command` + `0` on Apple devices.) */
    Ctrl0 = "Ctrl num0",
    /** The keystroke gesture `Ctrl` + `1`. (`Command` + `1` on Apple devices.) */
    Ctrl1 = "Ctrl num1",
    /** The keystroke gesture `Ctrl` + `2`. (`Command` + `2` on Apple devices.) */
    Ctrl2 = "Ctrl num2",
    /** The keystroke gesture `Ctrl` + `3`. (`Command` + `3` on Apple devices.) */
    Ctrl3 = "Ctrl num3",
    /** The keystroke gesture `Ctrl` + `4`. (`Command` + `4` on Apple devices.) */
    Ctrl4 = "Ctrl num4",
    /** The keystroke gesture `Ctrl` + `5`. (`Command` + `5` on Apple devices.) */
    Ctrl5 = "Ctrl num5",
    /** The keystroke gesture `Ctrl` + `6`. (`Command` + `6` on Apple devices.) */
    Ctrl6 = "Ctrl num6",
    /** The keystroke gesture `Ctrl` + `7`. (`Command` + `7` on Apple devices.) */
    Ctrl7 = "Ctrl num7",
    /** The keystroke gesture `Ctrl` + `8`. (`Command` + `8` on Apple devices.) */
    Ctrl8 = "Ctrl num8",
    /** The keystroke gesture `Ctrl` + `9`. (`Command` + `9` on Apple devices.) */
    Ctrl9 = "Ctrl num9",
    /** The keystroke gesture `Ctrl` + `Space`. (`Command` + `Space` on Apple devices.) */
    CtrlSpace = "Ctrl Space",
    /** The keystroke gesture `Ctrl` + `Slash`. (`Command` + `Slash` on Apple devices.) */
    CtrlSlash = "Ctrl Slash",
    /** The keystroke gesture `Ctrl` + `Comma`. (`Command` + `Comma` on Apple devices.) */
    CtrlComma = "Ctrl Comma",
    /** The keystroke gesture `Ctrl` + `Period`. (`Command` + `Period` on Apple devices.) */
    CtrlPeriod = "Ctrl Period",
    /** The keystroke gesture `Ctrl` + `Minus`. (`Command` + `Minus` on Apple devices.) */
    CtrlMinus = "Ctrl Minus",
    /** The keystroke gesture `Ctrl` + `Equals`. (`Command` + `Equals` on Apple devices.) */
    CtrlEquals = "Ctrl Equals",
    /** The keystroke gesture `Ctrl` + `Bracket Left`. (`Command` + `Bracket Left` on Apple devices.) */
    CtrlBracketLeft = "Ctrl BracketLeft",
    /** The keystroke gesture `Ctrl` + `Bracket Right`. (`Command` + `Bracket Right` on Apple devices.) */
    CtrlBracketRight = "Ctrl BracketRight",
    /** The keystroke gesture `Ctrl` + `F1`. (`Command` + `F1` on Apple devices.) */
    CtrlF1 = "Ctrl F1",
    /** The keystroke gesture `Ctrl` + `F2`. (`Command` + `F2` on Apple devices.) */
    CtrlF2 = "Ctrl F2",
    /** The keystroke gesture `Ctrl` + `F3`. (`Command` + `F3` on Apple devices.) */
    CtrlF3 = "Ctrl F3",
    /** The keystroke gesture `Ctrl` + `F4`. (`Command` + `F4` on Apple devices.) */
    CtrlF4 = "Ctrl F4",
    /** The keystroke gesture `Ctrl` + `F5`. (`Command` + `F5` on Apple devices.) */
    CtrlF5 = "Ctrl F5",
    /** The keystroke gesture `Ctrl` + `F6`. (`Command` + `F6` on Apple devices.) */
    CtrlF6 = "Ctrl F6",
    /** The keystroke gesture `Ctrl` + `F7`. (`Command` + `F7` on Apple devices.) */
    CtrlF7 = "Ctrl F7",
    /** The keystroke gesture `Ctrl` + `F8`. (`Command` + `F8` on Apple devices.) */
    CtrlF8 = "Ctrl F8",
    /** The keystroke gesture `Ctrl` + `F9`. (`Command` + `F9` on Apple devices.) */
    CtrlF9 = "Ctrl F9",
    /** The keystroke gesture `Ctrl` + `F10`. (`Command` + `F10` on Apple devices.) */
    CtrlF10 = "Ctrl F10",
    /** The keystroke gesture `Ctrl` + `F11`. (`Command` + `F11` on Apple devices.) */
    CtrlF11 = "Ctrl F11",
    /** The keystroke gesture `Ctrl` + `F12`. (`Command` + `F12` on Apple devices.) */
    CtrlF12 = "Ctrl F12",
    /** The keystroke gesture `Ctrl` + `Escape`. (`Command` + `Escape` on Apple devices.) */
    CtrlEscape = "Ctrl Escape",
    /** The keystroke gesture `Ctrl` + `Insert`. (`Command` + `Insert` on Apple devices.) */
    CtrlInsert = "Ctrl Insert",
    /** The keystroke gesture `Ctrl` + `Delete`. (`Command` + `Delete` on Apple devices.) */
    CtrlDelete = "Ctrl Delete",
    /** The keystroke gesture `Ctrl` + `Backspace`. (`Command` + `Backspace` on Apple devices.) */
    CtrlBackspace = "Ctrl Backspace",
    /** The keystroke gesture `Ctrl` + `Home`. (`Command` + `Home` on Apple devices.) */
    CtrlHome = "Ctrl Home",
    /** The keystroke gesture `Ctrl` + `End`. (`Command` + `End` on Apple devices.) */
    CtrlEnd = "Ctrl End",
    /** The keystroke gesture `Ctrl` + `Page Up`. (`Command` + `Page Up` on Apple devices.) */
    CtrlPageUp = "Ctrl PageUp",
    /** The keystroke gesture `Ctrl` + `Page Down`. (`Command` + `Page Down` on Apple devices.) */
    CtrlPageDown = "Ctrl PageDown",
    /** The keystroke gesture `Ctrl` + `Up`. (`Command` + `Up` on Apple devices.) */
    CtrlArrowUp = "Ctrl ArrowUp",
    /** The keystroke gesture `Ctrl` + `Down`. (`Command` + `Down` on Apple devices.) */
    CtrlArrowDown = "Ctrl ArrowDown",
    /** The keystroke gesture `Ctrl` + `Left`. (`Command` + `Left` on Apple devices.) */
    CtrlArrowLeft = "Ctrl ArrowLeft",
    /** The keystroke gesture `Ctrl` + `Right`. (`Command` + `Right` on Apple devices.) */
    CtrlArrowRight = "Ctrl ArrowRight",
    /** The keystroke gesture `Ctrl` + `Enter`. (`Command` + `Enter` on Apple devices.) */
    CtrlEnter = "Ctrl Enter",
    /** The keystroke gesture `Ctrl` + `Menu Key`. (`Command` + `Menu Key` on Apple devices.) */
    CtrlMenuKey = "Ctrl MenuKey",
    /** The keystroke gesture `Alt` + `A`. (`Option` + `A` on Apple devices.) */
    AltA = "Alt A",
    /** The keystroke gesture `Alt` + `B`. (`Option` + `B` on Apple devices.) */
    AltB = "Alt B",
    /** The keystroke gesture `Alt` + `C`. (`Option` + `C` on Apple devices.) */
    AltC = "Alt C",
    /** The keystroke gesture `Alt` + `D`. (`Option` + `D` on Apple devices.) */
    AltD = "Alt D",
    /** The keystroke gesture `Alt` + `E`. (`Option` + `E` on Apple devices.) */
    AltE = "Alt E",
    /** The keystroke gesture `Alt` + `F`. (`Option` + `F` on Apple devices.) */
    AltF = "Alt F",
    /** The keystroke gesture `Alt` + `G`. (`Option` + `G` on Apple devices.) */
    AltG = "Alt G",
    /** The keystroke gesture `Alt` + `H`. (`Option` + `H` on Apple devices.) */
    AltH = "Alt H",
    /** The keystroke gesture `Alt` + `I`. (`Option` + `I` on Apple devices.) */
    AltI = "Alt I",
    /** The keystroke gesture `Alt` + `J`. (`Option` + `J` on Apple devices.) */
    AltJ = "Alt J",
    /** The keystroke gesture `Alt` + `K`. (`Option` + `K` on Apple devices.) */
    AltK = "Alt K",
    /** The keystroke gesture `Alt` + `L`. (`Option` + `L` on Apple devices.) */
    AltL = "Alt L",
    /** The keystroke gesture `Alt` + `M`. (`Option` + `M` on Apple devices.) */
    AltM = "Alt M",
    /** The keystroke gesture `Alt` + `N`. (`Option` + `N` on Apple devices.) */
    AltN = "Alt N",
    /** The keystroke gesture `Alt` + `O`. (`Option` + `O` on Apple devices.) */
    AltO = "Alt O",
    /** The keystroke gesture `Alt` + `P`. (`Option` + `P` on Apple devices.) */
    AltP = "Alt P",
    /** The keystroke gesture `Alt` + `Q`. (`Option` + `Q` on Apple devices.) */
    AltQ = "Alt Q",
    /** The keystroke gesture `Alt` + `R`. (`Option` + `R` on Apple devices.) */
    AltR = "Alt R",
    /** The keystroke gesture `Alt` + `S`. (`Option` + `S` on Apple devices.) */
    AltS = "Alt S",
    /** The keystroke gesture `Alt` + `T`. (`Option` + `T` on Apple devices.) */
    AltT = "Alt T",
    /** The keystroke gesture `Alt` + `U`. (`Option` + `U` on Apple devices.) */
    AltU = "Alt U",
    /** The keystroke gesture `Alt` + `V`. (`Option` + `V` on Apple devices.) */
    AltV = "Alt V",
    /** The keystroke gesture `Alt` + `W`. (`Option` + `W` on Apple devices.) */
    AltW = "Alt W",
    /** The keystroke gesture `Alt` + `X`. (`Option` + `X` on Apple devices.) */
    AltX = "Alt X",
    /** The keystroke gesture `Alt` + `Y`. (`Option` + `Y` on Apple devices.) */
    AltY = "Alt Y",
    /** The keystroke gesture `Alt` + `Z`. (`Option` + `Z` on Apple devices.) */
    AltZ = "Alt Z",
    /** The keystroke gesture `Alt` + `0`. (`Option` + `0` on Apple devices.) */
    Alt0 = "Alt num0",
    /** The keystroke gesture `Alt` + `1`. (`Option` + `1` on Apple devices.) */
    Alt1 = "Alt num1",
    /** The keystroke gesture `Alt` + `2`. (`Option` + `2` on Apple devices.) */
    Alt2 = "Alt num2",
    /** The keystroke gesture `Alt` + `3`. (`Option` + `3` on Apple devices.) */
    Alt3 = "Alt num3",
    /** The keystroke gesture `Alt` + `4`. (`Option` + `4` on Apple devices.) */
    Alt4 = "Alt num4",
    /** The keystroke gesture `Alt` + `5`. (`Option` + `5` on Apple devices.) */
    Alt5 = "Alt num5",
    /** The keystroke gesture `Alt` + `6`. (`Option` + `6` on Apple devices.) */
    Alt6 = "Alt num6",
    /** The keystroke gesture `Alt` + `7`. (`Option` + `7` on Apple devices.) */
    Alt7 = "Alt num7",
    /** The keystroke gesture `Alt` + `8`. (`Option` + `8` on Apple devices.) */
    Alt8 = "Alt num8",
    /** The keystroke gesture `Alt` + `9`. (`Option` + `9` on Apple devices.) */
    Alt9 = "Alt num9",
    /** The keystroke gesture `Alt` + `Space`. (`Option` + `Space` on Apple devices.) */
    AltSpace = "Alt Space",
    /** The keystroke gesture `Alt` + `Slash`. (`Option` + `Slash` on Apple devices.) */
    AltSlash = "Alt Slash",
    /** The keystroke gesture `Alt` + `Comma`. (`Option` + `Comma` on Apple devices.) */
    AltComma = "Alt Comma",
    /** The keystroke gesture `Alt` + `Period`. (`Option` + `Period` on Apple devices.) */
    AltPeriod = "Alt Period",
    /** The keystroke gesture `Alt` + `Minus`. (`Option` + `Minus` on Apple devices.) */
    AltMinus = "Alt Minus",
    /** The keystroke gesture `Alt` + `Equals`. (`Option` + `Equals` on Apple devices.) */
    AltEquals = "Alt Equals",
    /** The keystroke gesture `Alt` + `Bracket Left`. (`Option` + `Bracket Left` on Apple devices.) */
    AltBracketLeft = "Alt BracketLeft",
    /** The keystroke gesture `Alt` + `Bracket Right`. (`Option` + `Bracket Right` on Apple devices.) */
    AltBracketRight = "Alt BracketRight",
    /** The keystroke gesture `Alt` + `F1`. (`Option` + `F1` on Apple devices.) */
    AltF1 = "Alt F1",
    /** The keystroke gesture `Alt` + `F2`. (`Option` + `F2` on Apple devices.) */
    AltF2 = "Alt F2",
    /** The keystroke gesture `Alt` + `F3`. (`Option` + `F3` on Apple devices.) */
    AltF3 = "Alt F3",
    /** The keystroke gesture `Alt` + `F4`. (`Option` + `F4` on Apple devices.) */
    AltF4 = "Alt F4",
    /** The keystroke gesture `Alt` + `F5`. (`Option` + `F5` on Apple devices.) */
    AltF5 = "Alt F5",
    /** The keystroke gesture `Alt` + `F6`. (`Option` + `F6` on Apple devices.) */
    AltF6 = "Alt F6",
    /** The keystroke gesture `Alt` + `F7`. (`Option` + `F7` on Apple devices.) */
    AltF7 = "Alt F7",
    /** The keystroke gesture `Alt` + `F8`. (`Option` + `F8` on Apple devices.) */
    AltF8 = "Alt F8",
    /** The keystroke gesture `Alt` + `F9`. (`Option` + `F9` on Apple devices.) */
    AltF9 = "Alt F9",
    /** The keystroke gesture `Alt` + `F10`. (`Option` + `F10` on Apple devices.) */
    AltF10 = "Alt F10",
    /** The keystroke gesture `Alt` + `F11`. (`Option` + `F11` on Apple devices.) */
    AltF11 = "Alt F11",
    /** The keystroke gesture `Alt` + `F12`. (`Option` + `F12` on Apple devices.) */
    AltF12 = "Alt F12",
    /** The keystroke gesture `Alt` + `Escape`. (`Option` + `Escape` on Apple devices.) */
    AltEscape = "Alt Escape",
    /** The keystroke gesture `Alt` + `Insert`. (`Option` + `Insert` on Apple devices.) */
    AltInsert = "Alt Insert",
    /** The keystroke gesture `Alt` + `Delete`. (`Option` + `Delete` on Apple devices.) */
    AltDelete = "Alt Delete",
    /** The keystroke gesture `Alt` + `Backspace`. (`Option` + `Backspace` on Apple devices.) */
    AltBackspace = "Alt Backspace",
    /** The keystroke gesture `Alt` + `Home`. (`Option` + `Home` on Apple devices.) */
    AltHome = "Alt Home",
    /** The keystroke gesture `Alt` + `End`. (`Option` + `End` on Apple devices.) */
    AltEnd = "Alt End",
    /** The keystroke gesture `Alt` + `Page Up`. (`Option` + `Page Up` on Apple devices.) */
    AltPageUp = "Alt PageUp",
    /** The keystroke gesture `Alt` + `Page Down`. (`Option` + `Page Down` on Apple devices.) */
    AltPageDown = "Alt PageDown",
    /** The keystroke gesture `Alt` + `Up`. (`Option` + `Up` on Apple devices.) */
    AltArrowUp = "Alt ArrowUp",
    /** The keystroke gesture `Alt` + `Down`. (`Option` + `Down` on Apple devices.) */
    AltArrowDown = "Alt ArrowDown",
    /** The keystroke gesture `Alt` + `Left`. (`Option` + `Left` on Apple devices.) */
    AltArrowLeft = "Alt ArrowLeft",
    /** The keystroke gesture `Alt` + `Right`. (`Option` + `Right` on Apple devices.) */
    AltArrowRight = "Alt ArrowRight",
    /** The keystroke gesture `Alt` + `Enter`. (`Option` + `Enter` on Apple devices.) */
    AltEnter = "Alt Enter",
    /** The keystroke gesture `Alt` + `Menu Key`. (`Option` + `Menu Key` on Apple devices.) */
    AltMenuKey = "Alt MenuKey",
    /** The keystroke gesture `Ctrl` + `Shift` + `A`. (`Command` + `Shift` + `A` on Apple devices.) */
    CtrlShiftA = "CtrlShift A",
    /** The keystroke gesture `Ctrl` + `Shift` + `B`. (`Command` + `Shift` + `B` on Apple devices.) */
    CtrlShiftB = "CtrlShift B",
    /** The keystroke gesture `Ctrl` + `Shift` + `C`. (`Command` + `Shift` + `C` on Apple devices.) */
    CtrlShiftC = "CtrlShift C",
    /** The keystroke gesture `Ctrl` + `Shift` + `D`. (`Command` + `Shift` + `D` on Apple devices.) */
    CtrlShiftD = "CtrlShift D",
    /** The keystroke gesture `Ctrl` + `Shift` + `E`. (`Command` + `Shift` + `E` on Apple devices.) */
    CtrlShiftE = "CtrlShift E",
    /** The keystroke gesture `Ctrl` + `Shift` + `F`. (`Command` + `Shift` + `F` on Apple devices.) */
    CtrlShiftF = "CtrlShift F",
    /** The keystroke gesture `Ctrl` + `Shift` + `G`. (`Command` + `Shift` + `G` on Apple devices.) */
    CtrlShiftG = "CtrlShift G",
    /** The keystroke gesture `Ctrl` + `Shift` + `H`. (`Command` + `Shift` + `H` on Apple devices.) */
    CtrlShiftH = "CtrlShift H",
    /** The keystroke gesture `Ctrl` + `Shift` + `I`. (`Command` + `Shift` + `I` on Apple devices.) */
    CtrlShiftI = "CtrlShift I",
    /** The keystroke gesture `Ctrl` + `Shift` + `J`. (`Command` + `Shift` + `J` on Apple devices.) */
    CtrlShiftJ = "CtrlShift J",
    /** The keystroke gesture `Ctrl` + `Shift` + `K`. (`Command` + `Shift` + `K` on Apple devices.) */
    CtrlShiftK = "CtrlShift K",
    /** The keystroke gesture `Ctrl` + `Shift` + `L`. (`Command` + `Shift` + `L` on Apple devices.) */
    CtrlShiftL = "CtrlShift L",
    /** The keystroke gesture `Ctrl` + `Shift` + `M`. (`Command` + `Shift` + `M` on Apple devices.) */
    CtrlShiftM = "CtrlShift M",
    /** The keystroke gesture `Ctrl` + `Shift` + `N`. (`Command` + `Shift` + `N` on Apple devices.) */
    CtrlShiftN = "CtrlShift N",
    /** The keystroke gesture `Ctrl` + `Shift` + `O`. (`Command` + `Shift` + `O` on Apple devices.) */
    CtrlShiftO = "CtrlShift O",
    /** The keystroke gesture `Ctrl` + `Shift` + `P`. (`Command` + `Shift` + `P` on Apple devices.) */
    CtrlShiftP = "CtrlShift P",
    /** The keystroke gesture `Ctrl` + `Shift` + `Q`. (`Command` + `Shift` + `Q` on Apple devices.) */
    CtrlShiftQ = "CtrlShift Q",
    /** The keystroke gesture `Ctrl` + `Shift` + `R`. (`Command` + `Shift` + `R` on Apple devices.) */
    CtrlShiftR = "CtrlShift R",
    /** The keystroke gesture `Ctrl` + `Shift` + `S`. (`Command` + `Shift` + `S` on Apple devices.) */
    CtrlShiftS = "CtrlShift S",
    /** The keystroke gesture `Ctrl` + `Shift` + `T`. (`Command` + `Shift` + `T` on Apple devices.) */
    CtrlShiftT = "CtrlShift T",
    /** The keystroke gesture `Ctrl` + `Shift` + `U`. (`Command` + `Shift` + `U` on Apple devices.) */
    CtrlShiftU = "CtrlShift U",
    /** The keystroke gesture `Ctrl` + `Shift` + `V`. (`Command` + `Shift` + `V` on Apple devices.) */
    CtrlShiftV = "CtrlShift V",
    /** The keystroke gesture `Ctrl` + `Shift` + `W`. (`Command` + `Shift` + `W` on Apple devices.) */
    CtrlShiftW = "CtrlShift W",
    /** The keystroke gesture `Ctrl` + `Shift` + `X`. (`Command` + `Shift` + `X` on Apple devices.) */
    CtrlShiftX = "CtrlShift X",
    /** The keystroke gesture `Ctrl` + `Shift` + `Y`. (`Command` + `Shift` + `Y` on Apple devices.) */
    CtrlShiftY = "CtrlShift Y",
    /** The keystroke gesture `Ctrl` + `Shift` + `Z`. (`Command` + `Shift` + `Z` on Apple devices.) */
    CtrlShiftZ = "CtrlShift Z",
    /** The keystroke gesture `Ctrl` + `Shift` + `0`. (`Command` + `Shift` + `0` on Apple devices.) */
    CtrlShift0 = "CtrlShift num0",
    /** The keystroke gesture `Ctrl` + `Shift` + `1`. (`Command` + `Shift` + `1` on Apple devices.) */
    CtrlShift1 = "CtrlShift num1",
    /** The keystroke gesture `Ctrl` + `Shift` + `2`. (`Command` + `Shift` + `2` on Apple devices.) */
    CtrlShift2 = "CtrlShift num2",
    /** The keystroke gesture `Ctrl` + `Shift` + `3`. (`Command` + `Shift` + `3` on Apple devices.) */
    CtrlShift3 = "CtrlShift num3",
    /** The keystroke gesture `Ctrl` + `Shift` + `4`. (`Command` + `Shift` + `4` on Apple devices.) */
    CtrlShift4 = "CtrlShift num4",
    /** The keystroke gesture `Ctrl` + `Shift` + `5`. (`Command` + `Shift` + `5` on Apple devices.) */
    CtrlShift5 = "CtrlShift num5",
    /** The keystroke gesture `Ctrl` + `Shift` + `6`. (`Command` + `Shift` + `6` on Apple devices.) */
    CtrlShift6 = "CtrlShift num6",
    /** The keystroke gesture `Ctrl` + `Shift` + `7`. (`Command` + `Shift` + `7` on Apple devices.) */
    CtrlShift7 = "CtrlShift num7",
    /** The keystroke gesture `Ctrl` + `Shift` + `8`. (`Command` + `Shift` + `8` on Apple devices.) */
    CtrlShift8 = "CtrlShift num8",
    /** The keystroke gesture `Ctrl` + `Shift` + `9`. (`Command` + `Shift` + `9` on Apple devices.) */
    CtrlShift9 = "CtrlShift num9",
    /** The keystroke gesture `Ctrl` + `Shift` + `Space`. (`Command` + `Shift` + `Space` on Apple devices.) */
    CtrlShiftSpace = "CtrlShift Space",
    /** The keystroke gesture `Ctrl` + `Shift` + `Slash`. (`Command` + `Shift` + `Slash` on Apple devices.) */
    CtrlShiftSlash = "CtrlShift Slash",
    /** The keystroke gesture `Ctrl` + `Shift` + `Comma`. (`Command` + `Shift` + `Comma` on Apple devices.) */
    CtrlShiftComma = "CtrlShift Comma",
    /** The keystroke gesture `Ctrl` + `Shift` + `Period`. (`Command` + `Shift` + `Period` on Apple devices.) */
    CtrlShiftPeriod = "CtrlShift Period",
    /** The keystroke gesture `Ctrl` + `Shift` + `Minus`. (`Command` + `Shift` + `Minus` on Apple devices.) */
    CtrlShiftMinus = "CtrlShift Minus",
    /** The keystroke gesture `Ctrl` + `Shift` + `Equals`. (`Command` + `Shift` + `Equals` on Apple devices.) */
    CtrlShiftEquals = "CtrlShift Equals",
    /** The keystroke gesture `Ctrl` + `Shift` + `Bracket Left`. (`Command` + `Shift` + `Bracket Left` on Apple devices.) */
    CtrlShiftBracketLeft = "CtrlShift BracketLeft",
    /** The keystroke gesture `Ctrl` + `Shift` + `Bracket Right`. (`Command` + `Shift` + `Bracket Right` on Apple devices.) */
    CtrlShiftBracketRight = "CtrlShift BracketRight",
    /** The keystroke gesture `Ctrl` + `Shift` + `F1`. (`Command` + `Shift` + `F1` on Apple devices.) */
    CtrlShiftF1 = "CtrlShift F1",
    /** The keystroke gesture `Ctrl` + `Shift` + `F2`. (`Command` + `Shift` + `F2` on Apple devices.) */
    CtrlShiftF2 = "CtrlShift F2",
    /** The keystroke gesture `Ctrl` + `Shift` + `F3`. (`Command` + `Shift` + `F3` on Apple devices.) */
    CtrlShiftF3 = "CtrlShift F3",
    /** The keystroke gesture `Ctrl` + `Shift` + `F4`. (`Command` + `Shift` + `F4` on Apple devices.) */
    CtrlShiftF4 = "CtrlShift F4",
    /** The keystroke gesture `Ctrl` + `Shift` + `F5`. (`Command` + `Shift` + `F5` on Apple devices.) */
    CtrlShiftF5 = "CtrlShift F5",
    /** The keystroke gesture `Ctrl` + `Shift` + `F6`. (`Command` + `Shift` + `F6` on Apple devices.) */
    CtrlShiftF6 = "CtrlShift F6",
    /** The keystroke gesture `Ctrl` + `Shift` + `F7`. (`Command` + `Shift` + `F7` on Apple devices.) */
    CtrlShiftF7 = "CtrlShift F7",
    /** The keystroke gesture `Ctrl` + `Shift` + `F8`. (`Command` + `Shift` + `F8` on Apple devices.) */
    CtrlShiftF8 = "CtrlShift F8",
    /** The keystroke gesture `Ctrl` + `Shift` + `F9`. (`Command` + `Shift` + `F9` on Apple devices.) */
    CtrlShiftF9 = "CtrlShift F9",
    /** The keystroke gesture `Ctrl` + `Shift` + `F10`. (`Command` + `Shift` + `F10` on Apple devices.) */
    CtrlShiftF10 = "CtrlShift F10",
    /** The keystroke gesture `Ctrl` + `Shift` + `F11`. (`Command` + `Shift` + `F11` on Apple devices.) */
    CtrlShiftF11 = "CtrlShift F11",
    /** The keystroke gesture `Ctrl` + `Shift` + `F12`. (`Command` + `Shift` + `F12` on Apple devices.) */
    CtrlShiftF12 = "CtrlShift F12",
    /** The keystroke gesture `Ctrl` + `Shift` + `Escape`. (`Command` + `Shift` + `Escape` on Apple devices.) */
    CtrlShiftEscape = "CtrlShift Escape",
    /** The keystroke gesture `Ctrl` + `Shift` + `Insert`. (`Command` + `Shift` + `Insert` on Apple devices.) */
    CtrlShiftInsert = "CtrlShift Insert",
    /** The keystroke gesture `Ctrl` + `Shift` + `Delete`. (`Command` + `Shift` + `Delete` on Apple devices.) */
    CtrlShiftDelete = "CtrlShift Delete",
    /** The keystroke gesture `Ctrl` + `Shift` + `Backspace`. (`Command` + `Shift` + `Backspace` on Apple devices.) */
    CtrlShiftBackspace = "CtrlShift Backspace",
    /** The keystroke gesture `Ctrl` + `Shift` + `Home`. (`Command` + `Shift` + `Home` on Apple devices.) */
    CtrlShiftHome = "CtrlShift Home",
    /** The keystroke gesture `Ctrl` + `Shift` + `End`. (`Command` + `Shift` + `End` on Apple devices.) */
    CtrlShiftEnd = "CtrlShift End",
    /** The keystroke gesture `Ctrl` + `Shift` + `Page Up`. (`Command` + `Shift` + `Page Up` on Apple devices.) */
    CtrlShiftPageUp = "CtrlShift PageUp",
    /** The keystroke gesture `Ctrl` + `Shift` + `Page Down`. (`Command` + `Shift` + `Page Down` on Apple devices.) */
    CtrlShiftPageDown = "CtrlShift PageDown",
    /** The keystroke gesture `Ctrl` + `Shift` + `Up`. (`Command` + `Shift` + `Up` on Apple devices.) */
    CtrlShiftArrowUp = "CtrlShift ArrowUp",
    /** The keystroke gesture `Ctrl` + `Shift` + `Down`. (`Command` + `Shift` + `Down` on Apple devices.) */
    CtrlShiftArrowDown = "CtrlShift ArrowDown",
    /** The keystroke gesture `Ctrl` + `Shift` + `Left`. (`Command` + `Shift` + `Left` on Apple devices.) */
    CtrlShiftArrowLeft = "CtrlShift ArrowLeft",
    /** The keystroke gesture `Ctrl` + `Shift` + `Right`. (`Command` + `Shift` + `Right` on Apple devices.) */
    CtrlShiftArrowRight = "CtrlShift ArrowRight",
    /** The keystroke gesture `Ctrl` + `Shift` + `Enter`. (`Command` + `Shift` + `Enter` on Apple devices.) */
    CtrlShiftEnter = "CtrlShift Enter",
    /** The keystroke gesture `Ctrl` + `Shift` + `Menu Key`. (`Command` + `Shift` + `Menu Key` on Apple devices.) */
    CtrlShiftMenuKey = "CtrlShift MenuKey",
    /** The keystroke gesture `Alt` + `Shift` + `A`. (`Option` + `Shift` + `A` on Apple devices.) */
    AltShiftA = "AltShift A",
    /** The keystroke gesture `Alt` + `Shift` + `B`. (`Option` + `Shift` + `B` on Apple devices.) */
    AltShiftB = "AltShift B",
    /** The keystroke gesture `Alt` + `Shift` + `C`. (`Option` + `Shift` + `C` on Apple devices.) */
    AltShiftC = "AltShift C",
    /** The keystroke gesture `Alt` + `Shift` + `D`. (`Option` + `Shift` + `D` on Apple devices.) */
    AltShiftD = "AltShift D",
    /** The keystroke gesture `Alt` + `Shift` + `E`. (`Option` + `Shift` + `E` on Apple devices.) */
    AltShiftE = "AltShift E",
    /** The keystroke gesture `Alt` + `Shift` + `F`. (`Option` + `Shift` + `F` on Apple devices.) */
    AltShiftF = "AltShift F",
    /** The keystroke gesture `Alt` + `Shift` + `G`. (`Option` + `Shift` + `G` on Apple devices.) */
    AltShiftG = "AltShift G",
    /** The keystroke gesture `Alt` + `Shift` + `H`. (`Option` + `Shift` + `H` on Apple devices.) */
    AltShiftH = "AltShift H",
    /** The keystroke gesture `Alt` + `Shift` + `I`. (`Option` + `Shift` + `I` on Apple devices.) */
    AltShiftI = "AltShift I",
    /** The keystroke gesture `Alt` + `Shift` + `J`. (`Option` + `Shift` + `J` on Apple devices.) */
    AltShiftJ = "AltShift J",
    /** The keystroke gesture `Alt` + `Shift` + `K`. (`Option` + `Shift` + `K` on Apple devices.) */
    AltShiftK = "AltShift K",
    /** The keystroke gesture `Alt` + `Shift` + `L`. (`Option` + `Shift` + `L` on Apple devices.) */
    AltShiftL = "AltShift L",
    /** The keystroke gesture `Alt` + `Shift` + `M`. (`Option` + `Shift` + `M` on Apple devices.) */
    AltShiftM = "AltShift M",
    /** The keystroke gesture `Alt` + `Shift` + `N`. (`Option` + `Shift` + `N` on Apple devices.) */
    AltShiftN = "AltShift N",
    /** The keystroke gesture `Alt` + `Shift` + `O`. (`Option` + `Shift` + `O` on Apple devices.) */
    AltShiftO = "AltShift O",
    /** The keystroke gesture `Alt` + `Shift` + `P`. (`Option` + `Shift` + `P` on Apple devices.) */
    AltShiftP = "AltShift P",
    /** The keystroke gesture `Alt` + `Shift` + `Q`. (`Option` + `Shift` + `Q` on Apple devices.) */
    AltShiftQ = "AltShift Q",
    /** The keystroke gesture `Alt` + `Shift` + `R`. (`Option` + `Shift` + `R` on Apple devices.) */
    AltShiftR = "AltShift R",
    /** The keystroke gesture `Alt` + `Shift` + `S`. (`Option` + `Shift` + `S` on Apple devices.) */
    AltShiftS = "AltShift S",
    /** The keystroke gesture `Alt` + `Shift` + `T`. (`Option` + `Shift` + `T` on Apple devices.) */
    AltShiftT = "AltShift T",
    /** The keystroke gesture `Alt` + `Shift` + `U`. (`Option` + `Shift` + `U` on Apple devices.) */
    AltShiftU = "AltShift U",
    /** The keystroke gesture `Alt` + `Shift` + `V`. (`Option` + `Shift` + `V` on Apple devices.) */
    AltShiftV = "AltShift V",
    /** The keystroke gesture `Alt` + `Shift` + `W`. (`Option` + `Shift` + `W` on Apple devices.) */
    AltShiftW = "AltShift W",
    /** The keystroke gesture `Alt` + `Shift` + `X`. (`Option` + `Shift` + `X` on Apple devices.) */
    AltShiftX = "AltShift X",
    /** The keystroke gesture `Alt` + `Shift` + `Y`. (`Option` + `Shift` + `Y` on Apple devices.) */
    AltShiftY = "AltShift Y",
    /** The keystroke gesture `Alt` + `Shift` + `Z`. (`Option` + `Shift` + `Z` on Apple devices.) */
    AltShiftZ = "AltShift Z",
    /** The keystroke gesture `Alt` + `Shift` + `0`. (`Option` + `Shift` + `0` on Apple devices.) */
    AltShift0 = "AltShift num0",
    /** The keystroke gesture `Alt` + `Shift` + `1`. (`Option` + `Shift` + `1` on Apple devices.) */
    AltShift1 = "AltShift num1",
    /** The keystroke gesture `Alt` + `Shift` + `2`. (`Option` + `Shift` + `2` on Apple devices.) */
    AltShift2 = "AltShift num2",
    /** The keystroke gesture `Alt` + `Shift` + `3`. (`Option` + `Shift` + `3` on Apple devices.) */
    AltShift3 = "AltShift num3",
    /** The keystroke gesture `Alt` + `Shift` + `4`. (`Option` + `Shift` + `4` on Apple devices.) */
    AltShift4 = "AltShift num4",
    /** The keystroke gesture `Alt` + `Shift` + `5`. (`Option` + `Shift` + `5` on Apple devices.) */
    AltShift5 = "AltShift num5",
    /** The keystroke gesture `Alt` + `Shift` + `6`. (`Option` + `Shift` + `6` on Apple devices.) */
    AltShift6 = "AltShift num6",
    /** The keystroke gesture `Alt` + `Shift` + `7`. (`Option` + `Shift` + `7` on Apple devices.) */
    AltShift7 = "AltShift num7",
    /** The keystroke gesture `Alt` + `Shift` + `8`. (`Option` + `Shift` + `8` on Apple devices.) */
    AltShift8 = "AltShift num8",
    /** The keystroke gesture `Alt` + `Shift` + `9`. (`Option` + `Shift` + `9` on Apple devices.) */
    AltShift9 = "AltShift num9",
    /** The keystroke gesture `Alt` + `Shift` + `Space`. (`Option` + `Shift` + `Space` on Apple devices.) */
    AltShiftSpace = "AltShift Space",
    /** The keystroke gesture `Alt` + `Shift` + `Slash`. (`Option` + `Shift` + `Slash` on Apple devices.) */
    AltShiftSlash = "AltShift Slash",
    /** The keystroke gesture `Alt` + `Shift` + `Comma`. (`Option` + `Shift` + `Comma` on Apple devices.) */
    AltShiftComma = "AltShift Comma",
    /** The keystroke gesture `Alt` + `Shift` + `Period`. (`Option` + `Shift` + `Period` on Apple devices.) */
    AltShiftPeriod = "AltShift Period",
    /** The keystroke gesture `Alt` + `Shift` + `Minus`. (`Option` + `Shift` + `Minus` on Apple devices.) */
    AltShiftMinus = "AltShift Minus",
    /** The keystroke gesture `Alt` + `Shift` + `Equals`. (`Option` + `Shift` + `Equals` on Apple devices.) */
    AltShiftEquals = "AltShift Equals",
    /** The keystroke gesture `Alt` + `Shift` + `Bracket Left`. (`Option` + `Shift` + `Bracket Left` on Apple devices.) */
    AltShiftBracketLeft = "AltShift BracketLeft",
    /** The keystroke gesture `Alt` + `Shift` + `Bracket Right`. (`Option` + `Shift` + `Bracket Right` on Apple devices.) */
    AltShiftBracketRight = "AltShift BracketRight",
    /** The keystroke gesture `Alt` + `Shift` + `F1`. (`Option` + `Shift` + `F1` on Apple devices.) */
    AltShiftF1 = "AltShift F1",
    /** The keystroke gesture `Alt` + `Shift` + `F2`. (`Option` + `Shift` + `F2` on Apple devices.) */
    AltShiftF2 = "AltShift F2",
    /** The keystroke gesture `Alt` + `Shift` + `F3`. (`Option` + `Shift` + `F3` on Apple devices.) */
    AltShiftF3 = "AltShift F3",
    /** The keystroke gesture `Alt` + `Shift` + `F4`. (`Option` + `Shift` + `F4` on Apple devices.) */
    AltShiftF4 = "AltShift F4",
    /** The keystroke gesture `Alt` + `Shift` + `F5`. (`Option` + `Shift` + `F5` on Apple devices.) */
    AltShiftF5 = "AltShift F5",
    /** The keystroke gesture `Alt` + `Shift` + `F6`. (`Option` + `Shift` + `F6` on Apple devices.) */
    AltShiftF6 = "AltShift F6",
    /** The keystroke gesture `Alt` + `Shift` + `F7`. (`Option` + `Shift` + `F7` on Apple devices.) */
    AltShiftF7 = "AltShift F7",
    /** The keystroke gesture `Alt` + `Shift` + `F8`. (`Option` + `Shift` + `F8` on Apple devices.) */
    AltShiftF8 = "AltShift F8",
    /** The keystroke gesture `Alt` + `Shift` + `F9`. (`Option` + `Shift` + `F9` on Apple devices.) */
    AltShiftF9 = "AltShift F9",
    /** The keystroke gesture `Alt` + `Shift` + `F10`. (`Option` + `Shift` + `F10` on Apple devices.) */
    AltShiftF10 = "AltShift F10",
    /** The keystroke gesture `Alt` + `Shift` + `F11`. (`Option` + `Shift` + `F11` on Apple devices.) */
    AltShiftF11 = "AltShift F11",
    /** The keystroke gesture `Alt` + `Shift` + `F12`. (`Option` + `Shift` + `F12` on Apple devices.) */
    AltShiftF12 = "AltShift F12",
    /** The keystroke gesture `Alt` + `Shift` + `Escape`. (`Option` + `Shift` + `Escape` on Apple devices.) */
    AltShiftEscape = "AltShift Escape",
    /** The keystroke gesture `Alt` + `Shift` + `Insert`. (`Option` + `Shift` + `Insert` on Apple devices.) */
    AltShiftInsert = "AltShift Insert",
    /** The keystroke gesture `Alt` + `Shift` + `Delete`. (`Option` + `Shift` + `Delete` on Apple devices.) */
    AltShiftDelete = "AltShift Delete",
    /** The keystroke gesture `Alt` + `Shift` + `Backspace`. (`Option` + `Shift` + `Backspace` on Apple devices.) */
    AltShiftBackspace = "AltShift Backspace",
    /** The keystroke gesture `Alt` + `Shift` + `Home`. (`Option` + `Shift` + `Home` on Apple devices.) */
    AltShiftHome = "AltShift Home",
    /** The keystroke gesture `Alt` + `Shift` + `End`. (`Option` + `Shift` + `End` on Apple devices.) */
    AltShiftEnd = "AltShift End",
    /** The keystroke gesture `Alt` + `Shift` + `Page Up`. (`Option` + `Shift` + `Page Up` on Apple devices.) */
    AltShiftPageUp = "AltShift PageUp",
    /** The keystroke gesture `Alt` + `Shift` + `Page Down`. (`Option` + `Shift` + `Page Down` on Apple devices.) */
    AltShiftPageDown = "AltShift PageDown",
    /** The keystroke gesture `Alt` + `Shift` + `Up`. (`Option` + `Shift` + `Up` on Apple devices.) */
    AltShiftArrowUp = "AltShift ArrowUp",
    /** The keystroke gesture `Alt` + `Shift` + `Down`. (`Option` + `Shift` + `Down` on Apple devices.) */
    AltShiftArrowDown = "AltShift ArrowDown",
    /** The keystroke gesture `Alt` + `Shift` + `Left`. (`Option` + `Shift` + `Left` on Apple devices.) */
    AltShiftArrowLeft = "AltShift ArrowLeft",
    /** The keystroke gesture `Alt` + `Shift` + `Right`. (`Option` + `Shift` + `Right` on Apple devices.) */
    AltShiftArrowRight = "AltShift ArrowRight",
    /** The keystroke gesture `Alt` + `Shift` + `Enter`. (`Option` + `Shift` + `Enter` on Apple devices.) */
    AltShiftEnter = "AltShift Enter",
    /** The keystroke gesture `Alt` + `Shift` + `Menu Key`. (`Option` + `Shift` + `Menu Key` on Apple devices.) */
    AltShiftMenuKey = "AltShift MenuKey"
  }


  /** Any of the subset of editor commands that inserts an object into the editor. */
  type EditorObject = MathObject | keyof typeof MathObject | ChemistryObject | keyof typeof ChemistryObject;

  /**
   * An immutable representation of a colour in the sRGB (Standard Red Green Blue) space.
   * 
   * Each component of a Color is described by a number between 0 and 1 inclusive. For example, (0.5, 0, 0) would yield pure red at half the possible brightness. An alpha (opacity) level can optionally be specified as a fourth component, with 0 meaning fully transparent and 1 meaning fully opaque.
   *
   * Color instances are *immutable*: once created, the component values of a particular Color can't be changed.
   * 
   * **Example:** Convert a CSS color name to its hex notation equivalent
   * ```js
   * let c = micd.Color.fromCss("pink");
   * console.log(c.toHexString());
   * ```
   */
  class Color {
    /**
     * Creates a new colour with the specified levels of red, green, blue, and alpha (opacity). Arguments are clamped, if necessary, to the 0 to 1 range.
     * 
     * @param red The amount of red light, from 0 to 1.
     * @param green The amount of green light, from 0 to 1.
     * @param blue The amount of blue light, from 0 to 1.
     * @param alpha The opacity of the colour, from 0 to 1.
     * @throws *TypeError* If arguments are missing or not numbers.
     */
    constructor(red: number, green: number, blue: number, alpha?: number);

    /** The amount of red in this colour, from 0 (none) to 1 (maximum) inclusive. */
    readonly red: number;

    /** The amount of green in this colour, from 0 (none) to 1 (maximum) inclusive. */
    readonly green: number;

    /** The amount of blue in this colour, from 0 (none) to 1 (maximum) inclusive. */
    readonly blue: number;

    /** The alpha value (opacity) of this colour, from 0 (transparent) to 1 (opaque) inclusive. */
    readonly alpha: number;

    /**
     * Returns a new Color instance whose color is derived from this color by rotating its hue and multiplying its saturation, value, and alpha by the specified factors. This Color will be converted to HSV, adjusted by the specified factors, clamped to valid values, and then returned as a new Color.
     *
     * @param hueRotation The amount to rotate the hue by, measured in rotations. Use 0 for no change, 0.5 to use the opposite hue.
     * @param saturationFactor The saturation adjustment factor, from 0 to 1. Use 1 for no change, 0 to convert to greyscale.
     * @param valueFactor The value adjustment factor. Use 1 to retain the current brightness.
     * @param alphaFactor The opacity of the colour, from 0 to 1. Use 1 for no change.
     * @returns A Color instance representing the same color.
     */
    derive(hueRotation: number, saturationFactor: number, valueFactor: number, alphaFactor: number): Color;

    /**
     * Mixes this color with another color, returning the new, combined color. The alpha values of the two input colors are ignored. The result will have red, green, and blue values at the midpoints between the two colors and an alpha of 1 (fully opaque).
     * 
     * @param withColor The color to mix this color with.
     * @returns An opaque color halfway between this color and the specified color.
     */
    mix(withColor: Color): Color;

    /**
     * Mixes this color with another color as if by painting the specified top color over this color. If the top color is opaque, it will replace this color. Otherwise the colors will be blended in proportion to the top color's alpha value.
     * 
     * @param topColor The color to mix in by “painting over” this color.
     * @param newAlpha If specified, this value becomes the alpha value of the new color; otherwise the alpha value of the new color is the same as this color (the bottom color).
     * @returns A new color that simulates layering the specified color over this color.
     * @see [[withAlpha]]
     */
    layer(topColor: Color, newAlpha?: number): Color;

    /**
     * Returns a new color identical to this color but with a different translucency (alpha value).
     * @param newAlpha The new alpha value. The default is 1 (fully opaque).
     * @returns A color identical to this color except that its alpha value is as specified.
     */
    withAlpha(newAlpha?: number): Color;

    /**
     * Returns a string representation of this colour using CSS rgb() or rgba() notation. For example, a colour with red 1, green 0.75, blue 0.5, and alpha 0.25 might return the string `"rgba(255,191,128,0.25)"`.
     * 
     * @returns An rgb(a) string that describes this color.
     */
    toString(): string;

    /**
     * Returns a string representation of this colour using CSS hexadecimal notation. For example, a colour with red 1, green 0.75, blue 0.5, and opacity 0.25 might return the string `"#ffbf8040"`.
     * 
     * @returns A CSS hexadecimal string that describes this color.
     */
    toHexString(): string;

    /**
     * Returns the value of the color as a 32-bit unsigned integer.
     * 
     * @returns The color in RGBA32 format.
     */
    toBits(): number;

    /**
     * Creates a Color instance from the specified 32-bit unsigned integer.
     * 
     * @param rgba32 The color in RGBA32 format.
     * @returns A Color instance representing the same color.
     */
    static fromBits(rgba32: number): Color;

    /**
     * Returns the value of the color in the HSV (hue-saturation-value) color space as an array in hue, saturation, value order.
     */
    toHsv(): [number, number, number];

    /**
     * Creates a Color instance from the given values in the HSV (hue-saturation-value) color space. If alpha is not specified, it is treated as 1 (fully opaque).
     *
     * @param hue The hue, as an angle measured in rotations.
     * @param saturation The saturation, from 0 to 1.
     * @param value The value (roughly, the admixture of black or white), from 0 to 1.
     * @param alpha The opacity of the colour, from 0 to 1.
     * @returns A Color instance representing the same color.
     */
    static fromHsv(hue: number, saturation: number, value: number, alpha?: number): Color;

    /**
     * Creates a Color instance from the given byte values. If alpha is not specified, it is treated as 255 (fully opaque).
     * 
     * @param redByte The amount of red light, from 0 to 255.
     * @param greenByte The amount of green light, from 0 to 255.
     * @param blueByte The amount of blue light, from 0 to 255.
     * @param alphaByte The opacity of the colour, from 0 to 255.
     * @returns A Color instance representing the described colour.
     * @throws *TypeError* If arguments are missing or not numbers.
     */
    static fromBytes(redByte: number, greenByte: number, blueByte: number, alphaByte?: number): Color;

    /**
     * Creates a Color instance from the specified CSS Color value. Any notation recognized by the browser is acceptable, including functional (e.g., `"rgba(176, 224, 230, 0.87)"`, `"hsl(270deg, 60%, 70%)"`"), hexadecimal (e.g., `"#b0e0e6"`), and keywords (e.g., `"powderblue"`). As with theme colours, "hexa" notation (#rrggbbaa and #rgba) is allowed even when not supported by the browser. If the specified string is not a valid colour, null is returned instead.
     * 
     * @param cssColorValue A (possible) CSS Color value.
     * @returns A Color instance representing the same color, or null if the string was not a valid.
     */
    static fromCss(cssColorValue: string | null): Color | null;

    /**
     * Converts a colour value from the RGB (red-green-blue) color space to the HSV (hue-saturation-value) color space. The arguments will be clamped, if necessary, to the 0 to 1 range.
     * 
     * @param red The amount of red light, from 0 to 1.
     * @param green The amount of green light, from 0 to 1.
     * @param blue The amount of blue light, from 0 to 1.
     * @returns An array of the converted color components in hue, saturation, value order.
     * @throws *TypeError* If arguments are missing or not numbers.
     * @see [[hsvToRgb]]
     */
    static rgbToHsv(red: number, green: number, blue: number): [number, number, number];

    /**
     * Converts a colour value from the HSV (hue-saturation-value) color space to the RGB (red-green-blue) color space. The saturation and value arguments will be clamped, if necessary, to the 0 to 1 range. The hue value can be any number. The whole part is discarded and the fraction bits are used to describe an angle around a color wheel. (Multiply the hue by 360 to convert to degrees.) 
     * 
     * @param hue The hue, as an angle measured in rotations.
     * @param saturation The saturation, from 0 to 1.
     * @param value The value (roughly, the admixture of black or white), from 0 to 1.
     * @returns An array of the converted color components in red, green, blue order.
     * @throws *TypeError* If arguments are missing or not numbers.
     * @see [[rgbToHsv]]
     */
    static hsvToRgb(hue: number, saturation: number, value: number): [number, number, number];

    /**
     * Converts an RGB or RGBA color description to a string in CSS rgb() or rgba() notation.
     * 
     * @param red The amount of red light, from 0 to 1.
     * @param green The amount of green light, from 0 to 1.
     * @param blue The amount of blue light, from 0 to 1.
     * @param alpha The opacity of the colour, from 0 to 1.
     * @returns A CSS rgb(a) string that describes the color.
     * @throws *TypeError* If arguments are missing or not numbers.
     * @see [[toString]]
     */
    static rgbaToCss(red: number, green: number, blue: number, alpha?: number): string;

    /**
     * Converts an RGB or RGBA color description to a string in CSS hexadecimal notation.
     * 
     * @param red The amount of red light, from 0 to 1.
     * @param green The amount of green light, from 0 to 1.
     * @param blue The amount of blue light, from 0 to 1.
     * @param alpha The opacity of the colour, from 0 to 1.
     * @throws *TypeError* If arguments are missing or not numbers.
     * @see [[toHexString]]
     */
    static rgbaToHexString(red: number, green: number, blue: number, alpha?: number);
  }

  /**
   * Explores and transforms the contents of an [[Editor]]. A walker maintains a position within an editor's document similar to, but generally independent of, the caret position. This position can be moved through the document, and the [[Node]]s that make up the document can be examined and modified.
   * 
   * The walker position is changed using any of a collection of movement methods accessed through the [[moveTo]] property. Content can be inserted at the walker position using a collection of methods accessed through the [[insert]] property. Other editor commands can be applied at the walker position using the [[apply]] method. Each of these also has a *can* variant that tests whether an action is possible without actually performing it.
   * 
   * The document node at the walker position can be examined using the [[node]] property. To explore or modify nodes recursively, [[visit]] the nodes with a [[VisitorFunction]].
   * 
   * **Example:** Use a Walker to append a variable to the end of a document
   * ```js
   * let walker = new micd.Walker(editor);
   * walker.moveTo.documentEnd();
   * walker.insert.variable("x");
   * ```
   */
  class Walker {
    /**
     * Creates a new walker that can examine and modify the contents of the specified editor.
     * 
     * @param sourceEditor The editor to walk through.
     */
    constructor(sourceEditor: Editor);

    /**
     * A string that describes this walker's current position within the editor document as a path starting from the document root node. This can be used to get or set the current position directly.
     * 
     * @throws Throws an error if set to a string that is null or that does not describe a valid position.
     */
    position: string;

    /**
     * An array that describes the position of this walker relative to the node that directly contains that position, consisting of the node itself, the field, and the offset from the start of the field. If this position refers to a non-null [[node]], then the value is the same as `node.relativePosition`. However, *this* property is defined even if `node` is null.
     */
    readonly relativePosition: [Node, number, number];

    /**
     * The node at the current position, or null if there is no node there. (There is no node in the last position of a field as this position is used to append new nodes to the field.)
     */
    readonly node: Node | null;

    /**
     * The root node of the edited document. The editor always has a valid document root, although the root can change if the entire document is replaced using [[Editor.value]].
     */
    readonly rootNode: Node;

    /** The number of lines in the document. Equivalent to `walker.rootNode.numFields`. */
    readonly numLines: number;

    /** A set of methods used to visit parts of a document by calling a visitor function on each node in turn. */
    readonly visit: WalkerVisitMethods;

    /**
     * A set of methods used to move this walker to a new position in the document. For example, `walker.moveTo.caret()` will move this walker to the current caret position. To check whether a move is possible without actually moving, use [[canMoveTo]] instead.
     */
    readonly moveTo: WalkerMovementMethods;

    /**
     * A set of methods used to check whether a given move is possible without actually performing it. For example, `walker.canMoveTo.line(99)` will return false if the document has less than 100 lines.
     */
    readonly canMoveTo: WalkerMovementMethods;

    /**
     * A set of methods used to insert content at the current position. Content is inserted as if the caret was just before the node (if any) at the current position. For example, `walker.insert.number(1.618)` will insert the number 1.618 as a sequence of digit nodes at the current position. To check whether an insertion is possible without actually doing it, use [[canInsert]] instead.
     */
    readonly insert: WalkerInsertionMethods;

    /**
     * A set of methods used to check whether it is possible to insert a given type of content at the current position without actually inserting anything. For example, `walker.canInsert.object("squareRoot")` would return whether it is possible to insert a sqaure root object at the current position. Note that if an insertion is allowed, in rare cases it may not occur at the exact walker position. For example, it is allowed to insert a math object inside of a text node, but the result will be to split the text node and place the math object between the two parts.
     */
    readonly canInsert: WalkerInsertionMethods;

    /**
     * A set of methods used to create [[Clip]]s of content that can then be inserted into the document. For example, `walker.clipOf.childField(0)` would return a copy of the entire contents of the first child field of the node at the current position as a Clip.
     */
    readonly clipOf: WalkerClipMethods;

    /**
     * Returns whether the specified command can be applied at the current position of the walker. This may or may not be the same as the position of the caret.
     * 
     * @param apiName The name of the command to check.
     * @returns True if the command is valid and can be applied at the current position.
     */
    canApply(apiName: EditorCommand | keyof typeof EditorCommand): boolean;

    /**
     * Applies the specified command at the current position of the walker. The effect is as if the caret was moved to the position of the walker, the command was applied, and then the walker position was updated to the match the new position of the caret. If there is a selection active when this is called, and the selection includes the current position, then the command will be applied using the selection. Otherwise, it will be applied as if there were no selection.
     * 
     * @param apiName The name of the command to apply.
     * @returns True if the command was applied.
     */
    apply(apiName: EditorCommand | keyof typeof EditorCommand): boolean;

    /**
     * Moves the caret position in the editor to match the current position in this walker. Equivalent to `editor.caretPosition = walker.position`.
     */
    moveCaretToPosition(): void;
  }

  /** Methods used to move through the nodes of a document in a [[Walker]]. */
  interface WalkerMovementMethods {
    /**
     * Moves to the start of the document.
     * 
     * @returns Whether or not the move is allowed.
     */
    documentStart(): boolean;

    /**
     * Moves to the end of the document.
     * 
     * @returns Whether or not the move is allowed.
     */
    documentEnd(): boolean;

    /**
     * Moves to the start of the specified line, counting from 0. Negative numbers count backward from the end of the document. Hence, `line(-1)` would move to the start of the last line.
     * 
     * @param lineNumber The line number to move to, from 0. If negative, counts from the document end.
     * @returns Whether or not the move is allowed.
     */
    line(lineNumber: number): boolean;

    /**
     * Moves to the start of the same field that includes the current position.
     * 
     * @returns Whether or not the move is allowed.
     */
    fieldStart(): boolean;

    /**
     * Moves to the end of the same field that includes the current position. The value of `walker.node` at this position will always be null.
     * 
     * @returns Whether or not the move is allowed.
     */
    fieldEnd(): boolean;

    /**
     * Moves to the position of the editor caret.
     * 
     * @returns Whether or not the move is allowed.
     */
    caret(): boolean;

    /**
     * Moves to the start of the editor selection. If there is no selection, moves to the position of the caret.
     * 
     * @returns Whether or not the move is allowed.
     */
    selectionStart(): boolean;

    /**
     * Moves to the end of the editor selection. If there is no selection, moves to the position of the caret.
     * 
     * @returns Whether or not the move is allowed.
     */
    selectionEnd(): boolean;

    /**
     * Moves to the position of the parent node that contains the current position.
     * 
     * @returns Whether or not the move is allowed.
     */
    parent(): boolean;

    /**
     * Moves to the start of the indicated child field of the node at the current position. Equivalent to `walker.childNode(fieldNum, 0)`. If the field is negative, the method counts backward from the last field. Hence, `childField(-1)` would move to the start of the last field.
     * 
     * @param fieldNum: The index of the child field, from 0 to `numFields-1`.
     * @returns Whether or not the move is allowed.
     */
    childField(fieldNum: number): boolean;

    /**
     * Moves to the specified offset from the start of the indicated child field of the node at the current position.
     * 
     * @param fieldNum: The index of the child field, from 0 to `numFields-1`.
     * @param indexOfNodeInField: The index of the node within the field, from 0.
     * @returns Whether or not the move is allowed.
     */
    childNode(fieldNum: number, indexOfNodeInField: number): boolean;

    /**
     * Moves to the position of the target node. The target node must be part of the editor document that this walker was created for. It cannot be the document root as the root cannot be described by any position.
     * 
     * @param target The node to move to; if successful, a new node inserted at this position will appear just *before* the target.
     * @returns Whether or not the move is allowed.
     */
    node(target: Node): boolean;

    /**
     * Moves to a position inside of the target node. The target node must be part of the editor document that this walker was created for, the specified field must exist on that node, and the index must refer to a node in that field or the field end.
     * 
     * @param parent The non-null parent node that will contain the new position.
     * @param fieldNum The index of the child field, from 0 to `numFields-1`.
     * @param indexOfNodeInField The index of the node within the field, from 0 to the length of the specified field.
     * @returns Whether or not the move is allowed.
     */
    relativePosition(parent: Node, fieldNum: number, indexOfNodeInField: number): boolean;

    /**
     * Moves toward the start of the document, moving through the children of any nodes in reverse order. The effect is the same as using the `moveLeft` command, except that this method affects the walker position rather than the document caret.
     * 
     * @returns Whether or not the move is allowed.
     */
    left(): boolean;

    /**
     * Moves toward the end of the document, moving through the children of any nodes before traversing them. The effect is the same as using the `moveRight` command, except that this method affects the walker position rather than the document caret.
     * 
     * @returns Whether or not the move is allowed.
     */
    right(): boolean;

    /**
     * Moves toward the start of the document without visiting the children of nodes as they are crossed. For example, this can be called repeatedly to visit every node in a field without "entering" any of those nodes.
     * 
     * @returns Whether or not the move is allowed.
     */
    prev(): boolean;

    /**
     * Moves toward the end of the document without visiting the children of nodes as they are crossed. For example, this can be called repeatedly to visit every node in a field without "entering" any of those nodes.
     * 
     * @returns Whether or not the move is allowed.
     */
    next(): boolean;
  }

  /**
   * Methods used to insert content into a document via a [[Walker]]. As with [[apply]], the position of the walker will be updated to match the caret position after an insertion so that it is ready to insert more material.
   */
  interface WalkerInsertionMethods {
    /**
     * Inserts a variable at the current position. A variable name (symbol) must consist of exactly one Unicode code point. Only certain code points are allowed, typically letters. Using standard unaccented letters from the Latin or Greek alphabet is strongly recommended as other letters may not render correctly, especially when exported. Combinations not typically seen in mathematical writing, such as a constant set named with a lower case Latin letter, may not render as expected.
     * 
     * Unit names are composed of “variables” with the special data type `"unit_name"`. If the current position is inside of a unit node, variables inserted with the default scalar variable data type will be silently converted to this type. Other data types will be rejected, returning false.
     * 
     * @param symbol The variable name, which must be exactly one letter.
     * @param dataType The data type of the variable (default is scalar).
     * @param accent The accent to place on the variable (default is none).
     * @returns True if the insertion was possible.
     */
    variable(symbol: string, dataType?: DataType | keyof typeof DataType | null, accent?: AccentType | keyof typeof AccentType): boolean;

    /**
     * Inserts an identifier at the current position. Unlike a variable, an identifier can consist of multiple letters (like a variable name in a computer program). The result is an identifier parent node with a single field containing a character node for each letter in the name.
     * 
     * @param symbol The identifier name.
     * @param dataType The data type of the identifier (default is scalar).
     * @returns True if the insertion was possible.
     */
    identifier(symbol: string, dataType?: DataType | keyof typeof DataType | null): boolean;

    /**
     * Inserts a text annotation at the current position. If the current position is inside of an existing text annotation, the text is inserted into the existing annotation.
     * 
     * @param text The text content to insert.
     * @returns True if the insertion was possible.
     */
    text(text: string): boolean;

    /**
     * Inserts a number at the current position. As the editor does not represent numbers as a single object, this will result in the insertion of one or more digit nodes (a radix point is considered a type of digit).
     * 
     * This method will accept a string representation of a number, as well as JavaScript number or bigint values. To simplify working with external values, this method also handles some non-digit characters:
     * 
     *  - the `+`, `-`, `±`, and `∓` characters will be inserted as operators;
     *  - the string `Infinity` will become an infinity symbol (∞);
     *  - scientific notation (marked by an `e` or `E`) will become ×10 followed by
     *    the relevant exponent;
     *  - space characters are ignored;
     *  - both `.` and `,` will be interpreted as radix points.
     * 
     * **Example:** Insert a number using scientific notation
     * ```js
     * let walker = new micd.Walker(editor);
     * walker.insert.number("1.4e7");
     * ```
     * 
     * @param digits The number to insert.
     * @returns True if the insertion was possible. This will return false if passed NaN or an invalid number (such as one with multiple radix points).
     */
    number(digits: string | number | bigint): boolean;

    /**
     * Inserts a new operator. This can insert custom operators for which no command exists. If the operator has an existing command, it is recommended that it be inserted by command name as this ensures that the recommended Unicode character is used for its symbol.
     * 
     * **Example:** Insert an asterisk operator
     * ```js
     * let walker = new micd.Walker(editor);
     * walker.insert.operator("\u2217", micd.OperatorPlacement.infix);
     * ```
     * 
     * **Notes:**
     * 1. Using custom operators may have unexpected results as the editor will not know how the operator is used and may not have suitable font glyphs for the requested symbol(s).
     * 2. Converting content with custom operator(s) to other formats may have unexpected results as the target format may not be able to represent the intended concept(s).
     * 3. Operators with the same symbol but different placements are considered to be distinct by the editor.
     * 
     * @param symbol A string, 1 to 24 code points in length, to be used as the operator's symbol.
     * @param placement The operator's placement relative to its operand(s). If none is specified, a default is chosen based on the symbol.
     * @returns True if the insertion was possible.
     */
    operator(symbol: string, placement?: OperatorPlacement | keyof typeof OperatorPlacement): boolean;

    /**
     * Inserts a new chemical element by symbol. This is an alternative to inserting them by their full name as objects.
     * 
     * **Example:** Insert the symbol for gold.
     * ```js
     * let walker = new micd.Walker(editor);
     * walker.insert.element("Au");
     * ```
     * 
     * @param symbol The symbol of an element in [[ChemistryObject]].
     * @param asIsotope If true, the element is inserted as an isotope object instead of a simple element.
     */
    element(symbol: string, asIsotope?: boolean): boolean;

    /**
     * Inserts a math or chemistry object by name. This is similar to [[apply]], except that it will reject other types of commands.
     * 
     * @param apiName The name of the command that inserts the object.
     * @returns True if the insertion was possible.
     */
    object(apiName: EditorObject): boolean;

    /**
     * Inserts a style object whose children will be rendered with the specified style.
     * 
     * **Example:** 
     * ```js
     * let walker = new micd.Walker(editor);
     * walker.insert.style(micd.Color.fromCss("powderblue"));
     * walker.insert.variable("Φ", "constant_scalar");
     * walker.insert.object(micd.EditorCommand.approximatelyEqualTo);
     * walker.insert.number(1.61803398874)
     * ```
     * 
     * @param color The color to apply to styled content.
     * @returns True if the insertion was possible.
     */
    style(color?: Color): boolean;

    /**
     * Inserts the contents of a clip.
     * 
     * @param clip The clip to be pasted.
     * @returns True if the insertion was possible.
     */
    clip(clip: Clip): boolean;
  }

  /** Methods used to create or capture clips of document content from a [[Walker]]. */
  interface WalkerClipMethods {
    /**
     * Returns a new clip of the specified number. See [[WalkerInsertionMethods.number]] for more information.
     * 
     * @param digits The number to insert.
     * @returns A clip of the specified number.
     */
    number(digits: string | number): Clip | null;

    /**
     * Returns a new clip of the specified text. See [[WalkerInsertionMethods.text]] for more information.
     * 
     * @param text The text content to insert.
     * @returns A clip of the specified text.
     */
    text(text: string): Clip | null;

    /**
     * Returns a new clip of the specified variable. See [[WalkerInsertionMethods.variable]] for more information.
     * 
     * @param symbol The variable name, which must be exactly one letter.
     * @param dataType The data type of the variable (default is scalar).
     * @param accent The accent to place on the variable (default is none).
     * @returns A clip of the specified variable.
     */
    variable(symbol: string, dataType?: DataType | keyof typeof DataType | null, accent?: AccentType | null): Clip | null;

    /**
     * Returns a new clip of the specified identifier. See [[WalkerInsertionMethods.identifier]] for more information.
     * 
     * @param symbol The identifier name.
     * @param dataType The data type of the identifier (default is scalar).
     * @returns A clip of the specified identifier.
     */
    identifier(symbol: string, dataType?: DataType | keyof typeof DataType): Clip | null;

    /**
     * Returns a new clip of the specified math object. See [[WalkerInsertionMethods.object]] for more information.
     * 
     * @param apiName The name of a command that inserts a math object.
     * @returns A clip of the specified math object.
     */
    object(apiName: EditorObject): Clip | null;

    /**
     * Returns a new clip of the specified style. See [[WalkerInsertionMethods.style]] for more information.
     * 
     * @param color The color to apply to styled content.
     * @returns A clip of the specified style.
     */
    style(color: Color, scale: number): Clip | null;

    /**
     * Returns a copy of the node at the current position as a clip. All of the node's children are included.
     * 
     * @returns A clip of the current node, or null if there is no current node.
     * @see [[Node]]
     */
    node(): Clip | null;

    /**
     * Returns a clip of the entire contents of the current field, that is, the field that includes the current position.
     * 
     * @returns A clip of the contents of the field, or null if the field is empty.
     * @see [[Node.field]]
     */
    field(): Clip | null;

    /**
     * Returns a clip containing the entire contents of one of the fields of the node at this position. If the field number is negative, the field is counted backward from the last field. Hence, `childField(-1)` would return the contents of the *last* child field.
     * 
     * @param field The field number to clip children from.
     * @returns A clip of the field content, or null.
     */
    childField(field: number): Clip | null;

    /**
     * Returns a clip of a group of nodes from one of the fields of the node at this position.
     * 
     * @param field The field number to clip children from.
     * @param startIndex The index of the first child node to include.
     * @param endIndex The index after the last child node to include.
     * @returns A clip of the specified children, or null if the subset is empty.
     */
    children(field: number, startIndex: number, endIndex: number): Clip | null;

    /**
     * Returns a clip of the contents of the specified document line, counting from 0. If the line number is negative, the line is counted from the end of the document, similar to [[WalkerMovementMethods.line]].
     * 
     * @param lineNumber The line number to clip, or a negative line number to count from the end.
     * @returns The content of the line as a clip, or null if the line is empty.
     */
    line(lineNumber: number): Clip | null;

    /**
     * Returns the node at the current caret position as a clip.
     * 
     * @returns A clip of the node at the caret position, or null if there is no node at the caret position.
     */
    caret(): Clip | null;

    /**
     * Returns the current editor selection as a clip.
     * 
     * @returns A clip of the selection, or null if there is no selection.
     */
    selection(): Clip | null;
  }

  /**
   * The stages that make up the process of visiting a [[Node]] with a [[Walker]].
   * @see [[VisitorFunction]]
   */
  const enum VisitStage {
    /** The node has just now been reached in document order. None of the node’s children, if any, have been visited. */
    before = "before",
    /** The node and all of its children, if any, have been visited. The visitor is about to move on to the next node in document order. */
    after = "after",
    /** The visitor is about to start visiting all of the child nodes in a given field.*/
    beforeField = "beforeField",
    /** The visitor has just finished visiting all of the child nodes in a given field. */
    afterField = "afterField",
  }

  /** Function called while visiting document nodes with a [[Walker]]. */
  interface VisitorFunction {
    /**
     * Called once during each stage of visiting a node. The visitation process will skip any nodes that this method inserts, as well as nodes that are deleted if they have not yet been visited.
     * 
     * @param walker The walker that is being used to visit the node.
     * @param node The node being visited.
     * @param stage A descriptor of the stage of the visitation process: whether the function is being called for a visit before or after entering the node or one of its fields.
     * @param field The index of the node field referred to by the stage, or -1 if the stage refers to the node itself.
     */
    (walker: Walker, node: Node, stage: VisitStage, field: number): void;
  }

  /**
   * Methods used to visit document content from a [[Walker]]. The specific method determines which subset of the document's nodes will be visited. Visitation consists of traversing the selected document subset one node at a time, in order from the start of the document toward the end. For each node, the specified *visitor function* is called multiple times:
   * 
   * 1. When the node is first reached, the function is called with stage value `"before"`.
   * 2. If the node has fields, each field will then be visited in order:
   *    1. Before each field visit begins, the function is again called, but with the stage value `"beforeField"` and a field value indicating the field number (0 for the first field).
   *    2. Each node in the field is then visited, recursively, in order.
   *    3. After the last node in the field is visited, the function is called with stage `"afterField"` and the field number.
   * 3. Once all of the fields have been visited, the function is called a final time for the node with stage `"after"`.
   * 
   * **Example:** Visitation order for ½&thinsp;*x*
   * ```
   * before fraction
   *   beforeField 0 of fraction
   *      before digit 1
   *      after digit 1
   *   afterField 0 of fraction
   *   beforeField 1 of fraction
   *      before digit 2
   *      after digit 2
   *   afterField 1 of fraction
   * after fraction
   * before variable x
   * after variable x
   * ```
   * 
   * Before each call to the visitor function, the walker position is updated to match the position of the visited node. Note that regardless of stage, the position is always the same: if the position were a caret position, the caret would be just before the node.
   * 
   * The order of node visits is determined by the document structure when the visit began. If a node is moved while visiting, it will be visited in its original order as if it had not moved. If a new node is inserted while visiting, it will be skipped by the visitor as if it were not present. If a node is removed while visiting, no further visits to that node will be made. Thus, if a node is removed at the `"before"` stage, then no `"after"` stage will occur, no fields will be visited, and none of node's children will be visited at all.
   */
  interface WalkerVisitMethods {
    /**
     * Visits every node in the editor document. Note that the document root is not visited, since it does not have a position inside the document. The document root node would be the first and last node visited, so it can easily be handled as a special case if desired.
     * 
     * @param visitor The function to be invoked on each node.
     * @see [[Node]]
     */
    document(visitor: VisitorFunction): void;

    /**
     * Visits the node at the current walker position, if any. (As with all visits, all of the node's descendants are also visited.)
     * 
     * @param visitor The function to be invoked on each node.
     */
    position(visitor: VisitorFunction): void;

    /**
     * Visits the nodes in the current editor selection, if any.
     * 
     * @param visitor The function to be invoked on each node.
     */
    selection(visitor: VisitorFunction): void;
  }

  /** Specifies the relative position of an operator and its operand or operands. */
  const enum OperatorPlacement {
    /** Specifies a binary operators placed between their operands, as in *a* ⨯ *b*. */
    infix = "infix",
    /** Specifies a unary operators placed before their operand, as in ¬&thinsp;*p*. */
    prefix = "prefix",
    /** Specifies a unary operators placed after their operand, as in *x*&thinsp;!. */
    postfix = "postfix",
    /** Specifies that an operator's placement depends on context. For example, *a* - *b* (infix) versus -*a* (prefix). */
    contextual = "contextual",
  }

  /**
   * Specifies the type of a variable or identifier.
   * 
   * **Example:** Insert a vector variable
   * ```js
   * let editor = new micd.Editor();
   * let walker = new micd.Walker(editor);
   * walker.insert.variable("x", micd.DataType.vector);
   * ```
   */
  const enum DataType {
    /** A boolean value, which may have a value of either be true or false. */
    boolean = "boolean",
    /** A scalar value, the default type. */
    scalar = "scalar",
    /** A set of objects. */
    set = "set",
    /** A point, as commonly used in geometry (as in, △ABC). */
    point = "point",
    /** A vector (a 1-dimensional list of values). Vector variables will automatically be rendered with an arrow, so the arrow is not added as an accent. */
    vector = "vector",
    /** A matrix (a 2-dimensional rectangular array of values). */
    matrix = "matrix",
    /** A tensor (a 3- or more dimensional array of values). */
    tensor = "tensor",

    /** A string of letters drawn from an alphabet. */
    string = "string",

    /** Type reserved for unit name components in a unit node. */
    unit_name = "unit_name",

    /** A boolean constant, such as the symbol **T** for true. */
    constant_boolean = "constant_boolean",
    /** A scalar constant, such as **π** or **e**. */
    constant_scalar = "constant_scalar",
    /** A set constant, such as **ℝ**, the field of real numbers. */
    constant_set = "constant_set",
    /** A vector constant, such as the zero vector. */
    constant_vector = "constant_vector",
  }

  /**
   * The type of accent shown over a variable. A null value indicates no accent.
   * 
   * **Example:** Insert the variable *x̂*
   * ```js
   * let editor = new micd.Editor();
   * let walker = new micd.Walker(editor);
   * walker.insert.variable("x", micd.DataType.scalar, micd.AccentType.hat);
   * ```
   */
  const enum AccentType {
    /** Specifies an acute accent, as in *x́*. */
    acute = "acute",
    /** Specifies a bar (macron) accent, as in *x̄*. */
    bar = "bar",
    /** Specifies a breve accent, as in *x̆*. */
    breve = "breve",
    /** Specifies a check (caron) accent, as in *x̌*. */
    check = "check",
    /** Specifies a dot accent, as in *ẋ*. */
    dot = "dot",
    /** Specifies a double dot (diaeresis) accent, as in *ẍ*. */
    ddot = "ddot",
    /** Specifies a grave accent, as in *x̀*. */
    grave = "grave",
    /** Specifies a hat (circumflex) accent, as in *x̂*. */
    hat = "hat",
    /** Specifies for a tilde accent, as in *x̃*. */
    tilde = "tilde",
  }

  /**
   * A node represents a single mathematical object in the document structure, such as a variable, a digit, or parentheses.
   * 
   * Complex nodes have one or more [[Field]]s, which are lists of child nodes. Each field represents a contiguous semantic subpart of the object. For example, a node representing a fraction would have two fields: one representing the numerator, and one representing the denominator. (The order of fields matches the order that the caret would move through them in the editor when repeatedly pressing the `Enter` key.)
   * 
   * Nodes are read-only reflections of the underlying content: modifying them has no effect on the document. To modify the document, use the [[Walker]] to insert, delete, and apply commands.
   * 
   * **Example:** Print the type of node under the caret
   * ```js
   * editor.apply(micd.MathObject.absoluteValue);
   * editor.apply(micd.EditorCommand.moveLeft);
   * let w = new micd.Walker(editor);
   * w.moveTo.caret();
   * console.log(w.node?.type);
   * ```
   */
  interface Node {
    /** The specific node type. Where possible, this matches the relevant API name. */
    readonly type: string;

    /** A more general description of the node type. For example, the `"plus"` type has base type `"operator"`. */
    readonly baseType: string;

    /**
     * A description of the mathematical category of the node type, such as `"Arithmetic"` or `"Calculus"`. This generally matches the name of the section where the corresponding command would be found in a generated help table.
     * 
     * @see [[createHelpTable]]
     */
    readonly category: string;

    /** For operators, variables, identifiers, or chars, the letter(s) and/or mathematical symbol(s) that represent the object. */
    readonly symbol?: string;

    /** Some operators consist of a vertical stack of symbols. For such operators, this is the symbol that appears above the primary symbol. */
    readonly symbolAbove?: string;

    /** For variables and identifiers, the data type. */
    readonly dataType?: DataType;

    /**
     * For variables, the type of accent shown over the variable, if any. Note that while vector variables may have an arrow accent, this is generated automatically based on the data type. If a variable has no user-specified accent, this will be null.
     */
    readonly accent?: AccentType;

    /** For operators, the operator's placement relative to its operand(s). */
    readonly placement?: OperatorPlacement;

    /**
     * For operators, the effective placement after context is considered. If an operator's placement is `contextual`, this property will specify its effective placement after taking context into account.
     */
    readonly effectivePlacement?: OperatorPlacement;

    /**
     * If there is an implicit operation between this node and the node after it, this describes the node type of that operator. For example, there is an implied multiplication between 2 and *x* in the expression 2*x*. In this case, in the node for the digit 2 would, this property would be equal to `"timesDot"`.
     */
    readonly implicitOperatorThatFollows?: "timesDot" | "plus";

    /** For text, identifiers, and string literals, returns the character nodes in the child field combined into a single string for convenience. */
    readonly text?: string;

    /** This node's parent node, or null if it does not have a parent. A child node occurs exactly once in one of the fields of its parent. */
    readonly parent: Node | null;

    /**
     * The ancestor of this node that has no parent. This is normally a node of type `"documentRoot"` unless the node is no longer in a document. If the node has no parent, then the root is the node itself.
     */
    readonly root: Node;

    /**
     * For nodes that have a parent, this is a description of the position of the node relative to its parent, consisting of the parent node, the field in which this node is found in the parent, and the offset from the start of that field at which the node is found.
     */
    readonly relativePosition?: [Node, number, number];

    /**
     * For nodes whose parent is a tabular node, this is an array of two numbers indicating the row and column of the table cell in the parent.
     */
    readonly cellInParent?: [number, number];

    /**
     * Returns the number of fields in the node. This will be 0 if the node is a leaf that cannot contain child nodes.
     * @see [[field]]
     */
    readonly numFields: number;

    /**
     * Returns the specified field of the node. Fields are numbered from 0 to `numFields`-1. The order of fields in a node corresponds to the order in which they are visited by moving through the node with the `forwardEnter` command.
     * 
     * @param fieldNum The number of the field to retrieve.
     * @returns The requested field, or null if no such field exists.
     */
    field(fieldNum: number): Field | null;

    /**
     * Returns the node at the specified index in the specified field. This is equivalent to `field(fieldNum).nodeAt(index)`.
     * 
     * @param fieldNum The number of the field to retrieve.
     * @param index The index of the desired child node in the field.
     * @returns The requested node, or null if no such node exists.
     */
    childAt(fieldNum: number, index: number): Node;

    /**
     * If the target node is an immediate child of this node, returns a number array containing the field number containing the target, and the index of the target within that field. Otherwise, returns null if the node is not an immediate child.
     * 
     * @param target The node to search for.
     * @returns The location of the target in this node's fields, or null.
     * @see [[relativePosition]]
     */
    findChild(target: Node): [number, number] | null;

    /**
     * If this node is a tabular node, returns the field that represents the specified row and column of the table.
     * 
     * @param row The table row to get the field of.
     * @param col The table column to get the field of.
     * @returns The field of the specified row and column, or null if the node is not tabular or no such cell exists.
     */
    cell(row: number, col: number): Field | null;

    /**
     * If this node is a tabular node, returns the table size as an array giving the number of rows and columns respectively. Note that special columns or rows that expand the node's size are not counted. For example, a 2&nbsp;×&nbsp;4 matrix will return a size of `[2,4]` and not `[3,5]`.
     * 
     * @see [[widthGrows]]
     * @see [[heightGrows]]
     */
    readonly size: [number, number] | null;

    /**
     * If this node is a tabular node, returns whether it automatically inserts a new column when content is placed in the last column. The [[size]] of a tabular node does not include such columns.
     */
    readonly widthGrows?: boolean;

    /**
     * If this node is a tabular node, returns whether it automatically inserts a new row when content is placed in the last row. The [[size]] of a tabular node does not include such rows.
     */
    readonly heightGrows?: boolean;
  }

  /**
   * A list of related child nodes. All nodes have zero or more fields: each field contains the content for a specific slot on the containing node; in editor views an empty field is shown as a rounded rectangular frame.
   * 
   * Most node types have a fixed number of fields; for example, a node representing a square root has exactly one field, while a node representing an *n*th root has exactly two fields (one for the content under the radical sign, and one for the root index). A few node types, such as matrices and the root node that contains the lines of the document, have variable numbers of fields.
   */
  interface Field {
    /**
     * Returns the node at the specified list position. Returns null if the index is [[length]]; this represents the final caret position at the end of the field.
     * 
     * @param index The index of the node in the field, where the first node is at position 0.
     */
    nodeAt(index: number): Node | null;
    /**
     * Returns the index of the specified target node within the field, or -1 if the node does not occur in the field.
     * 
     * @param target The node to find the index of.
     * @returns The index of the node, or -1.
     */
    indexOf(target: Node): number;
    /** The number of child nodes present in the field. */
    readonly length: number;
    /** The field number of this field in its node. */
    readonly number: number;
    /** True if this field is optional; optional fields may be left empty by the user and the content will still make sense. */
    readonly isOptional: boolean;
    /** If this field is part of a tabular node, returns the row and column of this cell in an array. */
    readonly cell?: [number, number];
  }


























  /**
   * Searches the content of a math editor for regions that match a target pattern described by a [[Clip]].
   * 
   * **Example:** Find all occurrences of a selection
   * ```js
   * view.type("2x+x");
   * view.pressKey(micd.Keystroke.ShiftArrowLeft);
   * let pattern = micd.Clip.from(editor);
   * let agent = new micd.SearchAgent(editor, pattern);
   * agent.start();
   * while ((match = agent.find()) != null) {
   *     console.log(match);
   * }
   * ```
   */
  class SearchAgent {
    /**
     * Creates a new search agent that will search the specified editor.
     * 
     * @param editor The editor that will be searched for pattern matches.
     * @param pattern An optional pattern to search for.
     */
    constructor(editor: Editor, pattern?: Clip | null);

    /**
     * Starts a new search. After calling this, the [[find]] method can be called repeatedly to iterate through all available matches.
     * 
     * @param options Options that modify search behaviour.
     * @returns This agent.
     */
    start(options?: SearchOptions | null): SearchAgent;

    /**
     * Finds and returns the next match in the search.
     * 
     * @returns A range describing the next match, or null if there are no more matches.
     */
    find(): string | null;

    /**
     * Gets or sets the pattern to search for. This can be set to null, in which case it will have no matches.
     */
    pattern: Clip;
  }

  /**
   * Options that may be passed to a [[SearchAgent]] when starting a search to modify its behaviour.
   * 
   * **Example:** Find and select the previous occurrence of the selection
   * ```js
   * let agent = new micd.SearchAgent(editor, micd.Clip.from(editor));
   * agent.start({forward: false});
   * agent.find();
   * ```
   */
  interface SearchOptions {
    /** The caret position to begin searching from. The default is the current caret position. */
    position: string;
    /** If true, the search proceeds from the starting position toward the end of the document. If false, it proceeds from the starting position toward the start of the document. The default is true. */
    forward: boolean;
    /** If true, the search will continue until it wraps around from one end of the document to the other and returns to the start position. If false, the search ends when the end of the document is reached. The default is true.*/
    wrap: boolean;
    /** If true, empty fields in objects in the pattern will match any content in the corresponding fields in the document. For example, an empty parentheses object would match any parenetheses in the document without regard to what is inside. If false, empty fields in the pattern will only match when the corresponding field is empty in the document. The default is true. */
    wildFields: boolean;
    /** If true, as each match is found it will also be selected in the editor. The default is true. */
    selectMatches: boolean;
  }


  /**
   * Editors manage and manipulate math content, track the caret position and selection, support the execution of commands, and enable serialization and conversion of the content under their control.
   * 
   * Each editor is responsible for maintaining a model of its content, the *math document*. In order to ensure that the document remains consistent, it cannot be accessed or mutated directly. The most common way to manipulate the document model is by [[apply]]ing commands. To implement more complex operations, a [[Walker]] can be used to safely and efficiently examine or modify the document.
   * 
   * The editor also manages access to the document's [[metadata]], a string map of key and value pairs that can be used to store both standard and user-defined keys as part of the document.
   * 
   * An editor does not include a user interface. To present the contents of an editor to the end user and/or allow them to edit its content, create a [[View]] for it.
   * 
   * **Example:** Create an editor, apply a command to it, and view the result
   * ```js
   * let ed = new micd.Editor();
   * ed.apply(micd.MathObject.thereExists);
   * let view = new micd.View(ed);
   * view.addToDom(document.body);
   * ```
   */
  class Editor {
    /**
     * Creates a new editor with a new, empty document.
     * 
     * @param options Options that configure the new editor's features.
     */
    constructor(options?: NewEditorOptions | null);

    /**
     * Sets or gets the content of the editor. Setting this to `null` replaces the content with a new, empty document. This property accepts and returns strings in the Math I Can Do document format.
     * @throws *TypeError* If set to an invalid document, or to a newer version than the current API version can support.
     */
    value: string | null;

    /**
     * Returns whether the editor has any content. If true, the document consists of a single empty line.
     * @returns True if the document is empty.
     */
    isEmpty(): boolean;

    /**
     * Returns whether the specified command can currently be applied.
     * 
     * @param apiName The name of the command.
     * @returns True if the command could be applied.
     * @see [[apply]]
     */
    canApply(apiName: EditorCommand | keyof typeof EditorCommand): boolean;

    /**
     * Applies the specified command if possible.
     * 
     * @param apiName The name of the command.
     * @returns True if the command could be applied.
     * @see [[canApply]]
     */
    apply(apiName: EditorCommand | keyof typeof EditorCommand): boolean;

    /**
     * Returns a token that changes to a different unique value each time the document is edited, the caret is moved, or the selection changes. Compound edits count as a single combined state change, the the token changes as soon as the edit begins. Changes to the document metadata do not affect the state token. The state token can be used to determine whether a previously validated action still applies. For example, if an Action requires an asynchronous step, such as awaiting data from a server, an implementation can compare the state token value from when the action was approved to the state token value after the data is received. If they are different, the action should either be revalidated or cancelled.
     */
    readonly stateToken: number;

    /**
     * Begins a compound edit operation that lasts until [[endCompoundEdit]] is called. Changes to the document made between these calls, such as by applying commands, are combined into a single macro edit. Views will not update until the edit is completed, and the entire macro edit will form a single entry in the edit history. This call can be nested; the compound edit will not be complete until a matching number of calls are made to [[endCompoundEdit]].
     */
    beginCompoundEdit(): void;

    /**
     * Ends a compound edit operation started by a previous [[beginCompoundEdit]]. Because compound edits nest, it is vital that calls to this method are placed in a `finally` clause to ensure that "begins" and "ends" are always executed in pairs. Otherwise, an error during the compound operation may result in the editor becoming unusable. Example:
     * 
     * ```
     * editor.beginCompoundEdit();
     * try {
     *    // ... edits ...
     * } finally {
     *    editor.endCompoundEdit();
     * }
     * ```
     * 
     * @throws *Error* If called when not paired with a previous call to [[beginCompoundEdit]].
     */
    endCompoundEdit(): void;

    /**
     * Returns whether there is an edit in the edit history that can be undone.
     * 
     * @returns Returns true if undo is possible.
     */
    canUndo(): boolean;

    /**
     * Returns whether there is an edit in the edit history that can be redone.
     * 
     * @returns Returns true if redo is possible.
     */
    canRedo(): boolean;

    /** Undoes an edit, if possible. Otherwise does nothing. */
    undo(): void;

    /** Redoes an edit, if possible. Otherwise does nothing. */
    redo(): void;

    /**
     * Provides access to the document's metadata, such as its title and memory cell contents.
     */
    readonly metadata: DocumentMetadata;

    /**
     * Sets or gets whether the user can change the editor's content. When false, commands that modify the document will not be applicable: [[canApply]] will return false for them and they will have no effect if applied. This does not prevent the document from being modified directly: for example, the document can be replaced by setting the [[value]] property.
     */
    readOnly: boolean;

    /**
     * Returns whether the editor has an active selection.
     * 
     * @returns Returns true if content is selected in the editor.
     */
    hasSelection(): boolean;

    /** Clears the current selection, if any. */
    clearSelection(): void;

    /**
     * Sets or gets the selection range. Setting this to null will clear the selection, if any. If the selection is set to a range that does not contain the caret position, the caret will be moved to the end of the selection.
     * @throws *TypeError* If set to a value that is not a valid selection.
     */
    selection: string | null;

    /**
     * Sets or gets the caret position.
     * @throws *TypeError* If set to a value that is not a valid position.
     * @see [[Walker.position]]
     */
    caretPosition: string;

    /**
     * Downloads an image of the document content asynchronously. If a title is set in the document [[metadata]], it will be used for the download's file name if possible. Image conversion may fail if the content is so large that it exceeds reasonable limits on image size or memory use.
     * 
     * @param preferSelection If true, uses the selection instead of the whole document if possible.
     * @param options Options that control the image format and features.
     */
    downloadImage(preferSelection: boolean, options: ImageFormatOptions): void;

    /**
     * Returns a Promise that resolves to an image representation of the document content. The form that the image takes depends on the `container` property of the supplied options, if any. By default, the promise will resolve to a data URL for the image. It can also be supplied as a Blob, or, if the image format is SVG, as a string. Other options allow the caller to specify colours, size, margins, and other features.
     * 
     * Image conversion may fail if the content is so large that it exceeds reasonable limits on image size or memory use.
     * 
     * @param preferSelection If true, uses the selection instead of the whole document if possible.
     * @param options Options that control the image format and features.
     * @returns A Promise that resolves to a URL, Blob, or SVG document for the image.
     */
    toImage(preferSelection?: boolean, options?: ImageFormatOptions): Promise<string | Blob>;

    /**
     * Returns a Promise that resolves to a LaTeX representation of the document content.
     * 
     * @param preferSelection If true, uses the selection instead of the whole document if possible.
     * @param options Options that control the conversion.
     * @returns A Promise that resolves to the converted string of LaTeX.
     */
    toLatex(preferSelection?: boolean, options?: LatexFormatOptions): Promise<string>;

    /**
     * Returns a Promise that resolves to a MathML representation of the document content.
     * 
     * @param preferSelection If true, uses the selection instead of the whole document if possible.
     * @param options Options that affect the conversion.
     * @returns A Promise that resolves to the converted string of MathML.
     */
    toMml(preferSelection?: boolean, options?: MmlFormatOptions): Promise<string>;


    /**
     * Converts the content of the editor into a semantic object, a high-level representation useful for processing and conversion.
     * 
     * @returns The root of a semantic representation of the document.
     * @experimental May change or be removed in future releases.
     */
    toSemanticObject(): SemanticObject;

    /**
     * Replaces the content of this editor by converting the supplied semantic object into the internal document format.
     * 
     * @param root The root of the semantic document structure.
     * @returns An array, possibly empty, of any errors encountered during the import process.
     * @experimental May change or be removed in future releases.
     */
    fromSemanticObject(root: SemanticObject): SemanticObjectParserError[];

    /**
     * Adds a listener for the specified type of event.
     * 
     * @param type A string naming the event type. For example, the `"change"` type is used to listen for document modifications.
     * @param listener The event listener to call when the event occurs.
     * @throws *TypeError* If the event type is not a known type.
     * @see [[removeEventListener]]
     */
    addEventListener(type: EditorEventType, listener: EventListener<EditorEvent>): void;

    /**
     * Removes a previously added listener for the specified type of event. This method does nothing if the listener was never added.
     * 
     * @param type A string naming the event type.
     * @param listener The event listener to stop notifying when the event occurs.
     * @see [[addEventListener]]
     */
    removeEventListener(type: EditorEventType, listener: EventListener<EditorEvent>): void;
  }

  /**
   * Types of events that can be received from an [[Editor]]:
   * 
   * - `"change"`: Fired when the document is mutated. Mutating the document from within a change listener will not trigger an additional event.
   * - `"caret"`: Fired when the editor caret (insertion point) changes position.
   * - `"selection"`: Fired when the selection changes.
   */
  type EditorEventType = "change" | "caret" | "selection";

  /** The type of events fired by the editor. */
  interface EditorEvent extends Event<Editor> {
    /** The event type. */
    readonly type: EditorEventType;
  }

  /** Options that may be supplied when instantiating a new [[Editor]]. */
  interface NewEditorOptions {
    /** If true, the edited document is restricted to a single line. The default is false. */
    singleLine?: boolean;
    /** If true, the editor will not keep a history of its edits. The undo and redo commands will have no effect. This can improve performance and reduce resource use when an editor will be used to generate content algorithmically rather than directly by a human user. The default is false. */
    historyless?: boolean;
  }

  /**
   * A high-level semantic description of an object from an editor (or to be imported into an editor).
   * 
   * @experimental May change or be removed in future releases.
   */
  interface SemanticObject {
    /** The specific type of object; an API name or a general type such as `"variable"` or `"number"`. */
    type: string;
    /** The general type of the object. */
    baseType?: string;
    /** A general mathematical category or subject area to which the object belongs. */
    category?: string;
    /** For text objects, the text content of the object. */
    text?: string;
    /** The object's symbol, such as a variable name, number value, or operator symbol. */
    symbol?: string;
    /** Optional symbol placed above the operator symbol. Used by certain rare operators. Where a Unicode symbol already combines the elements, it should be used as the symbol instead of using this field. */
    symbolAbove?: string;
    /** For variables, an optional string describing the type of accent to add, if any. */
    accent?: string;
    /** The data type of a variable or identifier. */
    dataType?: string;
    /** The placement of an operator. */
    placement?: OperatorPlacement;
    /** The placement of an operator in the context from which it was exported. */
    effectivePlacement?: OperatorPlacement;
    /** The type of operation, if any, that is implicitly applied to this object and the next one. For example, there is an implicit multiplication (`"timesDot"`) between the coefficient 2 and variable *x* in the term 2*x*. */
    implicitOperatorThatFollows?: "timesDot" | "plus";

    /** For a script object, whether the object has an index (subscript) field. */
    hasIndex?: boolean;
    /** For a script object, whether the object has an exponent (superscript) field. */
    hasPower?: boolean;

    /** For style nodes that change the colour, the amount of red in the new colour from 0 to 1 inclusive. */
    red?: number;
    /** For style nodes that change the colour, the amount of green in the new colour from 0 to 1 inclusive. */
    green?: number;
    /** For style nodes that change the colour, the amount of blue in the new colour from 0 to 1 inclusive. */
    blue?: number;
    /** For style nodes that change the colour, the opacity of the new colour from 0 to 1 inclusive. */
    opacity?: number;
    /** For style nodes that change the content size, the new scale. */
    scale?: number;

    /** For objects with child fields, an array of those fields. */
    fields?: SemanticObject[][];
    /** An alternative to `field` for objects with a single field. */
    field?: SemanticObject[];
    /** For variable-sized rectangular objects, the width and height of the object. */
    size?: [number, number];
		/** For variable-sized rectangular objects, whether the width (number of rows) can increase. */
    widthGrows?: boolean;
    /** For variable-sized rectangular objects, whether the height (number of columns) can increase. */
		heightGrows?: boolean;
  }

  /**
   * Describes an error that occurred while importing a semantic object.
   * 
   * @experimental May change or be removed in future releases.
   */
  interface SemanticObjectParserError {
    /** A message describing the cause of the error. */
    message: string;
    /** A string describing the caret position of the error in the imported content, where available. */
    position?: string;
    /** The object which caused the error, where available. */
    object?: SemanticObject;
    /** The field number that pertains to the error, where relevant and known. */
    field?: number;
  }
	

  /**
   * Options that affect image conversion with [[Editor.toImage]] and [[Editor.downloadImage]].
   * 
   * **Example:** List image formats supported in this browser
   * ```js
   * micd.util.supportedImageFormats().forEach(fmt => {
   *   console.log(JSON.stringify(fmt, null, 2));
   * });
   * ```
   * 
   * @see [[supportedImageFormats]]
   */
  interface ImageFormatOptions {
    /**
     * Image file format such as `"png"` or `"svg"`. Default is `"png"`. Other formats may be supported depending on the browser, such as `"jpeg"` or `"avif"`. If the requested format is not available, a PNG image is produced.
     */
    format?: "png" | "svg" | "jpeg" | string | null;
    /** Quality of lossy formats such as `"jpeg"`, between `0` and `1`. Default is `0.92`. */
    quality?: number | null;
    /** Scaling factor applied to the default image size. Ignored by format `"svg"`. Default is `1`. */
    scale?: number | null;
    /** Size of the margin added around the outside of the image, in pixels. (For format `"svg"`, the *relative* size of the margin will be comparable to a bitmap image with the same margin, but the *absolute* size of the margin will scale along with the rest of the image.) Default is `0`. */
    margin?: number | null;
    /** Default colour for math content in the image. This can be a [[Color]] instance or a CSS color string, such as `"#fff"`. Default is `"black"`. */
    foreground?: micd.Color | string | null;
    /** Background colour for the image.  This can be a [[Color]] instance or a CSS color string, such as `"#fff"`. Default is `"transparent"`. */
    background?: micd.Color | string | null;

    /**
     * Form in which the image data will be stored:
     *  * `"url"`: The image will be stored as a string whose value is a data URL for the image. This is the default.
     *  * `"string"`: The image will be stored as a raw string representation. This is only applicable for SVG images. Other image types will be treated as `"url"`.
     *  * `"blob"`: The image will be stored in a Blob object.
     * 
     * This option has no effect on [[downloadImage]].
     */
    container?: "url" | "string" | "blob" | null;
  }

  /** Common options that affect conversion to text-based formats. */
  interface TextFormatOptions {
    /**
     * A hint as to whether to prefer treating document lines as inline or block content. Possible values:
     * 
     *  - `"auto"` to decide how to format each line based on its content.
     *  - `"block"` to display each line on its own, similar to how a figure or diagram might be included between surrounding text.
     *  - `"inline"` to display the line as part of the surrounding text without setting it off in a separate paragraph. Some content may be formatted differently in order to minimize the effect on the line height. For example, large operators like sum may be somewhat smaller and their details may appear beside the operator rather than above and below it.
     * 
     * The default is `"auto"`.
     */
    display?: "auto" | "block" | "inline" | null;
  }

  /** Options that affect MathML conversion with [[Editor.toMml]]. */
  interface MmlFormatOptions extends TextFormatOptions {
    /**
     * The dialect to target. This value shapes the generated code towards specific applications. It affects the defaults for other options and may cause certain structures or concepts to be expressed differently. Possible values:
     * 
     *  - `"xml"` to produce a standalone XML document.
     *  - `"html"` to produce HTML5-style MathML (with no namespace attribute).
     *  - `"jax"` to produce MathML more compatible with MathJax.
     * 
     * The default value is `"html"`.
     */
    dialect?: "xml" | "html" | "jax" | null;

    /**
     * Controls which declarations will be included at the top of the document, if any. Possible values:
     * 
     * - `"xml"` to produce an XML declaration;
     * - `"doctype"` to produce a doctype declaration;
     * - `"both"` to produce both; or
     * - `"none"` to produce no declarations.
     * 
     * The default is usually `"none"`. If the [[dialect]] is `"xml"`, the default is `"both"`.
     */
    declarations?: "xml" | "doctype" | "both" | "none" | null;

    /** If an XML declaration is specified, setting this will produce an encoding attribute for the specified charset. The default is `null`, which does not produce anything. */
    encoding?: string | null;

    /**
     * Controls the degree to which characters are replaced by entities, and the type of entities used. Possible values:
     * 
     * - `"minimal"` to escape only required characters (safe as long as the document encoding is handled properly);
     * - `"numeric"` to escape characters outside of basic ASCII with numeric escapes (safest for XML);
     * - `"named"` to escape characters outside of basic ASCII with named escapes when possible, and otherwise with numeric escapes (safe for inline HTML, and easier to read than numeric escapes).
     * 
     * The default is usually `"named"`. If the [[dialect]] is `"xml"`, the default is `"numeric"`.
     */
    entityEscaping?: "minimal" | "numeric" | "named" | null;

    /**
     * Controls which invisible operators are included. Invisible operators can make otherwise implicit operations explicit in the generated MathML without affecting how the content is rendered visually. Using invisible operators can help processing tools and screen readers to interpreting content as intended. This value is set using an array of zero or more of the following strings to indicate which operators are desired:
     * 
     * - `"applyFunction"` to insert an apply function operator (U+2061) before function parentheses;
     * - `"plus"` to mark implicit addition (as between the 3 and ½ of 3½) with an invisible plus operator (U+2064);
     * - `"times"` to mark implicit multiplication (as between the 3 and *x* of 3*x*) with an invisible times operator (U+2062);
     * - `"separator"` to separate generated lists with an invisible separator operator (U+2063).
     * 
     * The default is to include all invisible operators.
     */
    invisibleOperators?: ("applyFunction" | "plus" | "times" | "separator")[] | null;
  }

  /** Options that influence LaTeX conversion with [[Editor.toLatex]]. */
  interface LatexFormatOptions extends TextFormatOptions {
    /**
     * The dialect of LaTeX to target. Possible values:
     * 
     *  - `"latex"` to produce standard LaTeX code (for example, for use with LaTeX2e).
     *  - `"xelatex"` to produce XeLaTeX code.
     *  - `"jax"` to produce code for use with MathJax.
     * 
     * The default is `"latex"`.
     */
    dialect?: "latex" | "xelatex" | "jax" | null;

    /**
     * If true, generates a complete document including a preamble. The preamble will include any packages required by the generated code. If relevant, the generated code will also be wrapped in a document environment. If false, only LaTeX code for the actual math content is generated; it is up to the caller to make sure any required packages or commands are defined. The default is true.
     */
    preamble?: boolean | null;

    /**
     * A hint as to the desired overall style of the generated output. Possible values:
     * 
     * - `"traditional"` to produce a typical LaTeX document.
     * - `"micd"` to produce a document formatted to better match how the document appears in the editor.
     * 
     *  The default is `"micd"`. This may have no or limited effect depending on the [[dialect]] and whether [[preamble]] is false.
     */
    style?: "traditional" | "micd" | null;

    /**
     * When set to true and using the `"jax"` dialect, definitions in the generated code will not affect other LaTeX code on the page. This requires that your MathJax configuration include the `begingroup.js` extension:
     * 
     * ```
     * TeX: {
     *   extensions: ["begingroup.js"]
     * }
     * ```
     *
     * The default is false. This has no effect if [[preamble]] is false.
     */
    scopeIsolation?: boolean | null;
  }

  /**
   * Allows reading and writing the metadata associated a math document. Document metadata consists of a map with strings for both keys and values. If you wish to add your own custom keys to a document, include at least one dash `-` in the key name to avoid conflicts with any new keys added by future versions of the API.
   * 
   * **Example:** Observe while adding, changing, and removing a custom key
   * ```js
   * let editor = new micd.Editor();
   * editor.metadata.addEventListener("change", ev => {
   *   console.log(`${ev.oldValue} => ${ev.newValue}`);
   * });
   * editor.metadata.put("custom-key", "value");
   * editor.metadata.put("custom-key", "new value");
   * console.log(editor.metadata.get("custom-key"));
   * editor.metadata.remove("custom-key");
   * ```
   * 
   * @see [[Editor.metadata]]
   */
  interface DocumentMetadata {
    /**
     * Returns the value of the specified key, or the default value if the key is not present.
     * 
     * @param key The name of the desired metadata property.
     * @param defaultValue An optional default returned if the key is not present.
     * @returns The value of the key, if present; otherwise the default value, or `undefined` if no default was specified.
     */
    get(key: string, defaultValue?: string | null): string | undefined | null;

    /**
     * Sets the value of the specified key. Setting a key to `undefined` or `null` has the same effect as removing the key.
     * 
     * @param key The name of the desired metadata property.
     * @param value The value to associate with the key.
     */
    put(key: string, value: string | undefined | null): void;

    /**
     * Removes the specified key from the metadata, if it is present.
     * 
     * @param key The name of the desired metadata property.
     */
    remove(key: string): void;

    /** Removes all keys and their values. */
    clear(): void;

    /**
     * Gets a new array containing a copy of all of the defined keys. The order of the keys in the array is not guaranteed.
     */
    readonly keys: string[];

    /**
     * Returns the editor for which this provides metadata.
     */
    readonly editor: Editor;

    /**
     * Adds a listener for the specified type of event.
     * 
     * @param type A string naming the event type. For example, the `"change"` type is used to listen for document modifications.
     * @param listener The event listener to call when the event occurs.
     * @throws *TypeError* If the event type is not a known type.
     * @see [[removeEventListener]]
     */
    addEventListener(type: MetadataEventType, listener: EventListener<MetadataEvent>): void;

    /**
     * Removes a previously added listener for the specified type of event. This method does nothing if the listener was never added.
     * 
     * @param type A string naming the event type.
     * @param listener The event listener to stop notifying when the event occurs.
     * @see [[addEventListener]]
     */
    removeEventListener(type: MetadataEventType, listener: EventListener<MetadataEvent>): void;
  }

  /**
   * Types of events that can be received from a source of [[DocumentMetadata]]:
   * 
   * - `"change"`: Fired when the value of a metadata key changes, including when a key is added or removed.
   */
  type MetadataEventType = "change";

  /** An event passed to listeners that are observing changes to a source of [[DocumentMetadata]]. */
  interface MetadataEvent extends Event<DocumentMetadata> {
    /** The event type. */
    readonly type: MetadataEventType;
    /** The name of the key that has changed. */
    readonly key: string;
    /** The previous value of the key, or null if the key is being added. */
    readonly oldValue: string;
    /** The new value of the key, or null if the key is being removed. */
    readonly newValue: string;
  }




  /**
   * Views allow end users to interact with an [[Editor]] through an interface component similar to a text field. Views support editing by keyboard, mouse, and touch. For a richer user experience, the view can be augmented by a [[Shell]] or used as a foundation for a custom interface.
   * 
   * New views are not visible until their [[rootElement]] is added to the DOM. When adding a view to the DOM, the [[addToDom]] method must be called to ensure that the view "connects" to the editor to receive and process updates.
   * 
   * A single editor may have multiple views. However, a given view is always tied to a single editor instance, the one passed to its constructor. To create the illusion of a single view switching between multiple editors, either use multiple views and hide those not in use, or destroy and replace a single view on demand.
   * 
   * **Example:** Create and add a View to the page
   * ```js
   * let view = new micd.View();
   * view.addToDom(document.body);
   * view.focus();
   * ```
   */
  class View {
    /**
     * Creates a new view for the specified editor. If no editor is given, a new editor is created automatically.
     * 
     * @param editor The editor instance that this view will present.
     */
    constructor(editor?: Editor | null);

    /**
     * Returns the view that contains the specified element, or null if the element is not part of a view.
     * 
     * @param element The element (or DOM node) that may be a descendent of a view.
     * @returns The view that the element is a descendent of, or null.
     * @see [[shell.thatContainsElement]]
     */
    static thatContainsElement(element: Element): View | null;

    /**
     * Returns a new array of all of the views that are currently on the page.
     * 
     * @returns A (possibly empty) array in which each element is a view that has been added to the DOM.
     * @see [[shell.getAddedShells]]
     */
    static getAddedViews(): View[];

    /**
      * Gets the DOM element that contains the view.
      * 
      * @see [[addToDom]]
      */
    readonly rootElement: HTMLElement;

    /**
     * The editor controlled by this view.
     */
    readonly editor: Editor;

    /**
     * Returns whether the specified command, [[Action]], or [[Clip]] can currently be applied. This method is a convenience that will route the request through the appropriate objects.
     * 
     * @param toApply An action, clip, or command name.
     * @returns True if the argument could be applied.
     * @see [[apply]]
     */
    canApply(apiName: Action | Clip | EditorCommand | keyof typeof EditorCommand): boolean;

    /**
     * Applies the specified command, [[Action]], or [[Clip]] if possible. This method is a convenience that will route the request through the appropriate objects.
     * 
     * @param toApply An action, clip, or command name.
     * @returns True if the argument could be applied.
     * @see [[canApply]]
     */
    apply(apiName: Action | Clip | EditorCommand | keyof typeof EditorCommand): boolean;

    /**
     * Adds the view's root element to the HTML document tree, or informs the view that it was just added. For a view to function correctly, it must be aware of whether or not it is part of the DOM. As there is no way to determine this automatically in all supported browsers, this method must be called explicitly. Typical use is to pass a parent node already in the DOM to this method. It will then add the root element as if by `parent.appendChild(rootElement)`. Or, if the second argument is also supplied, as if by `parent.insertBefore(rootElement, beforeThisSibling)`. If a more complex insertion is required, [[rootElement]] can be added to the DOM separately and then this method called with no arguments.
     * 
     * @param parentNode If supplied, the view's root element will be appended to this node's children.
     * @param beforeThisSibling If supplied in addition to `parentNode`, the view's root element will be inserted *before* this node in the parent's children instead of appending it to the end.
     * @throws *Error* If the editor element is not, in fact, in the document tree (after any positioning specified by the arguments).
     * @see [[removeFromDom]]
     */
    addToDom(parentNode?: Element, beforeThisSibling?: Element): void;

    /**
     * Removes the view's root element from the HTML document tree, or informs the view that it was just removed. For the `View` to function correctly, it must be aware of whether or not it is part of the DOM. As there is no way to determine this automatically in all supported browsers, this method must be called explicitly. If the root element is in the DOM when this method is called, it will be removed by removing it from its immediate parent.
     * 
     * @see [[addToDom]]
     */
    removeFromDom(): void;

    /**
     * Requests that the view be given input focus.
     * 
     * @see [[isFocused]]
     */
    focus(): void;

    /**
     * Requests that the view lose input focus, if it currently has it.
     * 
     * @see [[isFocused]]
     */
    blur(): void;

    /**
     * Returns whether the view has input focus.
     * 
     * @returns True if the view will currently receive keyboard input.
     * @see [[focus]]
     */
    isFocused(): boolean;

    /**
     * Simulates the user typing a sequence of characters on the keyboard. The view does not need to be focused or even added to the DOM. In addition to regular printable characters, the string may include `\n` (U+000A) to simulate typing Enter, `\b` (U+0008) to simulate typing Backspace, and U+007F to simulate typing Delete. Abbreviations can be used to insert complex math objects (for example, `".sum "`—note the space). Commands that do not have an assigned abbreviation can be selected by their full name (for example, `".moveLeft "), although [[Editor.apply]] is more efficient.
     * 
     * @param input The characters to simulate typing.
     * @see [[pressKey]]
     */
    type(input: string): void;

    /**
     * Simulates the user pressing a single key combination. This method does not require the view to have input [[focus]]. Passing null or undefined has no effect.
     * 
     * @param gesture The key to simulate, described in the same format used by [[View.gestureMap]].
     * @throws *TypeError* If the string is not a valid gesture.
     * @see [[type]]
     */
    pressKey(gesture?: Keystroke | string | null): void;

    /**
     * Prints the math document to a printer.
     * 
     * @returns A Promise that resolves to this view once the layout is prepared and printing begins.
     */
    print(): Promise<View>;

    /** Scrolls the view so that the caret is visible. Scrolling may not be immediate; it may be scheduled to occur in the near future after other pending updates. The View will not be scrolled if it does not have [[focus]] at the scheduled time. This method only scrolls within the View. It does not scroll the page (or other container) to ensure that the View is visible on the page. This can be done by calling, for example, `view.rootElement.scrollIntoView()`.*/
    scrollToCaret(): void;

    /**
     * Scrolls to the specified document position. Has no effect if the position is null or invalid.
     * @param position The position to scroll to.
     */
    scrollToPosition(position: string): void;

    /**
     * Scrolls the view so that the specified document node is visible. Has no effect if the node is null or the node is not in the document of this view.
     * 
     * @param node The math document node to scroll to.
     * @see [[Walker]]
     */
    scrollToNode(node: Node): void;

    /**
     * Returns an array of DOMRect objects that describe bounding rectangles for the visual representation of the node in this view. If the node is not in the view, possibly because the view is still updating, the array will be empty. Otherwise, in most cases the node will be represented as a single rectangle. The exception is if the node has been wrapped over multiple view lines. In this case, there will be one rectangle for each line that the node spans.
     * 
     * @param node The math document node to get bounding rectangles of.
     * @param field The field within the node to get bounding rectangles of, or -1 for the entire node. The default is -1.
     * @returns Zero or more rectangles, with coordinates relative to the upper-left corner of the page.
     * @see [[Walker]]
     * @experimental May change or be removed in future releases.
     */
    getNodeRects(node: Node, field?: number): DOMRect[];

    /**
     * Returns a Promise that resolves once any pending updates to this view have been completed.
     * 
     * @returns A Promise that resolves when this view is up to date.
     */
    onceUpToDate(): Promise<View>;

    /**
     * Gets this view's key binding map.
     * 
     * The keys in this map are strings that describe keyboard gestures. They can consist of either a single printable character, or else a description of a key combination. A key combination consists of an optional modifier name separated from a key name by a space character, such as `"Ctrl ArrowLeft"`. On Apple devices, modifier names that include `Ctrl` or `Alt` are automatically mapped to the Command and Option keys, respectively.
     * 
     * To improve cross-platform compatibility, only certain modifier key combinations are allowed; a typed enumeration of these combinations is available as [[micd.Keystroke]].
     */
    readonly gestureMap: InputMap<Keystroke | string>;

    /**
     * Gets this view's abbreviation map.
     * 
     * The keys in this map are abbreviations: strings of characters that can be expanded to convert them into math objects or other actions. Abbreviations are used by typing them into the editor and then using the expand abbreviation command, which is bound to the space key by default. Abbreviations can consist of letters (which match scalar variables), digits, and operator symbols (which match simple operators
     * using that symbol). They may not begin with digits. Abbreviations that contain operator symbols are matched more strictly than other
     * types.
     * 
     * Abbreviation maps contain the following types of abbreviations:
     * 
     *  - **Standard:** A standard abbreviation maps to a command or custom action. When a standard abbreviation is the longest matching abbreviation, it is guaranteed to be selected when the expand abbreviation command is used. It may also be selected if only a prefix has been entered, if no better match is found.
     *  - **Fragment:** A fragment can only be mapped to a command. It consists of lowercase letters from `a` to `z` and is matched case-insensitively against the text to be expanded. Unlike other abbreviation types, a fragment can match multiple commands. Fragments are useful for assigning aliases to existing commands. Fragments are marked by prefixing the abbreviation string with a `#` (this is not considered part of the abbreviation).
     *  - **Prefix mapper:** A prefix mapper matches a specific prefix and then determines how to expand the abbreviation by evaluating a function against the remaining characters. Prefix mappers are marked by a `*` following the prefix that they match. For example, the unit mapper `u*` is applied to abbreviations starting with the letter `u` to create unit objects. At this time, they can be removed from, but not added to, the map (except by adding the default mappings).
     *  - **Generic mapper:** Like a prefix mapper, a generic mapper evaluates a function to determine what, if any, expansion it should produce. However, generic mappers are always consulted for every expansion attempt. Generic mappers consist of a `.` followed by a string that describes the mapper's purpose. At this time, they can be removed from, but not added to, the map (except by adding the default mappings).
     * 
     * @see [[abbreviationExpansionVisible]]
     */
    readonly abbreviationMap: InputMap<string>;

    /** Gets or sets whether this view is disabled. A disabled view is non-interactive. It ignores keyboard, mouse, and touch input and is rendered in a different style. This does not prevent document content from being modified (see [[Editor.readOnly]]). */
    disabled: boolean;

    /**
     * Gets or sets whether this view numbers the document lines. Attempting to set this to true when the editor is single line will have no effect.
     */
    lineNumbers: boolean;

    /**
     * Gets or sets whether this view will display a floating control near the caret that shows what the effect of expanding an abbreviation would be. The default is true.
     * 
     * @see [[abbreviationMap]]
     */
    abbreviationExpansionVisible: boolean;

    /**
     * Gets or sets this view's relative font size. This is a scaling factor relative to the default font size for the view. The initial value is 1. Setting this to a value greater than 1 will increase the size, while setting this to a positive value less than 1 will decrease the size. The base font size for new views is determined by the [[ThemeOptions]]. By default, this size is ultimately derived from the default font size set by the user in their browser options.
     * 
     * @throws *RangeError* If the scale is not a positive number.
     */
    fontScale: number;

    /**
     * The `menuCustomizer` property can be set to a function that will be called to customize the context menu before it is shown. The function is called with the default menu template and this view instance. It can return the template with or without changes, or return null to prevent display of the menu.
     */
    menuCustomizer: ((template: micd.ui.MenuTemplate, view: View) => micd.ui.MenuTemplate | null) | null;
  }

  /**
   * A map that describes bindings from possible input values to editing actions. Usually, the actions are editor commands, but custom actions can be added by subclassing [[Action]] and passing the new action to [[put]]. The nature of a map's input values is determined by the kind of map. For example, a [[gestureMap]] binds keystrokes to actions, while an [[abbreviationMap]] binds short letter strings to actions.
   * 
   * @param I The type of key (input) accepted by the map.
   */
  interface InputMap<I> {
    /**
     * Binds the specified input value to a custom [[Action]] instance. When the view receives a matching input value from the user, it will apply the action if possible.
     * 
     * @param input The input value.
     * @param customAction The action to perform when the user produces the gesture.
     * @throws *TypeError* If the input format is not valid or the action is not an [[Action]] instance.
     */
    put(input: I, customAction: Action): void;

    /**
     * Binds the specified input value to the command with the specified name. When the view receives a matching input value from the user, it will apply the command if possible. Throws an Error if the string is not a valid command name.
     * 
     * @param input The input value.
     * @param apiName The name of the built-in command to map to the gesture.
     * @throws *TypeError* If the input format is not valid or the command name is not a valid command.
     */
    put(input: I, command: EditorCommand | keyof typeof EditorCommand): void;

    /**
     * Returns whether the map contains a binding for the specified input value.
     * 
     * @param input The input value.
     * @returns Returns true if the input value is mapped to a command or custom action.
     */
    contains(input: I): boolean;

    /**
     * Clears the binding, if any, for the specified input value. Mapping an input to null has the same effect.
     * 
     * @param input The input value.
     */
    remove(input: I): void;

    /**
     * Removes all bindings for inputs that map to the specified command. This will block access to the command through the input map (unless a new mapping is created later). In some cases, however, it may not completely block all access to the *effect* of the command. For example, to completely block a command's effect in the abbreviation map, it may be neccessary to also remove one or more of the built-in mapping functions such as `.magicPowers`.
     * 
     * @param command The command to remove from the input map.
     */
    removeCommand(command: EditorCommand | keyof typeof EditorCommand): void;

    /** Clears the map of all input value bindings. */
    clear(): void;

    /** Returns an array of the keys of the input map. */
    keys(): I[];

    /** Adds the default binding for all built-in commands. To reset the map to its initial state, first call [[clear]]. */
    addDefaults(): void;

    /**
     * Returns the default input value that maps to the specified command, or `null` if the command has no default. For example, in an abbreviation map, this would return the default abbreviation for the command. Throws an Error if the command name is invalid.
     * 
     * @param command The name of the built-in command to look up.
     * @returns An input string that (unless replaced or removed) maps to the specified command, or `null` if none.
     * @throws *TypeError* If the command is not a valid command name.
     */
    getDefaultFor(command: EditorCommand | keyof typeof EditorCommand): string;
  }


  /**
   * The base class for creating custom editing actions. While built-in commands are applied through an editor, custom actions are activated through a particular view. This allows custom actions to mix low-level commands (through `view.editor.apply`) with higher-level functionality like [[View.type]].
   * 
   * An action is typically activated when a view receives an input that maps to the action in one of its [[InputMap]]s. For example, the action may be added to a view's gesture map with a keyboard shortcut.
   * 
   * **Example:** Define an action that makes the current selection transparent
   * ```js
   * class MakeInvisibleAction extends micd.Action {
   *   canApplyTo(view) {
   *     return view.editor.hasSelection() && !view.editor.readOnly;
   *   }
   *   applyTo(view) {
   *     const ed = view.editor;
   *     ed.beginCompoundEdit();
   *     try {
   *       const selection = micd.Clip.from(ed);
   *       ed.apply(micd.EditorCommand.deleteSelection);
   *       view.type(".RGB0000 ");
   *       selection.applyTo(ed);
   *       ed.apply(micd.EditorCommand.forwardEnter);
   *     } finally {
   *       ed.endCompoundEdit();
   *     }
   *   }
   *   toString() {
   *     return "Make invisible";
   *   }
   * }
   * 
   * view.gestureMap.put(micd.Keystroke.CtrlI,
   *     new MakeInvisibleAction());
   * ```
   * 
   * @see [[InputMap]]
   */
  class Action {
    /** Creates a new action. */
    constructor();

    /**
     * Returns whether the action can currently be applied. The base class will always return true.
     * 
     * This method must not modify the contents of the editor document.
     * 
     * @param view The view that the action was registered with.
     * @returns Returns true if and only if the action can be applied.
     */
    canApplyTo(view: View): boolean;

    /**
     * Applies the action, if possible. The base class reminds developers that the method must be overridden, so subclasses should not invoke the super implementation.
     * 
     * @param view The view that the action was registered with.
     */
    applyTo(view: View): void;

    /**
     * Returns a string that describes the action to end users.
     * 
     * @returns A brief, human-friendly description of the action.
     */
    toString(): string;
  }

  /**
   * A selection of math content that can be inserted into an [[Editor]].
   * 
   * Clips can be converted to and from strings, making it easy to transfer them from one editor to another, even across windows, devices, or editing sessions.
   * 
   * **Example:** Capture a clip in one editor and paste it in another
   * ```js
   * let selectionClip = micd.Clip.from(editor);
   * let editor2 = new micd.Editor();
   * selectionClip.applyTo(editor2);
   * ```
   */
  class Clip {
    /**
     * Creates a new clip using content from the specified string value.
     * 
     * @param value A string in the MICD clip format, or `null` for an empty clip.
     */
    constructor(value?: string);

    /**
     * A string representation of the clip content in the MICD clip format. The clip can be recreated by passing this value to the Clip constructor.
     * 
     * @throws *TypeError* If set to a string that is not a valid MICD clip.
     */
    value: string | null;

    /**
     * Inserts the clip content into the specified editor at the caret position, if possible.
     * 
     * @param editor The editor to insert the clip into.
     * @see [[canApplyTo]]
     */
    applyTo(editor: Editor): void;

    /**
     * Returns whether the clip can be inserted into the specified editor at the editor's current caret position.
     * 
     * @param editor The editor that the clip would be inserted into.
     * @returns Returns true if the clip can be inserted.
     * @see [[applyTo]]
     */
    canApplyTo(editor: Editor): boolean;

    /**
     * Creates a new clip from the contents of the specified editor. The contents of the editor are not changed.
     * 
     * @param editor The editor instance to make a clip from.
     * @param range A string describing the range the clip should cover; otherwise the editor's current selection is used.
     */
    static from(editor: Editor, range?: string): Clip;

    /**
     * Creates a new clip from the contents of the specified editor. The contents of the editor are not changed.
     * 
     * @param editor The editor instance to make a clip from.
     * @param line The line number of the editor document that the clip should cover, starting from 0.
     */
    static from(editor: Editor, line: number): Clip;
  }

  /**
   * This namespace contains the API related to [[Shell]]s, an optional API component that provides a richer editing experience than a simple [[View]]. New shells are created by calling the [[create]] function, which returns a Promise that resolves to the new shell (after loading the shell API if necessary).
   * 
   * **Example:** Append a new Shell to the page
   * ```js
   * let shell = await micd.shell.create();
   * shell.focus();
   * ```
   */
  namespace shell {
    /** Shells extend [[View]]s with rich editing controls. A Shell instance is obtained by calling [[create]]. */
    interface Shell {
      /**
       * Gets the DOM element that contains the shell. Not to be confused with the [[View.rootElement]] of the view wrapped by the shell, which will be a descendant of this element.
       */
      readonly rootElement: HTMLElement;

      /**
       * The editor which this shell provides an interface for.
       */
      readonly editor: Editor;

      /**
       * The view which this shell wraps.
       */
      readonly view: View;

      /**
       * Returns the side panel with the specified index: 0 for the first (usually "left") panel, 1 for the second panel. Returns `null` if the requested panel does not exist. This occurs if the shell options explicitly pass `null` as the template for the corresponding panel.
       * 
       * @param index Returns the requested panel, or `null` if it does not exist.
       */
      getPanel(index: number): SidePanel;

      /**
       * Requests that the view within the shell be given input focus. This is just a convenient shorthand for the equivalent to `shell.view.focus()`.
       */
      focus(): void;

      /** Removes the shell from the page, destroys the editor, and frees associated resources. */
      dispose(): void;
    }


    /** Returns a new array in which each element describes one of the available built-in palettes, and for each palette type, which variants are supported. */
    function supportedPalettes(): PaletteInfo[];

    /** Returns a new array that describes the default panel configuration used by a shell. The array contains two elements, one for each side panel. Each element is an array of strings, where each string is the name of a built-in palette. */
    function defaultPanels(): string[][];

    /** Given the name of a built-in palette, returns a human-friendly label that describes the palette contents. */
    function getLabelForPalette(paletteName: StandardPalette | keyof typeof StandardPalette): string;

    /** A description of one of the built-in standard palettes, as returned from [[supportedPalettes]]. */
    interface PaletteInfo {
      /** The name of the standard palette type. */
      name: StandardPalette;
      /** Array of available variants for this palette type. */
      variants: StandardPaletteVariant[]
    }

    /** Options that modify the appearance, features, and behaviour of a [[Shell]] and its underlying [[View]]. */
    interface NewShellOptions {
      /** The editor to be controlled by the shell; by default a new editor is created. */
      editor?: Editor | null;

      /** An array of zero to two panel templates to configure the controls that appear in the [[Shell]]'s side panels; by default a standard panel layout is used. */
      panels?: SidePanelTemplate[] | null;

      /** The default layout alternative to use for side panel palettes when none is specified. Default is `"standard"`. */
      defaultPaletteVariant?: StandardPaletteVariant | keyof typeof StandardPaletteVariant | null;

      /**
       * If true, focus will be passed back to the View after clicking on a shell control that activates an editor command. Default is true. Note that focus is *not* passed back in the following circumstances:
       * 
       * - When a control is activated by keyboard.
       * - When a control that repeats when held down is used (such as the selection and caret movement buttons).
       */
      refocusOnView?: boolean | null;

    }

    /** An interface panel appearing beside a [[Shell]] that contains [[Palette]]s of clickable controls. */
    interface SidePanel {
      /** Gets the DOM element that contains the panel interface. */
      readonly rootElement: HTMLElement;

      /** Gets or sets the panel's label for accessibility (ARIA) purposes; this *must* have a valid value. */
      label: string;

      /** Gets or sets whether the panel is open. Closing a panel makes more space for the [[View]]. */
      open: boolean;

      /** Focuses on the panel, allowing the controls to be navigated using the keyboard. */
      focus(): void;

      /** Gets the number of palettes that are children of this panel. */
      readonly paletteCount: number;

      /**
       * Returns the Palette at the specified position in the panel. Throws an Error if the index is invalid.
       *
       * @param index The position of the Palette in the panel, from 0 to [[paletteCount]]-1.
       * @returns The palette at the requested position.
       */
      getPalette(index: number): Palette;

      /**
       * Removes the specified Palette from the panel, if it is a child of the panel. The Palette can be moved by inserting it into a new position or panel. If the Palette is no longer needed, call [[Palette.dispose]] instead.
       * 
       * @param child The Palette to remove from the panel.
       */
      remove(child: Palette): void;

      /**
       * Returns the position of the specified Palette in this panel's children, or -1 if it is not a child.
       * 
       * @param child The Palette to find.
       */
      indexOf(child: Palette): number;

      /**
       * Inserts a Palette into this panel before the position of the specified reference Palette.
       * 
       * @param newChild The Palette to add to this panel.
       * @param refChild The Palette to place the new Palette before.
       */
      insertBefore(newChild: Palette, refChild: Palette): void;

      /**
       * Adds the specified Palette to the end of this panel.
       * 
       * @param newChild The Palette to add to this panel.
       */
      appendChild(newChild: Palette): void;

      /**
       * Creates a new Palette from the specified template. The new Palette can then be added to this panel, or any other panel from the same [[Shell]].
       * 
       * @param template A template describing the layout of Palette controls.
       * @return The new Palette.
       */
      createPalette(template: PaletteTemplate): Palette;

      /**
       * Creates a new Palette with the same controls and layout as one of the standard built-in palettes. Throws an Error if the name is invalid. If the palette in question does not have a variant of the specified type, a valid variant will be substituted.
       * 
       * @param name The name of the standard palette, such as `"arithmetic"`.
       * @param variant The keyword describing which variant of the panel to create; the default is taken from the [[NewShellOptions]] used to create the Shell.
       * @returns A palette with the same functionality as the named palette.
       * @see [[supportedPalettes]]
       */
      createStandardPalette(name: StandardPalette | keyof typeof StandardPalette, variant?: StandardPaletteVariant | keyof typeof StandardPaletteVariant | null): Palette;
    }

    /** A Palette consists of a header and one or more rows of controls. The header can be opened or closed to show or hide the controls. Groups of Palettes are combined into [[SidePanel]]s appearing to the left or right of a [[Shell]].*/
    interface Palette {
      /** Gets the DOM element that contains the palette interface. */
      rootElement: HTMLElement;
      /** Gets the panel that contains this palette, or `null` if it is not in a panel. */
      sidePanel: SidePanel;
      /** Gets or sets the label shown in this palette's header. */
      label: string;
      /** Gets or sets whether the palette is open. When closed, only the header is visible. */
      open: boolean;
      /** Gets or sets whether the palette is locked. When locked, the user cannot open or close the palette; changing the [[open]] property still works. */
      locked: boolean;
      /** If this is a standard built-in palette, this property exists and names the type, such as `"arithmetic"`. */
      standardName?: string;
      /** If this is a standard built-in palette, this property exists and names the variant, such as `"standard"`. */
      standardVariant?: string;
      /** Permanently disposes of this palette. The palette is removed from its panel, if any, and associated resources are freed. The effects of using this palette after disposing of it are undefined. */
      dispose(): void;
    }

    /** Describes the layout of a custom side panel for a [[Shell]]. A Shell can have two panels, one on each side of the view. Each panel consists of zero or more palettes of controls. */
    interface SidePanelTemplate {
      /** Describes the general type of the palettes contained by the control. Required for accessibility. */
      label: string;
      /** Array of zero or more palettes to be contained in the panel. Each element is either a string naming one of the built-in palettes to include, or else a template that describes the desired layout. */
      palettes: Array<PaletteTemplate | StandardPalette | keyof typeof StandardPalette>;
    }

    /** Describes the layout of one of the palettes included in a panel shown at the side of a [[Shell]]. If the `rows` field is null or undefined, then the `label` must match a standard palette name and the optional `variant` field can name a layout variant. */
    interface PaletteTemplate {
      /** Describes the general type of the actions attached to buttons in the palette. This text is shown in the palette header. */
      label: StandardPalette | keyof typeof StandardPalette | string;
      /** If true, the palette starts out open; otherwise the header must be clicked to open it. The default is closed.*/
      open?: boolean;
      /** An array in which each element represents one row of palette controls. */
      rows?: Array<PaletteRowTemplate> | null;
      /** Specifies which layout variant of a standard palette to request. */
      variant?: StandardPaletteVariant | keyof typeof StandardPaletteVariant | null;
    }

    /** Describes a single row in a [[PaletteTemplate]]. This can be any of: `null` to insert a separator row; a single string to insert a row of one button; or an array of 1–6 [[PaletteButtonTemplate]]s. Rows with either 2 or 4 buttons generally create the best layouts. When enabled, palettes will split each row in two at narrow window widths. In rows with an odd number of buttons, the final entry will be on a line of its own. */
    type PaletteRowTemplate = null | string | [PaletteButtonTemplate] | [PaletteButtonTemplate, PaletteButtonTemplate]
      | [PaletteButtonTemplate, PaletteButtonTemplate, PaletteButtonTemplate]
      | [PaletteButtonTemplate, PaletteButtonTemplate, PaletteButtonTemplate, PaletteButtonTemplate]
      | [PaletteButtonTemplate, PaletteButtonTemplate, PaletteButtonTemplate, PaletteButtonTemplate, PaletteButtonTemplate]
      | [PaletteButtonTemplate, PaletteButtonTemplate, PaletteButtonTemplate, PaletteButtonTemplate, PaletteButtonTemplate, PaletteButtonTemplate];

    /** An entry describing one button in a row of palette buttons. This can be a single string to assign a primary action, or an array of two strings to assign both primary and secondary actions (activated with `Shift`). Each string can be a single character to assign an action that inserts that character as a variable or digit, or it can be the name of a command. Not all commands can be used, but all math object commands can. If the entry is a [[CustomPaletteButtonTemplate]] object, a custom button will be created that performs its own handling when clicked. Finally, if the entry is `null`, it will produce a spacer that consumes the same space as a button but does nothing if clicked. */
    type PaletteButtonTemplate = null | string | [string, string] | CustomPaletteButtonTemplate;

    /**
     * Describes a custom palette button. Custom palette buttons not restricted to activating built-in commands when clicked. A custom button template must minimally specify a `label`. In addition, an `onUse` handler function should be specified to perform the desired action when then button is clicked. All other properties are optional.
     * 
     * @see [[PaletteButtonTemplate]]
     */
    interface CustomPaletteButtonTemplate {
      /** An optional ID that will be passed to [[onAdd]] and [[onUse]]. Does not affect the id attribute of the button. */
      id?: string;
      /** The label text for the button. The text is sanitized for security before use so it can accept end user strings. An HTML button label can be set in [[onAdd]] if desired. */
      label: string;
      /** An optional spoken label used with screen readers. */
      spokenLabel?: string;
      /** Optional additional details that may be displayed about the button. */
      tooltip?: string;
      /** An optional listener function called when the button is created. */
      onAdd?: CustomPaletteButtonListener,
      /** An optional listener function called when the button is clicked. If none is specified, the button will have no effect. */
      onUse?: CustomPaletteButtonListener
    }

    /** A listener function that handles a [[CustomPaletteButtonTemplate]] event. */
    interface CustomPaletteButtonListener {
      /**
       * Called to handle a custom button event.
       * 
       * @param shell The shell that contains or will contain the custom button.
       * @param id The optional ID string specified by the custom button template, if any.
       * @param button The root element used to represent the button.
       */
      (shell: Shell, id: string, button: HTMLElement): void
    }

    /**
     * Names of standard, built-in command palettes. Where possible, palette names are the same as the matching section of the available command names (API names).
     * 
     * @see [[createStandardPalette]]
     * @see [[SidePanelTemplate]]
     * @see [[EditorCommand]]
     */
    const enum StandardPalette {
      /** Palette of common commands, including basic arithmetic, relations, brackets, fractions, exponents, radicals, and common constants. */
      arithmetic = "arithmetic",
      /** Palette of common set commands, including braces, set builder notation, set operators, standard number fields, and intervals. */
      sets = "sets",
      /** Palette of common logic commands, including boolean constants, boolean logic operators, and proof symbols. */
      logic = "logic",
      /** Palette of common function commands, including the function object, common standard functions, sum and product, and piecewise functions. */
      functions = "functions",
      /** Palette of trigonometry functions, with the hyperbolic functions as secondary commands. The compact variant includes only the basic functions and their inverses. */
      trigonometry = "trigonometry",
      /** Palette of Greek variables. The compact variant includes only the most commonly used letters. */
      greek = "greek",
      /** Palette of combinatorics and probability commands. */
      combinatorics = "combinatorics",
      /** Palette of commands for working with matrices. */
      matrices = "matrices",
      /** Palette of commands for calculus and related operations. */
      calculus = "calculus",
      /** Palette of common commands for primary and secondary school geometry. */
      geometry = "geometry",
      /** Paletts of commands for group theory. */
      groupTheory = "groupTheory",
      /** Palette of common chemical equation objects, including common elements. */
      chemistry = "chemistry",
      /** Palette of common computing-related math objects, including asymptotic analysis, string literals, relational algebra, and the λ-calculus. */
      computing = "computing",
      /** Palette of command commands for working with the imaginary numbers. */
      complexNumbers = "complexNumbers",

      /** Palette of memory cells, which can be used to store and recall multiple clips and are stored in a document's metadata. The compact variant lists 4 cells instead of the usual 10. */
      memory = "memory",
      /** Palette of basic editing and transformation commands, including caret movement and selection, clipboard operations, unwrap, take reciprocal, and duplicate line. */
      editing = "editing"
    }

    /**
     * A string describing which variant layout of a standard palette to create.
     * 
     * @see [[createStandardPalette]]
     * @see [[NewShellOptions]]
     */
    const enum StandardPaletteVariant {
      /** The default layout. */
      standard = "standard",
      /** A more compact layout available for some palette types. For example, the trigonometry palette has an alternative compact layout that omits the reciprocal functions (`csc`, `sec`, `cot`, and so on). Similarly, the compact Greek variable layout includes only the most-used letters, organized roughly by subject.*/
      compact = "compact"
    }

    /**
     * Returns a Promise that resolves to a new [[Shell]]. The shell will be created asynchronously and appended to the specified element as a new child element.
     * 
     * @param parentElement The element to append the shell's root DOM node to; defaults to `document.body`.
     * @param options Options that affect the shell's features.
     * @returns A Promise that resolves to the new shell.
     */
    function create(parentElement?: HTMLElement, options?: NewShellOptions): Promise<Shell>;

    /**
     * Returns the shell that contains the specified element, or null if the element is not part of a shell.
     * 
     * @param element The element (or DOM node) that may be a descendent of a shell.
     * @returns The shell that the element is a descendent of, or null.
     * @see [[View.thatContainsElement]]
     */
    function thatContainsElement(element: Element): Shell | null;

    /**
     * Returns a new array of all of the shells that are currently on the page.
     * 
     * @returns A (possibly empty) array in which each element is a shell that has been added to the DOM.
     * @see [[View.getAddedViews]]
     */
    function getAddedShells(): Shell[];

    /** When the API is loaded in `"editor"` mode, this will be set to the shared global shell. (If the shared shell is disposed of, this becomes `null`.) Otherwise it is `undefined`. */
    var shared: Shell | undefined | null;
  }

  /**
   * Utilities that are useful when extending the editor or integrating it with other elements of a Web app.
   */
  namespace util {
    /**
     * Options that control document printing. If a margin is set, it will apply in addition to any margin enforced by the browser. In order to get the specified margin, users may need to set an option in the browser. For example, in Chrome users would need to change the print dialog's **Margins** option (found under **More settings**) from **Default** to **None**.
     */
    interface PrintOptions {
      /** Ideal line-breaking width for content, measured in millimetres. */
      lineWidthMm: number;
      /** Margin added to the top of pages, measured in millimetres. This is in addition to any margin enforced by the browser. The default is 0&nbsp;mm. */
      marginTopMm: number;
      /** Margin added to the right edge of pages, measured in millimetres. This is in addition to any margin enforced by the browser. The default is 0&nbsp;mm. */
      marginRightMm: number;
      /** Margin added to the bottom edge of pages, measured in millimetres. This is in addition to any margin enforced by the browser. The default is 0&nbsp;mm. */
      marginBottomMm: number;
      /** Margin added to the left edge of pages, measured in millimetres. This is in addition to any margin enforced by the browser. The default is 0&nbsp;mm. */
      marginLeftMm: number;
    }

    /**
     * Asynchronously prints the specified document.
     * 
     * @param document The document to print, in the MICD document format.
     * @param options Options that affect the print layout.
     * @returns A Promise that resolves after document layout is complete, once the print operation has begun.
     */
    function printDocument(document: string, options?: PrintOptions): Promise<void>;

    /**
     * Compares the math content of two documents stored in the MICD document format. Only math content is compared; metadata is ignored. If either document is stored in an old version of the document format, the comparison will be performed as if it was first upgraded to the current version.
     * 
     * This can be used to help implement automated testing by checking whether some code produces an expected result. It can also be used as a first pass to check whether a submitted answer matches an accepted solution. Note, though, that it does not attempt to test whether the two documents are *mathematically equivalent*, but only whether their contents are identical.
     * 
     * @param document1 A document in the MICD document format.
     * @param document2 The document to be compared to the first document, also in the MICD document format.
     * @returns If the documents have the same math content, true; otherwise false.
     * @throws *TypeError* If either argument is not a valid MICD document.
     * @see [[Editor.value]]
     */
    function compareMathContent(document1: string, document2: string): boolean;

    /**
     * Returns whether the given string value describes a valid document in MICD format. If this returns true, actions such as setting an editor's value to the string will not throw an error.
     * 
     * @param document The potential document data to test.
     * @returns True if the data is a valid document.
     */
    function isValidDocument(document: any): boolean;

    /**
     * Returns whether the given string value describes a valid clip in MICD format. If this returns true, actions such as creating a new [[Clip]] using the value will not throw an error.
     * 
     * @param clip The potential clip data to test.
     * @returns True if the data is a valid clip.
     */
    function isValidClip(clip: any): boolean;

    /**
     * Given a semantic object from any source, returns a semantic object that describes the same content in the standard form returned by the API.
     * 
     * @param object The semantic object to normalize.
     * @returns A structure containing the normalized object and an array of any errors found in the source object.
     */
    function normalizeSemanticObject(object: SemanticObject): { object: SemanticObject, errors: SemanticObjectParserError[] };

    /**
     * Returns a new array in which each element describes one of the image formats supported on the current device when exporting math content to an image. Support for `"png"` and `"svg"` is guaranteed. Other entries depend on the platform and/or browser, but may include `"bmp"`, `"gif"`, `"jpeg"`, `"webp"`, and `"avif"`. The array can be iterated over to list supported formats, or specific formats can be looked up by name (as in `formats["png"]`).
     * 
     * **Example:** Create a glob pattern for accepted files
     * ```js
     * const filters = micd.util.supportedImageFormats()
     *   .map(fmt => fmt.fileExtension)
     *   .join();
     * console.log(`*.{${filters}}`);
     * ```
     * 
     * @returns An array with an element for each supported format.
     * @see [[Editor.toImage]]
     */
    function supportedImageFormats(): ImageFormatInfo[];

    /**
     * Describes an image format that can be used with [[Editor.toImage]].
     * 
     * @see [[supportedImageFormats]]
     */
    interface ImageFormatInfo {
      /**
       * The format identifier, such as `"jpeg"` for the JPEG image format. The [[ImageFormatOptions.format]] property must be assigned this value to specify the described format. Format identifiers are guaranteed to consist of lower case letters and digits from the basic ASCII character set (`/^[a-z0-9]+$/`).
       */
      format: string;
      /** The short common name of the format, as it might be presented to users. */
      name: string;
      /** The Internet media type (MIME type) of the format, such as `"image/svg+xml"`. */
      mimeType: string;
      /** The most common file extension for images of this type, with no `.` prefix. For example, `"jpg"` for the JPEG image format. */
      fileExtension: string;
      /** If true, the image format is lossy, meaning that it does not preserve the source image exactly. Generally this means that [[ImageFormatOptions.quality]] will have a meaningful effect on the image.
       * 
       * **Notes:**
       * 1. Formats such as AVIF that support both lossy and lossless encoding are reported as lossy.
       * 2. The GIF format, while not considered lossy, allows only 256 colours. Images with more than 256 colours will lose information due to quantization (colour reduction). For this reason, the GIF format is not recommended.
       */
      lossy: boolean;
    }

    /**
     * Returns a new array in which each element is an object that describes basic information about a built-in command. This can be used for purposes such as allowing users to customize key gestures, or to create a custom replacement for the built-in help table feature.
     * @returns A new array with an element for each command.
     * @see [[InputMap]]
     * @see [[createHelpTable]]
     */
    function supportedCommands(): micd.util.CommandInfo[];

    /** Describes basic information about a command and how it is activated. */
    interface CommandInfo {
      /** Name of the section that the command belongs to. */
      section: string;
      /** Name of the command. */
      name: EditorCommand;
      /** A version of the command name suitable for use as a label for a human reader. */
      label: string;
      /** A version of the section name suitable for use as a label for a human reader. */
      sectionLabel: string;
      /**
       * The default gesture used to activate the command, if any. This is in the form of a gesture string as it would be passed to an input map, either a single typed character or a keystroke description such as `"Ctrl X"`.
       * 
       * @see [[View.gestureMap]]
       */
      gesture?: micd.Keystroke | string;
      /** The default abbreviation used to activate the command, if any. */
      abbreviation?: string;
      /** The primary ligature sequence, if any, that activates the command. This is a sequence of operator symbol keys, such as `"<="`, that will automatically be converted into the object produced by this command. */
      ligature?: string;
      /** The general type of command, such as an editing command or a command that inserts a math object. */
      type: "editing" | "math" | "chemistry";
    }

    /**
     * Completes a partial configuration by filling in default values for any missing properties. This can be used to determine what the default value of one or more configuration options *would be* given the specified basis. For example, the following statement evaluates to what the default radix point character *would be* if the locale was Canadian French: `micd.util.completeConfig({ locale: "fr-CA" }).radixPoint`.
     * 
     * @param config An object that may define configuration options to constrain the completed result.
     */
    function completeConfig(config?: micd.ConfigOptions | null): micd.ConfigOptions;

    /**
     * Creates a new operator which is returned as a [[Clip]]. The clip can then be applied to an editor, saved in a memory cell, or made into an [[Action]] and assigned a keystroke. To create an operator you must specify a symbol, such as `"⨂"` or `"jne"`, and optionally a placement.
     * 
     * While the resulting operator can always be used in the editor, you may run into other issues:
     *  - Views may display a placeholder symbol when a requested symbol is not supported by the view's math fonts. The end result will vary by platform.
     *  - Conversion to other formats may not work as expected.
     *  - Other advanced features may not work; for example, computation may fail since the editor may not know how to apply the operator.
     *  - Custom operators that effectively reproduce an existing operator should not expect the new operator to behave differently.
     * 
     * @param symbol A non-empty string containing the symbol or name to use for the operator.
     * @param placement A string naming the placement of the operator; if not specified an appropriate default is chosen based on the symbol.
     * @throws *ReferenceError* If the symbol is missing.
     * @throws *TypeError* If the symbol is too long or the placement is invalid.
     */
    function createOperator(symbol: string, placement?: OperatorPlacement | keyof typeof OperatorPlacement): micd.Clip;

    /**
     * Returns a new editor that contains a copy of the line containing the specified caret position and selection. The specified caret position and selection will be translated to the same relative position in the copy. If a caret position and selection are not provided, the current position and selection in the source editor are used.
     * 
     * A safe space can be used to safely test a complex, multistep edit operation without affecting the undo history of the source editor. If the operation succeeds in the safe space, the same steps can be repeated in the source editor.
     * 
     * @param source The editor to create a safe copy from.
     * @param caretPosition The document caret position to be recreated; the default uses the source editor caret position.
     * @param selection The selection to be recreated, or null for no selection; the default uses the source editor selection. This argument is ignored if `caretPosition` is null.
     * @returns A new, historyless editor that containing the copied context and translated.
     */
    function createSafeSpace(source: Editor, caretPosition?: string, selection?: string): Editor;

    /**
     * Compresses a string. The returned string is *usually not longer than* (and often significantly shorter than) the original string. The original string can be recovered by calling [[decompress]] with the compressed string as an argument.
     * 
     * By default, compressed strings use the entire range of character values. This improves compression effectiveness when the compressed string will be kept in memory or otherwise stored as 16-bit character values. However, if encoded as UTF-8, the encoded representation of the compressed string will typically require *more* bytes than the *uncompressed* string would have. Passing true for `optimizeForUtf8` limits compression efficiency but ensures that the compressed string uses only single-byte UTF-8 characters. The compressed result will generally require more *characters* than the standard method, but those characters will use fewer actual *bytes* when encoded.
     * 
     * If null or an empty string is passed in, it is returned unchanged. The original string may also be returned if the compressed result would be longer. This is transparent to the caller: [[decompress]] handles such strings correctly.
     * 
     * @param toCompress The string to compress.
     * @param optimizeForUtf8 If true, the compressor will minimize the byte length of the string's UTF-8 encoding instead of minimizing the number of characters in the compressed string object.
     * @return The compressed string, or null if null was passed in.
     */
    function compress(toCompress: string | null, optimizeForUtf8?: boolean): string | null;

    /**
     * Decompresses a previously compressed string, returning the original text.
     * 
     * @param toDecompress The string to decompress, as previously returned from [[compress]].
     */
    function decompress(toDecompress: string | null): string | null;
  }

  /** Auxiliary user interface elements, including dialogs and menus. This is a lightweight toolkit intended primarily for the API's own internal needs. It provides a number of conveniences, including pre-built option dialogs and easy extension of the default context menu. However, using it is entirely optional. */
  namespace ui {
    /**
     * Returns a Promise that resolves to the root of a tree of HTMLElements that provide a graphic representation of some math content. The content is described by a string using one of three formats: the string value of a [[Clip]], the name of a command that inserts math, or a string of MathML. Note that this is intended mainly to support the construction of user interface elements and might not be suited to more general math display applications.
     * 
     * @param math A string containing a clip, a command name, or MathML.
     * @returns A Promise that resolves to the root of a tree of HTMLElements that will display the math, or `null` if a callback was supplied.
     * @throws *ReferenceError* If the supplied math content is null.
     */
    function toHtml(math: string): Promise<HTMLElement>;

    /**
     * Provides feedback to the user that a minor error occurred, such as playing a soft "error beep" sound. The exact form(s) of the feedback is determined by the [[sErrorFeedback]] theme setting. The effect will be the same as that produced when the user attempts a low-level inapplicable action, such as moving the caret past the end of the document.
     */
    function provideErrorFeedback(): void;

    /**
     * Returns a Promise that resolves to an HTMLTableElement for a help table describing available commands and their keyboard shortcuts. An optional template can be used to customize the table contents, such as adding help for custom commands.
     *
     * @param template An optional template that allows customization and extension of the generated table.
     * @returns A Promise that resolves to the table, or `null` if a callback was supplied.
     */
    function createHelpTable(template?: HelpTableTemplate | null): Promise<HTMLTableElement>;

    /**
     * Returns a new dialog template for a dialog that can create or edit [[ImageFormatOptions]] objects. The template can be modified before being shown.
     * 
     * @returns A template with controls that reflect an options `value`.
     */
    function createImageOptionsDialog(): DialogTemplateFor<ImageFormatOptions>;

    /**
     * Returns a new dialog template for a dialog that can create or edit [[LatexFormatOptions]] objects. The template can be modified before being shown.
     * 
     * @returns A template with controls that reflect an options `value`.
     */
    function createLatexOptionsDialog(): DialogTemplateFor<LatexFormatOptions>;

    /**
     * Returns a new dialog template for a dialog that can create or edit [[MmlFormatOptions]] objects. The template can be modified before being shown.
     * 
     * @returns A template with controls that reflect an options `value`.
     */
    function createMmlOptionsDialog(): DialogTemplateFor<MmlFormatOptions>;

    /**
     * Returns the bounding rectangle of an element relative to the top left corner of the document. That is, the coordinate system is the same as that used by the `pageX` and `pageY` properties of input events.
     * @param element The element to get the bounds of.
     * @returns The page-relative bounding rectangle.
     */
    function getPageRect(element: Element): { x: number, y: number, width: number, height: number, x2: number, y2: number };

    /**
     * A template that customizes generated help tables.
     * 
     * @see [[createHelpTable]]
     */
    interface HelpTableTemplate {
      /** If true, the table includes a header describing each column. The default is true. */
      showHeader?: boolean | null;
      /**
       * If true, each command listed in the help table will include the string used to apply that command in API calls.
       * 
       * @see [[Editor.apply]]
       * @see [[EditorCommand]]
       */
      showApiNames?: boolean | null;
      /**
       * If true, then header will include a search field that can be used to search the table content by hiding rows that do not match the search term. The default is true. This option has no effect if `showHeader` is false.
       */
      searchable?: boolean | null;
      /** If set, help content is generated for the specified platform. The default is to target the platform that the app is running on. */
      platform?: "chromeos" | "linux" | "mac" | "win" | null;
      /** Any sections or commands whose API name is an element of this array will be excluded from the resulting table. */
      exclude?: string[] | null;
      /**
       * If set, then each command's section of the table will have an ID that consists of this prefix concatenated with the command's API name. Setting this will allow linking to individual sections and commands in the resulting table. For example, if this is set to the empty string `""`, then linking to the fragment identifier `#squareRoot` would take the reader to the square root command. If null, then no IDs are generated. The default is null.
       */
      idPrefix?: string | null;
      /**
       * If set, the value of any property names matching the API name of a command will be substituted for that command's default gesture.
       * 
       * @see [[View.gestureMap]]
       */
      gestureOverrides?: { [key in EditorCommand]?: string } | null;
      /**
       * If set, the value of any property names matching the API name of a command will be substituted for that command's default abbreviation.
       * 
       * @see [[View.abbreviationMap]]
       */
      abbreviationOverrides?: { [key in EditorCommand]?: string } | null;

      /** An array of custom sections to be inserted into the table. */
      sections?: HelpTableSectionTemplate[] | null;
    }

    /**
     * Template for a custom section in a help table.
     * 
     * @see [[createHelpTable]]
     */
    interface HelpTableSectionTemplate {
      /** The text to display as the name of the section. */
      name: string;

      /** If specified, the section will be included just before the section with the specified API name (if built in) or `name` (if custom). If not specified, the section is appended to the end of the able. */
      beforeSection?: string | null;

      /** The command descriptions that will appear in this section. */
      commands?: HelpTableCommandTemplate[] | null;
    }

    /**
     * Template for a custom command within a custom section of a help table. At least one of `command`, `name`, or `note` must be defined.
     * 
     * @see [[createHelpTable]]
     */
    interface HelpTableCommandTemplate {
      /** Inserts help for the built-in command with the specified API name. If assigned a section name, the entire section is inserted. When present, any other properties except `note` are ignored. */
      command?: EditorCommand | string | null;

      /** The text to display as the name of the command. If this is not set, then the values of `clip`, `gesture` and `abbreviation` are ignored. */
      name?: string | null;

      /** An optional clip of math content that illustrates the command. */
      clip?: micd.Clip | null;

      /**
       * An optional key gesture that activates the command. If the string is a single code point, it represents a printable character. Otherwise it represents a [[Keystroke]].
       * 
       * @see [[View.gestureMap]]
       */
      gesture?: string | null;

      /**
       * An optional abbreviation that activates the command.
       * 
       * @see [[View.abbreviationMap]]
       */
      abbreviation?: string | null;

      /** Additional information that will be appended to the table just under this command. This can appear by itself, in which case the note is attached to the most recently added command.  */
      note?: string | null;
    }

    /**
     * Displays a basic popup menu based on a template. Only one popup menu can be visible at a time. If a menu is already showing when this is called, it will be cancelled automatically.
     *
     * @param template The template that defines the structure and logic for the desired dialog.
     * @throws *ReferenceError* If the template is null.
     */
    function showMenu(template: MenuTemplate): void;

    /**
     * A function included within the structure of a [[DialogTemplate]] that allows you to add custom logic to the dialog behaviour.
     */
    interface MenuListener<T extends MenuTemplateBase> {
      /**
       * Called when an event related to the menu has occurred, such as an item being selected.
       * 
       * @param template The template that the event occurred on.
       */
      (template: T): void;
    }

    /** The common base interface for all menu template interfaces. */
    interface MenuTemplateBase {
      /** An optional value that can be set to assist in implementing the menu logic. It is ignored by [[showMenu]] and does not affect any DOM ids. */
      id?: string | null;
      /** If defined, this function will be called when the user chooses a menu item. */
      onUse?: MenuListener<MenuItemTemplate> | null;
      /** An array of templates for the items that will comprise the menu or submenu. */
      items?: MenuItemTemplate[] | null;
    }

    /** A template that declaratively describes a pop-up menu and its logic. */
    interface MenuTemplate extends MenuTemplateBase {
      /** The *x*-offset at which to display the menu, relative to the left edge of the document. The actual location of the menu may be adjusted to ensure visibility. */
      pageX: number;
      /** The *y*-offset at which to display the menu, relative to the top edge of the document. The actual location of the menu may be adjusted to ensure visibility. */
      pageY: number;
      /** The optional index of a menu item that will be focused and highlighted when the menu is shown. The default is not to preselect an item. */
      preselect?: number;
      /** If defined, this function is called if an item is selected *and* that item does not specify its own `onUse` function. It will be passed the template of the selected menu item. */
      onUse?: MenuListener<MenuItemTemplate> | null;
      /** If defined, this function is called if the menu is closed without selecting an item. It will be passed the template of the menu that was cancelled. */
      onCancel?: MenuListener<MenuTemplate> | null;
      /** If defined, this function is called just before the menu is shown. It will be passed the template of the menu that will be shown. */
      beforeShow?: MenuListener<MenuTemplate> | null;
      /** If defined, this function is called after the menu is closed. It will be passed the template of the menu that closed. Unlike [[onCancel]], it will be called whether or not a menu item is selected. */
      onClose?: MenuListener<MenuTemplate> | null;
      /** An array of templates describing the items that will comprise the menu. */
      items?: MenuItemTemplate[] | null;
    }

    /** A template that declaratively describes one item in a menu and its logic. */
    interface MenuItemTemplate extends MenuTemplateBase {
      /** The text that appears as a label within the menu item. */
      text?: string | null;
      /** If specified, the menu item label will include a rendering of the contents of this clip. */
      clip?: micd.Clip | null;
      /** This is used in place of [[text]] when the menu item is read by a screen reader. */
      spokenLabel?: string | null;
      /** If true, the item will be disabled and the user will not be able to interact with it. */
      disabled?: boolean | null;
      /** An array of templates for items that will comprise a submenu for this menu. An item with a submenu will ignore `onUse`; that is, clicking on the item will open the submenu rather than selecting the item. For the sake of usability, submenus may not be nested. */
      items?: MenuItemTemplate[] | null;
      /**
       * If any item in an `items` array defines `group`, then all of the items in that array will be reordered automatically as follows:
       * 
       * - Existing separators (`null` entries) will be removed.
       * - The remaining items will be sorted according to their `group`. Any item not defining a `group` will use 1&nbsp;000&nbsp;000. This sort is *stable*: items in the same `group` stay in the same order relative to each other.
       * - A separator will be inserted between any two items with a difference of at least 100 in their `group` values.
       */
      group?: number | null;
      /** If defined, this function will be called when the user selects (highlights) a menu item by using the keyboard or moving the pointer over it. */
      onSelect?: MenuListener<MenuItemTemplate> | null;
    }

    /**
     * Briefly displays a feedback message at the bottom of the window. The display time is calculated automatically based on the message length. Clicking a toast dismisses it prematurely. At most one toast is shown at a time; if this is called when a toast is already showing, the new toast will be added to a queue to be shown later.
     * 
     * @param message The text of a message to display.
     */
    function showToast(message: string): void;

    /**
     * Displays a basic dialog box based on the contents of a template.
     * 
     * Note that the dialog box API is meant primarily to meet the needs of the editor itself. It may not be suited to all of your use cases and is not intended to be a complete replacement for a general user interface framework.
     * 
     * @param template The template that defines the structure and logic for the desired dialog.
     * @returns A Promise that resolves to the template once the dialog is closed.
     */
    function showDialog(template: DialogTemplate): Promise<DialogTemplate>;

    /** A template that declaratively describes a dialog box, its contents, and its logic. */
    interface DialogTemplate {
      /** The dialog's title text. */
      title?: string | null;
      /**
       * An "OK" button that the user can press to close the dialog and complete any associated action. If this defines an [[onUse]] function, that function will be called when the button is clicked. If it does not return true, the dialog will be prevented from closing.
       */
      acceptButton?: ButtonTemplate | null;
      /**
       * A "Cancel" button that the user can press to close the dialog without completing any associated action. If this button is specified, it will also be "clicked" if the user tries to close the dialog by pressing Escape or clicking outside of the dialog. If this button is not specified, the dialog will simply close in these cases. If the button defines an [[onUse]] function, that function will be called when the button is clicked. If it does not return true, the dialog will be prevented from closing.
       */
      cancelButton?: ButtonTemplate | null;
      /** An array of form controls that will be added to the dialog in the order listed. Any controls that define an `id` property can be looked up from this array by their id in addition to their array index. */
      controls?: WidgetTemplate[] | null;
      /** If defined, this function will be called after the dialog is fully constructed but before it is shown. If it does not return true, the dialog will not be shown. */
      beforeShow?: (template: DialogTemplate) => boolean | null;
      /** If defined, this function will be called before the dialog is closed, no matter what action caused the close process to begin. If it does not return true, the dialog will not close. */
      beforeClose?: (template: DialogTemplate) => boolean | null;
      /** If defined, this function will be called after the the dialog closes. Any return value is ignored. */
      onClose?: (template: DialogTemplate) => any | null;

      /** The optional *x*-offset at which to display the centre of the dialog, relative to the left edge of the document. The actual location of the dialog may be adjusted to ensure visibility. When defined, [[pageY]] must also be set. When no explicit position is given for the dialog, it will be centered at the top of the window. */
      pageX?: number;
      /** The optional *y*-offset at which to display the top of the dialog, relative to the top edge of the document. The actual location of the dialog may be adjusted to ensure visibility. When defined, [[pageX]] must also be set. */
      pageY?: number;

      /**
       * If called while the dialog is showing, this will update the widget states as if a widget handler function (such as `onUse`) returned false. This function is added automatically by the toolkit when the dialog is shown.
       */
      update?(): void;
      /**
       * If called while the dialog is showing, this will update the rebuild the dialog as if a widget handler function (such as `onUse`) returned true. This function is added automatically by the toolkit when the dialog is shown.
       */
      rebuild?(): void;
      /**
       * If called while the dialog is showing, this will close the dialog. This function is added automatically by the toolkit when the dialog is shown. Calling this will not trigger either the accept or cancel buttons. To simulate the user choosing the accept (OK) button, use `template.acceptButton.element.click()`. Similarly, to simulate the cancel button, use `template.cancelButton.element.click()`.
       */
      close?(): void;
    }

    /**
     * An extension to the standard dialog template for dialogs that are intended to edit a specific kind of value. They are used in a standard pattern, as follows:
     *
     * 1. The dialog user sets the `value` property to the value to be edited, or `null` to start from a default state.
     * 2. The dialog user sets the `onClose` property to a handler that will be called when the end user closes the dialog. This handler will be responsible for dealing with the edited value.
     * 3. The dialog user shows the dialog; the template's `beforeShow` sets up the controls to reflect the `value` property.
     * 4. When the user closes the dialog, the `value` property will be updated before the dialog user's `onClose` is invoked: If the end user accepts the dialog, the accept button's `onUse` handler updates the state of the `value` property to reflect the edited state. If the end user cancels the dialog, the cancel button's `onUse` handler sets the `value` property is set to `undefined`.
     */
    interface DialogTemplateFor<T> extends DialogTemplate {
      value?: T | null;
    }


    /** All possible dialog widget types. */
    type WidgetTemplate = ButtonTemplate | ImplicitButtonTemplate | ToggleTemplate | DropdownTemplate | TextFieldTemplate | TextAreaTemplate | NumberFieldTemplate | MathFieldTemplate | ColorPickerTemplate | NoteTemplate | RuleTemplate | SpacerTemplate | GridTemplate | CustomWidgetTemplate;

    /** All possible templates for buttons that can appear in a dialog. */
    type ButtonTemplate = ImplicitButtonTemplate | ExplicitButtonTemplate;

    /**
     * This interface is a base for all templates that can appear as controls in a [[DialogTemplate]].
     * 
     * @param <W> The specific widget type; for example, such as [[TextFieldTemplate]].
     * @param <E> The type of element that best represents the control; for example, an HTMLInputElement.
     */
    interface WidgetBase<W extends WidgetTemplate, E extends HTMLElement> {
      /** If defined, this control can be looked up from the template's [[controls]] array using this value. It must conform to the regular expression `/^[A-Za-z][\w\-\:\.]*$/`. */
      id?: string | null;
      /** If defined, this text will be used as a label for the control. */
      label?: string | null;
      /** If defined, screen readers will use this as the label for the control. */
      spokenLabel?: string | null;
      /** If true, the control will be disabled and the user will not be able to interact with it or change its value. */
      disabled?: boolean | null;
      /** If true, this control will not appear on its own line but will instead be appended to the previously declared control. Multiple controls can be chained in sequence to combine them into one long row. When true, the control's `label` property has no effect. */
      chain?: boolean | null;
      /** If true, this control will be given focus when the dialog is shown. Default is false. */
      initialFocus?: boolean | null;
      /**
       * If defined, this function will be called whenever the user changes the control's value. If the function makes changes to the template state (changing label text, disabled state, and so on), those changes will be propagated to the actual dialog. If changes are made to the *structure* of the dialog (such as adding or removing a control), the function must indicate this by returning true. This will cause the dialog content to be rebuilt.
       */
      onUse?: (template: DialogTemplate, widget: W) => boolean | void;

      /** If defined, this function will be called once elements that represent the control have been added to the document tree. */
      onAdd?: (template: DialogTemplate, widget: W) => any;

      /** If defined, this function will be called just before elements that represent the control have been added to the document tree. */
      beforeRemove?: (template: DialogTemplate, widget: W) => any;
      /**
       * This will point to the DOM element that best represents the control.
       * This property is set by the interface framework and should be considered read only except for [[CustomWidgetTemplate]]s.
       */
      element?: E | null;
      /**
       * If a tree of DOM nodes is required to represent this control, this will point to the root element of that tree.
       * This property is set by the interface framework and should be considered read only.
       */
      readonly rootElement?: HTMLElement | null;
      /**
       * If the control has a label that appears in the dialog, this will point to the DOM element responsible for the label.
       * This property is set by the interface framework and should be considered read only.
       */
      readonly labelElement?: HTMLLabelElement | null;
    }

    /** A template that declares a button control in a [[DialogTemplate]] that omits the type property. Unless you have a good reason, use the [[ButtonTemplate]] type instead. */
    interface ImplicitButtonTemplate extends WidgetBase<ImplicitButtonTemplate, HTMLButtonElement> {
      /** The text that appears as a label within the button face. Not to be confused with the `label` property, which is shown beside the button. */
      text?: string | null;
      /** If specified, the button face will include a rendering of this clip. Both `text` and `clip` can be specified, but using one or the other is preferable. Buttons that include a clip that is not otherwise labelled should provide a spoken label. */
      clip?: micd.Clip | null;
    }

    /** A template that declares a button control in a [[DialogTemplate]] that explicitly declares the type property. Unless you have a good reason, use the [[ButtonTemplate]] type instead. */
    interface ExplicitButtonTemplate extends WidgetBase<ExplicitButtonTemplate, HTMLButtonElement> {
      type: "button";
      /** The text that appears as a label within the button face. Not to be confused with the `label` property, which is shown beside the button. */
      text?: string | null;
      /** If specified, the button face will include a rendering of this clip. Both `text` and `clip` can be specified, but using one or the other is preferable. Buttons that include a clip that is not otherwise labelled should provide a spoken label. */
      clip?: micd.Clip | null;
    }

    /** A template that declares a toggle button control in a [[DialogTemplate]]. */
    interface ToggleTemplate extends WidgetBase<ToggleTemplate, HTMLInputElement> {
      /** The type property must be set to `"toggle"`. */
      type: "toggle";
      /** This property will reflect the state of the switch: if true, the toggle button is currently switched "on". */
      selected?: boolean | null;
    }

    /** A template that declares a dropdown list control in a [[DialogTemplate]]. */
    interface DropdownTemplate extends WidgetBase<DropdownTemplate, HTMLSelectElement> {
      /** The type property must be set to `"dropdown"`. */
      type: "dropdown";
      /** An array of the strings to display as selectable options in the list. */
      options?: string[] | null;
      /** The index of the currently selected choice in the `options` array, or -1 if nothing is selected. */
      selected?: number;
      /** The integer number of rows to display; if greater than 1, then supporting platforms will display the control as a list box. The default is 1. */
      rows?: number;
    }

    /** A template that declares a text field control in a [[DialogTemplate]]. */
    interface TextFieldTemplate extends WidgetBase<TextFieldTemplate, HTMLInputElement> {
      /** The type property must be set to `"text"`. */
      type: "text";
      /** This property will reflect the current text of the field. */
      text?: string | null;
      /** This is a hint as to how wide the field should be, in columns. */
      cols?: number | null;
      /** If defined, the text field might display this text when the field is empty, as a hint to the user.  */
      placeholder?: string | null;
      /** If true, the field content will be selected. */
      select?: boolean | null;
    }

    /** A template that declares a textarea control in a [[DialogTemplate]]. */
    interface TextAreaTemplate extends WidgetBase<TextAreaTemplate, HTMLTextAreaElement> {
      /** The type property must be set to `"textarea"`. */
      type: "textarea";
      /** This property will reflect the current text of the field. */
      text?: string | null;
      /** This is a hint as to how wide the field should be, in columns. */
      cols?: number | null;
      /** This is a hint as to how tall the field should be, in rows. */
      rows?: number | null;
      /** If true, the field content will be selected. */
      select?: boolean | null;
    }

    /** A template that declares a number field control in a [[DialogTemplate]]. */
    interface NumberFieldTemplate extends WidgetBase<NumberFieldTemplate, HTMLInputElement> {
      /** The type property must be set to `"number"`. */
      type: "number";
      /** This property will reflect the current value of the field. Default is the minimum value. */
      value?: number | null;
      /** Sets the minimum value of the field. Default is 0. */
      min?: number | null;
      /** Sets the maximum value of the field. Default is 100. */
      max?: number | null;
      /** Sets the step size. On supported platforms (typically desktop/notebook class devices), the number field will include arrow buttons to step through possible values. The step size sets the increment and decrement that the arrow buttons apply to the current value. Default is 1. */
      step?: number | null;
      /** This property will reflect the current text of the text field. */
      text?: string | null;
      /** This is a hint as to how wide the field should be, in columns. */
      cols?: number | null;
      /** If defined, the text field might display this text when the field is empty, as a hint to the user.  */
      placeholder?: string | null;
    }

    /**
     * A template that declares a math field control in a [[DialogTemplate]].
     * @experimental May change or be removed in future releases.
     */
    interface MathFieldTemplate extends WidgetBase<MathFieldTemplate, HTMLDivElement> {
      /** The type property must be set to `"math"`. */
      type: "math";
      /**
       * This property will reflect the current field content.
       * @see [[Editor.value]]
       */
      value?: string | null;
      /**
       * The [[View]] that provides the field's math editing support. It can be used to change the View's
       * properties, as well as those of the underlying [[Editor]]. This should not be set manually; it is
       * set by the framework when the control is created.
       */
      view?: View;
    }

    /** A template that declares a colour selection control in a [[DialogTemplate]]. */
    interface ColorPickerTemplate extends WidgetBase<ColorPickerTemplate, HTMLDivElement> {
      /** The type property must be set to `"color"`. */
      type: "color" | "colour";
      /** This property will reflect the currently selected colour. */
      value?: micd.Color | null;
      /** When true, the colour picker allows editing of the alpha channel (opacity). */
      hasAlpha?: boolean | null;
    }

    /** A template that declares a note control, a small label, in a [[DialogTemplate]]. */
    interface NoteTemplate extends WidgetBase<NoteTemplate, HTMLElement> {
      /** The type property must be set to `"note"`. */
      type: "note";
      /** The text of the note. */
      text?: string | null;
      /** The style of the note: `"default"` for smaller text, `"label"` for style comparable to a widget label. */
      style?: "default" | "label" | null;
    }

    /** A template that declares a separator rule in a [[DialogTemplate]]. */
    interface RuleTemplate extends WidgetBase<RuleTemplate, HTMLHRElement> {
      /** The type property must be set to `"rule"`. */
      type: "rule";
    }

    /** A template that declares an empty spacer "control" in a [[DialogTemplate]]. Typically used to take up a grid cell. */
    interface SpacerTemplate extends WidgetBase<SpacerTemplate, HTMLElement> {
      /** The type property must be set to `"spacer"`. */
      type: "spacer";
    }

    /** A template that declares a grid of related subcontrols in a [[DialogTemplate]]. */
    interface GridTemplate extends WidgetBase<GridTemplate, HTMLDivElement> {
      /** The type property must be set to `"grid"`. */
      type: "grid";
      /** The number of controls that will make up each row of the grid. */
      width?: number | null;
      /** An array of form controls that will be added to the dialog in the order listed. */
      controls?: WidgetTemplate[] | null;
    }

    /**
     * Allows the inclusion of other widgets in a dialog template. The dialog will call [[onBuild]] when the widget's DOM element(s) structure should be constructed, [[onAdd]] when it is added to the document, [[onUpdate]] when properties in the widget should be copied to the element(s), [[beforeRemove]] and when they will be removed.
     */
    interface CustomWidgetTemplate extends WidgetBase<CustomWidgetTemplate, HTMLElement> {
      /** The type property must be set to `"custom"`. */
      type: "custom";

      /** This can be set to differentiate amongst multiple custom widgets; it is ignored by the API. */
      customType?: string | null;

      /**
       * Called when the DOM structure that implements the control should be created. This function is responsible for setting the [[element]] property to the DOM element that represents the control. The element **must not** be placed in the document. If the control is interactive, then appropriate listeners should be hooked up that copy user changes to the control to the relevant properties of the template and then invoke the template's [[onUse]] function, if defined. Note that a call to [[onBuild]] is always be followed by a call to [[onUpdate]].
       * 
       * @see [[onAdd]]
       * @see [[onUpdate]]
       */
      onBuild: (template: DialogTemplate, widget: HTMLElement) => any;

      /**
       * Called when the DOM structure that implements the control should be updated to reflect properties that can be set from the template. This is always called after the control is built and before it is added to the document. It is also called when an [[onUse]] handler returns false.
       */
      onUpdate: (template: DialogTemplate, widget: HTMLElement) => any;

      /**
       * This must be set to the DOM element that best represents the control. It does not have to represent the *root* of the widget structure; that is determined automatically.
       */
      element?: HTMLElement | null;
    }

    /**
     * Changes the interface theme. The supplied theme options do not need to be complete; any missing properties will use their standard default values. For example, the following call would switch to the "dark" version of the built-in theme: `micd.ui.changeTheme({ sBaseTheme: "dark" })`.
     * 
     * @param theme The options for the new theme. Missing options will be filled in with defaults automatically.
     */
    function changeTheme(theme?: ThemeOptions | null): void;

    /**
     * Options that affect the style of [[View]]s and [[Shell]]s. To explore the options and their effects, try the [theme designer](https://www.mathicando.com/api/playground/#!/theme+designer).
     * 
     * The first character of an option name indicates the expected type (a style often called Hungarian notation):
     * 
     * - `b`: a boolean value
     * - `n`: a number value (which will be clamped to a valid range)
     * - `d`: a string describing a duration using CSS syntax, such as `"1s"` for 1 second
     * - `c`: a string describing a colour value in CSS syntax, such as `"#f00"` for pure red
     * - `f`: a string consisting of comma-separated list of font family names
     * - `s`: a string from a set of allowed values
     * 
     * Colour values accept "hexa" syntax (`#RGBA` and `#RRGGBBAA`) even if not supported by the browser. Some option types (notably colours), allow additional CSS properties to be set by appending a semicolon `;` followed by a valid CSS declaration (property and value).
     * 
     * **Security note:** To help prevent third party or user themes from injecting malicious code into your app, theme options are rejected if they contain certain character sequences. Rejected options are silently discarded.
     * 
     * @see [[sBaseTheme]]
     */
    interface ThemeOptions {
      /**
       * The base theme that these options will build on. Possible values:
       * 
       * - `"default"`: Use the default base theme (black text, white background, blue accents).
       * - `"dark"`: Use the "dark mode" base theme (white text, black background, grey accents).
       */
      sBaseTheme?: "default" | "dark" | null,
      /**
       * A global scaling factor that adjusts the size of [[View]] and [[Shell]] content relative to the page's rem unit.
       * 
       * **Note:** Changes to any of the `nScale*` values will *not* be reflected correctly by existing Views or Shells. Either set the scale values before creating any Views or Shells, or dispose of and replace existing Views or Shells after applying the change. (Alternatively, you can scale existing Views and Shells by modifying the size of the page's `rem` unit.)
       * 
       * @see [[nScaleUi]]
       * @see [[nScaleMath]]
       */
      nScale?: number | null,
      /**
       * A scaling factor applied to UI elements such as palette buttons. The final scaling factor for UI elements is `nScale * nScaleUi`, constrained to a reasonable range.
       * 
       * @see [[nScale]]
       */
      nScaleUi?: number | null,
      /**
       * A scaling factor applied to math content in a [[View]]. The final scaling factor for math content is `nScale * nScaleMath`, constrained to a reasonable range.
       * 
       * @see [[nScale]]
       */
      nScaleMath?: number | null,
      /** The colour of [[View]] backgrounds, specified as a CSS colour value. */
      cMathBg?: string | null,
      /** The default colour of math content, specified as a CSS colour value. */
      cMathFg?: string | null,
      /** The colour of the caret (insertion point), specified as a CSS colour value. */
      cCaret?: string | null,
      /**
       * The caret (insertion point) blink style. Default is `"fade"`. Possible values:
       * 
       * + `"fade"`: The caret will fade smoothly between visible and invisible.
       * + `"step"`: The caret will switch instantly between visible and invisible.
       * + `"none"`: The caret will not blink.
       * @see [[dCaretBlink]]
       */
      sCaretBlink?: "fade" | "step" | "none" | null;
      /**
       * The period of time required for one blink of the caret (insertion point), specified as a CSS duration value.
       * @see [[sCaretBlink]]
       */
      dCaretBlink?: string | null,
      /**
       * The number of times the caret will blink after being moved. After this number of blinks, the caret will remain solid until it is moved or the [[View]] loses and regains focus. If set to `0` the caret will blink continuously. Has no effect if [[sCaretBlink]] is `"none"`.
       */
      nCaretBlinks?: number | null,
      /** The colour of the selection highlighter, specified as a CSS colour value. */
      cSelection?: string | null,
      /** The colour of other (non-selection) content highlighters, specified as a CSS colour value. */
      cHighlight?: string | null,
      /**
       * The colour used to indicate that a file will be dropped into the editor, specified as a CSS colour value.
       * @see [[acceptFileDrops]]
       */
      cFileDrop?: string | null,
      /** The colour of the wavy error underline, specified as a CSS colour value. */
      cError?: string | null,
      /** The colour of the empty node indicator which highlights empty fields of a math object, specified as a CSS colour value. */
      cNodeEmpty?: string | null,
      /** The colour of the empty node indicator which highlights an empty but optional field of a math object, specified as a CSS colour value. */
      cNodeOptional?: string | null,
      /** The colour of a "field" whose content is copied automatically from a real field, specified as a CSS colour value. */
      cNodeCloned?: string | null,
      /** The default colour of an identifier (variable whose name is longer than one letter), specified as a CSS colour value. */
      cNodeIdent?: string | null,
      /** The background colour indicating that content is part of a text box and not regular math, specified as a CSS colour value. */
      cNodeText?: string | null,
      /** The colour that indicates that content is part of a unit (such as m/s) and not regular math, specified as a CSS colour value. */
      cNodeUnit?: string | null,
      /** The colour of the indicator for a blank to be filled in, specified as a CSS colour value. */
      cNodeBlank?: string | null,
      /** The background colour of the indicator for a "spoiler box" whose contents are only revealed when the caret is within, specified as a CSS colour value. */
      cNodeAnswerBg?: string | null,
      /** The foreground colour of the indicator for a "spoiler box" whose contents are only revealed when the caret is within, specified as a CSS colour value. */
      cNodeAnswerFg?: string | null,
      /** The font family list used for UI elements, specified as a CSS font family list. Including the special family name `mcdUI` will load and use the theme-standard font family. */
      fInterface?: string | null,
      /** The default colour for UI text, specified as a CSS colour value. */
      cInterface?: string | null,
      /** The background colour for UI buttons, specified as a CSS colour value. */
      cButtonBg?: string | null,
      /** The foreground (label) colour for UI buttons, specified as a CSS colour value. */
      cButtonFg?: string | null,
      /** The foreground (label) colour for empty nodes in math objects shown in UI buttons, specified as a CSS colour value. */
      cButtonEmptyFg?: string | null,
      /** The background colour for focused UI buttons, specified as a CSS colour value. */
      cButtonFocusBg?: string | null,
      /** The background colour for UI buttons under the cursor (pointer), specified as a CSS colour value. */
      cButtonHoverBg?: string | null,
      /** The background colour for UI buttons that are active, specified as a CSS colour value. This colour is most prominent just after the button is released. */
      cButtonActiveBg?: string | null,
      /** The alternate background colour for UI buttons related to caret selection, specified as a CSS colour value. */
      cButtonSelectBg?: string | null,
      /** The alternate background colour for UI buttons related to caret movement, specified as a CSS colour value. */
      cButtonMoveBg?: string | null,
      /** The background colour for UI buttons that are presently disabled, specified as a CSS colour value. */
      cDisabledBg?: string | null,
      /** The colour of the pressure ripple effect, specified as a CSS colour value. */
      cPressure?: string | null,
      /** The alternate background colour for "primary" UI elements, such as palette headers, specified as a CSS colour value. */
      cPrimaryBg?: string | null,
      /** The alternate foreground colour for "primary" UI elements, such as palette headers, specified as a CSS colour value. */
      cPrimaryFg?: string | null,
      /** The background colour for toast messages, specified as a CSS colour value. */
      cToastBg?: string | null,
      /** The foreground colour for toast messages, specified as a CSS colour value. */
      cToastFg?: string | null,
      /** The background colour of side panels, specified as a CSS colour value. */
      cPanelBg?: string | null,
      /** Whether [[Shell]] [[SidePanel]]s will responsively shrink in size at narrow device widths. Default is true. */
      bPanelShrink?: boolean | null,
      /** Whether [[Shell]] [[SidePanel]]s will responsively hide at very narrow device widths. This effect is independent of whether the panel has been programmatically opened or closed using [[SidePanel.open]]. That is, when true, the panel can be hidden even when "open". Default is false. */
      bPanelHide?: boolean | null,
      /** The background colour of dialog pop-ups, specified as a CSS colour value. */
      cDialogBg?: string | null,
      /** The foreground colour used in the foot area of dialogs, specified as a CSS colour value. This is the text colour of dialog accept and cancel buttons. */
      cDialogFootFg?: string | null,
      /** The background colour of text and number fields in dialogs, specified as a CSS colour value. */
      cFieldBg?: string | null,
      /** The colour of the focus ring used to highlight toggle switch controls. */
      cToggleRing?: string | null,
      /** The colour used to indicate that a toggle switch is selected (turned on). */
      cToggleSelectedBg?: string | null,
      /** The colour used for soft shadows in UI elements, specified as a CSS colour value. This colour is most prominent as the shadow of menus and dialogs. */
      cSoftShadow?: string | null,
      /** The colour used for hard shadows in UI elements, specified as a CSS colour value. This colour is most prominent in the gaps between shell palettes. */
      cHardShadow?: string | null,
      /** The colour used for lines around [[View]]s, [[Shell]]s, and rows and buttons in palettes. */
      cLine?: string | null,

      /** The background colour of keys in generated help tables. */
      cKeyStrokeBg?: string | null,
      /** The foreground colour of keys in generated help tables. */
      cKeyStrokeFg?: string | null,
      /** The shadow colour of keys in generated help tables. */
      cKeyStrokeShadow?: string | null,

      /**
       * The flash colour used for visual error feedback.
       * @see [[sErrorFeedback]]
       */
      cErrorFeedback?: string | null,
      /**
       * The sensory form(s) taken by feedback when the user commits an error, such as trying an inapplicable command. Possible values:
       *
       * + `"none"`: Do not provide additional feedback. The user must infer that an error occurred from the (lack of) change in state.
       * + `"aural"`: Emit a brief audio cue. This has no effect if not supported by the device, or if audio volume is muted.
       * + `"tactile"`: Emit a brief haptic cue, typically by causing the device to vibrate. This has no effect if not supported by the device.
       * + `"visual"`: Emit a brief visual cue by flashing the screen or window. The maximum rate at which such flashes can occur is limited to minimize the risk of triggering a seizure in users with photosensitive epilepsy.
       * + `"all"`: Emit feedback using all available methods.
       * 
       * Multiple comma-separated values are allowed. The default value is `"aural,tactile"`.
       */
      sErrorFeedback?: "all" | "none" | "aural" | "visual" | "tactile" | "aural,visual" | "aural,tactile" | "visual,tactile" | null
    }
  }


  /** When the API is loaded by `<script>` tag, this must be set to a valid API key before loading the API.  If you need a key or have lost your key, please [contact us for help](http://mathicando.com). A key consisting of 22 zeroes can be used *for development and testing only* on localhost. */
  var key: string;

  /** When the API is loaded by `<script>` tag, this should be set to a callback function. The function will be invoked once the API is completely loaded and ready for use. No arguments are passed to it, and any return value is ignored. */
  var onReady: () => any | undefined | null;

  /**
    * Base of MICD event types.
    * 
    * @param T The type of the target of the event.
    */
  interface Event<T> {
    /** The event type. */
    readonly type: string;

    /** The event source. */
    readonly target: T;
  }

  /**
    * A function called when a specified event occurs, passed to methods such as [[Editor.addEventListener]].
    * 
    * @param E The type of the event object passed to the function.
    */
  interface EventListener<E> {
    /**
     * @param event An object that provides the details of the event to be handled.
     */
    (event: E): void;
  }





  /**
   * Properties defined in `micd.config` before loading the API will modify the API configuration. After the API is loaded, `micd.config` will contain the actual runtime configuration of the API, including any defaulted values, and further changes will have no effect. If loading the API as an ES6 or Node.js module, configuration options can be passed to `createApi` instead.
   */
  var config: ConfigOptions;

  interface ConfigOptions {
    /**
     * If true, enables experimental features being tested for possible inclusion in a future release. Currently, the default is true but it will switch to false in an unspecified future version.
     */
    experimentalFeatures?: boolean | null;

    /**
     * A string naming the global mode that the API will run in. Default is `"api"`. Possible values:
     * 
     * - `"api"`: Loads and initializes the API, calling [[micd.onReady]] once the API is available, but takes no further action. This is the default mode.
     * - `"editor"`: Loads and initializes the API, then injects a full-page [[Shell]] into the page. The [[micd.onReady]] function is only called after the shell is injected. The shell can be accessed programmatically through [[micd.shell.shared]].
     * - `"help"`: Injects a table of available commands with their keyboard shortcuts and abbreviations into the page. Only the parts of the API needed to produce the table will be loaded, so the API will not be fully functional and cannot be relied on for other purposes.
     * - `"test"`: Performs a low-level self-test of the API.
     */
    mode?: "api" | "editor" | "help" | "test" | null;

    /** A string that describes the desired locale, such as `"en-AU"` or `"de"`. The default value is the locale reported by the browser. */
    locale?: string | null;

    /**
     * A string, either `","` or `"."`, indicating which symbol will separate the integer and fractional parts of numbers. This also determines the symbol used to separate items in a list (such as the contents of a set): If set to `"."`, then `","` is used as the separator. Otherwise, `";"` is used as the separator. The default value is chosen based on the locale.
     * 
     * @see [[locale]]
     */
    radixPoint?: "," | "." | null;

    /** If true then views will accept files and text dragged and dropped from the host platform. If a file in the Math I Can Do document format is dropped, the document will be loaded into the editor. Default is true.*/
    acceptFileDrops?: boolean | null;

    /**
     * If true then the contents of the shared editor will automatically be saved to and restored from local storage. Only applies to `"editor"` mode. Default is false.
     * 
     * @see [[mode]]
     */
    localAutosave?: boolean | null;

    /**
     * Options that affect the initial theme used to style [[View]]s and [[Shell]]s.
     * 
     * @see [[changeTheme]]
     */
    theme?: micd.ui.ThemeOptions | null;

    /**
     * When running in `"help"` mode, this property can be assigned a [[HelpTableTemplate]] to customize the generated table.
     *
     * @see [[mode]]
     * @see [[createHelpTable]]
     */
    helpTable?: micd.ui.HelpTableTemplate | null;
  }
}