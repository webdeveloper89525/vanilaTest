# Code Review
1) What are the problems in this code snippet?
    - `<div>` tag is opened but not closed.
    - `<button>` tag is closed but not opened
    -  The import statement for `AuthService` is missing.
    - The `getUserName()` function is executed every time Angular change detection runs. And that can happen many times!
2) How can we solve them?
    - Using Angular Pipes is better
    - Declaring the new public variable to store full name.
3) If there are multiple options to solve them, what benefits and drawbacks of
each method?
    - Using Pipes
        * Props: Avoid multiple function call in every Angular change detection
        * Cons: Pure pipes only execute when their input values change
    - Declaring the new public variable
        * Props: By storing calculated value in a variable, we can easily use it in both component and template
        * Cons: 
        We have to first create a method to calculate the expected value and then store it in a declared variable
        