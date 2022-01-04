# fxwidgets

A collection of widgets for forex traders

### Structure

- `sketch` contains design outlines for each of the widgets
- `src` is the root of the deployable project, i.e., everything that will be hosted

### Requirements

- Responsive across full device spectrum.
- Uniform design across widgets.
- It should be easy to create variants new variants of widgets, e.g., "pivots-blue.html", which "extend" the base design with different colors in particular. To this end, css variables should be used in the **base** "pivots.css" and these variables can then be set in "pivots-blue.html".

### Structure

- Super `index.js` and `index.css` included in all widgets
- One base `.js` and `.css` per widget
- In each color variant of the widgets, one `style` tag which sets the color variables and provides any additional needed styles

### Widget functionality

- currency-converter: Equivalent to api endpoint of the same name
- fibonacci: Offer a calculator for the fibonacci extensions and retracements as can be found [here](https://www.omnicalculator.com/finance/fibonacci-retracement)
- pivots: Equivalent to api endpoint of the same name
- stop-loss-take-profit-amounts: Calculate monetary risk as can be seen [here](https://www.thebalance.com/how-to-calculate-the-size-of-a-stop-loss-when-trading-1031386)
- stop-loss-take-profit-levels: The inverse of the previous widget
