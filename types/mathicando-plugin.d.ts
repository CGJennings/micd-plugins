/// <reference no-default-lib="true"/>
/// <reference lib="ESNext"/>

/*
  Copyright (c) 2016-2020 Math I Can Do Solutions Incorporated or its licensors.
  Copyright (c) 2016-2020 Christopher G. Jennings.
  All rights reserved. Permission granted to use or redistribute without modification.
*/

/**
 * The `micd` module is available as an object in the loading page's global (`window`) scope once the library has loaded and initialized. The principal classes that make up the MICD API are all found directly under this namespace. For example, a new math editor can be created using `let editor = new micd.Editor()`.
 */
declare namespace micd {
  /**
   * An immutable representation of a colour in the sRGB (Standard Red Green Blue) space.
   * 
   * Each component of a Color is described by a number between 0 and 1 inclusive. For example, (0.5, 0, 0) would yield pure red at half the possible brightness. An alpha (opacity) level can optionally be specified as a fourth component, with 0 meaning fully transparent and 1 meaning fully opaque.
   *
   * Color instances are *immutable*: once created, the component values of a particular Color can't be changed.
   * 
   * **Example:** Convert a CSS color name to its hex notation equivalent
   * ```
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
     * @throws {TypeError} If arguments are missing or not numbers.
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
     * @throws {TypeError} If arguments are missing or not numbers.
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
     * @throws {TypeError} If arguments are missing or not numbers.
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
     * @throws {TypeError} If arguments are missing or not numbers.
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
     * @throws {TypeError} If arguments are missing or not numbers.
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
     * @throws {TypeError} If arguments are missing or not numbers.
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
   * ```
   * let w = new micd.Walker(editor);
   * w.moveTo.documentEnd();
   * w.insert.variable("x");
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
     * ```
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
     * ```
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
     * Inserts a math object by name. This is similar to [[apply]], except that it will reject other types of commands.
     * 
     * @param apiName The name of a command that inserts a math object.
     * @returns True if the insertion was possible.
     */
    object(apiName: MathObject | keyof typeof MathObject): boolean;

    /**
     * Inserts a style object whose children will be rendered with the specified style.
     * 
     * **Example:** 
     * ```
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
    object(apiName: MathObject | keyof typeof MathObject): Clip | null;

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
     * @returns Any return value is ignored.
     */
    (walker: Walker, node: Node, stage: VisitStage, field: number): any;
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

  /** Specifies the type of a variable or identifier. */
  const enum DataType {
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

    /** A scalar constant, such as **π** or **e**. */
    constant_scalar = "constant_scalar",
    /** A set constant, such as ℝ, the field of real numbers. */
    constant_set = "constant_set",
  }

  /** The type of accent shown over a variable. A null value indicates no accent. */
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
   * Complex nodes have one or more [[Field]]s, which are lists of child nodes. Each field represents a contiguous semantic subpart of the object. For example, a node representing a fraction would have two fields: one representing the numerator, and one representing the denominator. (The order of fields matches the order that the caret would move through them in the editor when repeatedly pressing the Enter key.)
   * 
   * Nodes are read-only reflections of the underlying content: modifying them has no effect on the document. To modify the document, use the [[Walker]] to insert, delete, and apply commands.
   * 
   * **Example:** Print the type of node under the caret
   * ```
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
     * @see [[isWidthExpandable]]
     * @see [[isHeightExpandable]]
     */
    readonly size: [number, number] | null;

    /**
     * If this node is a tabular node, returns whether it automatically inserts a new column when content is placed in the last column. The [[size]] of a tabular node does not include such columns.
     */
    readonly isWidthExpandable?: boolean;

    /**
     * If this node is a tabular node, returns whether it automatically inserts a new row when content is placed in the last row. The [[size]] of a tabular node does not include such rows.
     */
    readonly isHeightExpandable?: boolean;
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
   * Editors manage and manipulate math content, track the caret position and selection, support the execution of commands, and enable serialization and conversion of the content under their control.
   * 
   * Each editor is responsible for maintaining a model of its content, the *math document*. In order to ensure that the document remains consistent, it cannot be accessed or mutated directly. The most common way to manipulate the document model is by [[apply]]ing commands. To implement more complex operations, a [[Walker]] can be used to safely and efficiently examine or modify the document.
   * 
   * The editor also manages access to the document's [[metadata]], a string map of key and value pairs that can be used to store both standard and user-defined keys as part of the document.
   * 
   * An editor does not include a user interface. To present the contents of an editor to the end user and/or allow them to edit its content, create a [[View]] for it.
   * 
   * **Example:** Create an editor, apply a command to it, and view the result
   * ```
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
     * @throws {TypeError} If set to an invalid document, or to a newer version than the current API version can support.
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
     * @throws {Error} If called when not paired with a previous call to [[beginCompoundEdit]].
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
     * Sets or gets the selection range. Setting this to null will clear the selection, if any.
     * @throws {TypeError} If set to a value that is not a valid selection.
     */
    selection: string | null;

