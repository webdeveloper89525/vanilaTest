# Component Interaction

## Problem
Imagine that we have two components - ComponentA and ComponentB. Both
components have to interact with each other in some way:
- Send some data from ComponentA to ComponentB and vice versa.
- Call some methods from ComponentA to ComponentB and vice versa.

Given this information, please answer following questions:
1) What options do we have to establish such communication?
2) For each option describe what are the pros and cons of this solution?
3) For each option describe what are the cases the solution fits best?

## Answers
1) What options do we have to establish such communication?
    - Using a Service as a Module Provider.
    - Using Inputs and Outputs. This approach works best when ComponentA and ComponentB hold parent and child relationship.
    - Useing data sent via url with route parameters.
2) For each option describe what are the pros and cons of this solution?
    - Props
    1) Because works in a module, with the same values for all components in this module, so this can be used for all components in a module
    2) Implmentation is very fast and data sent directly to the child component from parent or vice versa
    3) With url data this can be used for all components in the project and send small data
    - Cons
    1) The data is stored outside of components, so this data can be easily loss and changed by the others.
    2) This can be only implemented between parent and child components
    3) This way is not safe and user can't send the large data
3) For each option describe what are the cases the solution fits best?
    - When many components in a module and the data between components is large and many components are sharing data in the module.
    - When the data will be only shared between parent and child components
    - When the data is very small and used in many components.