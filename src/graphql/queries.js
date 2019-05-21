// eslint-disable
// this is an auto generated file. This will be overwritten

export const getPatient = `query GetPatient($id: ID!) {
  getPatient(id: $id) {
    id
    number
    firstName
    lastName
    fullNameLowerCase
    dateOfBirth
    history
    managementPlan
    photoKey
  }
}
`;
export const listPatients = `query ListPatients(
  $filter: ModelPatientFilterInput
  $limit: Int
  $nextToken: String
) {
  listPatients(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      number
      firstName
      lastName
      fullNameLowerCase
      dateOfBirth
      history
      managementPlan
      photoKey
    }
    nextToken
  }
}
`;