    /**
     * Sets or gets the caret position.
     * @throws {TypeError} If set to a value that is not a valid position.
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
     * Adds a listener for the specified type of event.
     * 
     * @param type A string naming the event type. For example, the `"change"` type is used to listen for document modifications.
     * @param listener The event listener to call when the event occurs.
     * @throws {TypeError} If the event type is not a known type.
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

  /** Options that affect image conversion with [[Editor.toImage]] and [[Editor.downloadImage]]. */
  interface ImageFormatOptions {
    /**
     * Image file format such as `"png"` or `"svg"`. Default is `"png"`. Other formats may be supported depending on the browser, such as `"jpeg"` or `"avif"`. If the requested format is not available, a PNG image is produced.
     * 
     * @see [[micd.util.supportedImageFormats]]
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
   * Allows reading and writing the metadata associated a math document. Document metadata consists of a map with strings for both keys and values. If you wish to add your own custom keys to a document, include at least one dash `-` in the key name to avoid conflicts with any new keys added by future versions of the library.
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
     * @throws {TypeError} If the event type is not a known type.
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
   * ```
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
     * @throws {Error} If the editor element is not, in fact, in the document tree (after any positioning specified by the arguments).
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
     * Simulates the user typing a sequence of characters on the keyboard. The view does not need to be focused or even added to the DOM. In addition to regular printable characters, the string may include `\n` (U+000A) to simulate typing Enter, `\b` (U+0008) to simulate typing Backspace, and U+007F to simulate typing Delete. Abbreviations can be used to insert complex math objects (for example, `".sum "`—note the space). Finally, [[Clip]] values to be pasted may be embedded within the typed sequence by surrounding them with `\0` (U+0000) characters.
     * 
     * @param input The characters to simulate typing.
     */
    type(input: string): void;

    /**
     * Simulates the user pressing a single key combination. This method does not require the view to have input [[focus]].
     * 
     * @param gesture The key to simulate, described in the same format used by [[View.gestureMap]].
     * @throws {TypeError} If the string is not a valid gesture.
     */
    pressKey(gesture: string | null): void;

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
     * Returns a Promise that resolves once any pending updates to this view have been completed.
     * 
     * @returns A Promise that resolves when this view is up to date.
     */
    onceUpToDate(): Promise<View>;

    /**
     * Invokes the supplied callback once any pending updates to the view have been completed.
     * 
     * @param callbackFn A function called when this view is up to date.
     */
    onceUpToDate(callbackFn: (view: View) => any): null;

    /**
     * Gets this view's key bindings.
     * 
     * The keys in this map are strings that describe keyboard gestures. They can consist of either a single printable character, or else a description of a key combination. A key combination consists of an optional modifier name separated from a key name by a space character, such as `"Ctrl ArrowLeft"`. On Apple devices, modifier names that include Ctrl or Alt are automatically mapped to the Command and Option keys, respectively.
     * 
     * To improve cross-platform compatibility, only certain modifier key combinations are allowed; a type-safe enumeration of these combinations is available as [[micd.Keystroke]].
     */
    readonly gestureMap: InputMap<Keystroke | string>;

    /**
     * Gets this view's abbreviations.
     * 
     * The keys in this map are abbreviations, strings of letters and/or digits that can be expanded to convert them into math objects. Abbreviations must begin with a letter.
     */
    readonly abbreviationMap: InputMap<string>;

    /** Gets or sets whether this view is disabled. A disabled view is non-interactive. It ignores keyboard, mouse, and touch input and is rendered in a different style. This does not prevent document content from being modified (see [[Editor.readOnly]]). */
    disabled: boolean;

    /**
     * Gets or sets this view's relative font size. This is a scaling factor relative to the default font size for the view. The initial value is 1. Setting this to a value greater than 1 will increase the size, while setting this to a positive value less than 1 will decrease the size. The base font size for new views is determined by the [[ThemeOptions]]. By default, this size is ultimately derived from the default font size set by the user in their browser options.
     * 
     * @throws {RangeError} If the scale is not a positive number.
     */
    fontScale: number;

    /**
     * The `menuCustomizer` property can be set to a function that will be called to customize the context menu before it is shown. The function is called with the default menu template and this view instance. It can return the template with or without changes, or return null to prevent display of the menu.
     */
    menuCustomizer: ((template: micd.ui.MenuTemplate, view: View) => micd.ui.MenuTemplate | null) | null;
  }

