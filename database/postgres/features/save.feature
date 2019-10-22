@postgres @id @database @save
Feature: save a record into database
  Background:
    Given database is created.
    And table person is empty
  Scenario Outline: add new record
    When user provides person data <firstName>, <lastName>, <email>
    Then a person will be created with new id.
    Examples:
      |  firstName   |   lastName   |    email           |
      | mohammad     | shalabi      | shalabi@email.com  |
      | mohammad1    | shalabi1     | shalabi1@email.com |
      | mohammad2    | shalabi2     | shalabi2@email.com |
