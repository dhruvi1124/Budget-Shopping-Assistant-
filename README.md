# Budget Shopping Assistant

### 0/1 Knapsack Algorithm Visualization

A Budget Shopping Assistant is a web-based interactive application that helps users choose the best combination of items within a limited budget.
The system uses the Dynamic Programming approach of the 0/1 Knapsack Algorithm to determine the optimal set of items that maximizes total value without exceeding the budget.

This project also provides a visual representation of the DP table, allowing users to understand how the algorithm computes the optimal solution step-by-step.

---

## Features

* Add items with name, price, and value
* Edit and delete items dynamically
* Set a budget constraint
* Visualize Dynamic Programming table generation
* Step-by-step algorithm animation
* Backtracking visualization to show selected items
* Adjustable animation speed
* Displays optimal value and chosen items

---

## Algorithm Used

The project implements the 0/1 Knapsack Algorithm using Dynamic Programming.

Recurrence relation:

```
dp[i][j] = max(dp[i-1][j], value_i + dp[i-1][j-weight_i])
```

Where:

* i → number of items considered
* j → current budget
* valueᵢ → value of item
* weightᵢ → price/weight of item

The algorithm builds a Dynamic Programming table to compute the optimal value.

---

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Dynamic Programming
* DOM Manipulation

---

## How It Works

1. User enters a budget.
2. User adds items with price and value.
3. Click Run Algorithm.
4. A Dynamic Programming table is generated.
5. The algorithm fills the table step-by-step.
6. Backtracking is performed to determine the selected items.
7. The optimal result is displayed.

---

## Project Structure

```
budget-shopping-assistant/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## How to Run the Project

Clone the repository:

```
git clone https://github.com/yourusername/budget-shopping-assistant.git
```

Open the project folder and run:

```
index.html
```

in any web browser.

---

## Example

Example Input:

| Item  | Price | Value |
| ----- | ----- | ----- |
| Pens  | 20    | 30    |
| Books | 50    | 20    |
| Pouch | 40    | 30    |

Budget = 60

Optimal Selection:

```
Pens + Pouch
Total Cost = 60
Optimal Value = 60
```

---

## Learning Outcomes

This project helps in understanding:

* Dynamic Programming
* 0/1 Knapsack Problem
* Algorithm Visualization
* Backtracking Technique
* Interactive UI with JavaScript

---

## Future Improvements

* Add graphical analysis of items
* Compare Greedy vs Dynamic Programming
* Export results to PDF
* Improve mobile responsiveness

---

## License

This project is created for educational purposes.