  /**
   * A map that describes bindings from possible input values to editing actions. Usually, the actions are editor commands, but custom actions can be added by subclassing [[Action]] and passing the new action to [[put]]. The nature of a map's input values is determined by the kind of map. For example, a [[gestureMap]] binds keystrokes to actions, while an [[abbreviationMap]] binds short letter strings to actions.
   */
  interface InputMap<I> {
    /**
     * Binds the specified input value to a custom [[Action]] instance. When the view receives a matching input value from the user, it will apply the action if possible.
     * 
     * @param input The input value.
     * @param customAction The action to perform when the user produces the gesture.
     * @throws {TypeError} If the input format is not valid or the action is not an [[Action]] instance.
     */
    put(input: I, customAction: Action): void;

    /**
     * Binds the specified input value to the command with the specified name. When the view receives a matching input value from the user, it will apply the command if possible. Throws an Error if the string is not a valid command name.
     * 
     * @param input The input value.
     * @param apiName The name of the built-in command to map to the gesture.
     * @throws {TypeError} If the input format is not valid or the command name is not a valid command.
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

    /** Clears the map of all input value bindings. */
    clear(): void;

    /** Adds the default binding for all built-in commands. To reset the map to its initial state, first call [[clear]]. */
    addDefaults(): void;

    /**
     * Returns the default input value that maps to the specified command, or `null` if the command has no default. For example, in an abbreviation map, this would return the default abbreviation for the command. Throws an Error if the command name is invalid.
     * 
     * @param command The name of the built-in command to look up.
     * @returns An input string that (unless replaced or removed) maps to the specified command, or `null` if none.
     * @throws {TypeError} If the command is not a valid command name.
     */
    getDefaultFor(command: EditorCommand | keyof typeof EditorCommand): string;
  }


  /**
   * The base class for creating custom editing actions. While built-in actions are applied through an editor, custom actions are activated through a particular view. Namely, the view whose [[InputMap]] received the input that produced it. This allows custom actions to mix low-level commands (through `view.editor.apply`) with higher-level mutations like [[View.type]].
   * 
   * @see [[InputMap]]
   */
  class Action {
    /**
     * Returns whether the action can currently be applied.
     * 
     * @param view The view that the action was registered with.
     * @returns Returns true if and only if the action can be applied.
     */
    canApplyTo(view: View): boolean;

    /**
     * Applies the action, if possible.
     * 
     * @param view The view that the action was registered with.
     */
    applyTo(view: View): void;
  }

  /**
   * A selection of math content that can be inserted into an [[Editor]].
   * 
   * Clips can be converted to and from strings, making it easy to transfer them from one editor to another, even across windows, devices, or editing sessions.
   * 
   * **Example:** Capture a clip in one editor and paste it in another
   * ```
   * let selectionClip = micd.Clip.from(editor1);
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
     * @throws {TypeError} If set to a string that is not a valid MICD clip.
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
  }

  /**
   * This namespace contains the API related to [[Shell]]s, an optional library component that provides a richer editing experience than a simple [[View]]. New shells are created by calling the [[create]] function, which returns a Promise that resolves to the new shell (after loading the shell library component if necessary).
   * 
   * **Example:** Append a new Shell to the page
   * ```
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

    /** An entry describing one button in a row of palette buttons. This can be a single string to assign a primary action, or an array of two strings to assign both primary and secondary actions (activated with Shift). Each string can be a single character to assign an action that inserts that character as a variable or digit, or it can be the name of a command. Not all commands can be used, but all math object commands can. If the entry is a [[CustomPaletteButtonTemplate]] object, a custom button will be created that performs its own handling when clicked. Finally, if the entry is `null`, it will produce a spacer that consumes the same space as a button but does nothing if clicked. */
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
      (shell: Shell, id: string, button: HTMLElement): any
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

    /** When the library is loaded in `"editor"` mode, this will be set to the shared global shell. (If the shared shell is disposed of, this becomes `null`.) Otherwise it is `undefined`. */
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
     * @throws {TypeError} If either argument is not a valid MICD document.
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
     * Returns a new array in which each element describes one of the image formats supported on the current device when exporting math content to an image. Support for `"png"` and `"svg"` is guaranteed. Other entries depend on the platform and/or browser, but may include `"bmp"`, `"gif"`, `"jpeg"`, `"webp"`, and `"avif"`. The array can be iterated over to list supported formats, or specific formats can be looked up by name (as in `formats["png"]`).
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
      /** The default gesture used to activate the command, if any. This is in the form of a gesture string as it would be passed to an input map, either a single typed character or a keystroke description such as `"Ctrl X"`. */
      gesture?: micd.Keystroke | string;
      /** The default abbreviation used to activate the command, if any. */
      abbreviation?: string;
      /** The ligature sequence, if any, that activates the command. This is a sequence of operator symbol keys, such as `"<="`, that will automatically be converted into the object produced by this command. */
      ligature?: string;
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
     * @throws {ReferenceError} If the symbol is missing.
     * @throws {TypeError} If the symbol is too long or the placement is invalid.
     */
    function createOperator(symbol: string, placement?: OperatorPlacement | keyof typeof OperatorPlacement): micd.Clip;

