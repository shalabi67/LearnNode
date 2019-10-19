@calculator
Feature: As a user, i want to divide two numbers

  @divide @main
  Scenario Outline: : Divide two numbers
    Given a calculator
    When I divide <opr1> by <opr2>
    Then the result is <result>
    Examples:
      |  opr1 | opr2 | result |
      | 6     | 3    | 2      |
      | 8     | 4    | 2      |
      | 9     | 3    | 3      |
      | 10    | 10   | 1      |

