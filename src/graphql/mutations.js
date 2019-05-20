// eslint-disable
// this is an auto generated file. This will be overwritten

export const createPatient = `mutation CreatePatient($input: CreatePatientInput!) {
  createPatient(input: $input) {
    id
    number
    name
    nameLowerCase
    dateOfBirth
    history
    managementPlan
    photoUri
  }
}
`;
export const updatePatient = `mutation UpdatePatient($input: UpdatePatientInput!) {
  updatePatient(input: $input) {
    id
    number
    name
    nameLowerCase
    dateOfBirth
    history
    managementPlan
    photoUri
  }
}
`;
export const deletePatient = `mutation DeletePatient($input: DeletePatientInput!) {
  deletePatient(input: $input) {
    id
    number
    name
    nameLowerCase
    dateOfBirth
    history
    managementPlan
    photoUri
  }
}
`;