    /**
     * Compresses a string. The returned string is *usually not longer than* (and often significantly shorter than) the original string. The original string can be recovered by calling [[decompress]] with the compressed string as an argument.
     * 
     * By default, compressed strings use the entire range of character values. This improves compression effectiveness when the compressed string will be kept in memory or otherwise stored as 16-bit character values. However, if encoded as UTF-8, the encoded representation of the compressed string will typically require *more* bytes than the *uncompressed* string would have. Passing true for `optimizeForUtf8` limits the compression efficiency but ensures that the compressed string uses only single-byte UTF-8 characters. The compressed result will generally require more *characters* than the standard method, but those characters will use fewer actual *bytes* when encoded.
     * 
     * In cases where compression is ineffective and the compressed string ends up longer than the original, this function can often return the original string instead. This is transparent to the caller: passing such strings to [[decompress]] will return the correct result.
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

  /** Auxiliary user interface elements, including dialogs and menus. This is a lightweight toolkit intended primarily for the library's own internal needs. It provides a number of conveniences, including pre-built option dialogs and easy extension of the default context menu. However, using it is entirely optional. */
  namespace ui {
    /**
     * Returns a Promise that resolves to the root of a tree of HTMLElements that provide a graphic representation of some math content. The content is described by a string using one of three formats: the string value of a [[Clip]], the name of a command that inserts math, or a string of MathML. Note that this is intended mainly to support the construction of user interface elements and might not be suited to more general math display applications.
     * 
     * @param math A string containing a clip, a command name, or MathML.
     * @returns A Promise that resolves to the root of a tree of HTMLElements that will display the math, or `null` if a callback was supplied.
     * @throws {ReferenceError} If the supplied math content is null.
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

      /** An optional key gesture that activates the command. */
      gesture?: string | null;

      /** An optional abbreviation that activates the command. */
      abbreviation?: string | null;

      /** Additional information that will be appended to the table just under this command. This can appear by itself, in which case the note is attached to the most recently added command.  */
      note?: string | null;
    }

    /**
     * Displays a basic popup menu based on a template. Only one popup menu can be visible at a time. If a menu is already showing when this is called, it will be cancelled automatically.
     *
     * @param template The template that defines the structure and logic for the desired dialog.
     * @throws {ReferenceError} If the template is null.
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
      (template: T): any;
    }

    /** The common base interface for all menu template interfaces. */
    interface MenuTemplateBase {
      /** An optional value that can be set to assist in implementing the menu logic. It is ignored by [[showMenu]] and does not affect any DOM ids. */
      id?: string | null;
      /** If defined, this function will be called when the user selects a menu item. */
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
     * @experimental
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

      /** This can be set to differentiate amongst multiple custom widgets; it is ignored by the library. */
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


  /** This must be set to the API key assigned to you by Math I Can Do before loading the library. If you need a key or have lost your key, please [contact us for help](http://mathicando.com). */
  var key: string;

  /** When defined before loading the library, this function is called once the library is completely loaded and ready for use. No arguments are passed to it, and any return value is ignored. */
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
   * Properties defined in `micd.config` before loading the library will modify the library configuration. After the library is loaded, `micd.config` will contain the actual runtime configuration of the library, including any defaulted values, and further changes will have no effect.
   */
  var config: ConfigOptions;

  interface ConfigOptions {
    /**
     * If true, enables experimental features being tested for possible inclusion in a future release. Currently, the default is true but it will switch to false in an unspecified future version.
     */
    experimentalFeatures?: boolean | null;

    /**
     * A string naming the global mode that the library will run in. Default is `"api"`. Possible values:
     * 
     * - `"api"`: Loads and initializes the library, calling [[micd.onReady]] once the library is available, but takes no further action. This is the default mode.
     * - `"editor"`: Loads and initializes the library, then injects a full-page [[Shell]] into the page. The [[micd.onReady]] function is only called after the shell is injected. The shell can be accessed programmatically through [[micd.shell.shared]].
     * - `"help"`: Injects a table of available commands with their keyboard shortcuts and abbreviations into the page. Only the parts of the library needed to produce the table will be loaded, so the API will not be fully functional and cannot be relied on for other purposes.
     * - `"test"`: Performs a low-level self-test of the library.
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
}

/** The Shell instance in the app window where the plugin is running. */
declare var shell: micd.shell.Shell;
/** The View instance in the app window where the plugin is running. */
declare var view: micd.View;
/** The Editor instance in the app window where the plugin is running. */
declare var editor: micd.Editor;
